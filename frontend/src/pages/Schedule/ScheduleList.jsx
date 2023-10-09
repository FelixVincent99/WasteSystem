import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import {toast} from 'react-toastify'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { getAllSchedules, createSchedule } from '../../features/schedule/scheduleSlice'
import Spinner from '../../components/Spinner'

function ScheduleList() {

  const initFilterMonth = new Date()
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(initFilterMonth.getMonth(), initFilterMonth.getFullYear()))
  const [filterMonth, setFilterMonth] = useState(initFilterMonth)
  
  const schedules = useSelector(state => state.schedules.schedules)
  const {isError, isLoading, isSuccess, message} = useSelector(state => state.schedules)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const initFetch = useCallback(() => {
      dispatch(getAllSchedules())
  },[dispatch])

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess){
        toast.success("Schedule has been created")
        dispatch(getAllSchedules())
    }  
      initFetch()
  },[initFetch, isError, isSuccess, message, dispatch])

  var columns = daysInMonth.map(day => {    
    const column = {
      minWidth: 150,
      field: formatDate(day),
      // headerName: formatDate(day),
      // headerName: <Box><Typography>{formatDate(day)}</Typography><Divider/><Typography>ABC</Typography></Box>,
      renderHeader: () => (
        <Box id={formatDate(day)}><Typography sx={{ mt: 5}}>{formatDate(day)}</Typography><Divider/><Button variant="contained" onClick={updateBlankSchedule}>Update</Button></Box>
      ),
      renderCell: (params) => {
        var scheduleCell, defaultCell
        if(params.value.scheduleItem === 'NA'){
           scheduleCell = <Box sx={{height:150}}><Typography sx={{color: params.value.textColor}}>NA</Typography></Box>
        }else{
          scheduleCell = <Box sx={{height:150}}><Typography sx={{color: params.value.textColor}}>{params.value.scheduleItem.driverName}</Typography><Typography sx={{color: params.value.textColor}}>{params.value.scheduleItem.truckNo}</Typography><Typography sx={{color: params.value.textColor}}>{params.value.scheduleItem.scheduleLoaders}</Typography></Box>
        }
        if(params.value.defaultItem === 'NA'){
          defaultCell = <Box sx={{height:150}}><Typography>NA</Typography></Box>
        }else{
          defaultCell = <Box sx={{height:150}}><Typography>{params.value.defaultItem.defaultDriver}</Typography><Typography>{params.value.defaultItem.defaultTruck}</Typography><Typography>{params.value.defaultItem.defaultLoaders}</Typography></Box>
        }
        return <Box>{scheduleCell}<Divider />{defaultCell}</Box>
      }
    }
    return column
  })
  columns.unshift({
    field: 'areaCode',
    headerName: 'Area Code'
  })

  const rows = schedules.map(schedule => {
    var processedScheduleItem = {
      'areaCode': schedule.areaCode,
      'areaId': schedule.areaId,
      'id': schedule.areaId
    }

    for(var a=1; a<columns.length; a++){
      var date = columns[a].field
      var scheduleItem = 'NA'
      var defaultItem = 'NA'
      var match = false
      var textColor = 'black'
      if(schedule.schedule !== undefined){
        for(var b=0; b<schedule.schedule.length; b++){
          if(schedule.schedule[b].scheduleDate === date){
            scheduleItem = schedule.schedule[b]
          }
        }
      }
      if(!(schedule.collectionFrequency === undefined || schedule.collectionFrequency === null)){
        if(schedule.collectionFrequency.includes(new Date(columns[a].field).getDay())){        
          if(schedule.defaultDriver==="" && schedule.defaultLoaders==="" && schedule.defaultTruck===""){
            defaultItem = 'NA'
          }else{
            defaultItem = {
              defaultDriver: schedule.defaultDriver,
              defaultTruck: schedule.defaultTruck,
              defaultLoaders: schedule.defaultLoaders,
              defaultDriverId: schedule.defaultDriverId,
              defaultTruckId: schedule.defaultTruckId,
              defaultLoadersId: schedule.defaultLoadersId
            }
          }
        }
      }

      if(scheduleItem === 'NA' && defaultItem === 'NA'){
        match = true
      }else{
        if(scheduleItem !== 'NA' && defaultItem !== 'NA'){
          if(defaultItem.defaultDriver === scheduleItem.driverName && defaultItem.defaultTruck === scheduleItem.truckNo && defaultItem.defaultLoadersId.split(",").sort().toString() === scheduleItem.loaderId.split(",").sort().toString()){
            match = true
          }else{
            match = false
          }
        }else if(scheduleItem !== 'NA' && defaultItem === 'NA'){
          match = true
        }else{
          match = false
        }        
      }
      
      if(match){
        textColor = 'orange'
      }else{
        textColor = 'red'
      }
      if(scheduleItem === 'NA' && defaultItem === 'NA'){
        textColor = 'black'
      }

      if(scheduleItem !== 'NA' && scheduleItem.status === '2'){
        textColor = 'green'
      }else if(scheduleItem !== 'NA' && scheduleItem.status === '3'){
        textColor = 'brown'
      }

      processedScheduleItem[columns[a].field] = {
        scheduleItem: scheduleItem,
        defaultItem: defaultItem,
        match: match,
        textColor: textColor
      }
    }    
    return processedScheduleItem
  })

  const handleOnCellClick = (params) => {
    if(params.formattedValue.scheduleItem === 'NA'){
      navigate('/schedule',{state:{
        type: "add",
        value: {
          scheduleDate: params.field,
          areaId: params.row.areaId
        }
      }});
    }else{      
      navigate('/schedule',{state:{
        type: "edit",
        value: params.formattedValue,
        areaId: params.row.areaId
      }});
    }
  };

  const updateBlankSchedule = (e) => {
    var selectedDay = e.target.parentNode.id
    var requireUpdateSchedule =[]

    for(var a=0; a<rows.length; a++){
      if((!rows[a][selectedDay].match) && rows[a][selectedDay].scheduleItem === "NA" && rows[a][selectedDay].defaultItem !== "NA"){
        if(rows[a][selectedDay].defaultItem.defaultDriverId !== null && rows[a][selectedDay].defaultItem.defaultTruckId !== null && rows[a][selectedDay].defaultItem.defaultLoadersId.length>0){
          var loadersArray = rows[a][selectedDay].defaultItem.defaultLoadersId.split(",");
          if(loadersArray.length >0){
            for(var c=0; c<loadersArray.length; c++){
              loadersArray[c] = parseInt(loadersArray[c])
            }
          }
          requireUpdateSchedule.push({
            scheduleDate: selectedDay,
            scheduleTime: "",
            areaId: rows[a].areaId,
            driverId: rows[a][selectedDay].defaultItem.defaultDriverId,
            loaderId: loadersArray,
            truckId: rows[a][selectedDay].defaultItem.defaultTruckId,
            status: "1"
          })
        }
      }      
    }
    
    for(var b=0; b<requireUpdateSchedule.length; b++){
      dispatch(createSchedule({scheduleData: requireUpdateSchedule[b]}))
    }
  }

  const onChangeDateFilter = (e)=>{
    setFilterMonth(e)
    setDaysInMonth(getDaysInMonth(e._d.getMonth(),e._d.getFullYear()))    
  }
  if(isLoading){
    return <Spinner />
  }
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment} >
        <DatePicker            
        onChange={onChangeDateFilter}
        value={filterMonth}
        label="Month"
        views={['year', 'month']}
        openTo="year"
        renderInput={(params) => <TextField {...params} helperText={null}/>}
        />
      </LocalizationProvider>
      <Stack direction="row" spacing={2}>
        <Chip label="No Schedule" style={{backgroundColor:'red', color:'white'}} />
        <Chip label="Scheduled" style={{backgroundColor:'orange', color:'white'}} />
        <Chip label="Complete" style={{backgroundColor:'green', color:'white'}} />
      </Stack>
      <div style={{ height: 800, width: '100%'}}>
          <div style={{ display: 'flex', height: '100%'}}>
              <div style={{ flexGrow: 1 }}>
                  <DataGrid 
                      rows={rows}
                      columns={columns}
                      components={{ Toolbar: GridToolbar }}
                      onCellClick={ handleOnCellClick }
                      getRowHeight={() => 'auto'}
                      headerHeight={100}
                  />
              </div>
          </div>
      </div>
    </>
  )
}

function getDaysInMonth(month, year) {

  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export default ScheduleList
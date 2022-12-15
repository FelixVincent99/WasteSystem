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

import { getAllSchedules } from '../../features/schedule/scheduleSlice'

function ScheduleList() {

  const initFilterMonth = new Date()
  const daysInMonth = getDaysInMonth(initFilterMonth.getMonth(), initFilterMonth.getFullYear())
  const [filterMonth, setFilterMonth] = useState(initFilterMonth)
  
  const schedules = useSelector(state => state.schedules.schedules)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const initFetch = useCallback(() => {
      dispatch(getAllSchedules())
  },[dispatch])

  useEffect(() => {    
      initFetch()
  },[initFetch])

  var columns = daysInMonth.map(day => {
    const column = {
      field: formatDate(day),
      headerName: formatDate(day),
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
      
      if(schedule.collectionFrequency.includes(new Date(columns[a].field).getDay())){        
        defaultItem = {
          defaultDriver: schedule.defaultDriver,
          defaultTruck: schedule.defaultTruck,
          defaultLoaders: schedule.defaultLoaders,
          defaultLoadersId: schedule.defaultLoadersId
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
        }else{
          match = false
        }        
      }
      
      if(match){
        textColor = 'black'
      }else{
        textColor = 'red'
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


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment} >
        <DatePicker            
        onChange={(newValue)=>{
          setFilterMonth(newValue)
        }}
        value={filterMonth}
        label="Month"
        views={['year', 'month']}            
        renderInput={(params) => <TextField {...params} helperText={null}/>}
        />
      </LocalizationProvider>
      <div style={{ height: 800, width: '100%'}}>
          <div style={{ display: 'flex', height: '100%'}}>
              <div style={{ flexGrow: 1 }}>
                  <DataGrid 
                      rows={rows}
                      columns={columns}
                      components={{ Toolbar: GridToolbar }}
                      onCellClick={ handleOnCellClick }
                      getRowHeight={() => 'auto'}
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
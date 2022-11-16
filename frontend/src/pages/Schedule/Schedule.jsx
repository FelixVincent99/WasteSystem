import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {toast} from 'react-toastify'
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Box, Stack } from '@mui/system'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput';

import { createSchedule, updateSchedule, reset } from '../../features/schedule/scheduleSlice'
import Spinner from '../../components/Spinner'
import { getAllManpowers } from '../../features/manpower/manpowerSlice'
import { getAllAreas } from '../../features/area/areaSlice'
import { getAllTrucks } from '../../features/truck/truckSlice'


function Schedule() {
    const location = useLocation().state
    var locScheduleDate, locScheduleTime, locAreaId, locTruckId, locDriverId, locLoaderId, locStatus;
    if(location.type === 'add'){
        locScheduleDate= location.value.scheduleDate
        locAreaId = location.value.areaId
        locScheduleTime = ''
        locTruckId = ''
        locDriverId = ''
        locLoaderId = []
        locStatus = '1'
    }else if(location.type === 'edit'){
        var locScheduleId = location.value.scheduleId
        locScheduleDate= location.value.scheduleDate
        locAreaId = location.areaId
        const flagDate = new Date('July 1, 1999, ' + location.value.scheduleTime.split(":")[0] + ":" + location.value.scheduleTime.split(":")[1] + ":" + location.value.scheduleTime.split(":")[2]);
        locScheduleTime = new Date().setTime(flagDate.getTime());
        locTruckId = location.value.truckId
        locDriverId = location.value.driverId
        locLoaderId = location.value.loaderId.split(',').map(function(item) {return parseInt(item)})
        locStatus = location.value.status
    }    
    const initialScheduleState = {        
        scheduleDate: locScheduleDate,
        scheduleTime: locScheduleTime,        
        areaId: locAreaId,        
        truckId: locTruckId,
        driverId: locDriverId,
        loaderId: locLoaderId,
        status: locStatus
    }
        
    const [scheduleData, setScheduleData] = useState(initialScheduleState)
    const { scheduleDate, scheduleTime, areaId, truckId, driverId, loaderId, status} = scheduleData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isError, isLoading, isSuccess, message} = useSelector(state => state.schedules)
    const areas = useSelector(state => state.areas.areas)
    const trucks = useSelector(state => state.trucks.trucks)
    const manpowers = useSelector(state => state.manpowers.manpowers)

    var drivers = []
    var loaders = []
    for(var a=0; a<manpowers.length; a++){
        if(manpowers[a].role === 'Driver'){
            drivers.push(manpowers[a])
        }else if(manpowers[a].role === 'Loader'){
            loaders.push(manpowers[a])
        }
    }
    
    const initFetch = useCallback(()=>{
        dispatch(getAllManpowers())
        dispatch(getAllAreas())
        dispatch(getAllTrucks())
        dispatch(reset())
    },[dispatch])

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            toast.success("Schedule has been created")
            navigate('/schedule/list')
        }        
        initFetch()
    }, [isError, isSuccess, message, navigate, dispatch, initFetch]) 

    const onChangeSchedule = (e) => {
        setScheduleData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })) 
    }
    const saveSchedule = (e) => {
        e.preventDefault()
        var scheduleData = {
            scheduleDate,
            scheduleTime,
            areaId,            
            truckId,
            driverId,
            loaderId,
            status,
        }
        if(location.type === 'edit'){
            scheduleData['id'] = locScheduleId
            dispatch(updateSchedule({scheduleData}))
        }else{
            dispatch(createSchedule({scheduleData}))
        }
    }

    if(isLoading){
        return <Spinner />
    }
    
  return (
    <Box component="form"  onSubmit={saveSchedule}  noValidate sx={{ m: 1}}>
        <Stack spacing={2}>
            <LocalizationProvider dateAdapter={AdapterMoment} >
                <DatePicker
                disabled readOnly
                onChange={(newValue)=>{
                    setScheduleData((prevState) => ({
                        ...prevState,
                        [`scheduleDate`]: newValue.toDate()
                    }))
                }}
                value={scheduleDate}
                label="Schedule Date"
                views={['year', 'month', 'day']}            
                renderInput={(params) => <TextField {...params} fullWidth />}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                    label="Schedule Time"
                    value={scheduleTime}
                    onChange={(newValue)=>{
                        setScheduleData((prevState) => ({
                            ...prevState,
                            [`scheduleTime`]: newValue
                        }))
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth/>}
                />
            </LocalizationProvider>
            <FormControl>
                <InputLabel id="areaLabel">Area</InputLabel>
                <Select labelId="areaLabel" id="areaId" name="areaId" value={areaId} label="Area" onChange={onChangeSchedule} inputProps={{ readOnly: true }}>
                    {areas.map(( {id, areaCode}, index) =>  <MenuItem key={index} value={id}>{areaCode}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="truckLabel">Truck</InputLabel>
                <Select labelId="truckLabel" id="truckId" name="truckId" value={truckId} label="Truck" onChange={onChangeSchedule}>
                    {trucks.map(( {id, truckNo}, index) =>  <MenuItem key={index} value={id}>{truckNo}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="driverLabel">Driver</InputLabel>
                <Select labelId="driverLabel" id="driverId" name="driverId" value={driverId} label="Driver" onChange={onChangeSchedule}>
                    {drivers.map(( {id, mpName}, index) =>  <MenuItem key={index} value={id}>{mpName}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="manpowerLabel">Loaders</InputLabel>
                <Select labelId="manpowerLabel" id="loaderId" name="loaderId" value={loaderId} input={<OutlinedInput label="Name" />} onChange={onChangeSchedule} multiple >
                    {loaders.map(( {id, mpName}, index) =>  <MenuItem key={index} value={id}>{mpName}</MenuItem>)}
                </Select>
            </FormControl>
        </Stack>
        <Box m={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Button type="submit" variant="contained" color="primary" size="large">Submit</Button>
        </Box>
    </Box>
  )
}

export default Schedule
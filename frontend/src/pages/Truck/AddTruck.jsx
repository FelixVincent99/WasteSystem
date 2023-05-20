import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import{ createTruck, reset } from '../../features/truck/truckSlice'
import sensorService from '../../features/sensor/sensorService';
import Spinner from '../../components/Spinner'
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Box, Stack } from '@mui/system'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import "./Truck.css";

function AddTruck() {

    const initialTruckState = {
        truckNo: "",
        operationStartDate: new Date(),
        operationEndDate: new Date(),
        truckType: "",
        averageFuelConsumption: 0,
        milage: "",
        sensorId: "",
        status: "1"
    }
    const [truckData, setTruckData] = useState(initialTruckState)
    const [sensorData, setSensorData] = useState([])
    const {truckNo, operationStartDate, operationEndDate, truckType, averageFuelConsumption, milage, sensorId, status} = truckData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isError, isLoading, isSuccess, message} = useSelector(state => state.trucks);

    const getSensor = () => {
        sensorService.getAll()
          .then(response => {
            setSensorData(response);
          })
          .catch(e => {
            console.log(e);
          });
      }

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            toast.success("Truck has been created")
            navigate('/truck/list')
        }

        dispatch(reset())
        getSensor()
    }, [isError, isSuccess, message, navigate, dispatch]) 

    const onChangeTruck = (e) => {
        setTruckData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })) 
    }

    const saveTruck = (e) => {
        e.preventDefault();
        const truckData = {
            truckNo,
            operationStartDate,
            operationEndDate,
            truckType,
            averageFuelConsumption,
            milage,
            sensorId,
            status
        }
        dispatch(createTruck({truckData}))
    }

    if(isLoading){
        return <Spinner />
    }
  return (
    <Box component="form"  onSubmit={saveTruck}  noValidate sx={{ m: 1 }}>
        <Stack spacing={2}>
            <TextField id="truckNo" name="truckNo" value={truckNo} onChange={onChangeTruck} label="Truck No" variant="outlined" required fullWidth/>
            <LocalizationProvider dateAdapter={AdapterMoment} >
                <DatePicker            
                onChange={(newValue)=>{
                    setTruckData((prevState) => ({
                        ...prevState,
                        [`operationStartDate`]: newValue.toDate()  
                    }))
                }}
                inputFormat="DD/MM/YYYY"
                value={operationStartDate}
                label="Operation Start Date"
                views={['year', 'month', 'day']}            
                renderInput={(params) => <TextField {...params} fullWidth/>}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker            
                onChange={(newValue)=>{
                    setTruckData((prevState) => ({
                        ...prevState,
                        [`operationEndDate`]: newValue.toDate()  
                    }))
                }}
                inputFormat="DD/MM/YYYY"
                value={operationEndDate}
                label="Operation End Date"
                views={['year', 'month', 'day']}            
                renderInput={(params) => <TextField {...params} fullWidth/>}
                />
            </LocalizationProvider>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="truckTypeLabel">Truck Type</InputLabel>
                <Select labelId="truckTypeLabel" id="truckType" name="truckType" value={truckType} label="Truck Type" onChange={onChangeTruck}>
                    <MenuItem value="1">Compactor Truck</MenuItem>
                    <MenuItem value="2">RoRo Truck</MenuItem>
                    <MenuItem value="3">Prime Mover</MenuItem>
                </Select>
            </FormControl>
            <TextField id="milage" name="milage" value={milage} onChange={onChangeTruck} label="Milage" variant="outlined" fullWidth/>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="sensorIdLabel">Sensor Color</InputLabel>
                <Select labelId="sensorIdLabel" id="sensorId" name="sensorId" value={truckData.sensorId} label="Sensor Color" onChange={onChangeTruck}>
                    {sensorData.map(( {id, color, note}, index) =>  <MenuItem key={index} value={id}><span className="dot" style={{backgroundColor: color}}></span> {color} - {note}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="statusLabel">Status</InputLabel>
                <Select labelId="statusLabel" id="status" name="status" value={status} label="Status" onChange={onChangeTruck}>
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="2">Temporarily Unavailable</MenuItem>
                    <MenuItem value="3">Inactive</MenuItem>
                </Select>
            </FormControl>
        </Stack>
        <Box m={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Button type="submit" variant="contained" color="primary" size="large">Submit</Button>
        </Box>
    </Box>
  )
}

export default AddTruck
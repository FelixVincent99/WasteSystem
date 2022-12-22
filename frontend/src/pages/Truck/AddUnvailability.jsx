import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Box, Stack } from '@mui/system'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import { reset, getAllTrucks, createTruckUnavailability } from '../../features/truck/truckSlice'
import Spinner from '../../components/Spinner'

function AddUnavailability() {
    const initialUnavailabilityState = {        
        truckId: "",
        unavailabilityStartDate: new Date(),
        unavailabilityEndDate: new Date(),
        status: "1"
    }
    const [unavailabilityData, setUnavailabilityData] = useState(initialUnavailabilityState)
    const { truckId, unavailabilityStartDate, unavailabilityEndDate, status} = unavailabilityData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isError, isLoading, isSuccess, message} = useSelector(state => state.trucks);
    const trucks = useSelector(state => state.trucks.trucks)
    console.log(trucks)
    
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            toast.success("Truck Unavailability has been created")
            navigate('/truck/unavailability/list')
        }

        dispatch(getAllTrucks())
        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch]) 

    const onChangeUnavailability = (e) => {
        setUnavailabilityData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })) 
    }

    const saveUnavailability = (e) => {
        e.preventDefault();
        const unavailabilityData = {
            truckId,
            unavailabilityStartDate,
            unavailabilityEndDate,
            status
        }       
        dispatch(createTruckUnavailability({unavailabilityData}))
    }

    if(isLoading){
        return <Spinner />
    }    
  return (
    <Box component="form"  onSubmit={saveUnavailability}  noValidate sx={{ m: 1 }}>
        <Stack spacing={2}>
            <FormControl>
                <InputLabel id="truckLabel">Truck</InputLabel>
                <Select labelId="truckLabel" id="truckId" name="truckId" value={truckId} label="Truck" onChange={onChangeUnavailability}>
                    {trucks.map(( {id, truckNo}, index) =>  <MenuItem key={index} value={id}>{truckNo}</MenuItem>)}
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterMoment} >
                <DatePicker            
                onChange={(newValue)=>{
                    setUnavailabilityData((prevState) => ({
                        ...prevState,
                        [`unavailabilityStartDate`]: newValue.toDate()  
                    }))
                }}
                inputFormat="DD/MM/YYYY"
                value={unavailabilityStartDate}
                label="Unavailability Start Date"
                views={['year', 'month', 'day']}            
                renderInput={(params) => <TextField {...params} fullWidth/>}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker            
                onChange={(newValue)=>{
                    setUnavailabilityData((prevState) => ({
                        ...prevState,
                        [`unavailabilityEndDate`]: newValue.toDate()  
                    }))
                }}
                inputFormat="DD/MM/YYYY"
                value={unavailabilityEndDate}
                label="Unavailability End Date"
                views={['year', 'month', 'day']}            
                renderInput={(params) => <TextField {...params} fullWidth/>}
                />
            </LocalizationProvider>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="statusLabel">Status</InputLabel>
                <Select labelId="statusLabel" id="status" name="status" value={status} label="Status" onChange={onChangeUnavailability}>
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="2">Inactive</MenuItem>
                </Select>
            </FormControl>
        </Stack>
        <Box m={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Button type="submit" variant="contained" color="primary" size="large">Submit</Button>
        </Box>
    </Box>
  )
}

export default AddUnavailability
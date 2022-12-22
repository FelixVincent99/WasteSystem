import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
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

import Spinner from '../../components/Spinner'
import truckService from '../../features/truck/truckService'
import { updateTruckUnavailability, reset, getAllTrucks } from '../../features/truck/truckSlice'


function Unavailability() {
    const params = useParams();

    const initialUnavailabilityState = {        
        truckId: "",
        unavailabilityStartDate: new Date(),
        unavailabilityEndDate: new Date(),
        status: "1"
    }
    const [unavailabilityData, setUnavailabilityData] = useState(initialUnavailabilityState)    
    const {isError, isLoading, isSuccess, message} = useSelector(state => state.trucks);
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const getUnavailability = id => {        
        truckService.getUnavailability(id)
        .then(response => {
            setUnavailabilityData(response)            
        })
        .catch(e => {
            console.log(e);
        });
    };
    const trucks = useSelector(state => state.trucks.trucks)
  
    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            toast.success("Unavailability has been updated")
            navigate('/truck/unavailability/list')
        }
        dispatch(getAllTrucks())
        dispatch(reset())
        getUnavailability(params.id)
    }, [params.id, isError, isSuccess, navigate, message, dispatch]);
  
    const onChangeUnavailability = (e) => {
        setUnavailabilityData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const saveUpdateUnavailability = (e) => {
        e.preventDefault()
        dispatch(updateTruckUnavailability({unavailabilityData}))
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <Box component="form" onSubmit={saveUpdateUnavailability} noValidate sx={{ m: 1 }}>            
            <Stack spacing={2}>
            <FormControl>
                <InputLabel id="truckLabel">Truck</InputLabel>
                <Select labelId="truckLabel" id="truckId" name="truckId" value={unavailabilityData.truckId} label="Truck" onChange={onChangeUnavailability}>
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
                value={unavailabilityData.unavailabilityStartDate}
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
                value={unavailabilityData.unavailabilityEndDate}
                label="Unavailability End Date"
                views={['year', 'month', 'day']}            
                renderInput={(params) => <TextField {...params} fullWidth/>}
                />
            </LocalizationProvider>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="statusLabel">Status</InputLabel>
                <Select labelId="statusLabel" id="status" name="status" value={unavailabilityData.status} label="Status" onChange={onChangeUnavailability}>
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="2">Inactive</MenuItem>
                </Select>
            </FormControl>
            </Stack>
            <Box m={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Button type="submit" variant="contained" color="primary" size="large">Update</Button>
            </Box>
        </Box>        
    )
}

export default Unavailability
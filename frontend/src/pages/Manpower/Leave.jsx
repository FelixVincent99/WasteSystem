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
import OutlinedInput from '@mui/material/OutlinedInput';

import Spinner from '../../components/Spinner'
import manpowerService from '../../features/manpower/manpowerService';
import { updateLeave, reset, getAllManpowers } from '../../features/manpower/manpowerSlice'


function Leave() {
    const params = useParams();

    const initialLeaveState = {        
        manpowerId: "",
        leaveStartDate: new Date(),
        leaveEndDate: new Date(),
        status: "1"
    }
    const [leaveData, setLeaveData] = useState(initialLeaveState)    
    const {isError, isLoading, isSuccess, message} = useSelector(state => state.manpowers);
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const getLeave = id => {        
        manpowerService.getLeave(id)
        .then(response => {
            setLeaveData(response)            
        })
        .catch(e => {
            console.log(e);
        });
    };
    const manpowers = useSelector(state => state.manpowers.manpowers)
  
    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            toast.success("Leave has been updated")
            navigate('/manpower/leave/list')
        }
        dispatch(getAllManpowers())
        dispatch(reset())
        getLeave(params.id)
    }, [params.id, isError, isSuccess, navigate, message, dispatch]);
  
    const onChangeLeave = (e) => {
        setLeaveData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const saveUpdateLeave = (e) => {
        e.preventDefault()
        dispatch(updateLeave({leaveData}))
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <Box component="form" onSubmit={saveUpdateLeave} noValidate sx={{ m: 1 }}>            
            <Stack spacing={2}>
            <FormControl>
                <InputLabel id="manpowerLabel">Name</InputLabel>
                <Select labelId="manpowerLabel" id="manpowerId" name="manpowerId" value={leaveData.manpowerId} input={<OutlinedInput label="Name" />} onChange={onChangeLeave} >
                    {manpowers.map(( {id, mpName}, index) =>  <MenuItem key={index} value={id} >{mpName}</MenuItem>)}
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterMoment} >
                <DatePicker            
                onChange={(newValue)=>{
                    setLeaveData((prevState) => ({
                        ...prevState,
                        [`leaveStartDate`]: newValue.toDate()  
                    }))
                }}
                value={leaveData.leaveStartDate}
                inputFormat="DD/MM/YYYY"
                label="Leave Start Date"
                views={['year', 'month', 'day']}            
                renderInput={(params) => <TextField {...params} fullWidth/>}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker            
                onChange={(newValue)=>{
                    setLeaveData((prevState) => ({
                        ...prevState,
                        [`leaveEndDate`]: newValue.toDate()  
                    }))
                }}
                value={leaveData.leaveEndDate}
                inputFormat="DD/MM/YYYY"
                label="Leave End Date"
                views={['year', 'month', 'day']}            
                renderInput={(params) => <TextField {...params} fullWidth/>}
                />
            </LocalizationProvider>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="statusLabel">Status</InputLabel>
                <Select labelId="statusLabel" id="status" name="status" value={leaveData.status} label="Status" onChange={onChangeLeave}>
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

export default Leave
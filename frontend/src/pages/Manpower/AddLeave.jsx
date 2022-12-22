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
import OutlinedInput from '@mui/material/OutlinedInput';

import { createLeave, reset, getAllManpowers } from '../../features/manpower/manpowerSlice'
import Spinner from '../../components/Spinner'

function AddLeave() {
    const initialLeaveState = {        
        manpowerId: "",
        leaveStartDate: new Date(),
        leaveEndDate: new Date(),
        status: "1"
    }
    const [leaveData, setLeaveData] = useState(initialLeaveState)
    const { manpowerId, leaveStartDate, leaveEndDate, status} = leaveData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isError, isLoading, isSuccess, message} = useSelector(state => state.manpowers);
    const manpowers = useSelector(state => state.manpowers.manpowers)
    
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            toast.success("Leave has been created")
            navigate('/manpower/leave/list')
        }

        dispatch(getAllManpowers())
        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch]) 

    const onChangeLeave = (e) => {
        setLeaveData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })) 
    }

    const saveLeave = (e) => {
        e.preventDefault();
        const leaveData = {
            manpowerId,
            leaveStartDate,
            leaveEndDate,
            status
        }       
        dispatch(createLeave({leaveData}))
    }

    if(isLoading){
        return <Spinner />
    }    
  return (
    <Box component="form"  onSubmit={saveLeave}  noValidate sx={{ m: 1 }}>
        <Stack spacing={2}>
            <FormControl>
                <InputLabel id="manpowerLabel">Name</InputLabel>
                <Select labelId="manpowerLabel" id="manpowerId" name="manpowerId" value={manpowerId} input={<OutlinedInput label="Name" />} onChange={onChangeLeave} >
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
                inputFormat="DD/MM/YYYY"
                value={leaveStartDate}
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
                inputFormat="DD/MM/YYYY"
                value={leaveEndDate}
                label="Leave End Date"
                views={['year', 'month', 'day']}            
                renderInput={(params) => <TextField {...params} fullWidth/>}
                />
            </LocalizationProvider>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="statusLabel">Status</InputLabel>
                <Select labelId="statusLabel" id="status" name="status" value={status} label="Status" onChange={onChangeLeave}>
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

export default AddLeave
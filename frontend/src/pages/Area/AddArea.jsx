import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Box, Stack } from '@mui/system'
import { TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'

import { createArea, reset } from '../../features/area/areaSlice'
import Spinner from '../../components/Spinner'

function AddArea() {
    
    const initialState = {
        areaCode: "",        
        status: "1",
    }

    const [areaData, setAreaData] = useState(initialState)
    const {areaCode, status} = areaData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isError, isLoading, isSuccess, message} = useSelector(state => state.areas);

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            toast.success("Area has been created")
            navigate('/area/list')
        }
        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch])

    const onChangeArea = (e) => {
        setAreaData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const saveArea = (e) => {
        e.preventDefault()
        const areaData = {
            areaCode,
            status
        }
        dispatch(createArea({areaData}))
    }

    if(isLoading){
        return <Spinner />
    }

  return (
    <Box component="form" onSubmit={saveArea} noValidate sx={{ m: 1}}>
        <Stack spacing={2}>
            <TextField id="areaCode" name="areaCode" value={areaCode} onChange={onChangeArea} label="Area Code" variant="outlined" required fullWidth />
            <FormControl sx={{ m: 1, minWidth: 120}}>
                <InputLabel id="statusLabel">Status</InputLabel>
                <Select labelId="statusLabel" id="status" name="status" value={status} onChange={onChangeArea}>
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

export default AddArea
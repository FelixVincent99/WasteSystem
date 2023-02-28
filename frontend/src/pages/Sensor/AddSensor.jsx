import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'
import { TextField } from '@mui/material'
import { Box, Stack } from '@mui/system'
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button'
import { SketchPicker } from 'react-color';

import{ createSensor, reset } from '../../features/sensor/sensorSlice'


function AddSensor() {

    const initialSensorState = {
        color: "",
        note: ""
    }
    const [sensorData, setSensorData] = useState(initialSensorState)
    const {color, note} = sensorData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isError, isLoading, isSuccess, message} = useSelector(state => state.sensors);

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            toast.success("Sensor has been created")
            navigate('/sensor/list')
        }

        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch]) 

    const onChangeSensor = (e) => {
        setSensorData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })) 
    }

    const saveSensor = (e) => {
        e.preventDefault();
        const sensorData = {
            color,
            note
        }
        dispatch(createSensor({sensorData}))
    }

    const colorPickerChange = (color) => {
      setSensorData((prevState) => ({
        ...prevState,
        color: color.hex  
      }));
    };

    if(isLoading){
        return <Spinner />
    }
  return (
    <Box component="form"  onSubmit={saveSensor}  noValidate sx={{ m: 1 }}>
        <Stack spacing={2}>
        <SketchPicker
            color={ sensorData.color }
            onChangeComplete={ colorPickerChange }
        />
        <TextField id="color" name="color" 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span className="dot" style={{backgroundColor: sensorData.color}}></span>
                  </InputAdornment>
                ),
              }}
              value={sensorData.color} onChange={onChangeSensor} label="Color & Color Code" variant="outlined" required fullWidth/>
            <TextField id="note" name="note" value={sensorData.note} onChange={onChangeSensor} label="Note" variant="outlined" fullWidth/>
        </Stack>
        <Box m={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Button type="submit" variant="contained" color="primary" size="large">Submit</Button>
        </Box>
    </Box>
  )
}

export default AddSensor
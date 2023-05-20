import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { TextField } from '@mui/material'
import { Box, Stack } from '@mui/system'
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button'
import "./Sensor.css";
import Spinner from '../../components/Spinner'
import { SketchPicker } from 'react-color';

import sensorService from '../../features/sensor/sensorService';
import { updateSensor, reset } from '../../features/sensor/sensorSlice'

function Sensor() {
    const params = useParams();

    const initialSensorState = {
        color: "",
        note: ""
    }
    const [sensorData, setSensorData] = useState(initialSensorState)    
    const {isError, isLoading, isSuccess, message} = useSelector(state => state.sensors);
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const getSensor = id => {        
        sensorService.get(id)
        .then(response => {
            setSensorData(response)
        })
        .catch(e => {
            console.log(e);
        });
    };
  
    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            toast.success("Sensor has been updated")
            navigate('/sensor/list')
        }
        dispatch(reset())
        getSensor(params.id)
    }, [params.id, isError, isSuccess, navigate, message, dispatch]);
  
    const onChangeSensor = (e) => {
        setSensorData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const saveUpdateSensor = (e) => {
        e.preventDefault()
        dispatch(updateSensor({sensorData}))
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
        <Box component="form" onSubmit={saveUpdateSensor} noValidate sx={{ m: 1 }}>            
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
                <Button type="submit" variant="contained" color="primary" size="large">Update</Button>
            </Box>
        </Box>        
    )
}

export default Sensor
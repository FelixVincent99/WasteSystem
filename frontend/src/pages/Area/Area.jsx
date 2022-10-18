import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { TextField } from '@mui/material'
import { Box, Stack } from '@mui/system'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'


import { updateArea, reset } from '../../features/area/areaSlice'
import areaService from '../../features/area/areaService'
import Spinner from '../../components/Spinner'

function Area() {

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialAreaState ={
    areaCode: "",
    status: "1",
  }

  const [areaData, setAreaData] = useState(initialAreaState)
  const {isError, isLoading, isSuccess, message} = useSelector(state => state.areas)

  const getArea = id => {
    areaService.get(id)
    .then(response => {
      setAreaData(response)
    })
    .catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    if(isError){
        toast.error(message)
    }
    if(isSuccess){
        toast.success("Area has been updated")
        navigate('/arealist')
    }
    dispatch(reset())
    getArea(params.id)    
  }, [isError, isSuccess, navigate, dispatch, params.id, message])

  const onChangeArea = (e) => {
    setAreaData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const saveUpdateArea = (e) => {
    e.preventDefault()
    dispatch(updateArea({areaData}))
  }

  if(isLoading){
    return <Spinner />
  }
  
  return (
    <Box component="form" onSubmit={saveUpdateArea} noValidate sx={{ m: 1 }}>
      <Stack spacing={2}>
        <TextField id="areaCode" name="areaCode" value={areaData.areaCode} onChange={onChangeArea} label="Area Code" variant="outlined" required fullWidth/>
        <FormControl sx={{ m: 1, minWidth: 120}}>
          <InputLabel id="statusLabel">Status</InputLabel>
          <Select labelId="statusLabel" id="status" name="status" value={areaData.status} label="Status" onChange={onChangeArea}>
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="2">Temporarily Unavailable</MenuItem>
              <MenuItem value="3">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Box m={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
          <Button type="submit" variant="contained" color="primary" size="large">Update</Button>
      </Box>
    </Box>
  )
}

export default Area
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
import Divider from '@mui/material/Divider'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'


import { updateArea, reset } from '../../features/area/areaSlice'
import Spinner from '../../components/Spinner'
import areaService from '../../features/area/areaService'
import manpowerService from '../../features/manpower/manpowerService';
import truckService from '../../features/truck/truckService';

function Area() {

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialAreaState ={
    areaCode: "",
    status: "1",
    defaultTruckId: "",
    defaultDriverId: "",
    loaders: [],
    cf: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday:false,
      saturday:false,
      sunday:false
    }
  }

  const [areaData, setAreaData] = useState(initialAreaState)  
  const [trucks, setTrucksData] = useState([])
  const [drivers, setDriversData] = useState([])
  const [loaders, setLoadersData] = useState([])
  const {isError, isLoading, isSuccess, message} = useSelector(state => state.areas)

  const getArea = (id) => {
    areaService.get(id)
    .then(response => {
      setAreaData(response)
      initialGenerateResource(response)
      console.log(response)
    })
    .catch(e => {
      console.log(e);
    });
  }

  useEffect(() => {
    if(isError){
        toast.error(message)
    }
    if(isSuccess){
        toast.success("Area has been updated")
        navigate('/area/list')
    }
    dispatch(reset())
    getArea(params.id)
    
  }, [params.id, isError, isSuccess, navigate, message, dispatch])

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

  const onChangeCF = (e) => {
    setAreaData((prevState) => ({
      ...prevState,
      cf: {
        ...prevState.cf,
        [e.target.name]: e.target.checked,
      },
      defaultTruckId: "",
      defaultDriverId: "",
      loaders: []
    }))
    setTrucksData([])
    setDriversData([])
    setLoadersData([])
  };

  const initialGenerateResource = (data) => {

    if(!(data.cf.monday === false && data.cf.tuesday === false && data.cf.wednesday === false && data.cf.thursday === false && data.cf.friday === false && data.cf.saturday === false && data.cf.sunday === false)){
      manpowerService.getDefaultAvailableDrivers(data)
      .then(response => {
        setDriversData(response)
      })
      .catch(e => {
        setDriversData([])
      });

      manpowerService.getDefaultAvailableLoaders(data)
      .then(response => {
        setLoadersData(response)
      })
      .catch(e => {
        setLoadersData([])
        console.log(e);
      });

      truckService.getDefaultAvailableTrucks(data)
      .then(response => {
        setTrucksData(response)
      })
      .catch(e => {
        setTrucksData([])
        console.log(e);
      });
    }
  }  

  const generateResouceData = () => {    
    if(areaData.cf.monday === false && areaData.cf.tuesday === false && areaData.cf.wednesday === false && areaData.cf.thursday === false && areaData.cf.friday === false && areaData.cf.saturday === false && areaData.cf.sunday === false){      
      toast.error("Please do not leave Collection Frequency blank")
    }else{
      setAreaData({
          ...areaData,
          defaultTruckId: "",
          defaultDriverId: "",
          loaders: [],
      })

      manpowerService.getDefaultAvailableDrivers(areaData)
      .then(response => {
          setDriversData(response)
      })
      .catch(e => {
          setDriversData([])
          console.log(e);
      });

      manpowerService.getDefaultAvailableLoaders(areaData)
      .then(response => {
          setLoadersData(response)
      })
      .catch(e => {
          setLoadersData([])
          console.log(e);
      });

      truckService.getDefaultAvailableTrucks(areaData)
      .then(response => {
          setTrucksData(response)
      })
      .catch(e => {
          setTrucksData([])
          console.log(e);
      });
      toast.success("Default data has been fetched")
    }
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
        <Divider variant="middle" />
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Collection Frequency</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={
                    <Checkbox onChange={onChangeCF} name="monday" checked={areaData.cf.monday}/>
                    }
                    label="Monday"
                />
                <FormControlLabel
                    control={
                    <Checkbox onChange={onChangeCF} name="tuesday" checked={areaData.cf.tuesday}/>
                    }
                    label="Tuesday"
                />
                <FormControlLabel
                    control={
                    <Checkbox onChange={onChangeCF} name="wednesday" checked={areaData.cf.wednesday}/>
                    }
                    label="Wednesday"
                />
                <FormControlLabel
                    control={
                    <Checkbox onChange={onChangeCF} name="thursday" checked={areaData.cf.thursday}/>
                    }
                    label="Thursday"
                />
                <FormControlLabel
                    control={
                    <Checkbox onChange={onChangeCF} name="friday" checked={areaData.cf.friday}/>
                    }
                    label="Friday"
                />
                <FormControlLabel
                    control={
                    <Checkbox onChange={onChangeCF} name="saturday" checked={areaData.cf.saturday}/>
                    }
                    label="Saturday"
                />
                <FormControlLabel
                    control={
                    <Checkbox onChange={onChangeCF} name="sunday" checked={areaData.cf.sunday}/>
                    }
                    label="Sunday"
                />
            </FormGroup>
        </FormControl>
        <Box m={2} display="flex" justifyContent="flex-start" alignItems="flex-start">
            <Button variant="contained" color="primary" size="large" onClick={generateResouceData}>Generate</Button>
        </Box>
        <Divider variant="middle" />
        <FormControl>
            <InputLabel id="defaultTruckLabel">Default Schedule Truck</InputLabel>
            <Select labelId="defaultTruckLabel" id="defaultTruckId" name="defaultTruckId" value={areaData.defaultTruckId} label="Truck" onChange={onChangeArea}>
                {trucks.map(( {id, truckNo}, index) =>  <MenuItem key={index} value={id} >{truckNo}</MenuItem>)}
            </Select>
        </FormControl>
        <FormControl>
            <InputLabel id="defaultDriverLabel">Default Schedule Driver</InputLabel>
            <Select labelId="defaultDriverLabel" id="defaultDriverId" name="defaultDriverId" value={areaData.defaultDriverId} label="Driver" onChange={onChangeArea}>
                {drivers.map(( {id, mpName}, index) =>  <MenuItem key={index} value={id} >{mpName}</MenuItem>)}
            </Select>
        </FormControl>
        <FormControl>
            <InputLabel id="defaultLoadersLabel">Default Schedule Loaders</InputLabel>
            <Select labelId="defaultLoadersLabel" id="defaultLoadersId" name="loaders" value={areaData.loaders} input={<OutlinedInput label="Name" />} onChange={onChangeArea} multiple >
                {loaders.map(( {id, mpName}, index) =>  <MenuItem key={index} value={id} >{mpName}</MenuItem>)}
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
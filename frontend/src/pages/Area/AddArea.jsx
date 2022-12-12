import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Box, Stack } from '@mui/system'
import { TextField } from '@mui/material'
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

import { createArea, reset } from '../../features/area/areaSlice'
import Spinner from '../../components/Spinner'
import manpowerService from '../../features/manpower/manpowerService';
import truckService from '../../features/truck/truckService';


function AddArea() {
    
    const initialState = {
        areaCode: "",        
        status: "1",
        defaultTruckId: "",
        defaultDriverId: "",
        defaultLoadersId: [],
    }

    const cfState = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    }

    const [areaData, setAreaData] = useState(initialState)
    const [cfData, setCfData] = useState(cfState);
    const {areaCode, status, defaultTruckId, defaultDriverId, defaultLoadersId} = areaData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isError, isLoading, isSuccess, message} = useSelector(state => state.areas);

    const [trucks, setTrucksData] = useState([])
    const [drivers, setDriversData] = useState([])
    const [loaders, setLoadersData] = useState([])

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

    const onChangeCF = (event) => {
        setCfData({
          ...cfData,
          [event.target.name]: event.target.checked,
        })
        setTrucksData([])
        setDriversData([])
        setLoadersData([])
    };

    const generateResouceData = () => {
        if(cfData.monday === false && cfData.tuesday === false && cfData.wednesday === false && cfData.thursday === false && cfData.friday === false && cfData.saturday === false && cfData.sunday === false){
            toast.error("Please do not leave Collection Frequency blank")
        }else{
            setAreaData({
                ...areaData,
                defaultDriverId: "",
                defaultTruckId: "",
                defaultLoadersId: []
            })

            manpowerService.getDefaultAvailableDrivers({'cf': cfData})
            .then(response => {                
                setDriversData(response)
            })
            .catch(e => {
                setDriversData([])
                console.log(e);
            });

            manpowerService.getDefaultAvailableLoaders({'cf': cfData})
            .then(response => {
                console.log(response)
                setLoadersData(response)
            })
            .catch(e => {
                setLoadersData([])
                console.log(e);
            });

            truckService.getDefaultAvailableTrucks({'cf': cfData})
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

    const saveArea = (e) => {
        e.preventDefault()
        const areaData = {
            areaCode,
            status,
            cfData,
            defaultTruckId,
            defaultDriverId,
            defaultLoadersId
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
            <Divider variant="middle" />
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Collection Frequency</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                        <Checkbox onChange={onChangeCF} name="monday" />
                        }
                        label="Monday"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox onChange={onChangeCF} name="tuesday" />
                        }
                        label="Tuesday"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox onChange={onChangeCF} name="wednesday" />
                        }
                        label="Wednesday"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox onChange={onChangeCF} name="thursday" />
                        }
                        label="Thursday"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox onChange={onChangeCF} name="friday" />
                        }
                        label="Friday"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox onChange={onChangeCF} name="saturday" />
                        }
                        label="Saturday"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox onChange={onChangeCF} name="sunday" />
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
                <Select labelId="defaultTruckLabel" id="defaultTruckId" name="defaultTruckId" value={defaultTruckId} label="Truck" onChange={onChangeArea}>
                    {trucks.map(( {id, truckNo, disabled}, index) =>  <MenuItem key={index} value={id} disabled={disabled}>{truckNo}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="defaultDriverLabel">Default Schedule Driver</InputLabel>
                <Select labelId="defaultDriverLabel" id="defaultDriverId" name="defaultDriverId" value={defaultDriverId} label="Driver" onChange={onChangeArea}>
                    {drivers.map(( {id, mpName, disabled}, index) =>  <MenuItem key={index} value={id} disabled={disabled}>{mpName}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="defaultLoadersLabel">Default Schedule Loaders</InputLabel>
                <Select labelId="defaultLoadersLabel" id="defaultLoadersId" name="defaultLoadersId" value={defaultLoadersId} input={<OutlinedInput label="Name" />} onChange={onChangeArea} multiple >
                    {loaders.map(( {id, mpName, disabled}, index) =>  <MenuItem key={index} value={id} disabled={disabled}>{mpName}</MenuItem>)}
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
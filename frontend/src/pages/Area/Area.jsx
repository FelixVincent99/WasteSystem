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
import { createStop, updateStop } from '../../features/stop/stopSlice';
import stopService from '../../features/stop/stopService';

import { Grid, Card, CardHeader, CardContent } from '@mui/material';
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { DataGrid } from '@mui/x-data-grid'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import "./Area.css";

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
  const [openDialog, setOpenDialog] = React.useState(false);

  const initialStopState = {
    stopName: "",        
    lat: "",
    long: "",
    areaCode: "",
    stopOrder: 0,
    binAmount: 0,
    averageWeight: 0,
    status: 1
}
  const [stopData, setStopData] = useState(initialStopState)
  const [stopList, setStopList] = useState([])
  const [defaultCenterMap, setDefaultCenterMap] = useState({ lat: 1.4847902, lng: 110.3600244 })
  const {stopName, lat, long} = stopData;
  const [isEditStop, setIsEditStop] = useState(false)

  const onChangeStop = (e) => {
    setStopData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
}

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

  const getArea = (id) => {
    areaService.get(id)
    .then(response => {
      setAreaData(response)
      stopService.getStopsAreaCode(response.areaCode).then(stopList => {
        setStopList(stopList)
        if(stopList.length !== 0){
          setDefaultCenterMap({ lat: stopList[0].lat, lng: stopList[0].long });
        }
      });
      
      initialGenerateResource(response)
      // console.log(response)
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

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <Spinner />;

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

  //stops
  const renderDetailsButton = (params) => {
      return(
          <strong>
              <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginLeft: 5 }}
                  onClick={() => {
                  handleEditClick(params)
                  }}
              >
                  Edit
              </Button>
              <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  style={{ marginLeft: 5 }}
                  onClick={() => {
                  handleEditClick(params)
                  }}
              >
                  Move
              </Button>
          </strong>
      )
  }

  const handleEditClick = (params) => {
    setStopData(params.row);
    setOpenDialog(true);
    setIsEditStop(true);
  }

  const rows = stopList;
  const columns = [
    {
        field: 'stopOrder',
        headerName: 'No',
        flex: 0.1
    },
    {
        field: 'stopName',
        headerName: 'Stop Name',
        flex: 0.4
    },
    {
        field: 'averageWeight',
        headerName: 'Average Weight',
        flex: 0.2
    },
    {
        field: 'action',
        headerName: 'Action',
        flex: 0.3,
        headerAlign: 'center',
        align: 'center',
        renderCell: renderDetailsButton,
        disableClickEventBubbling: true
    },
  ]

  const handleClickOpen = () => {
    setOpenDialog(true);
    setIsEditStop(false);
    setStopData(initialStopState);
    setStopData((prevState) => ({ //set area code after get the data
        ...prevState,
        areaCode: areaData.areaCode
    }));
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSaveStop = () => {
    setOpenDialog(false);
    dispatch(createStop({stopData}));
    toast.success("Stop is added!");
    getArea(params.id)
  };

  const handleUpdateStop = () => {
    setOpenDialog(false);
    dispatch(updateStop({stopData}));
    toast.success("Stop is updated!");
    getArea(params.id)
  };

  const renderMarkers = (stopList) => {
    return stopList.map((data) => {
      return (
        <MarkerF
          key={data.id}
          title = { data.stopName }
          position={{ lat: data.lat, lng: data.long }}
        ></MarkerF>
      );
    });
  };

  const DialogButton = () => {
    if(!isEditStop){
      return (<Button onClick={handleSaveStop}>Save</Button>);
    }else{
      return (<Button onClick={handleUpdateStop}>Update</Button>)
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
      <Card variant="outlined">
        <CardHeader title={ areaData.areaCode + " Area's Stops"}/>
        <Grid container>
          <Grid item xs={6}>
            <GoogleMap
              zoom={15}
              center={defaultCenterMap}
              mapContainerClassName="map-container"
            >
              <div>{renderMarkers(stopList)}</div>
            </GoogleMap>  
          </Grid>
          <Grid item xs={6}>
            <CardContent>
              <Button sx={{ mb: 2 }} variant="contained" onClick={handleClickOpen}>Add Stop</Button>
              <div style={{ height: 400, width: '100%'}}>
                  <div style={{ display: 'flex', height: '100%'}}>
                      <div style={{ flexGrow: 1 }}>
                          <DataGrid 
                              rows={rows}
                              columns={columns}
                              // components={{ Toolbar: GridToolbar }}
                          />
                      </div>
                  </div>
              </div>
              <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Add Stop</DialogTitle>
                <DialogContent>
                  <TextField id="stopName" name="stopName" value={stopName} onChange={onChangeStop} label="Stop Name" variant="outlined" required fullWidth sx={{ my: 1}} />
                  <Grid container>
                    <Grid item xs={6}>
                      <TextField id="lat" name="lat" value={lat} onChange={onChangeStop} label="Latitiude" variant="outlined" required fullWidth sx={{ my: 1}} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField id="long" name="long" value={long} onChange={onChangeStop} label="Longitude" variant="outlined" required fullWidth sx={{ my: 1}} />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <DialogButton />
                </DialogActions>
              </Dialog>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default Area
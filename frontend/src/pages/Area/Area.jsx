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
import { SketchPicker } from 'react-color';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getAllAreas } from '../../features/area/areaSlice'
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
    },
    areaColor: ""
  }

  const [areaData, setAreaData] = useState(initialAreaState)
  const [trucks, setTrucksData] = useState([])
  const [drivers, setDriversData] = useState([])
  const [loaders, setLoadersData] = useState([])
  const {isError, isLoading, isSuccess, message} = useSelector(state => state.areas)
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openMoveDialog, setOpenMoveDialog] = React.useState(false);
  
  var areaList = useSelector(state => state.areas.areas)

  const initialStopState = {
    stopName: "",        
    lat: "",
    long: "",
    areaCode: "",
    newAreaCode: "",
    stopOrder: 0,
    binAmount: 0,
    averageWeight: 0,
    status: 1
}
  const [stopData, setStopData] = useState(initialStopState)
  const [stopList, setStopList] = useState([])
  const [defaultCenterMap, setDefaultCenterMap] = useState({ lat: 1.4847902, lng: 110.3600244 })
  const {stopName, lat, long, areaCode, newAreaCode} = stopData;
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
    dispatch(getAllAreas());
    
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
                  handleMoveClick(params)
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

  const handleMoveClick = (params) => {
    setStopData(params.row);
    setOpenMoveDialog(true);
    setIsEditStop(true);
    setStopData((prevState) => ({
      ...prevState,
      newAreaCode: params.row.areaCode
    }));
  }

  const handleMoveStop = () => {
    setOpenMoveDialog(false);
    var stop = {
      id: stopData.id,
      areaCode: stopData.newAreaCode
    }
    dispatch(updateStop({stopData: stop}));
    toast.success("Stop is moved!");
    getArea(params.id);
  };

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
    setOpenMoveDialog(false);
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
          onLoad={marker => {
            const customIcon = (opts) => Object.assign({
              // path: 'M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z',
              path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
              // path: 'M7.8,1.3L7.8,1.3C6-0.4,3.1-0.4,1.3,1.3c-1.8,1.7-1.8,4.6-0.1,6.3c0,0,0,0,0.1,0.1 l3.2,3.2l3.2-3.2C9.6,6,9.6,3.2,7.8,1.3C7.9,1.4,7.9,1.4,7.8,1.3z M4.6,5.8c-0.7,0-1.3-0.6-1.3-1.4c0-0.7,0.6-1.3,1.4-1.3 c0.7,0,1.3,0.6,1.3,1.3 C5.9,5.3,5.3,5.9,4.6,5.8z',
              fillColor: '#34495e',
              fillOpacity: 1,
              strokeColor: '#000',
              strokeWeight: 1,
              scale: 1,
            }, opts);

            marker.setIcon(customIcon({
              fillColor: areaData.areaColor,
              strokeColor: 'white'
            }));
          }}
        ></MarkerF>
      );
    });
  };

  const mapStyle = [
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ];

  const DialogButton = () => {
    if(!isEditStop){
      return (<Button onClick={handleSaveStop}>Save</Button>);
    }else{
      return (<Button onClick={handleUpdateStop}>Update</Button>)
    }
  }

  const colorPickerChange = (color) => {
    setAreaData((prevState) => ({
        ...prevState,
        areaColor: color.hex  
    }));
  };
  if(areaData.areaColor === null){
    setAreaData((prevState) => ({
      ...prevState,
      areaColor: ""
    }));
  }

  const handleSaveAreaColor = () => {
    var area = {
      id: areaData.id,
      areaCode: areaData.areaCode,
      areaColor: areaData.areaColor
    }
    areaService.update({areaData: area}).then(response => {
      toast.success("Marker Color is saved!");
    });
  };

  const GoogleMapMarker = () => {
    return (<div>{renderMarkers(stopList)}</div>);
  }

  const onClickAddMarker = (data) => {
    handleClickOpen();
    setStopData((prevState) => ({ //set area code after get the data
      ...prevState,
      lat: data.latLng.lat(),
      long: data.latLng.lng()
  }));
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
              options={{ styles: mapStyle}}
              onClick={onClickAddMarker}
            >
              <GoogleMapMarker /> 
            </GoogleMap>
          </Grid>
          <Grid item xs={6}>
            <Grid container sx={{px: 2}}>
              <Grid item xs={5}>
                <SketchPicker
                  color={ areaData.areaColor }
                  onChangeComplete={ colorPickerChange }
                />
              </Grid>
              <Grid item xs={7}>
                <Stack spacing={2}>
                  <TextField id="areaColor" name="areaColor" 
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <span className="dot" style={{backgroundColor: areaData.areaColor}}></span>
                        </InputAdornment>
                      ),
                    }}
                    value={areaData.areaColor} onChange={onChangeArea} label="Color for Marker" variant="outlined" required fullWidth/>
                    <Button variant="contained" color="secondary" onClick={handleSaveAreaColor}>Save Color</Button>
                  </Stack>
                </Grid>
            </Grid>
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
                  <TextField id="stopName" name="stopName" value={stopName} onChange={onChangeStop} label="Stop Name" variant="outlined" autoComplete="off" required fullWidth sx={{ my: 1}} />
                  <Grid container>
                    <Grid item xs={6}>
                      <TextField id="lat" name="lat" value={lat} onChange={onChangeStop} label="Latitiude" variant="outlined" autoComplete="off" required fullWidth sx={{ my: 1}} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField id="long" name="long" value={long} onChange={onChangeStop} label="Longitude" variant="outlined" autoComplete="off" required fullWidth sx={{ my: 1}} />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <DialogButton />
                </DialogActions>
              </Dialog>
              <Dialog open={openMoveDialog} onClose={handleClose}>
                <DialogTitle>Move Stop</DialogTitle>
                <DialogContent>
                  <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                    <Grid item xs={5}>
                      <TextField id="stopAreaCode" name="stopAreaCode" value={areaCode} label="Area Code" variant="outlined" fullWidth sx={{ my: 1}} disabled />
                    </Grid>
                    <Grid item xs={2}>
                      <h3> &darr; </h3>
                    </Grid>
                    <Grid item xs={5}>
                      <FormControl style={{minWidth: 210}} sx={{ my: 1}}>
                        <InputLabel id="newAreaCodeLabel">New Area Code</InputLabel>
                        <Select labelId="newAreaCodeLabel" id="newAreaCode" name="newAreaCode" value={newAreaCode} label="New Area Code" onChange={onChangeStop}>
                            {areaList.map(( {id, areaCode}, index) =>  <MenuItem key={index} value={areaCode} >{areaCode}</MenuItem>)}
                        </Select>
                    </FormControl>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleMoveStop}>Move</Button>
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
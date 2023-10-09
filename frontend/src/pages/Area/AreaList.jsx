import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAreas } from '../../features/area/areaSlice'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Button } from '@mui/material'

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import Spinner from '../../components/Spinner'
import { getAllStops } from '../../features/stop/stopSlice'

function AreaList() {

    var rawAreas = useSelector(state => state.areas.areas)
    var manpowers = useSelector(state => state.manpowers.manpowers)

    var stopList = useSelector(state => state.stops.stops)
    const defaultCenterMap = { lat: 1.5323021, lng: 110.3571732 } //swinburne coordinate

    var areas = rawAreas.map(area => {
        var myArea = Object.assign({}, area);
        myArea.defaultLoaders = []
        var defaultLoaders = myArea.defaultLoadersId === null ? "" : myArea.defaultLoadersId.split(",")
        
        for(var a=0; a<defaultLoaders.length; a++){
            if(defaultLoaders[a] !== ""){
                for(var b=0; b<manpowers.length; b++){
                    if(defaultLoaders[a] === manpowers[b].id){
                        myArea.defaultLoaders.push(manpowers[b])
                    }
                }
            }
        }
        return myArea
    })
    

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initFetch = useCallback(() => {
        dispatch(getAllAreas())
        dispatch(getAllStops())
    },[dispatch])

    useEffect(() => {
        initFetch()
    },[initFetch])

    const renderDetailsButton = (params) => {
        return(
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                    handleEditClick(params)
                    }}
                >
                    Edit
                </Button>
            </strong>
        )
    }

    const handleEditClick = (params) => {
        const path="/area/" + params.id
        navigate(path);
    }

    const rows = areas
    const columns = [
        {
            field: 'areaCode',
            headerName: 'Area Code',
            minWidth: 150,
            flex: 0.5
        },
        {
            field: 'cf',
            headerName: 'Collection Frequency',
            minWidth:200,
            flex: 1
        },
        {
            field: 'truckNo',
            headerName: 'Default Truck',
            minWidth:150,
            flex: 0.5
        },
        {
            field: 'driverName',
            headerName: 'Driver',
            minWidth:150,
            flex: 0.5
        },
        {
            field: 'loaders',
            headerName: 'Loaders',
            minWidth:150,
            flex: 0.5
        },
        {
            field: 'statusType',
            headerName: 'Status',
            minWidth:150,
            flex: 0.5
        },
        {
            field: 'updatedAtFormatted',
            headerName: 'Latest Update',
            minWidth:150,
            flex: 0.5
        },
        {
            field: 'action',
            headerName: 'Action',
            minWidth: 150,
            flex: 0.5,
            renderCell: renderDetailsButton,
            disableClickEventBubbling: true,
        },
    ]

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <Spinner />;

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

    const renderMarkers = (stopList) => {
        return stopList.map((data) => {
          return (
            <MarkerF
              key={data.id}
              title = { data.areaCode + ": " + data.stopName }
              position={{ lat: data.lat, lng: data.long }}
              onLoad={marker => {
                const customIcon = (opts) => Object.assign({
                  path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
                  fillColor: '#34495e',
                  fillOpacity: 1,
                  strokeColor: '#000',
                  strokeWeights: 1,
                  scale: 1,
                }, opts);
    
                marker.setIcon(customIcon({
                  fillColor: data.areaColor,
                  strokeColor: 'white'
                }));
              }}
            ></MarkerF>
          );
        });
    };
      

  return (
    <>
        <Button sx={{ my: 2 }} href="/area/add" variant="contained">Add Area</Button>
        <div style={{ height: 400, width: '100%'}}>
            <div style={{ display: 'flex', height: '100%'}}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                    />
                </div>
            </div>
        </div>
        <GoogleMap
              zoom={13}
              center={defaultCenterMap}
              mapContainerClassName="map-container"
              options={{ styles: mapStyle}}
            >
              <div>{renderMarkers(stopList)}</div>
            </GoogleMap>
    </>
  )
}

export default AreaList
import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbar, GridCellParams} from '@mui/x-data-grid'
import { Button } from '@mui/material'

import './Sensor.css'
import { getAllSensors } from '../../features/sensor/sensorSlice'
import { bgcolor, style } from "@mui/system"

function SensorList() {
  const sensors = useSelector(state => state.sensors.sensors)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initFetch = useCallback(()=>{
   dispatch(getAllSensors())
  },[dispatch])

  useEffect(()=>{
    initFetch()
  },[initFetch])  

  const renderDetailsButton = (params) => {
    return (
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

  const colorIcon = (params) => {
    return (
      <span className="dot" style={{backgroundColor: params.row.color}}></span>
    )
  }

  const handleEditClick = (params) => {
    const path="/sensor/" + params.id
    navigate(path);
  }  

  const rows = sensors
  const columns = [
    {
      field: 'id',
      headerName: 'Sensor ID',
      minWidth: 150,
      flex: 0.5

    },
    {
      field: '',
      headerName: 'Color',
      minWidth: 100,
      flex: 0.1,
      renderCell: colorIcon
    },
    {
      field: 'color',
      headerName: 'Color Code',
      minWidth:150,
      flex: 0.5,
    },
    {
      field: 'note',
      headerName: 'Note',
      minWidth:150,
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      minWidth: 150,
      flex: 1,
      renderCell: renderDetailsButton,
      disableClickEventBubbling: true,
    },
  ]


  return (
    <>
      <Button sx={{ my:2 }} href="/sensor/add" variant="contained">Add Sensor</Button>  
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
          <DataGrid 
            rows={rows} 
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
          </div>
        </div>
      </div>
    </>
  )
}

export default SensorList
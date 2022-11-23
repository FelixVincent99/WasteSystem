import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Button } from '@mui/material'

import { getAllTrucksUnavailability } from '../../features/truck/truckSlice'

function UnavailabilityList() {
    const unavailabilies = useSelector(state => state.trucks.unavailability)
  

    const dispatch = useDispatch()

    const initFetch = useCallback(()=>{
    dispatch(getAllTrucksUnavailability())
    },[dispatch])

    useEffect(()=>{
        initFetch()
    },[initFetch])

    let navigate = useNavigate();

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

    const handleEditClick = (params) => {
        const path="/truck/unavailability/" + params.id
        navigate(path);
    }  

    const rows = unavailabilies
    const columns = [
        {
            field: 'truckNo',
            headerName: 'Truck No',
            minWidth: 150,
            flex: 0.5
        },
        {
            field: 'truckTypeName',
            headerName: 'Truck Type',
            minWidth:150,
            flex: 0.5
        },
        {
            field: 'unavailabilityStartDateFormatted',
            headerName: 'Unavailability Start Date',
            minWidth:150,
            flex: 1
        },
        {
            field: 'unavailabilityEndDateFormatted',
            headerName: 'Unavailability End Date',
            minWidth:150,
            flex: 1
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
      <Button sx={{ my:2 }} href="/truck/unavailability/add" variant="contained">Add Unavailability</Button>  
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

export default UnavailabilityList
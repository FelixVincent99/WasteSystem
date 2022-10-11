import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTrucks} from '../../features/truck/truckSlice'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Button } from '@mui/material'



function TruckList() {

  const trucks = useSelector(state => state.trucks.trucks)
  

  const dispatch = useDispatch()

  const initFetch = useCallback(()=>{
   dispatch(getAllTrucks())
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
    const path="/truck/" + params.id
    navigate(path);
  }  

  const rows = trucks
  const columns = [
    {
      field: 'truckNo',
      headerName: 'Truck No',
      minWidth: 150,
      flex: 0.5

    },
    {
      field: 'truckTypeName',
      headerName: 'Type',
      minWidth:150,
      flex: 0.5
    },
    {
      field: 'operationStartDateFormatted',
      headerName: 'Operation Start Date',
      minWidth:150,
      flex: 1
    },
    {
      field: 'operationEndDateFormatted',
      headerName: 'Operation End Date',
      minWidth:150,
      flex: 1
    },
    {
      field: 'milage',
      headerName: 'Milage',
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
      field: 'averageFuelConsumption',
      headerName: 'Average Fuel Consumption',
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
      <Button sx={{ my:2 }} href="/addTruck" variant="contained">Add Truck</Button>  
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

export default TruckList
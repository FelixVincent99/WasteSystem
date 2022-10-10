import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTrucks} from '../../features/truck/truckSlice'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'



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
      field: 'operationStartDate',
      headerName: 'Operation Start Date',
      minWidth:150,
      flex: 1
    },
    {
      field: 'operationEndDate',
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
      field: 'updatedAt',
      headerName: 'Latest Update',
      minWidth:150,
      flex: 1
    },
  ]

  const handleRowClick = (params) => {
    const path="/truck/" + params.id
    navigate(path);
  }


  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
        <DataGrid 
          rows={rows} 
          columns={columns}
          onRowClick={handleRowClick}
        />
        </div>
      </div>
    </div>
  )
}

export default TruckList
import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Button } from '@mui/material'

import { getAllManpowers } from '../../features/manpower/manpowerSlice'

function ManpowerList() {
    const manpowers = useSelector(state => state.manpowers.manpowers)
  

    const dispatch = useDispatch()

    const initFetch = useCallback(()=>{
    dispatch(getAllManpowers())
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
        const path="/manpower/" + params.id
        navigate(path);
    }  

    const rows = manpowers
    const columns = [
        {
            field: 'mpName',
            headerName: 'Name',
            minWidth: 150,
            flex: 0.5
        },
        {
            field: 'mpAge',
            headerName: 'Age',
            minWidth:150,
            flex: 0.5
        },
        {
            field: 'role',
            headerName: 'Role',
            minWidth:150,
            flex: 0.5
        },
        {
            field: 'gender',
            headerName: 'gender',
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
      <Button sx={{ my:2 }} href="/manpower/add" variant="contained">Add Manpower</Button>  
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

export default ManpowerList
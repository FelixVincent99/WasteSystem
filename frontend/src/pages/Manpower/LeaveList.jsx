import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Button } from '@mui/material'

import { getAllLeaves } from '../../features/manpower/manpowerSlice'

function LeaveList() {
    const leaves = useSelector(state => state.manpowers.leaves)
  

    const dispatch = useDispatch()

    const initFetch = useCallback(()=>{
    dispatch(getAllLeaves())
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
        const path="/manpower/leave/" + params.id
        navigate(path);
    }  

    const rows = leaves
    const columns = [
        {
            field: 'mpName',
            headerName: 'Name',
            minWidth: 150,
            flex: 0.5
        },
        {
            field: 'role',
            headerName: 'Role',
            minWidth:150,
            flex: 0.5
        },
        {
            field: 'leaveStartDateFormatted',
            headerName: 'Leave Start Date',
            minWidth:150,
            flex: 1
        },
        {
            field: 'leaveEndDateFormatted',
            headerName: 'Leave End Date',
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
      <Button sx={{ my:2 }} href="/manpower/leave/add" variant="contained">Add Leave</Button>  
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

export default LeaveList
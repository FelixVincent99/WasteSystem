import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAreas } from '../../features/area/areaSlice'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Button } from '@mui/material'

function AreaList() {

    const areas = useSelector(state => state.areas.areas)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initFetch = useCallback(() => {
        dispatch(getAllAreas())
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
    </>
  )
}

export default AreaList
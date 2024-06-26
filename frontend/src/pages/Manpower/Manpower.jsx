import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Box, Stack } from '@mui/system'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'

import Spinner from '../../components/Spinner'
import manpowerService from '../../features/manpower/manpowerService';
import { updateManpower, reset } from '../../features/manpower/manpowerSlice'


function Manpower() {
    const params = useParams();

    const initialManpowerState = {
        mpName: "",
        mpAge: "",
        role: "",
        gender: "",
        operationStartDate: new Date(),
        operationEndDate: new Date(),
        status: "1"
    }
    const [manpowerData, setManpowerData] = useState(initialManpowerState)
    const {isError, isLoading, isSuccess, message} = useSelector(state => state.manpowers);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getManpower = id => {
        manpowerService.get(id)
        .then(response => {
            setManpowerData(response)
        })
        .catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            toast.success("Manpower has been updated")
            navigate('/manpower/list')
        }
        dispatch(reset())
        getManpower(params.id)
    }, [params.id, isError, isSuccess, navigate, message, dispatch]);

    const onChangeManpower = (e) => {
        setManpowerData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const saveUpdateManpower = (e) => {
        e.preventDefault()
        dispatch(updateManpower({manpowerData}))
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <Box component="form" onSubmit={saveUpdateManpower} noValidate sx={{ m: 1 }}>
            <Stack spacing={2}>
                <TextField id="mpName" name="mpName" value={manpowerData.mpName} onChange={onChangeManpower} label="Name" variant="outlined" required fullWidth/>
                <TextField id="mpAge" name="mpAge" value={manpowerData.mpAge} onChange={onChangeManpower} label="Age" variant="outlined" fullWidth/>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="roleLabel">Role</InputLabel>
                    <Select labelId="roleLabel" id="role" name="role" value={manpowerData.role} label="Role" onChange={onChangeManpower}>
                        <MenuItem value="1">Drive</MenuItem>
                        <MenuItem value="2">Loader</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="genderLabel">Gender</InputLabel>
                    <Select labelId="genderLabel" id="gender" name="gender" value={manpowerData.gender} label="Role" onChange={onChangeManpower}>
                        <MenuItem value="1">Male</MenuItem>
                        <MenuItem value="2">Female</MenuItem>
                    </Select>
                </FormControl>
                {/*todo update*/}
                {/*<LocalizationProvider dateAdapter={AdapterMoment} >*/}
                {/*    <DatePicker            */}
                {/*    onChange={(newValue)=>{*/}
                {/*        setManpowerData((prevState) => ({*/}
                {/*            ...prevState,*/}
                {/*            [`operationStartDate`]: newValue.toDate()  */}
                {/*        }))*/}
                {/*    }}*/}
                {/*    inputFormat="DD/MM/YYYY"*/}
                {/*    value={manpowerData.operationStartDate}*/}
                {/*    label="Operation Start Date"*/}
                {/*    views={['year', 'month', 'day']}            */}
                {/*    renderInput={(params) => <TextField {...params} fullWidth/>}*/}
                {/*    />*/}
                {/*</LocalizationProvider>*/}
                {/*<LocalizationProvider dateAdapter={AdapterMoment}>*/}
                {/*    <DatePicker            */}
                {/*    onChange={(newValue)=>{*/}
                {/*        setManpowerData((prevState) => ({*/}
                {/*            ...prevState,*/}
                {/*            [`operationEndDate`]: newValue.toDate()  */}
                {/*        }))*/}
                {/*    }}*/}
                {/*    inputFormat="DD/MM/YYYY"*/}
                {/*    value={manpowerData.operationEndDate}*/}
                {/*    label="Operation End Date"*/}
                {/*    views={['year', 'month', 'day']}            */}
                {/*    renderInput={(params) => <TextField {...params} fullWidth/>}*/}
                {/*    />*/}
                {/*</LocalizationProvider>*/}
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="statusLabel">Status</InputLabel>
                    <Select labelId="statusLabel" id="status" name="status" value={manpowerData.status} label="Status" onChange={onChangeManpower}>
                        <MenuItem value="1">Active</MenuItem>
                        <MenuItem value="2">Temporarily Unavailable</MenuItem>
                        <MenuItem value="3">Inactive</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <Box m={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Button type="submit" variant="contained" color="primary" size="large">Update</Button>
            </Box>
        </Box>
    )
}

export default Manpower

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import manpowerService from './manpowerService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    manpowers: [],
    currentManpower: {}
}

export const createManpower = createAsyncThunk(
    'manpowers/create',
    async (manpower, thunkAPI)=>{
        try{
            return await manpowerService.create(manpower)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllManpowers = createAsyncThunk(
    'manpowers/getAll',
    async ()=>{
        const manpowerList = await manpowerService.getAll()
        const proccessedManpowerList = manpowerList.map(manpowerItem => {
            manpowerItem.statusType = manpowerItem.status === 1? 'Active': manpowerItem.status === 2? 'Temporarily Unavailable': manpowerItem.status === 3? 'Inactive': 'Error'
            manpowerItem.role = manpowerItem.role === 1? 'Driver': manpowerItem.role === 2? 'Loader': 'Error'
            manpowerItem.gender =  manpowerItem.gender === 1? 'Male': manpowerItem.gender === 2? 'Female': 'Error'
            manpowerItem.operationStartDateFormatted =  manpowerItem.operationStartDate.split("T")[0]
            manpowerItem.operationEndDateFormatted = manpowerItem.operationEndDateFormatted === 1 ?  manpowerItem.operationEndDate.split("T")[0] : ''
            manpowerItem.updatedAtFormatted =  manpowerItem.updatedAt.split("T")[0]            
            return manpowerItem
        })
        return proccessedManpowerList
    }
)

export const updateManpower = createAsyncThunk(
    'manpowers/update',
    async (manpower, thunkAPI)=>{
        try{
            return await manpowerService.update(manpower)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getManpower = createAsyncThunk(
    'manpowers/get',
    async (manpower, thunkAPI)=>{
        try{
            return await manpowerService.get(manpower)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllDrivers = createAsyncThunk(
    'manpowers/getAllDrivers',
    async ()=>{
        const driverList = await manpowerService.getAllDrivers()
        const proccessedDriverList = driverList.map(manpowerItem => {
            manpowerItem.statusType = manpowerItem.status === 1? 'Active': manpowerItem.status === 2? 'Temporarily Unavailable': manpowerItem.status === 3? 'Inactive': 'Error'
            manpowerItem.role = manpowerItem.role === 1? 'Driver': 'Error'
            manpowerItem.gender =  manpowerItem.gender === 1? 'Male': manpowerItem.gender === 2? 'Female': 'Error'
            manpowerItem.operationStartDateFormatted =  manpowerItem.operationStartDate.split("T")[0]
            manpowerItem.operationEndDateFormatted = manpowerItem.operationEndDateFormatted === 1 ?  manpowerItem.operationEndDate.split("T")[0] : ''
            manpowerItem.updatedAtFormatted =  manpowerItem.updatedAt.split("T")[0]            
            return manpowerItem
        })        
        return proccessedDriverList
    }
)

export const getAllLoaders = createAsyncThunk(
    'manpowers/getAllLoaders',
    async ()=>{
        const loaderList = await manpowerService.getAllLoaders()
        const proccessedLoaderList = loaderList.map(manpowerItem => {
            manpowerItem.statusType = manpowerItem.status === 1? 'Active': manpowerItem.status === 2? 'Temporarily Unavailable': manpowerItem.status === 3? 'Inactive': 'Error'
            manpowerItem.role = manpowerItem.role === 2? 'Loader': 'Error'
            manpowerItem.gender =  manpowerItem.gender === 1? 'Male': manpowerItem.gender === 2? 'Female': 'Error'
            manpowerItem.operationStartDateFormatted =  manpowerItem.operationStartDate.split("T")[0]
            manpowerItem.operationEndDateFormatted = manpowerItem.operationEndDateFormatted === 1 ?  manpowerItem.operationEndDate.split("T")[0] : ''
            manpowerItem.updatedAtFormatted =  manpowerItem.updatedAt.split("T")[0]            
            return manpowerItem
        })
        return proccessedLoaderList
    }
)

const manpowerSlice = createSlice({
    name: 'manpower',
    initialState,
    reducers: {
        reset: (state)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }           
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createManpower.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createManpower.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.manpowers.push(action.payload)
        })
        .addCase(createManpower.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload            
        })
        .addCase(getAllManpowers.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllManpowers.fulfilled, (state, action)=>{
            state.isLoading = false
            state.manpowers = action.payload
        })
        .addCase(getAllManpowers.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.manpowers = []
        })
        .addCase(getManpower.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getManpower.fulfilled, (state, action)=>{
            state.isLoading = false
            state.currentManpower = action.payload
        })
        .addCase(getManpower.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.currentManpower = {}
        })
        .addCase(updateManpower.pending, (state, action)=>{
            state.isLoading = true
        })
        .addCase(updateManpower.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true                        
        })
        .addCase(updateManpower.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true            
            state.message = action.payload
        })
        .addCase(getAllDrivers.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllDrivers.fulfilled, (state, action)=>{
            state.isLoading = false
            state.drivers = action.payload
        })
        .addCase(getAllDrivers.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.drivers = []
        })
        .addCase(getAllLoaders.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllLoaders.fulfilled, (state, action)=>{
            state.isLoading = false
            state.loaders = action.payload
        })
        .addCase(getAllLoaders.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.loaders = []
        })
    }
})

export const {reset} = manpowerSlice.actions
export default manpowerSlice.reducer
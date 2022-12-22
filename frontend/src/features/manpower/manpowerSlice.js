import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import manpowerService from './manpowerService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    manpowers: [],
    drivers: [],
    loaders: [],
    driversloaders: [],
    leaves: [],
    currentManpower: {},
    currentLeave: {}
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

export const getAvailableDriversLoaders = createAsyncThunk(
    'manpowers/getAvailableDriversLoaders',
    async (data, thunkAPI)=>{
        const driverList = await manpowerService.getAllDrivers()
        var proccessedDriverList = driverList.map(manpowerItem => {
            manpowerItem.statusType = manpowerItem.status === 1? 'Active': manpowerItem.status === 2? 'Temporarily Unavailable': manpowerItem.status === 3? 'Inactive': 'Error'
            manpowerItem.role = manpowerItem.role === 1? 'Driver': 'Error'
            manpowerItem.gender =  manpowerItem.gender === 1? 'Male': manpowerItem.gender === 2? 'Female': 'Error'
            manpowerItem.operationStartDateFormatted =  manpowerItem.operationStartDate.split("T")[0]
            manpowerItem.operationEndDateFormatted = manpowerItem.operationEndDate === 1 ?  manpowerItem.operationEndDate.split("T")[0] : ''
            manpowerItem.updatedAtFormatted =  manpowerItem.updatedAt.split("T")[0]
            manpowerItem.disabled = false
            return manpowerItem
        })     

        const loaderList = await manpowerService.getAllLoaders()
        var proccessedLoaderList = loaderList.map(manpowerItem => {
            manpowerItem.statusType = manpowerItem.status === 1? 'Active': manpowerItem.status === 2? 'Temporarily Unavailable': manpowerItem.status === 3? 'Inactive': 'Error'
            manpowerItem.role = manpowerItem.role === 2? 'Loader': 'Error'
            manpowerItem.gender =  manpowerItem.gender === 1? 'Male': manpowerItem.gender === 2? 'Female': 'Error'
            manpowerItem.operationStartDateFormatted =  manpowerItem.operationStartDate.split("T")[0]
            manpowerItem.operationEndDateFormatted = manpowerItem.operationEndDate === 1 ?  manpowerItem.operationEndDate.split("T")[0] : ''
            manpowerItem.updatedAtFormatted =  manpowerItem.updatedAt.split("T")[0]
            manpowerItem.disabled = false
            return manpowerItem
        })        

        const notAvailableDriverList = await manpowerService.getNotAvailableDrivers(data)
        if(notAvailableDriverList.length !== 0){
            for(var a=0; a<notAvailableDriverList.length; a++){
                for(var b=0; b<proccessedDriverList.length; b++){
                    if(notAvailableDriverList[a].id === proccessedDriverList[b].id && data.driverId !== proccessedDriverList[b].id){
                        proccessedDriverList[b].disabled = true
                    }
                }
            }
        }
        
        const notAvailableLoaders = await manpowerService.getNotAvailableLoaders(data)        
        var notAvailableLoadersList = []
        if(notAvailableLoaders[0].loaderId !== null){
            for(var c=0; c<notAvailableLoaders.length; c++){
                for(var d=0; d<notAvailableLoaders[c].loaderId.split(",").length; d++){
                    notAvailableLoadersList.push(notAvailableLoaders[c].loaderId.split(",")[d])
                }
            }
        }
        
        var currentLoaderList = data.loaderId.split(",")
        if(notAvailableLoadersList.length !== 0){
            for(var e=0; e<notAvailableLoadersList.length; e++){
                for(var f=0; f<proccessedLoaderList.length; f++){                    
                    if(Number(notAvailableLoadersList[e]) === proccessedLoaderList[f].id && !(currentLoaderList.includes(proccessedLoaderList[f].id.toString()))){                        
                        proccessedLoaderList[f].disabled = true
                    }
                }
            }
        }

        const manpowers = proccessedLoaderList.concat(proccessedDriverList)
        return manpowers
    }
)

export const createLeave = createAsyncThunk(
    'manpowers/createLeave',
    async (leave, thunkAPI)=>{
        try{
            return await manpowerService.createLeave(leave)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllLeaves = createAsyncThunk(
    'manpowers/getAllLeaves',
    async ()=>{
        const leaveList = await manpowerService.getAllLeaves()        
        const proccessedLeaveList = leaveList.map(leaveItem => {
            leaveItem.statusType = leaveItem.status === 1? 'Active': leaveItem.status === 2? 'Inactive': 'Error'
            leaveItem.leaveStartDateFormatted =  leaveItem.leaveStartDate.split("T")[0]
            leaveItem.leaveEndDateFormatted = leaveItem.leaveEndDate.split("T")[0]
            leaveItem.updatedAtFormatted =  leaveItem.updatedAt.split("T")[0]
            leaveItem.mpName = leaveItem.Manpower.mpName
            leaveItem.role = leaveItem.Manpower.role === 1? 'Driver': leaveItem.Manpower.role === 2? 'Loader': 'Error'
            return leaveItem
        })        
        return proccessedLeaveList
    }
)

export const updateLeave = createAsyncThunk(
    'manpowers/updateLeave',
    async (leave, thunkAPI)=>{
        try{
            return await manpowerService.updateLeave(leave)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getLeave = createAsyncThunk(
    'manpowers/getLeave',
    async (leave, thunkAPI)=>{
        try{
            return await manpowerService.getLeave(leave)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
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
        .addCase(getAvailableDriversLoaders.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAvailableDriversLoaders.fulfilled, (state, action)=>{
            state.isLoading = false
            state.driversloaders = action.payload
        })
        .addCase(getAvailableDriversLoaders.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.driversloaders = []
        })
        .addCase(createLeave.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createLeave.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.leaves.push(action.payload)
        })
        .addCase(createLeave.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload            
        })
        .addCase(getAllLeaves.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllLeaves.fulfilled, (state, action)=>{
            state.isLoading = false
            state.leaves = action.payload
        })
        .addCase(getAllLeaves.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.leaves = []
        })
        .addCase(getLeave.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getLeave.fulfilled, (state, action)=>{
            state.isLoading = false
            state.currentLeave = action.payload
        })
        .addCase(getLeave.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.currentLeave = {}
        })
        .addCase(updateLeave.pending, (state, action)=>{
            state.isLoading = true
        })
        .addCase(updateLeave.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true                        
        })
        .addCase(updateLeave.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true            
            state.message = action.payload
        })
    }
})

export const {reset} = manpowerSlice.actions
export default manpowerSlice.reducer
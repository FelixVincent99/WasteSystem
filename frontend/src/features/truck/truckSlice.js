import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import truckService from './truckService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    trucks: [],
    availabletrucks: [],
    unavailability: [],
    currentTruck: {},
    currentUnavailability: {},
};

export const createTruck = createAsyncThunk(
    'trucks/create',
    async (truck, thunkAPI)=>{
        try{
            return await truckService.create(truck)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllTrucks = createAsyncThunk(
    'trucks/getAll',
    async ()=>{
        const truckList = await truckService.getAll()
        const proccessedTruckList = truckList.map(truckItem => {
            truckItem.statusType = truckItem.status === 1? 'Active': truckItem.status === 2? 'Temporarily Unavailable': truckItem.status === 3? 'Inactive': 'Error'
            truckItem.truckTypeName = truckItem.truckType === 1? 'Compactor Truck': truckItem.truckType === 2? 'RoRo Truck': truckItem.truckType === 3? 'Prime Mover': 'Error'
            truckItem.operationStartDateFormatted =  truckItem.operationStartDate.split("T")[0]
            truckItem.operationEndDateFormatted = truckItem.operationEndDateFormatted === 1? truckItem.operationEndDate.split("T")[0] : ''
            truckItem.updatedAtFormatted =  truckItem.updatedAt.split("T")[0]
            return truckItem
        })
        return proccessedTruckList
    }
)

export const updateTruck = createAsyncThunk(
    'trucks/update',
    async (truck, thunkAPI)=>{
        try{
            return await truckService.update(truck)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getTruck = createAsyncThunk(
    'trucks/get',
    async (truck, thunkAPI)=>{
        try{
            return await truckService.get(truck)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const createTruckUnavailability = createAsyncThunk(
    'trucks/createTruckUnavailability',
    async (truckUnavailability, thunkAPI)=>{
        try{
            return await truckService.createUnavailability(truckUnavailability)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllTrucksUnavailability = createAsyncThunk(
    'trucks/getAllTrucksUnavailability',
    async ()=>{
        const truckUnavailabilityList = await truckService.getAllUnavailability()
        const proccessedTruckUnavailabilityList = truckUnavailabilityList.map(truckItem => {
            truckItem.statusType = truckItem.status === 1? 'Active': truckItem.status === 2? 'Inactive': 'Error'
            truckItem.unavailabilityStartDateFormatted =  truckItem.unavailabilityStartDate.split("T")[0]
            truckItem.unavailabilityEndDateFormatted = truckItem.unavailabilityEndDate.split("T")[0]
            truckItem.updatedAtFormatted =  truckItem.updatedAt.split("T")[0]
            truckItem.truckNo = truckItem.Truck.truckNo
            truckItem.truckTypeName = truckItem.Truck.truckType === 1? 'Compactor Truck': truckItem.Truck.truckType === 2? 'RoRo Truck': truckItem.Truck.truckType === 3? 'Prime Mover': 'Error'
            return truckItem
        })
        return proccessedTruckUnavailabilityList
    }
)

export const updateTruckUnavailability = createAsyncThunk(
    'trucks/updateTruckUnavailability',
    async (truckUnavailability, thunkAPI)=>{
        try{
            return await truckService.updateUnavailability(truckUnavailability)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getTruckUnavailability = createAsyncThunk(
    'trucks/getTruckUnavailability',
    async (truckUnavailability, thunkAPI)=>{
        try{
            return await truckService.getUnavailability(truckUnavailability)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAvailableTrucks = createAsyncThunk(
    'trucks/getAvaiableTrucks',
    async (data, thunkAPI) => {
        var truckList = await truckService.getAll()
        const notAvailableTruckList = await truckService.getNotAvailableTrucks(data)
        truckList.map(truckItem => {
            truckItem.disabled = false
            return truckItem
        })

        if(notAvailableTruckList.length !== 0){
            for(var a=0; a<notAvailableTruckList.length; a++){
                for(var b=0; b<truckList.length; b++){
                    if(notAvailableTruckList[a].id === truckList[b].id && data.truckId !== truckList[b].id){
                        truckList[b].disabled = true
                    }
                }
            }
        }

        return truckList
    }
)

const truckSlice = createSlice({
    name: 'truck',
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
        .addCase(createTruck.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createTruck.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.trucks.push(action.payload)
        })
        .addCase(createTruck.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getAllTrucks.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllTrucks.fulfilled, (state, action)=>{
            state.isLoading = false
            state.trucks = action.payload
        })
        .addCase(getAllTrucks.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.trucks = []
        })
        .addCase(getTruck.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getTruck.fulfilled, (state, action)=>{
            state.isLoading = false
            state.currentTruck = action.payload
        })
        .addCase(getTruck.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.currentTruck = {}
        })
        .addCase(updateTruck.pending, (state, action)=>{
            state.isLoading = true
        })
        .addCase(updateTruck.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(updateTruck.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(createTruckUnavailability.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createTruckUnavailability.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.unavailability.push(action.payload)
        })
        .addCase(createTruckUnavailability.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getAllTrucksUnavailability.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllTrucksUnavailability.fulfilled, (state, action)=>{
            state.isLoading = false
            state.unavailability = action.payload
        })
        .addCase(getAllTrucksUnavailability.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.unavailability = []
        })
        .addCase(getTruckUnavailability.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getTruckUnavailability.fulfilled, (state, action)=>{
            state.isLoading = false
            state.currentUnavailability = action.payload
        })
        .addCase(getTruckUnavailability.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.currentUnavailability = {}
        })
        .addCase(updateTruckUnavailability.pending, (state, action)=>{
            state.isLoading = true
        })
        .addCase(updateTruckUnavailability.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(updateTruckUnavailability.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getAvailableTrucks.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAvailableTrucks.fulfilled, (state, action)=>{
            state.isLoading = false
            state.availabletrucks = action.payload
        })
        .addCase(getAvailableTrucks.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.availabletrucks = []
        })
    }
})

export const {reset} = truckSlice.actions
export default truckSlice.reducer

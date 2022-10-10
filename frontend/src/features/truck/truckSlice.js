import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import truckService from './truckService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    trucks: [],
    currentTruck: {}
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
    }
})

export const {reset} = truckSlice.actions
export default truckSlice.reducer
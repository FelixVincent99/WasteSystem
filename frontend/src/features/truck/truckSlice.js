import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import truckService from './truckService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    truck: []
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
        return await truckService.getAll()
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
            state.truck.push(action.payload)
        })
        .addCase(createTruck.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.truck = []
        })
        .addCase(getAllTrucks.fulfilled, (state, action)=>{
            return [...action.payload]
        })
        .addCase(updateTruck.fulfilled, (state, action)=>{
            const index = state.findIndex(truck => truck.id === action.payload.id)
            state[index] = {
                ...state[index],
                ...action.payload,
            }
        })
        .addCase(getTruck.fulfilled, (state,action)=>{
            return [...action.payload]
        })
    }
})

export const {reset} = truckSlice.actions
export default truckSlice.reducer
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import areaService from './areaService';

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    areas: [],
    currentArea: {}
};

export const createArea = createAsyncThunk(
    'areas/create',
    async (area, thunkAPI)=>{
        try{
            return await areaService.create(area)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllAreas = createAsyncThunk(
    'areas/getAll',
    async ()=>{
        const areaList = await areaService.getAll()
        const proccessedAreaList = areaList.map(areaItem => {
            areaItem.statusType = areaItem.status === 1? 'Active': areaItem.status === 2? 'Temporarily Unavailable': areaItem.status === 3? 'Inactive': 'Error'        
            areaItem.updatedAtFormatted =  areaItem.updatedAt.split("T")[0]
            return areaItem
        })
        return proccessedAreaList
    }
)

export const updateArea = createAsyncThunk(
    'areas/update',
    async (area, thunkAPI)=>{
        try{
            return await areaService.update(area)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getArea = createAsyncThunk(
    'areas/get',
    async (area, thunkAPI)=>{
        try{
            return await areaService.get(area)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const areaSlice = createSlice({
    name: 'area',
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
        .addCase(createArea.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createArea.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.areas.push(action.payload)
        })
        .addCase(createArea.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload            
        })
        .addCase(getAllAreas.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllAreas.fulfilled, (state, action)=>{
            state.isLoading = false
            state.areas = action.payload
        })
        .addCase(getAllAreas.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.areas = []
        })
        .addCase(getArea.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getArea.fulfilled, (state, action)=>{
            state.isLoading = false
            state.currentArea = action.payload
        })
        .addCase(getArea.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.currentArea = {}
        })
        .addCase(updateArea.pending, (state, action)=>{
            state.isLoading = true
        })
        .addCase(updateArea.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true                        
        })
        .addCase(updateArea.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true            
            state.message = action.payload
        })
    }
})

export const {reset} = areaSlice.actions
export default areaSlice.reducer
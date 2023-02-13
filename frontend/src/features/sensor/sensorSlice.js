import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import sensorService from './sensorService'

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  collections: []
};

export const getAllSensors = createAsyncThunk(
  'collection/getAll',
  async ()=>{
      const sensorList = await sensorService.getAll()
      return sensorList;
  }
)

const sensorSlice = createSlice({
  name: 'sensor',
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
      .addCase(getAllSensors.pending, (state)=>{
          state.isLoading = true
      })
      .addCase(getAllSensors.fulfilled, (state, action)=>{
          state.isLoading = false
          state.collections = action.payload
      })
      .addCase(getAllSensors.rejected, (state, action)=>{
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.collections = []
      })
  }
})

export const {reset} = sensorSlice.actions
export default sensorSlice.reducer
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import collectionService from './collectionService'

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  collections: []
};

export const getAllCollections = createAsyncThunk(
  'collection/getAllByDate',
  async (data)=>{
      const collectionList = await collectionService.getAllByDate(data);
      return collectionList;
  }
)

const collectionSlice = createSlice({
  name: 'collection',
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
      .addCase(getAllCollections.pending, (state)=>{
          state.isLoading = true
      })
      .addCase(getAllCollections.fulfilled, (state, action)=>{
          state.isLoading = false
          state.collections = action.payload
      })
      .addCase(getAllCollections.rejected, (state, action)=>{
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.collections = []
      })
  }
})

export const {reset} = collectionSlice.actions
export default collectionSlice.reducer
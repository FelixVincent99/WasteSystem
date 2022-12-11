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
  'collection/getAll',
  async ()=>{
      const collectionList = await collectionService.getAll();
      // const proccessedTruckList = truckList.map(truckItem => {
      //     truckItem.statusType = truckItem.status === 1? 'Active': truckItem.status === 2? 'Temporarily Unavailable': truckItem.status === 3? 'Inactive': 'Error'
      //     truckItem.truckTypeName = truckItem.truckType === 1? 'Compactor Truck': truckItem.truckType === 2? 'RoRo Truck': truckItem.truckType === 3? 'Prime Mover': 'Error'
      //     truckItem.operationStartDateFormatted =  truckItem.operationStartDate.split("T")[0]
      //     truckItem.operationEndDateFormatted = truckItem.operationEndDateFormatted === 1? truckItem.operationEndDate.split("T")[0] : ''
      //     truckItem.updatedAtFormatted =  truckItem.updatedAt.split("T")[0]
      //     return truckItem
      // })
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
          state.trucks = []
      })
  }
})

export const {reset} = collectionSlice.actions
export default collectionSlice.reducer
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import areaService from './areaService'
import manpowerService from '../manpower/manpowerService'

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
            var collectionFrequency, defaultLoadersIdString
            if(area.areaData.cfData.monday === false && area.areaData.cfData.tuesday === false && area.areaData.cfData.wednesday === false && area.areaData.cfData.thursday === false && area.areaData.cfData.friday === false && area.areaData.cfData.saturday === false && area.areaData.cfData.sunday === false){
                collectionFrequency = null
                defaultLoadersIdString = null
                area.areaData.defaultDriverId = null
                area.areaData.defaultTruckId = null
            }else{
                collectionFrequency = "/"
                if(area.areaData.cfData.monday === true){
                    collectionFrequency += "1/"
                }
                if(area.areaData.cfData.tuesday === true){
                    collectionFrequency += "2/"
                }
                if(area.areaData.cfData.wednesday === true){
                    collectionFrequency += "3/"
                }
                if(area.areaData.cfData.thursday === true){
                    collectionFrequency += "4/"
                }
                if(area.areaData.cfData.friday === true){
                    collectionFrequency += "5/"
                }
                if(area.areaData.cfData.saturday === true){
                    collectionFrequency += "6/"
                }
                if(area.areaData.cfData.sunday === true){
                    collectionFrequency += "7/"
                }
                if(area.areaData.defaultLoadersId.length !== 0){
                    defaultLoadersIdString = ""
                    for(var a=0; a<area.areaData.defaultLoadersId.length; a++){
                        defaultLoadersIdString += area.areaData.defaultLoadersId[a] + ","
                    }
                }else{
                    defaultLoadersIdString = null
                }
            }
            area.areaData.collectionFrequency = collectionFrequency
            area.areaData.defaultLoadersId = defaultLoadersIdString
            area.areaData.defaultDriverId = area.areaData.defaultDriverId === "" ? null: area.areaData.defaultDriverId
            area.areaData.defaultTruckId = area.areaData.defaultTruckId === "" ? null: area.areaData.defaultTruckId
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
        const manpowerList = await manpowerService.getAll()

        const proccessedAreaList = areaList.map(areaItem => {            
            areaItem.statusType = areaItem.status === 1? 'Active': areaItem.status === 2? 'Temporarily Unavailable': areaItem.status === 3? 'Inactive': 'Error'        
            areaItem.updatedAtFormatted =  areaItem.updatedAt.split("T")[0]            
            areaItem.truckNo =  areaItem.Truck !== null ? areaItem.Truck.truckNo : ""
            areaItem.driverName =  areaItem.Manpower !== null ? areaItem.Manpower.mpName : ""
            areaItem.updatedAtFormatted =  areaItem.updatedAt.split("T")[0]
            areaItem.defaultLoadersIds = areaItem.defaultLoadersId === null ? "" : areaItem.defaultLoadersId.split(",")
            areaItem.loaders = ""
            
            for(var a=0; a<areaItem.defaultLoadersIds.length; a++){
                if(areaItem.defaultLoadersIds[a] !== ""){
                    for(var b=0; b<manpowerList.length; b++){
                        if(areaItem.defaultLoadersIds[a] === manpowerList[b].id.toString()){
                            areaItem.loaders += manpowerList[b].mpName + ", "
                        }
                    }
                }
            }
            areaItem.loaders = areaItem.loaders === "" ? areaItem.loaders: areaItem.loaders.slice(0, -2)
            var cf = areaItem.collectionFrequency === null ? "" : areaItem.collectionFrequency.split("/")
            areaItem.cf = ""
            for(var c=0; c<cf.length; c++){
                if(cf[c] === '1'){
                    areaItem.cf += "Monday, "
                }
                if(cf[c] === '2'){
                    areaItem.cf += "Tuesday, "
                }
                if(cf[c] === '3'){
                    areaItem.cf += "Wednesday, "
                }
                if(cf[c] === '4'){
                    areaItem.cf += "Thursday, "
                }
                if(cf[c] === '5'){
                    areaItem.cf += "Friday, "
                }
                if(cf[c] === '6'){
                    areaItem.cf += "Saturday, "
                }
                if(cf[c] === '0'){
                    areaItem.cf += "Sunday, "
                }
            }            
            areaItem.cf = areaItem.cf === "" ? areaItem.cf : areaItem.cf.slice(0,-2)
            return areaItem
        })
        return proccessedAreaList
    }
)

export const updateArea = createAsyncThunk(
    'areas/update',
    async (area, thunkAPI)=>{
        try{
            var collectionFrequency,defaultLoadersIdString

            if(area.areaData.cf.monday === false && area.areaData.cf.tuesday === false && area.areaData.cf.wednesday === false && area.areaData.cf.thursday === false && area.areaData.cf.friday === false && area.areaData.cf.saturday === false && area.areaData.cf.sunday === false){
                collectionFrequency = null
                defaultLoadersIdString = null
                area.areaData.defaultDriverId = null
                area.areaData.defaultTruckId = null
            }else{
                collectionFrequency = "/"
                if(area.areaData.cf.monday === true){
                    collectionFrequency += "1/"
                }
                if(area.areaData.cf.tuesday === true){
                    collectionFrequency += "2/"
                }
                if(area.areaData.cf.wednesday === true){
                    collectionFrequency += "3/"
                }
                if(area.areaData.cf.thursday === true){
                    collectionFrequency += "4/"
                }
                if(area.areaData.cf.friday === true){
                    collectionFrequency += "5/"
                }
                if(area.areaData.cf.saturday === true){
                    collectionFrequency += "6/"
                }
                if(area.areaData.cf.sunday === true){
                    collectionFrequency += "7/"
                }
                if(area.areaData.loaders.length !== 0){
                    defaultLoadersIdString = ""
                    for(var a=0; a<area.areaData.loaders.length; a++){
                        defaultLoadersIdString += area.areaData.loaders[a] + ","
                    }
                }else{
                    defaultLoadersIdString = null
                }
            }
            area.areaData.collectionFrequency = collectionFrequency
            area.areaData.defaultLoadersId = defaultLoadersIdString
            area.areaData.defaultDriverId = area.areaData.defaultDriverId === "" ? null: area.areaData.defaultDriverId
            area.areaData.defaultTruckId = area.areaData.defaultTruckId === "" ? null: area.areaData.defaultTruckId
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
            const data = await areaService.get(area)
            return data
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
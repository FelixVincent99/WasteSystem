import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import scheduleService from './scheduleService'
import areaService from '../area/areaService'
import manpowerService from '../manpower/manpowerService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    schedules: [],
    currentSchedule: {}
}

export const createSchedule = createAsyncThunk(
    'schedules/create',
    async (schedule, thunkAPI)=>{
        console.log(schedule)
        try{
            const result = await scheduleService.create(schedule)            
            return result
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllSchedules = createAsyncThunk(
    'schedules/getAll',
    async ()=>{
        const scheduleList = await scheduleService.getAll()
        const areaList = await areaService.getAll()
        const manpowerList = await manpowerService.getAll()     

        const proccessedScheduleList = areaList.map(areaItem => {
            var schedule = [];
            for(var a=0; a<scheduleList.length; a++){
                if(areaItem.id === scheduleList[a].areaId){

                    var scheduleLoaders=""                                        
                    for(var b=0; b<scheduleList[a].loaderId.split(",").length; b++){
                        for(var c=0; c<manpowerList.length; c++){                            
                            if(manpowerList[c].id === parseInt(scheduleList[a].loaderId.split(",")[b])){
                                scheduleLoaders += manpowerList[c].mpName + ", "
                            }
                        }
                    }
                    scheduleLoaders = scheduleLoaders.charAt(scheduleLoaders.length -2) === "," ? scheduleLoaders.slice(0, -2) : scheduleLoaders 

                    schedule.push({
                        scheduleId: scheduleList[a].id,
                        scheduleDate: scheduleList[a].scheduleDate.split("T")[0],
                        scheduleTime: scheduleList[a].scheduleTime,
                        truckId: scheduleList[a].truckId,
                        truckNo: scheduleList[a].truckNo,
                        driverId: scheduleList[a].driverId,
                        driverName: scheduleList[a].driver,
                        loaderId: scheduleList[a].loaderId,
                        scheduleLoaders: scheduleLoaders,
                        status: scheduleList[a].status,
                    })
                }
            }
            var defaultLoaders=""
            if(areaItem.defaultLoadersId !== null){
                for(var d=0; d<areaItem.defaultLoadersId.split(",").length; d++){
                    for(var e=0; e<manpowerList.length; e++){                            
                        if(manpowerList[e].id === parseInt(areaItem.defaultLoadersId.split(",")[d])){
                            defaultLoaders += manpowerList[e].mpName + ", "
                        }
                    }
                }            
                defaultLoaders = defaultLoaders.charAt(defaultLoaders.length -2) === "," ? defaultLoaders.slice(0, -2) : defaultLoaders
            }
            var scheduleItem = {
                areaId: areaItem.id,
                areaCode: areaItem.areaCode,
                collectionFrequency: areaItem.collectionFrequency,
                defaultDriverId: areaItem.defaultDriverId,
                defaultLoadersId: areaItem.defaultLoadersId,
                defaultTruckId: areaItem.defaultTruckId,
                defaultDriver: areaItem.defaultDriverId !== null? areaItem.Manpower.mpName: "",
                defaultTruck: areaItem.defaultTruckId !== null? areaItem.Truck.truckNo: "",
                defaultLoaders: defaultLoaders,
                schedule: schedule
            }
            return scheduleItem
        })        
        return await proccessedScheduleList
    }
)

export const updateSchedule = createAsyncThunk(
    'schedules/update',
    async (schedule, thunkAPI)=>{
        try{            
            return await scheduleService.update(schedule)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getSchedule = createAsyncThunk(
    'schedules/get',
    async (schedule, thunkAPI)=>{
        try{
            return await scheduleService.get(schedule)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const scheduleSlice = createSlice({
    name: 'schedule',
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
        .addCase(createSchedule.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createSchedule.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createSchedule.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload            
        })
        .addCase(getAllSchedules.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllSchedules.fulfilled, (state, action)=>{
            state.isLoading = false
            state.schedules = action.payload
            state.isSuccess = false
        })
        .addCase(getAllSchedules.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.schedules = []
        })
        .addCase(getSchedule.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getSchedule.fulfilled, (state, action)=>{
            state.isLoading = false
            state.currentSchedule = action.payload
        })
        .addCase(getSchedule.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.currentSchedule = {}
        })
        .addCase(updateSchedule.pending, (state, action)=>{
            state.isLoading = true
        })
        .addCase(updateSchedule.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true                        
        })
        .addCase(updateSchedule.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true            
            state.message = action.payload
        })
    }
})

export const {reset} = scheduleSlice.actions
export default scheduleSlice.reducer
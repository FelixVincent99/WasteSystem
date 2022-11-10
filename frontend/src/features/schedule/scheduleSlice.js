import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import scheduleService from './scheduleService'
import areaService from '../area/areaService'

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
        try{
            return await scheduleService.create(schedule)
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
        const proccessedScheduleList = areaList.map(areaItem => {
            var schedule = [];
            for(var a=0; a<scheduleList.length; a++){
                if(areaItem.id === scheduleList[a].areaId){
                    schedule.push({
                        scheduleId: scheduleList[a].id,
                        scheduleDate: scheduleList[a].scheduleDate.split("T")[0],
                        scheduleTime: scheduleList[a].scheduleTime,
                        truckId: scheduleList[a].truckId,
                        truckNo: scheduleList[a].truckNo,
                        driverId: scheduleList[a].driverId,
                        driverName: scheduleList[a].driver,
                        loaderId: scheduleList[a].loaderId,
                        status: scheduleList[a].status,
                    })
                }
            }
            var scheduleItem = {
                areaId: areaItem.id,
                areaCode: areaItem.areaCode,
                schedule: schedule
            }
            return scheduleItem
        })        
        return proccessedScheduleList
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
            state.schedules.push(action.payload)
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
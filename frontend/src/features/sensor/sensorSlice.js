import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sensorService from "./sensorService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  sensors: [],
  currentSensor: {}
};

export const createSensor = createAsyncThunk(
  "sensors/create",
  async (sensor, thunkAPI) => {
    try {
      return await sensorService.create(sensor);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getAllSensors = createAsyncThunk("sensors/getAll", async () => {
  const sensorList = await sensorService.getAll();
  return sensorList;
});

export const updateSensor = createAsyncThunk(
  "sensors/update",
  async (sensor, thunkAPI) => {
    try {
      return await sensorService.update(sensor);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getSensor = createAsyncThunk(
  "sensors/get",
  async (sensor, thunkAPI) => {
    try {
      return await sensorService.get(sensor);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const sensorSlice = createSlice({
  name: "sensor",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSensor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSensor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sensors.push(action.payload);
      })
      .addCase(createSensor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllSensors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSensors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sensors = action.payload;
      })
      .addCase(getAllSensors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.sensors = [];
      })
      .addCase(getSensor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSensor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSensor = action.payload;
      })
      .addCase(getSensor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currentSensor = {};
      })
      .addCase(updateSensor.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateSensor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateSensor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = sensorSlice.actions;
export default sensorSlice.reducer;

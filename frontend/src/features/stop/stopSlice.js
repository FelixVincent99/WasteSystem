import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import stopService from "./stopService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  stops: [],
  currentStop: {}
};

export const createStop = createAsyncThunk(
  "stops/create",
  async (stop, thunkAPI) => {
    try {
      return await stopService.create(stop);
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

export const getAllStops = createAsyncThunk("stops/getAll", async () => {
  const stopList = await stopService.getAll();
  return stopList;
});

export const updateStop = createAsyncThunk(
  "stops/update",
  async (stop, thunkAPI) => {
    try {
      return await stopService.update(stop);
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

export const getStop = createAsyncThunk(
  "stops/get",
  async (stop, thunkAPI) => {
    try {
      return await stopService.get(stop);
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

export const getStopsAreaCode = createAsyncThunk(
  "stops/getStopsAreaCode",
  async (stop, thunkAPI) => {
    try {
      console.log(stop);
      const stopList = stopService.getStopsAreaCode(stop);
      return stopList;
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

const stopSlice = createSlice({
  name: "stop",
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
      .addCase(createStop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stops.push(action.payload);
      })
      .addCase(createStop.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllStops.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStops.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stops = action.payload;
      })
      .addCase(getAllStops.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.stops = [];
      })
      .addCase(getStop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentStop = action.payload;
      })
      .addCase(getStop.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currentStop = {};
      })
      .addCase(updateStop.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateStop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateStop.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStopsAreaCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStopsAreaCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stops = action.payload;
      })
      .addCase(getStopsAreaCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.stops = [];
      });
  },
});

export const { reset } = stopSlice.actions;
export default stopSlice.reducer;

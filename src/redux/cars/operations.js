import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const goItCarsAPI = axios.create({
  baseURL: "https://car-rental-api.goit.global/",
});

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ query, page, limit = 12 }, thunkAPI) => {
    try {
      const cleanedFilters = Object.fromEntries(
        Object.entries(query || {}).filter(
          ([_, value]) => value !== undefined && value !== ""
        )
      );

      const params = new URLSearchParams({
        ...cleanedFilters,
        page: String(page),
        limit: String(limit),
      });

      const { data } = await goItCarsAPI.get(`/cars?${params.toString()}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCar",
  async (id, thunkAPI) => {
    try {
      const { data } = await goItCarsAPI.get(`/cars/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getBrands = createAsyncThunk(
  "cars/brands",
  async (_, thunkApi) => {
    try {
      const { data } = await goItCarsAPI.get("/brands");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

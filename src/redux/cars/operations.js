import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const goItCarsAPI = axios.create({
  baseURL: "https://car-rental-api.goit.global/",
});

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ query, page }, thunkAPI) => {
    try {
      const cleanedFilters = Object.fromEntries(
        Object.entries(query || {}).filter(
          ([_, value]) => value !== undefined && value !== ""
        )
      );

      const params = new URLSearchParams({
        ...cleanedFilters,
        page: String(page),
      });

      const { data } = await goItCarsAPI.get(`/cars?${params.toString()}`);

      toast.success("Cars found for you successfully!");

      return data;
    } catch (error) {
      toast.error("Failed to find cars. Please try again.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCar",
  async (id, thunkAPI) => {
    try {
      const { data } = await goItCarsAPI.get(`/cars/${id}`);
      toast.success("The details of chosen car found successfully!");
      return data;
    } catch (error) {
      toast.error("Failed to find details. Please try again.");
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

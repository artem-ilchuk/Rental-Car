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
      const params = new URLSearchParams();

      if (query.brand) params.append("brand", query.brand);
      if (query.rentalPrice) params.append("rentalPrice", query.rentalPrice);
      if (query.mileageFrom) params.append("mileageFrom", query.mileageFrom);
      if (query.mileageTo) params.append("mileageTo", query.mileageTo);
      params.append("page", page);

      const { data } = await goItCarsAPI.get(`/cars?${params.toString()}`);

      toast.success(`Cars found for you successfully!`);

      return data;
    } catch (error) {
      toast.error(`Failed to find cars. Please try again.`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCar",
  async (id, thunkAPI) => {
    try {
      const { data } = await goItCarsAPI.get(`/cars/${id}`);
      toast.success(`The details of your chosen car found successfully!`);
      return data;
    } catch (error) {
      toast.error(`Failed to find details. Please try again.`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

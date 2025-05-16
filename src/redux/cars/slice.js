import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById } from "./operations";

const initialState = {
  cars: [],
  totalCars: 0,
  totalPages: 0,
  page: 1,
  isLoading: false,
  isError: null,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.fulfilled, (state, { payload }) => {
        state.cars = payload.cars;
        state.totalCars = payload.totalCars;
        state.totalPages = payload.totalPages;
        state.page = payload.page;
        state.isLoading = false;
        state.isError = null;
      })
      .addMatcher(isAnyOf(fetchCars.pending, fetchCarById.pending), (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addMatcher(
        isAnyOf(fetchCars.rejected, fetchCarById.rejected),
        (state, { payload }) => {
          state.isError = payload;
          state.isLoading = false;
        }
      );
  },
});

export const carsReducer = carsSlice.reducer;

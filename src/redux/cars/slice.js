import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById, getBrands } from "./operations";

const initialState = {
  cars: [],
  brands: [],
  totalCars: 0,
  totalPages: 0,
  page: 1,
  query: {
    brand: "",
    rentalPrice: "",
    mileageFrom: "",
    mileageTo: "",
  },
  selectedCar: null,
  isLoading: false,
  isError: null,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = { ...state.query, ...action.payload };
      state.page = 1;
      state.cars = [];
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    clearCars(state) {
      state.cars = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.fulfilled, (state, { payload }) => {
        if (payload.page === 1) {
          state.cars = payload.cars;
        } else {
          state.cars = [...state.cars, ...payload.cars];
        }
        if (payload.page) {
          state.page = payload.page;
        }
        state.totalCars = payload.totalCars;
        state.totalPages = payload.totalPages;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(fetchCarById.fulfilled, (state, { payload }) => {
        state.selectedCar = payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addMatcher(
        isAnyOf(fetchCars.pending, fetchCarById.pending, getBrands.pending),
        (state) => {
          state.isLoading = true;
          state.isError = null;
        }
      )
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
export const { setQuery, setPage, clearCars } = carsSlice.actions;

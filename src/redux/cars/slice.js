import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById } from "./operations";

const initialState = {
  cars: [],
  brands: [],
  rentalPrice: [],
  totalCars: 0,
  totalPages: 0,
  page: 1,
  query: {
    brand: "",
    rentalPrice: "",
    mileageFrom: "",
    mileageTo: "",
  },
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
          const brandsSet = new Set(payload.cars.map((car) => car.brand));
          state.brands = Array.from(brandsSet);
          const pricesSet = new Set(payload.cars.map((car) => car.rentalPrice));
          state.rentalPrice = Array.from(pricesSet);
        } else {
          const existingIds = new Set(state.cars.map((car) => car.id));
          const uniqueNewCars = payload.cars.filter(
            (car) => !existingIds.has(car.id)
          );
          state.cars = [...state.cars, ...uniqueNewCars];
        }
        if (payload.page) {
          state.page = payload.page;
        }
        state.totalCars = payload.totalCars;
        state.totalPages = payload.totalPages;
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
export const { setQuery, setPage, clearCars } = carsSlice.actions;

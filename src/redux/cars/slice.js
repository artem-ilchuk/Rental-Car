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
      .addCase(fetchCars.fulfilled, (state, action) => {
        if (state.page === 1) {
          state.cars = action.payload.cars;
        } else {
          const existingIds = new Set(state.cars.map((car) => car.id));
          const newUniqueCars = action.payload.cars.filter(
            (car) => !existingIds.has(car.id)
          );
          state.cars = [...state.cars, ...newUniqueCars];
        }
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
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

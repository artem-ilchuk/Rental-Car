import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToList: (state, { payload }) => {
      if (!Array.isArray(state)) return [payload];
      if (!state.find((car) => car.id === payload.id)) {
        state.push(payload);
      }
    },
    removeFromList: (state, { payload }) => {
      if (!Array.isArray(state)) return [];
      return state.filter((car) => car.id !== payload);
    },
  },
});

export const favoriteReducer = favoriteSlice.reducer;
export const { addToList, removeFromList } = favoriteSlice.actions;

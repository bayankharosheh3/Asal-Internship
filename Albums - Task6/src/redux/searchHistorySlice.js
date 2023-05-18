
import { createSlice } from "@reduxjs/toolkit";

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState: [],
  reducers: {
    addSearchHistory: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addSearchHistory } = searchHistorySlice.actions;

export default searchHistorySlice.reducer;

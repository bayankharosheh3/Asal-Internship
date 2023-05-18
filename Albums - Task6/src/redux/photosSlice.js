import { createSlice } from "@reduxjs/toolkit";

const photosSlice = createSlice({
  name: "photos",
  initialState: {
    data: [{}],
  },
  reducers: {
    fetchDataSuccess(state, action) {
      const { id, data2, cachingTime, page2, url } = action.payload;
      state.data[id] = {
        cachedData: data2,
        cachingTime: cachingTime,
        lastPageCached: page2,
        url: url,
      };
    },
    resetData(state, action) {
      const  id  = action.payload;
      state.data[id] = {};
    },
  },
});

export const { fetchDataSuccess, resetData } = photosSlice.actions;

export default photosSlice.reducer;

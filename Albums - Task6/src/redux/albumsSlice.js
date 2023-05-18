import { createSlice } from "@reduxjs/toolkit";

const albumsSlice = createSlice({
  name: "albums",
  initialState: {
    data: [],
    cachingTime: null,
    lastPageCached: 1,
    url: "",
  },
  reducers: {
    fetchDataSuccess(state, action) {
      const { data2, cachingTime, page2, url } = action.payload;
      state.data = data2;
      state.cachingTime = cachingTime;
      state.lastPageCached = page2;
      state.url = url;
    },
    resetData(state) {
      state.data = [];
      state.cachingTime = null;
      state.lastPageCached = 1;
    },
  },
});

export const { fetchDataSuccess, resetData } = albumsSlice.actions;

export default albumsSlice.reducer;

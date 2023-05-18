import { configureStore } from "@reduxjs/toolkit";
import searchHistoryReducer from "./searchHistorySlice";
import albumsReducer from './albumsSlice'
import photosReducer from './photosSlice'


const store = configureStore({
  reducer: {
    searchHistory: searchHistoryReducer,
    albums : albumsReducer,
    photos : photosReducer
  },
});

export default store;

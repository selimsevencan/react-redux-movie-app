import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies/MoviesSlice";
import movieDetailReducer from "./movies/MovieDetailSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetail: movieDetailReducer
  }
});

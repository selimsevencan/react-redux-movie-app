import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/helpers";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ name, pageNumber, year, type, season, episode }) => {
    const isEpisode = type === "episode";
    const querySearchName = isEpisode ? `t=${name}` : `s=${name}`;
    let query = `&${querySearchName}&page=${pageNumber}&type=${type}`;

    if (year) {
      query = `${query}&y=${year}`;
    }

    if (isEpisode) {
      query = `${query}&Season=${season}`;
      if (episode) {
        query = `${query}&Episode=${episode}`;
      }
    }

    const response = await fetchData(query);
    return response.data;
  }
);

const initialState = {
  data: [],
  loading: false
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: {
    [fetchMovies.pending]: () => {
      return {
        data: [],
        loading: true
      };
    },
    [fetchMovies.fulfilled]: (_, { payload }) => {
      return {
        data: payload,
        loading: false
      };
    },
    [fetchMovies.rejected]: () => {
      return initialState;
    }
  }
});

export const getAllMovies = (state) => state.movies;
export default movieSlice.reducer;

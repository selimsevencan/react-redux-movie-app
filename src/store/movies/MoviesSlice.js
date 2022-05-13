import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/helpers";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({name, pageNumber, year, type, season, episode}) => {
    const isEpisode = type === 'episode';
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
  movies: {
    data: [],
    loading: true,
  },
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: {
    [fetchMovies.pending]: (state) => {
      return {
        ...state, 
        movies: {
          data: [],
          loading: true,
        }
      }
    },
    [fetchMovies.fulfilled]: (state, { payload }) => {
      return {
          ...state, 
          movies: {
            data: payload,
            loading: false,
          }
        };
    },
    [fetchMovies.rejected]: (state, { payload}) => {
      return {
        ...state, 
        movies: {
          data: payload,
          loading: false,
        }
      };
    },
  }
});

export const getAllMovies = (state) => state.movies;
export default movieSlice.reducer;
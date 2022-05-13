import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/helpers";

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (id) => {
    const response = await fetchData(`&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  selectedMovie: {
    data: [],
    loading: true,
  },
};

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  extraReducers: {
    [fetchMovieDetail.pending]: (state) => {
      return {
        ...state, 
        selectedMovie: {
          data: [],
          loading: true,
        }
      }
    },
    [fetchMovieDetail.fulfilled]: (state, { payload }) => {
      return {...state, 
        selectedMovie: {
          data: payload,
          loading: false,
        }
      };
    },
    [fetchMovieDetail.rejected]: (state, { payload}) => {
      return {
        ...state, 
        selectedMovie: {
          data: [],
          loading: false,
        }
      };
    },
  }
});

export const getSelectedMovie= (state) => state.movieDetail.selectedMovie;
export default movieDetailSlice.reducer;
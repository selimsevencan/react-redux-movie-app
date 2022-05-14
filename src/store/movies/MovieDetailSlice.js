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
  data: [],
  loading: false
};

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  extraReducers: {
    [fetchMovieDetail.pending]: () => {
      return {
        data: [],
        loading: true
      };
    },
    [fetchMovieDetail.fulfilled]: (_, { payload }) => {
      return {
        data: payload,
        loading: false
      };
    },
    [fetchMovieDetail.rejected]: () => {
      return initialState;
    }
  }
});

export const getSelectedMovie = (state) => state.movieDetail;
export default movieDetailSlice.reducer;

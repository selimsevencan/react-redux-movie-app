import React, { useEffect } from "react";
import "./MovieDetail.scss";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieDetail,
  getSelectedMovie,
} from "../../store/movies/MovieDetailSlice.js";
import { Card, Skeleton } from 'antd';
const { Meta } = Card;

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const movieDetail = useSelector(getSelectedMovie);
  const {data, loading} = movieDetail;

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovieDetail(imdbID));
    }
  }, [imdbID, dispatch]);

  return (
    <div>
      {loading ? (
        <Skeleton active />
      ) : (
        <div className="movie-detail">
          <Card
            hoverable
            cover={<img src={data.Poster} alt={data.Title} />}
          >
            <Meta title={data.Title} />
          </Card>
          <div className="movie-info">           
            <div className="movie-rating">
              <p>
                IMDB Rating: {data.imdbRating} / {data.imdbVotes}
              </p>
              <p>
                Time : {data.Runtime}
              </p>
              <p>
                Year : {data.Year}
              </p>
            </div>
            <br />
            <div className="movie-plot"> {data.Plot}</div>
            <br />
            <div className="movie-detail-info">
                <p>Director: {' '} <span>{data.Director}</span></p>
                <p>Stars: {' '} <span>{data.Actors}</span></p>
                <p>Generes: {' '} <span>{data.Genre}</span></p>
                <p>Languages: {' '} <span>{data.Language}</span></p>
                <p>Awards: {' '} <span>{data.Awards}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
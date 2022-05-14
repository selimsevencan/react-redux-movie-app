import React, { useEffect } from "react";
import "./MovieDetail.scss";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieDetail,
  getSelectedMovie
} from "../../store/movies/MovieDetailSlice.js";
import { Skeleton, PageHeader } from "antd";

const MovieDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { imdbID } = params;
  const { data, loading } = useSelector(getSelectedMovie);

  useEffect(() => {
    dispatch(fetchMovieDetail(imdbID));
  }, [dispatch, imdbID]);

  return (
    <div>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <PageHeader 
            onBack={() => navigate(-1)}
            title={data.Title}
            className="site-page-header"
          />
          <div className="movie-detail">
            <img className="movie-image" src={data.Poster} alt={data.Title} />
            <div className="movie-info">
              <div className="movie-rating">
                <p>
                  IMDB Rating: {data.imdbRating} / {data.imdbVotes}
                </p>
                <p>Time : {data.Runtime}</p>
                <p>Year : {data.Year}</p>
              </div>
              <br />
              <div className="movie-plot"> {data.Plot}</div>
              <br />
              <div className="movie-detail-info">
                <p>
                  Director: <span>{data.Director}</span>
                </p>
                <p>
                  Stars: <span>{data.Actors}</span>
                </p>
                <p>
                  Generes: <span>{data.Genre}</span>
                </p>
                <p>
                  Languages: <span>{data.Language}</span>
                </p>
                <p>
                  Awards: <span>{data.Awards}</span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getAllMovies } from "../../store/movies/MoviesSlice.js";
import "./Home.scss";

import { Table, Button, Input, Select } from 'antd';
const { Option } = Select;

const defaultname = "Pokemon";

const columns = [
  {
    title: 'Name',
    dataIndex: 'Title',
    key: 'imdbID',
    render: (Title, Search) => <Link to={`/movie/${Search.imdbID}`}>{Title}</Link>,
  },
  {
    title: 'Release Time',
    key: 'imdbID',
    dataIndex: 'Year',
    render: (Year, Episodes) => {
      return <span>{Year || Episodes.Released}</span>
    }
  },
  {
    title: 'Id',
    dataIndex: 'imdbID',
    key: 'imdbID',
  },
];

const types = ['movie', 'series', 'episode'];

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector(getAllMovies);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [season, setSeason] = useState(0);
  const [episode, setEpisode] = useState(0);
  const [year, setYear] = useState(null);
  const [name, setName] = useState(defaultname);
  const [type, setType] = useState('movie');
  const isEpisode = type === 'episode';

  const { 
    movies: {
      loading, data
    } 
  } = movies;

  useEffect(() => {    
    dispatch(fetchMovies({name, pageNumber: 1, year, type }));
  }, []);
  
  useEffect(() => {
    if (data.Type === 'episode') {
      navigate(`/movie/${data.imdbID}`)
    }
  }, [data]);

  const onPageChange = (current, pageSize) => {
    setCurrentPage(current)
    const payload = {name, pageNumber: current, year, type, season, episode}
    dispatch(fetchMovies(payload));
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) return alert(`Please enter a ${!isEpisode ? type : 'series'} name!`);
    if (isEpisode && !season) return alert(`Please enter a season number!`);
    setCurrentPage(1);
    const payload = {
      name, pageNumber: 1, year, type, season, episode
    }
    dispatch(fetchMovies(payload));
  }

  return (
    <div>
      <div className="search-bar">
        <Select
          defaultValue={type}
          style={{ width: 200, textTransform: 'capitalize' }} 
          onChange={(value) => {
            setType(value);
            setName('');
          }}
        >
          {
            types.map(type => {
              return (
                <Option 
                  style={{ textTransform: 'capitalize' }}
                  value={type}
                >
                  {type}
                </Option>
              )
            })
          }
        </Select>
        {
          isEpisode &&
          <>
             <Input
              type="number"
              placeholder={`Enter a season number`}
              onChange={(e) => setSeason(e.target.value)}
            />
            <Input
              type="number"
              placeholder={'Enter an episode number'}
              onChange={(e) => setEpisode(e.target.value)}
            />
          </>
        }
        <Input
          type="text"
          placeholder={`Enter a ${!isEpisode ? type : 'series'} name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="number"
          value={year}
          placeholder="Enter a year"
          onChange={(e) => setYear(e.target.value)}
        />
        <Button type="primary" onClick={submitHandler}>
          Search
        </Button>
      </div>
      <Table 
        columns={columns} 
        showHeader
        loading={loading}
        bordered
        dataSource={data.Episodes || data.Search} 
        style={{padding: 16}}
        pagination={{
          total: data.totalResults,
          showSizeChanger: false,
          current: currentPage,
          onChange: onPageChange
        }}
      />
    </div>
  );
};

export default Home;
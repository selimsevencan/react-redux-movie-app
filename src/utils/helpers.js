import axios from "axios";

const APIKey = process.env.REACT_APP_API_KEY;
const API = process.env.REACT_APP_API_HOST;

export const fetchData = async (query) => {
  return axios.get(`${API}?apiKey=${APIKey}${query}`)
    .then(res => {
      return res;
    })
}

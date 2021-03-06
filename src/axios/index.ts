import axios from 'axios';

const api = axios.create({
  baseURL: 'api.openweathermap.org/data/2.5',
});

api.interceptors.request.use(config => {
  config.url =
    config.url + '&units=metric' + '&appid=' + process.env.REACT_APP_API_KEY;
  console.log(config.url);
  return config;
});

export default api;
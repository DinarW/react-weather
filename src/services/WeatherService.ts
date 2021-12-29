import { AxiosResponse } from 'axios';
// import api from '../axios';
import axios from 'axios';
import { Weather } from '../store/types/types';

export class WeatherService {
  static getCurrentWeather(city: string): Promise<AxiosResponse<Weather>> {
    // return api.get<Weather>(`/weather?q=${city}`);
    return axios.get<Weather>(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5a7a3f3fb488d1b0da8f6ccfc39b828e`);
  }
}

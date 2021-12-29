import { AxiosResponse } from 'axios';
// import api from '../axios';
import axios from 'axios';
import { currentWeather, weekWeather } from '../store/types/types';

export class WeatherService {
  static getCurrentWeather(city: string): Promise<AxiosResponse<currentWeather>> {
    // return api.get<Weather>(`/weather?q=${city}`);
    return axios.get<currentWeather>(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=5a7a3f3fb488d1b0da8f6ccfc39b828e`);
  }
  static getWeekWeather(latAndLon: [string, string]): Promise<AxiosResponse<weekWeather>> {
    return axios.get<weekWeather>(`https://api.openweathermap.org/data/2.5/onecall?lat=${latAndLon[0]}&lon=${latAndLon[1]}&exclude=current,hourly,minutely,alerts&lang=ru&units=metric&appid=5a7a3f3fb488d1b0da8f6ccfc39b828e`);
  }
}

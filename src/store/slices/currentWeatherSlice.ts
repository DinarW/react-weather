import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { currentWeather } from '../types/types';

type CurrentWeather = {
  weather: currentWeather;
  isLoading: boolean;
  response: Response;
};

type Response = {
  status: number;
  message: string;
};

const initialState: CurrentWeather = {
  weather: {
    main: {
      temp: 0,
      feels_like: 0,
      pressure: 0,
    },
    wind: {
      speed: 0,
      deg: 0,
    },
    name: 'Saint Petersburg, RU',
    weather: [
      {
        main: 'Clear',
        description: 'Без осадков',
      }
    ]
  },
  isLoading: false,
  response: {
    status: 0,
    message: '',
  },
};

export const currentWeatherSlice = createSlice({
  name: 'current_weather',
  initialState,
  reducers: {
    fetchCurrentWeather(state) {
      state.isLoading = true;
    },
    fetchCurrentWeatherSuccess(
      state,
      action: PayloadAction<AxiosResponse<currentWeather>>
    ) {
      state.isLoading = false;
      state.weather = action.payload.data;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
    fetchCurrentWeatherError(
      state,
      action: PayloadAction<AxiosResponse<currentWeather>>
    ) {
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
  },
});

export default currentWeatherSlice.reducer;

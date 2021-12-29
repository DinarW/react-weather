import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { weekWeather } from '../types/types';

type WeekWeather = {
  weather: weekWeather;
  isLoading: boolean;
  response: Response;
};

type Response = {
  status: number;
  message: string;
};

const initialState: WeekWeather = {
  weather: {
    daily: [
      {
        dt: Date.now(),
        temp: {
          day: 0,
          night: 0,
        },
        weather: [
          {
            main: 'Clouds',
            description: 'Дождилво',
          }
        ]
      }
    ]
  },
  isLoading: false,
  response: {
    status: 0,
    message: '',
  },
};

export const weekWeatherSlice = createSlice({
  name: 'current_weather',
  initialState,
  reducers: {
    fetchWeekWeather(state) {
      state.isLoading = true;
    },
    fetchWeekWeatherSuccess(
      state,
      action: PayloadAction<AxiosResponse<weekWeather>>
    ) {
      state.isLoading = false;
      state.weather = action.payload.data;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
    fetchWeekWeatherError(
      state,
      action: PayloadAction<AxiosResponse<weekWeather>>
    ) {
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
  },
});

export default weekWeatherSlice.reducer;

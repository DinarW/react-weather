import { RootState } from './store';

export const selectCurrentWeatherData = (state: RootState) =>
  state.currentWeatherSliceReducer;

export const selectWeekWeatherData = (state: RootState) =>
  state.weekWeatherSliceReducer;

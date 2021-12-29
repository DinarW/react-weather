import React from 'react'
import GlobalSvgSelector from '../../../../assets/icons/global/GlobalSvgSelector';
import { Weather } from '../../../../store/types/types';
import s from './ThisDay.module.scss';

interface Props {
  weather: Weather; 
}

const ThisDay = ({ weather }: Props) => {
  const date = new Date();
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');

  const cities = () => {
    const city = weather.name;
    switch (city) {
      case 'Moscow':
        return 'Москва';
      case 'Ufa':
        return 'Уфа';
      case 'Saint Petersburg':
        return 'Санкт-Петербург';
      case 'Vologda':
        return 'Вологда';
      default:
        return 'Буй';
    }
  };

  const weatherSky = () => {
    switch (weather.weather[0].main) {
      case 'Clear':
        return 'sun';
      case 'Clouds':
        return 'mainly_cloudy';
      default:
        return 'small-rain';
    }
  }

  return (
    <div className={s.this__day}>
      <div className={s.top__block}>
        <div className={s.top__block_wrapper}>
          <div className={s.this__temp}>{Math.floor(weather.main.temp)}°</div>
          <div className={s.this__day_name}>Сегодня</div>
        </div>
        <GlobalSvgSelector id={weatherSky()} />
      </div>
      <div className={s.bottom__block}>
        <div className={s.this__time}>
          Время: <span>{`${hours}:${minutes}`}</span>
        </div>
        <div className={s.this__city}>
          Город: <span>{cities()}</span>
        </div>
      </div>
    </div>
  )
}

export default ThisDay;

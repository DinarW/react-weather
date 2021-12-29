import React from 'react'
import { currentWeather } from '../../../../store/types/types';
import cloud from '../../../../assets/images/cloud.png';
import s from './ThisDayInfo.module.scss';
import ThisDayItem from './ThisDayItem';

interface Props {
  weather: currentWeather; 
}

export interface Item {
  icon_id: string;
  name: string;
  value: string;
};

const ThisDayInfo = ({ weather }: Props) => {
  const windDirection = () => {
    const directions = 
    ['северный', 'северо-восточный', 'восточный', 'юго-восточный', 'южный', 'юго-западный', 'юго-западный', 'западный', 'северо-западный'];
    let { deg } = weather.wind;
    deg += 22.5;
    if (deg < 0)
      deg = 360 - Math.abs(deg) % 360;
    else
      deg = deg % 360;
    let w = parseInt((deg / 45).toString());
    return `${directions[w]}`;
  };

  const items = [
    {
      icon_id: 'temp',
      name: 'Температура',
      value: `${Math.floor(weather.main.temp)} - ощущается как ${Math.floor(weather.main.feels_like)}`,
    },
    {
      icon_id: 'pressure',
      name: 'Давление',
      value: `${weather.main.pressure} дюймов ртутного столба`,
    },
    {
      icon_id: 'precipitation',
      name: 'Осадки',
      value: `${weather.weather[0].description.split('').map((w, i) => i === 0 ? w.toUpperCase() : w).join('')}`,
    },
    {
      icon_id: 'wind',
      name: 'Ветер',
      value: `${Math.round(weather.wind.speed)} м/с ${windDirection()}`,
    },
  ];

  return (
    <div className={s.this__day_info}>
      <div className={s.this__day_info_items}>
        {items.map((item: Item) => (
          <ThisDayItem key={item.icon_id} item={item} />
        ))}
      </div>
      <img className={s.cloud__img} src={cloud} alt="облако" />
    </div>
  );
}

export default ThisDayInfo

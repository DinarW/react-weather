import React from 'react';
import { useCustomSelector } from '../../../../hooks/store';
import { selectWeekWeatherData } from '../../../../store/selectors';
import Card from './Card';

import s from './Days.module.scss';
// import Tabs from './Tabs';

interface Props {}

export interface Day {
  name: string;
  day_info: string;
  icon_id: string;
  temp_day: number;
  temp_night: number;
  info: string;
}

const weekNumbersDay = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
];

const icon = (description: string) => {
  switch (description) {
    case 'Snow':
      return 'rain';
    case 'Clouds':
      return 'mainly_cloudy';
    default:
      return 'small_rain_sun';
  }
};

const currentDayNumber = new Date();
const msNow = Date.now();
const oneDayMs = 86400000;

const Days = (props: Props) => {
  const [days, setDays] = React.useState<Day[]>([]);
  const { weather } = useCustomSelector(selectWeekWeatherData);

  React.useEffect(() => {
    console.log(weather.daily[0].temp);
    const weekDays: Day[] = weather.daily.slice(0, 6).map((day, i) => ({ 
      name: weekNumbersDay[(currentDayNumber.getDay() + i) % 7],
      temp_day: Math.floor(day.temp.day),
      temp_night: Math.floor(day.temp.night),
      icon_id: icon(day.weather[0].main),
      day_info: new Date(msNow + i * oneDayMs).toLocaleDateString('RU'),
      info: day.weather[0].description.split('').map((w, i) => i === 0 ? w.toUpperCase() : w).join(''),
    }));
    setDays(weekDays);
  }, [weather]);

  return (
    <>
      {/* <Tabs /> */}
      <div className={s.days}>
        {days.map((day: Day) => (
          <Card key={day.name} day={day} />
        ))}
      </div>
    </>
  );
};

export default Days;

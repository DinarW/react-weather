import React from 'react';
import Select from 'react-select';
import GlobalSvgSelector from '../../assets/icons/global/GlobalSvgSelector';
import { Theme } from '../../context/ThemeContext';
import { useCustomDispatch } from '../../hooks/store';
import { useTheme } from '../../hooks/useTheme';
import { fetchCurrentWeather } from '../../store/thunks/fetchCurrentWeather';
import { fetchWeekWeather } from '../../store/thunks/fetchWeekWeather';
import s from './Header.module.scss';

const options = [
  { value: 'Saint Petersburg, RU', label: 'Санкт-Петербург', lat: '59.94', lon: '30.31' },
  { value: 'Moscow', label: 'Москва', lat: '55.45', lon: '37.37' },
  { value: 'Ufa', label: 'Уфа', lat: '54.43', lon: '55.58' },
  { value: 'Vologda', label: 'Вологда', lat: '59.13', lon: '39.53' },
  { value: 'Buy', label: 'Буй', lat: '58.47', lon: '41.53' },
  { value: 'Tbilisi', label: 'Тбилиси', lat: '41.69', lon: '44.83' },
];

interface Props {}

const Header: React.FC = (props: Props) => {
  const [city, setCity] = React.useState('Saint Petersburg, RU');
  const theme = useTheme();
  const dispatch = useCustomDispatch();

  React.useEffect(() => {
    dispatch(fetchCurrentWeather(city));
    const cityObj = options.find((obj) => obj.value === city);
    if (cityObj) {
      dispatch(fetchWeekWeather([cityObj.lat, cityObj.lon]));
    }
  }, [dispatch, city]);

  const colourStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor:
        theme.theme === Theme.DARK ? '#4F4F4F' : 'rgba(71, 147, 255, 0.2)',
      width: '194px',
      height: '37px',
      border: 'none',
      borderRadius: '10px',
      zIndex: 100,
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: theme.theme === Theme.DARK ? '#fff' : '#000',
    }),
  };

  function toggleTheme() {
    theme.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <div className={s.logo}>
          <GlobalSvgSelector id="header-logo" />
        </div>
        <div className={s.title}>React weather</div>
      </div>
      <div className={s.wrapper}>
        <div className={s.toggle_theme} onClick={toggleTheme}>
          <GlobalSvgSelector id="toggle-theme" />
        </div>
        <Select
          onChange={(e) => e?.value ? setCity(e?.value) : null}
          defaultValue={options[0]}
          styles={colourStyles}
          options={options}
        />
      </div>
    </header>
  );
};

export default Header;

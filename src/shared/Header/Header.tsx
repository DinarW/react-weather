import React from 'react';
import Select from 'react-select';
import GlobalSvgSelector from '../../assets/icons/global/GlobalSvgSelector';
import { Theme } from '../../context/ThemeContext';
import { useCustomDispatch } from '../../hooks/store';
import { useTheme } from '../../hooks/useTheme';
import { fetchCurrentWeather } from '../../store/thunks/fetchCurrentWeather';
import s from './Header.module.scss';

const options = [
  { value: 'Saint Petersburg, RU', label: 'Санкт-Петербург' },
  { value: 'Moscow', label: 'Москва' },
  { value: 'Ufa', label: 'Уфа' },
  { value: 'Vologda', label: 'Вологда' },
];

interface Props {}

const Header: React.FC = (props: Props) => {
  const [city, setCity] = React.useState('Saint Petersburg, RU');
  const theme = useTheme();
  const dispatch = useCustomDispatch();

  React.useEffect(() => {
    dispatch(fetchCurrentWeather(city));
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

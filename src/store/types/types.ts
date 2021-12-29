export type currentWeather = {
  main: {
    temp: number;
    feels_like: number;
    pressure: number,
  };
  name: string,
  wind: {
    speed: number;
    deg: number;
  }
  weather: [
    {
      main: string;
      description: string;
    }
  ]
};

export type weekWeather = {
  daily: [
    {
      dt: number;
      temp: {
        day: number,
        night: number,
      }
      weather: [
        {
          main: string,
          description: string,
        }
      ]
    }
  ]
}

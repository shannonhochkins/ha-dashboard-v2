import { useEffect, useState } from "react";
const KEY = process.env.WEATHER_API_KEY;
const lat = 33.2553;
const lon = 151.4749;

type WeatherTypes =
  'Thunderstorm' |
  'Drizzle' |
  'Rain' |
  'Snow' |
  'Mist' |
  'Haze' |
  'Smoke' |
  'Dust' |
  'Ash' |
  'Squall' |
  'Tornado' |
  'Fog' |
  'Clear' |
  'Clouds';

interface Shared {
  dt: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  clouds: number;
  dew_point: number;
  uvi: number;
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

interface Weather {
  id: number;
  main: WeatherTypes;
  description: string;
  icon: string;
}

interface CurrentWeather extends Shared {
  feels_like: number;
  temp: number;
  visibility: number;
  weather: Weather[];
}
interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface DailyWeather extends Shared {
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  temp: Temp;
  weather: Weather[];
  moon_phase: number;
  moon_rise: number;
  moonset: number;
  pop: number;
}

interface HourlyWeather extends Shared {
  weather: Weather[];
}

interface WeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  daily: DailyWeather[];
  hourly: HourlyWeather[];
}
 
export const useWeather = () => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
  fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`)
    .then((res) => res.json())
    .then((data) => {
        setError(data.error)
        setData(data)
        setIsLoading(false)
    })
  }, []);
 
  return { data, isLoading, error };
};
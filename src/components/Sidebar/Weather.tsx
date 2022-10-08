import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';


import {
  DayClearIcon,
  DayPartlyCloudyIcon,
  NightClearIcon,
  NightPartlyCloudyIcon,
  FogIcon,
  CloudyIcon,
  ShowerIcon,
  SnowIcon,
  ThunderstormIcon,
} from './assets/icon';



const WeatherRowContainer = styled.div`
  width: 100%;
  height: 46px;
  display: flex;
  padding: 10px;
  align-items: center;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.1);
`;

const TimeCityContainer = styled.div`
  flex-grow: 1;
`;

const City = styled.div`
  color: #FFFFFFE0;
  font-size: 12px;
`;

const Temperature = styled.div`
  width: 36px;
  text-align: right;
  color: #FFFFFFE0;
  font-size: 18px;
`;

const Icon = styled.div`
  width: 22px;
  text-align: center;
`;

const Image = styled.img`
  height: auto;
  width: auto;
  max-height: 18px;
  max-width: 22px;
`;

export function WeatherRow(props) {
  const { weather } = props;

  let weatherIcon = null;

  if (weather) {
    switch(weather.iconId) {
      case '01d': // Clear
        weatherIcon = DayClearIcon;
        break;
      case '01n':
        weatherIcon = NightClearIcon;
        break;
      case '02d': // Partly Cloudy
        weatherIcon = DayPartlyCloudyIcon;
        break;
      case '02n':
        weatherIcon = NightPartlyCloudyIcon;
        break;
      case '03d': // Cloud
        weatherIcon = CloudyIcon;
        break;
      case '03n':
        weatherIcon = CloudyIcon;
        break;
      case '04d': // Heavy cloud
        weatherIcon = CloudyIcon;
        break;
      case '04n':
        weatherIcon = CloudyIcon;
        break;
      case '09d': // Light Rain
        weatherIcon = ShowerIcon;
        break;
      case '09n':
        weatherIcon = ShowerIcon;
        break;
      case '10d': // Heavy Rain
        weatherIcon = ShowerIcon;
        break;
      case '10n':
        weatherIcon = ShowerIcon;
        break;
      case '11d': // Thunderstorm
        weatherIcon = ThunderstormIcon;
        break;
      case '11n':
        weatherIcon = ThunderstormIcon;
        break;
      case '13d': // Snow
        weatherIcon = SnowIcon;
        break;
      case '13n':
        weatherIcon = SnowIcon;
        break;
      case '50d': // Mist
        weatherIcon = FogIcon;
        break;
      case '50n':
        weatherIcon = FogIcon;
        break;
      default:
        weatherIcon = CloudyIcon;
    }
  }

  return (
    <WeatherRowContainer>
      <TimeCityContainer>
        <City>{weather.city}</City>
      </TimeCityContainer>
      <Icon><Image src={weatherIcon} /></Icon>
      <Temperature>{weather.temp}&#176;</Temperature>
    </WeatherRowContainer>
  );
}

const apiKey = '6fab242a97455d7bbda28668ee6c028c';

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const result = (await axios.get(url)).data;
  const weatherInfo = {
    temp: Math.floor(result.main.temp),
    main: result.weather[0].main,
    city: result.name,
    timezone: result.timezone,
    iconId: result.weather[0].icon
  };
  return weatherInfo;
}

const CardTitle = styled.div`
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: rgba(255, 255, 255, 0.04);
  color: rgb(209, 213, 219);;
  padding-left: 10px;
  box-sizing: border-box;
  font-size: 13px;
  font-weight: font-weight: 500;
`;

const WeatherCardContainer = styled.div`
  width: 100%;
  height: initial;
  padding: 0px;
  cursor: unset;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  border-radius: 12px;
`;

const cities = [
  'Hamlyn Terrace, AU',
];

async function loadWeathers(cities) {
    const promises = cities.map((city) => getWeather(city));
    const results = await Promise.all(promises);
    return results;
}
export function Weather() {
  const [weather, setWeather] = useState();

  useEffect(() => {
    loadWeathers(cities).then((results) => {
      setWeather(results);
    });
  }, []);

  return (
    <WeatherCardContainer>
      <CardTitle>Weather</CardTitle>
      {weather && weather.map((w) => (
        <WeatherRow key={w.city} weather={w} />
      ))}
    </WeatherCardContainer>
  );
}

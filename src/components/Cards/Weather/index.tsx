import React from 'react';
import styled from '@emotion/styled';
import { useEntity, useWeather, useHass } from '@hooks';
import { MediaCard } from '@components';
import { WeatherIcon } from './WeatherIcon';

const ForecastContent = styled.div`
  width:90%;
  height:90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5%;
`;

const Temperature = styled.span`
  font-size: 32px;
  line-height: 32px;
`;
const Forecast = styled.div`
  font-size: 16px;
  line-height: 18px;
  text-transform: capitalize;
`;
interface WeatherCardProps {
  onClick: () => void;
}

const stateMapping = {
  Thunderstorm: ''
}


const mapping = {
  "clear-night": "Clear, night",
  "cloudy": "Cloudy",
  "exceptional": "Exceptional",
  "fog": "Fog",
  "hail": "Hail",
  "lightning": "Lightning",
  "lightning-rainy": "Lightning, rainy",
  "partlycloudy": "Partly cloudy",
  "pouring": "Pouring",
  "rainy": "Rainy",
  "snowy": "Snowy",
  "snowy-rainy": "Snowy, rainy",
  "sunny": "Sunny",
  "windy": "Windy",
  "windy-variant": "Windy"
}

export function WeatherCard({
  onClick
}: WeatherCardProps) {
  const hass = useHass();
  const weather = useEntity('weather.freesia');
  const { data, isLoading } = useWeather();
  const { attributes, state } = weather;
  const { temperature, forecast } = attributes;

  return data ? <MediaCard shiftColor={0} onClick={onClick} svg={<WeatherIcon />}>
    <ForecastContent>
      <Temperature>{data.current.temp.toFixed(0)}°</Temperature>
      <Forecast>{data.current.weather[0].description}</Forecast>
    </ForecastContent>
  </MediaCard> : null;
}
import React, { useEffect, useState, ReactNode } from 'react';
import { useEntity, useWeather } from '@hooks';
import { Base, Cloudy, CloudyDay, CloudyNight, Rain, Fog, Thunderstorm, ClearDay, ClearNight } from './svgs';

export function WeatherIcon() {
  const [icon, setIcon] = useState<ReactNode>(null);
  const { state: sunState } = useEntity('sun.sun');
  const { data, isLoading } = useWeather();

  useEffect(() => {
    if (data === null) {
      return;
    }
    const { main, description } = data.current.weather[0];
    let weatherIcon = null;
    switch(main) {
      case 'Clear':
        weatherIcon = sunState === 'above_horizon' ? <ClearDay /> : <ClearNight />;
      break;
      case 'Clouds':
        if (description.includes('overcast')) {
          weatherIcon = <Cloudy />
        } else {
          weatherIcon = sunState === 'above_horizon' ? <CloudyDay /> : <CloudyNight />;
        }
        break;
      case 'Rain':
        weatherIcon = <Rain />;
        break;
      case 'Thunderstorm':
        weatherIcon = <Thunderstorm />;
        break;
      case 'Fog':
      case 'Mist':
      case 'Haze':
      case 'Dust':
      case 'Smoke':
        weatherIcon = <Fog />;
        break;
      default:
        weatherIcon = <Cloudy />;
    }
    if (icon !== weatherIcon) {
      setIcon(weatherIcon);
    }
  }, [data]);

  return icon && <><Base />{icon}</>;
}

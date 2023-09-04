import { useEffect, useState } from 'react';
import { useWeather } from '@hooks';
import { useEntity } from '@hakit/core';
import { Base, Cloudy, CloudyDay, CloudyNight, Rain, Fog, Thunderstorm, ClearDay, ClearNight } from './svgs';
import { Icon } from '@iconify/react';
import { WeatherTypes } from '../../../../hooks/useWeather';

interface WeatherIconProps {
  className?: string;
  name?: WeatherTypes;
  animated?: boolean;
}

export function WeatherIcon({ className, name, animated = true }: WeatherIconProps) {
  const [icon, setIcon] = useState<JSX.Element | null>(null);
  const { state: sunState } = useEntity('sun.sun');
  const { data, isLoading } = useWeather();

  useEffect(() => {
    if (data === null) {
      return;
    }
    const { main, description } = data.current.weather[0];
    let weatherIcon = null;
    switch(name || main) {
      case 'Clear':
        if (animated) {
          weatherIcon = sunState === 'above_horizon' ? <ClearDay /> : <ClearNight />;
        } else {
          weatherIcon = sunState === 'above_horizon' ? <Icon icon="material-symbols:clear-day" /> : <Icon icon="fluent-mdl2:clear-night" />;
        }
      break;
      case 'Clouds':
        if (animated) {
          if (description.includes('overcast')) {
            weatherIcon = <Cloudy />
          } else {
            weatherIcon = sunState === 'above_horizon' ? <CloudyDay /> : <CloudyNight />;
          }
        } else {
          if (description.includes('overcast')) {
            weatherIcon = <Icon icon="fluent-mdl2:cloudy" />
          } else {
            weatherIcon = sunState === 'above_horizon' ? <Icon icon="fluent-mdl2:partly-cloudy-day" /> : <Icon icon="fluent-mdl2:partly-cloudy-night" />;
          }
        }
        break;
      case 'Rain':
        if (animated) {
          weatherIcon = <Rain />;
        }
        else {
          weatherIcon = sunState === 'above_horizon' ? <Icon icon="fluent-mdl2:rain-showers-day" /> : <Icon icon="fluent-mdl2:rain-showers-night" />;
        }
        break;
      case 'Thunderstorm':
        if (animated) {
          weatherIcon = <Thunderstorm />;
        } else {
          weatherIcon = <Icon icon="fluent-mdl2:thunderstorms" />;
        }
        break;
      case 'Fog':
      case 'Mist':
      case 'Haze':
      case 'Dust':
      case 'Smoke':
        if (animated) {
          weatherIcon = <Fog />;
        } else {
          weatherIcon = <Icon icon="fluent-mdl2:fog" />
        }
        break;
      default:
        weatherIcon = <Cloudy />;
    }
    if (icon === null || icon.type?.name !== weatherIcon.type.name) {
      setIcon(weatherIcon);
    }
  }, [animated, data, icon, name, sunState]);

  return isLoading ? <Icon icon="eos-icons:three-dots-loading" /> : icon && <><Base /><div className={className}>{icon}</div></>;
}

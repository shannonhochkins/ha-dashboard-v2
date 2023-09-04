import { ReactNode, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import { Line as LineBase } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Gradient from 'chartjs-plugin-gradient';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { useWeather, useDevice, mq } from '@hooks';
import { Temp, WeatherResponse } from '../../../hooks/useWeather';
import { WeatherIcon as WeatherIconBase } from './WeatherIcon';
import { isEqual } from 'lodash';
export { WeatherIcon } from './WeatherIcon';


const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const WeatherIcon = styled(WeatherIconBase)`
  width: 100px;
  height: 100px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const WeatherIconSmall = styled(WeatherIconBase)`
  width: 30px;
  height: 30px;
  margin: 8px 0;
  svg {
    width: 100%;
    height: 100%;
  }
  ${mq(['mobile'], `
    width: 20px;
    height: 20px;
    margin: 4px 0;
  `)}
`;

const Umbrella = styled(Icon)`
  margin-right: 8px;
  ${mq(['mobile'], `
    margin-right: 4px;
  `)}
`;

const Row = styled.div<{
  active?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
  ${props => typeof props.active === 'boolean' ? `display: ${props.active ? 'flex' : 'none'};` : ''}
`;


const Weather = styled.div`
  color: white;
  width: 100%;
`;
const CurrentTemperature = styled.h2`
  font-size: 120px;
  line-height: 120px;
  font-family: "Kanit", sans-serif;
  margin: 30px 0;
  ${mq(['mobile'], `
    font-size: 60px;
    line-height: 60px;
  `)}
  ${mq(['fridge'], `
    font-size: 180px;
    line-height: 180px;
  `)}
`;
const CurrentWeatherDescription = styled.h2`
  font-size: 36px;
  line-height: 40px;
  margin: 0;
  text-transform: capitalize;
  font-family: "Kanit", sans-serif;
`;
const Location = styled.h1`
  font-size: 36px;
  line-height: 40px;
  margin: 0;
  font-family: "Kanit", sans-serif;
  ${mq(['fridge'], `
    font-size: 44px;
    line-height: 50px;
  `)}
`;

const Predictions = styled(Row)`
  font-size: 16px;
  ${mq(['mobile'], `
    font-size: 12px;
  `)}
`;

const FeelsLike = styled(Row)`
  font-size: 24px;
  line-height: 30px;
  margin-top: 10px;
  font-family: "Kanit", sans-serif;
`;

const ChartWrapper = styled(Row)<{
  view: 'daily' | 'hourly'
}>`
  position: relative;
  height: 200px;
  ${mq(['mobile'], `
    height: 150px;
  `)}
  ${props => props.view === 'daily' && `
    width: 93% !important;
    margin-left: -10px;
    ${mq(['mobile'], `
      width: 100% !important;
    `)}
  `}
  ${props => props.view === 'hourly' && `
    width: 96% !important;
    margin-left: -10px;
    ${mq(['mobile'], `
      width: 100% !important;
    `)}
  `}
`;
const Line = styled(LineBase)``;

ChartJS.register(
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ChartDataLabels,
  Gradient,
);


function toDate(dt: number, options?: Intl.DateTimeFormatOptions) {
  return new Date((dt * 1000)).toLocaleDateString('en-AU', options || {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  });
}

function toTemp(input: number) {
  return `${Number(input).toFixed(0)}°`;
}
const ToggleBase = styled.button<{
  active: boolean
}>`
  all: unset;
  padding: 10px 30px;
  border: 1px solid;
  border-radius: 20px;
  color: white;
  font-weight: 300;
  transition: all 200ms;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  background-color: ${props => props.active ? 'white' : 'transparent'};
  border-color: ${props => props.active ? '#111' : 'white'};
  color: ${props => props.active ? '#111' : 'white'};
  margin: 20px 10px;
  ${mq(['fridge'], `
    margin: 40px 20px;
  `)}
`;
function Toggle({
  onClick,
  children,
  active
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return <ToggleBase active={active} onClick={onClick}>
    {children}
  </ToggleBase>
}


export function WeatherCard() {
  const [view, setView] = useState<'hourly' | 'daily'>('daily');
  const { data, isLoading } = useWeather();
  const [chartData, setChartData] = useState<unknown | null>(null);
  const device = useDevice();
  const today = new Date();
  const hour = today.getHours();
  let time: keyof Temp = 'morn';
  // Parts of the Day.
  // Morning 5 am to 12 pm (noon)
  // Afternoon 12 pm to 5 pm.
  // Evening 5 pm to 9 pm.
  // Night 9 pm to 4 am.

  if (hour >= 5 && hour < 12) {
    time = "morn";
  } else if (hour >= 12 && hour < 17) {
    time = "day";
  } else if (hour >= 17 && hour < 21) {
    time = "eve";
  } else {
    time = 'night';
  }
  
  const hourlyTemperatures = (data?.hourly || []).map(hourly => hourly.temp).slice(0, 24);
  const minTemp = Math.min(...hourlyTemperatures);
  const maxTemp = Math.max(...hourlyTemperatures);
  const hourlyData = (data?.hourly || []).slice(0, device === 'mobile' ? 6 : 10);
  const dailyData = (data?.daily || []).slice(0, device === 'mobile' ? 6 : 7).map(data => ({
    ...data,
    temp: data.temp[time]
  }));

  const hourlyLabels = hourlyData.map(() => '');
  const dailyLabels = dailyData.map(() => '');

  useEffect(() => {
    const newChartData = {
      labels: view === 'daily' ? dailyLabels : hourlyLabels,
      datasets: [
        {
          label: 'Dataset 1',
          data: (view === 'daily' ? dailyData : hourlyData).map(data => data.temp),
          fill: true,
          gradient: {
            backgroundColor: {
              axis: 'y',
              colors: {
                0: 'rgb(0 77 113)',
                100: 'rgb(0 138 203)',
                
              }
            }
          }
        },
      ],
    };
    if (!isEqual(chartData, newChartData)) {
      setChartData(newChartData);
    }
  }, [hourlyLabels, dailyLabels, view, dailyData, hourlyData, chartData]);

  if (isLoading) {
    return null;
  }
  const weatherData = data as WeatherResponse;

  return <Weather>
    <Column>
      <Location>Hamlyn Terrace</Location>
      <Row><CurrentTemperature>{toTemp(weatherData.current.temp)}</CurrentTemperature> <WeatherIcon /></Row>
      <CurrentWeatherDescription>{weatherData.current.weather[0].description}</CurrentWeatherDescription>
      <FeelsLike>
        Feels like: {toTemp(weatherData.current.feels_like)}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;<Icon icon="akar-icons:arrow-up" />&nbsp;{toTemp(maxTemp)} <Icon icon="akar-icons:arrow-down" />&nbsp;{toTemp(minTemp)}
      </FeelsLike>
      <Row>
        <Toggle active={view === 'hourly'} onClick={() => setView('hourly')}>Hourly</Toggle>
        <Toggle active={view === 'daily'} onClick={() => setView('daily')}>Daily</Toggle>
      </Row>
      <ChartWrapper view={view}>
        <Line
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                formatter: Math.round,
                anchor: 'end',
                align: 'top',
                color: '#36A2EB'
              }
            },
            layout: {
              padding: 30
            },
            scales: {
              x: {
              },
              y: {
                ticks: {
                  display: false,
                }
              }
            }
            
          }}
          // @ts-expect-error - simply don't want to type this out as it will be scrapped soon
          data={chartData} />
      </ChartWrapper>
      <Predictions active={view === 'daily'}>{dailyData.map((daily, index) => {
        return <Column key={daily.dt}>
          <Row>
            {index === 0 ? 'Today' : toDate(daily.dt, {
              weekday: 'short',
              day: '2-digit',
            })}
          </Row>
          <Row>
            <WeatherIconSmall name={daily.weather[0].main} animated={false} />
          </Row>
          <Row>
            <Umbrella icon="fluent-mdl2:umbrella" /> {Number(daily.pop * 100).toFixed(0)}%
          </Row>
        </Column>
      })}
      </Predictions>
      <Predictions active={view === 'hourly'}>
        {hourlyData.map(hourly => {
          const d = new Date(hourly.dt * 1000);
          const amOrPm = (d.getHours() < 12) ? "AM" : "PM";
          const hour = (d.getHours() < 12) ? d.getHours() : d.getHours() - 12;
          return <Column key={hourly.dt}>
            <Row>
            {hour === 0 ? 12 : hour}{amOrPm}
            </Row>
            <Row>
              <WeatherIconSmall name={hourly.weather[0].main} animated={false} />
            </Row>
            <Row>
              <Umbrella icon="fluent-mdl2:umbrella" /> {Number(hourly.pop * 100).toFixed(0)}%
            </Row>
          </Column>
        })}
      </Predictions>
    </Column>
  </Weather>
}
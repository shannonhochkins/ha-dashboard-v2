import styled from '@emotion/styled';
import { AreaBase } from '../AreaBase';
import { WeatherCard } from '@components';
import { mq } from '@hooks';

const WeatherContainer = styled(AreaBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    width: 100%;
    max-width: 1000px;
    ${mq(['fridge'], `
      max-width: 800px;
    `)}
  }
`;

export function Weather() {
  return <WeatherContainer>
    <WeatherCard />
  </WeatherContainer>
}
import React from 'react';
import styled from '@emotion/styled';
import { AreaBase, AreaBaseProps } from '../AreaBase';
import { WeatherCard } from '@components';
import { useMq } from '@hooks';

const WeatherContainer = styled(AreaBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    width: 100%;
    max-width: 1000px;
    ${useMq(['fridge'], `
      max-width: 800px;
    `)}
  }
`;

export function Weather() {
  return <WeatherContainer>
    <WeatherCard />
  </WeatherContainer>
}
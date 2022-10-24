import React from 'react';
import styled from '@emotion/styled';
import { AreaBase, AreaBaseProps } from '../AreaBase';
import { useMq } from '@hooks';
import { ThermostatCard } from '@components';

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;


const ACContainer = styled(AreaBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  ${useMq(['desktop'], `
    ${Inner} {
      flex-direction: row;
    }
  `)}
`;

export function AirConditioner({ direction }: AreaBaseProps) {
  return <ACContainer direction={direction}>
    <ThermostatCard />
  </ACContainer>
}
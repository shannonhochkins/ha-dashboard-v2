import React from 'react';
import styled from '@emotion/styled';
import { AreaBase, AreaBaseProps } from '../AreaBase';
import { AreaCard } from '../AreaCard';
import base from '@assets/garage-base.jpg';
import downlights from '@assets/garage-lights.jpg';
import { Downlights } from './zones';

const GarageContainer = styled(AreaBase)`
  
`;

export function Garage({ direction }: AreaBaseProps) {
  const zones = [{
    base: downlights,
    overlay:  {
      renderSvg: onClick => <Downlights onClick={onClick} />,
      top: '0%',
      left: '0%',
      width: '100%',
    },
    entities: {
      switch: 'switch.switch_light_garage_main',
    }
  }];
  return <GarageContainer direction={direction}>
    <AreaCard base={base} zones={zones} />
  </GarageContainer>
}
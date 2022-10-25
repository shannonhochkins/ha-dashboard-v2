import React  from 'react';
import styled from '@emotion/styled';
import { useHass } from '@hooks';
import { AreaBase, AreaBaseProps } from '../AreaBase';
import { AreaCard } from '../AreaCard';
import diningBase from '@assets/dining-base-optimised.jpg';
import diningLight from '@assets/dining-light-optimised.jpg';
import { Roof } from './zones';

const DiningContainer = styled(AreaBase)``;

export function Dining({ direction }: AreaBaseProps) {
  const zones = [{
    base: diningLight,
    overlay:  {
      top: '9%',
      left: '62%',
      width: '8%',
      renderSvg: onClick => <Roof onClick={onClick} />,
    },
    entities: {
      switch: 'switch.stairs_bottom_dining',
    }
  }];
  return <DiningContainer direction={direction}>
    <AreaCard base={diningBase} zones={zones} />
  </DiningContainer>
}
import React from 'react';
import styled from '@emotion/styled';
import { AreaBase, AreaBaseProps } from '../AreaBase';
import { AreaCard } from '../AreaCard';
import livingBase from '@assets/living-base.jpg';
import livingLight from '@assets/living-light.jpg';
import livingTV from '@assets/living-tv.jpg';
import { TV, Roof } from './zones';

const LivingContainer = styled(AreaBase)``;


export function Living({ direction }: AreaBaseProps) {
  const zones = [{
    base: livingLight,
    overlay:  {
      top: '14%',
      left: '40.6%',
      width: '8%',
      renderSvg: onClick => <Roof onClick={onClick} />,
    },
    entities: {
      switch: 'switch.switch_back_sliding_door_living_room_light',
    }
  }, {
    base: livingTV,
    overlay:  {
      top: '37%',
      left: '60%',
      width: '17.1%',
      renderSvg: onClick => <TV onClick={onClick} />,
    },
    entities: {
      switch: 'switch.smartthings_75_sensors',
    }
  }];

  return <LivingContainer direction={direction}>
    <AreaCard base={livingBase} zones={zones} />
  </LivingContainer>
}
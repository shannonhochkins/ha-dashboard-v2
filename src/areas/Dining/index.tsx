import React  from 'react';
import styled from '@emotion/styled';
import { AreaBase } from '../AreaBase';
import { AreaCard } from '../AreaCard';
import { Roof } from './zones';
import { CoverCard } from '@components';

import diningBase from '@assets/dining-base-optimised.jpg';
import diningLight from '@assets/dining-light-optimised.jpg';

const DiningContainer = styled(AreaBase)``;

export function Dining() {
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
  return <DiningContainer>
    <AreaCard base={diningBase} zones={zones} footer={<>
      <CoverCard entity="cover.curtain_patio_main_curtain" label="Main Curtain" />
      <CoverCard entity="cover.curtain_pool_window_curtain" label="Pool Curtain" />
    </>} />
  </DiningContainer>
}
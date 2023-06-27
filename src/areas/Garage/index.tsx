import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import { AreaBase } from '../AreaBase';
import { AreaCard } from '../AreaCard';
import base from '@assets/garage-base.jpg';
import downlights from '@assets/garage-lights.jpg';
import { CoverCard } from '@components';
import { Downlights, GarageDoor } from './zones';
import { useHass, useEntity } from 'ha-component-kit';

const GarageContainer = styled(AreaBase)`
  
`;
export function Garage() {
  const { callService } = useHass();
  const callCover = useCallback(entity => {
    callService({
      domain: 'cover',
      service: 'toggle',
      target: {
        entity_id: entity
      }
    })
  }, []);
  const garageMain = useEntity('cover.garage_door_main');
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
  }, {
    base: null,
    overlay:  {
      renderSvg: () => <GarageDoor onClick={() => {
        callCover('cover.garage_door_main');
      }} />,
      top: '23.4%',
      left: '0%',
      width: '40.7%',
    },
  }];
  return <GarageContainer>
    <AreaCard base={base} zones={zones} footer={<>
      <CoverCard entity="cover.garage_door_main" label="Main Garage" type="garage" />
    </>} />
  </GarageContainer>
}
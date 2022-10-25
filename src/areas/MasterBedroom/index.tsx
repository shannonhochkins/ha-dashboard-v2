import React from 'react';
import styled from '@emotion/styled';
import { useHass } from '@hooks';
import { AreaBase, AreaBaseProps } from '../AreaBase';
import { AreaCard } from '../AreaCard';
import base from '@assets/bedroom-base.jpg';
import tv from '@assets/bedroom-tv.jpg';
import roofLight from '@assets/bedroom-light-roof.jpg';
import { Roof, TV, Soundbar } from './zones';

const MasterBedroomContainer = styled(AreaBase)`
  
`;

export function MasterBedroom({ direction }: AreaBaseProps) {
  const { callService } = useHass();
  const zones = [{
    base: roofLight,
    overlay:  {
      top: '10.5%',
      left: '36.9%',
      width: '8.5%',
      renderSvg: onClick => <Roof onClick={onClick} />,
    },
    entities: {
      switch: 'switch.switch_master_bedroom_light',
    }
  }, {
    base: tv,
    overlay:  {
      top: '18.8%',
      left: '56%',
      width: '20.4%',
      renderSvg: onClick => <TV onClick={onClick} />,
    },
    entities: {
      switch: 'switch.tv_master_bedroom',
    }
  }, {
    base: null,
    overlay:  {
      top: '40.2%',
      left: '57.3%',
      width: '14.4%',
      renderSvg: () => <Soundbar onClick={() => {
        callService('remote', 'send_command', {
          device: 'Soundbar',
          command: 'Power'
        }, {
          device_id: '3b5cd884569e393b965c72ad576cd13b',
        });
      }} />,
    }
  }];
  
  return <MasterBedroomContainer direction={direction}>
    <AreaCard base={base} zones={zones} />
  </MasterBedroomContainer>
}
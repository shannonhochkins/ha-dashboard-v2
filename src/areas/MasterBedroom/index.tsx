import React from 'react';
import styled from '@emotion/styled';
import { useHass, useEntity } from '@hooks';
import { AreaBase } from '../AreaBase';
import { AreaCard } from '../AreaCard';
import { CoverCard } from '@components';
import base from '@assets/bedroom-base.jpg';
import tv from '@assets/bedroom-tv.jpg';
import roofLight from '@assets/bedroom-light-roof.jpg';
import { Roof, TV, Soundbar } from './zones';

const MasterBedroomContainer = styled(AreaBase)`
  
`;

export function MasterBedroom() {
  const { callService } = useHass();
  const masterTV = useEntity('media_player.samsung_tv_master_bedroom');
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
      renderSvg: () => {
        return <TV onClick={() => {
          callService('media_player', masterTV.state === 'on' ? 'turn_off' : 'turn_on', {}, {
            entity_id: 'media_player.samsung_tv_master_bedroom',
          });
        }} />;
      }
    },
    entities: {
      switch: 'media_player.samsung_tv_master_bedroom',
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
  
  return <MasterBedroomContainer>
    <AreaCard base={base} zones={zones} footer={<>
      <CoverCard entity="cover.sb_curtain_master_main" label="Curtain Main" />
      <CoverCard entity="cover.curtain_master_small" label="Curtain Small" />
    </>} />
  </MasterBedroomContainer>
}
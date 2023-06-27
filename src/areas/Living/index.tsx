import React from 'react';
import styled from '@emotion/styled';
import { AreaBase, AreaBaseProps } from '../AreaBase';
import { AreaCard } from '../AreaCard';
import { CoverCard } from '@components';
import livingBase from '@assets/living-base.jpg';
import livingLight from '@assets/living-light.jpg';
import livingTV from '@assets/living-tv.jpg';
import { TV, Roof } from './zones';
import { useHass, useEntity } from 'ha-component-kit';

const LivingContainer = styled(AreaBase)``;


export function Living() {
  const { callService } = useHass();
  const livingRoomTV = useEntity('media_player.samsung_tv_master_bedroom');
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
      renderSvg: () => <TV onClick={() => {
        callService({
          domain: 'media_player',
          service: livingRoomTV.state === 'on' ? 'turn_off' : 'turn_on',
          target: {
            entity_id: 'media_player.samsung_tv_living_room',
          }
        });
      }} />
    },
    entities: {
      switch: 'media_player.samsung_tv_living_room'
    }
  }];

  return <LivingContainer>
    <AreaCard base={livingBase} zones={zones} footer={<>
      <CoverCard entity="cover.sb_curtain_patio_secondary" label="Patio Curtain" />
      <CoverCard entity="cover.sb_curtain_bbq_window" label="BBQ Curtain" />
    </>} />
  </LivingContainer>
}
import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { AreaBase, AreaBaseProps } from '../AreaBase';
import { AreaCard } from '../AreaCard';
import { BinaryCard, CardPanel } from '@components';
import officeBase from './assets/office-base.jpg';
import downlightsBase from './assets/office-downlights.jpg';
import downlightsZone from './assets/office-downlights-zone.png';
import striplightsBase from './assets/office-striplights.jpg';
import striplightsZone from './assets/office-striplight-zone.png';
import roofBase from './assets/office-roof.jpg';
import roofZone from './assets/office-roof-zone.png';
import computerBase from './assets/office-computer.jpg';
import computerZone from './assets/office-computer-zone.png';


const OfficeContainer = styled(AreaBase)`
  
`;


// - type: call-service
// service: script.turn_on
// service_data:
//   entity_id: script.gaming_light_color_changer
//   variables:
//     mode: rgb_color
//     val:
//       - 78
//       - 127
//       - 255


export function Office({ direction }) {
  const zones = [{
    base: downlightsBase,
    overlay:  {
      src: downlightsZone,
      top: '5.2%',
      width: '46.2%',
      left: '53.9%'
    },
    entities: {
      switch: 'switch.office_downlights',
      light: 'light.all_office_downlights'
    }
  }, {
    base: striplightsBase,
    overlay:  {
      src: striplightsZone,
      top: '34.2%',
      left: '61.9%',
      width: '38.2%'
    },
    entities: {
      switch: 'switch.office_striplights',
      light: 'light.all_office_striplights'
    }
  }, {
    base: roofBase,
    overlay:  {
      src: roofZone,
      top: '0%',
      left: '59%',
      width: '15.2%'
    },
    entities: {
      switch: 'switch.office_roof_light',
      light: 'light.light_office_roof'
    }
  }, {
    base: computerBase,
    overlay:  {
      src: computerZone,
      top: '63%',
      left: '7.5%',
      width: '35.8%'
    },
    entities: {
      switch: 'switch.gaming_pc',
    }
  }];

  return <OfficeContainer direction={direction}>
    <AreaCard base={officeBase} zones={zones} footer={
      <>
        <CardPanel title="Lights">
          <BinaryCard entity="switch.office_downlights" name={'Downlights'} />
          <BinaryCard entity="switch.office_striplights" name={'Striplights'} />
          <BinaryCard entity="switch.office_roof_light" name={'Roof'} />
        </CardPanel>
        <CardPanel title="Curtains & Blinds">
          <BinaryCard entity="switch.office_downlights" name={'Downlights'} />
          <BinaryCard entity="switch.office_striplights" name={'Striplights'} />
          <BinaryCard entity="switch.office_roof_light" name={'Roof'} />
        </CardPanel>
        {/* <LightCard
          lightAndSwitchEntities={[
            {
              switch: 'switch.office_downlights',
              light: 'light.all_office_downlights'
            },
            {
              switch: 'switch.office_striplights',
              light: 'light.all_office_striplights'
            },
          ]}
          switchEntities={[
            'switch.office_downlights',
            'switch.office_roof_light',
            'switch.office_striplights',
            'switch.switch_front_door_hallway_lights',
            'switch.switch_front_door_outdoor_lights',
          ]}
          name={'All Lights'} />
        <BinaryCard name={'Game'} entity="switch.game_switch_wall_panel" />
        <BinaryCard name={'Work'} entity="switch.work_switch_wall_panel" />

        <CoverCard 
          entity="cover.curtain_office_curtain"
          battery="sensor.curtain_office_battery"
          name={'Curtain'}
        />
        <CoverCard
          entity="cover.roller_blind_office"
          battery="sensor.roller_blind_office_battery"
          name={'Blind'} 
        /> */}
        
      </>
        } />
  </OfficeContainer>
}
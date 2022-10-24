import React, { useState } from 'react';
import styled from '@emotion/styled';
import { AreaBase, AreaBaseProps } from '../AreaBase';
import { AreaCard } from '../AreaCard';
import { BinaryCard, CardPanel, MediaCard, Toggle } from '@components';
import { Light } from '@mui/icons-material';
import officeBase from '@assets/office-base.jpg';
import downlightsBase from '@assets/office-downlights.jpg';
import downlightsZone from '@assets/office-downlights-zone.png';
import striplightsBase from '@assets/office-striplights.jpg';
import striplightsZone from '@assets/office-striplight-zone.png';
import roofBase from '@assets/office-roof.jpg';
import roofZone from '@assets/office-roof-zone.png';
import computerBase from '@assets/office-computer.jpg';
import computerZone from '@assets/office-computer-zone.png';

import Downlights from '@assets/downlights.png';
import Striplights from '@assets/striplights.png';
import Lightbulb from '@assets/lightbulb.png';


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
    <AreaCard base={officeBase} zones={zones} />
  </OfficeContainer>
}
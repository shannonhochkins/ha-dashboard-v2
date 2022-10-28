import React from 'react';
import styled from '@emotion/styled';
import { AreaBase } from '../AreaBase';
import { AreaCard } from '../AreaCard';
import officeBase from '@assets/office-base.jpg';
import downlightsBase from '@assets/office-downlights.jpg';
import striplightsBase from '@assets/office-striplights.jpg';
import roofBase from '@assets/office-roof.jpg';
import computerBase from '@assets/office-computer.jpg';
import { CoverCard } from '@components';

import { Computer, RoofLight, Downlights, Striplights } from '../Office/zones';

const OfficeContainer = styled(AreaBase)``;

export function Office() {
  const zones = [{
    base: downlightsBase,
    overlay:  {
      renderSvg: onClick => <Downlights onClick={onClick} />,
      top: '6.4%',
      width: '45.1%',
      left: '55%',
    },
    entities: {
      switch: 'switch.office_downlights',
      light: 'light.all_office_downlights'
    }
  }, {
    base: striplightsBase,
    overlay:  {
      renderSvg: onClick => <Striplights onClick={onClick} />,
      top: '35.4%',
      width: '38%',
      left: '62%',
    },
    entities: {
      switch: 'switch.office_striplights',
      light: 'light.all_office_striplights'
    }
  }, {
    base: roofBase,
    overlay:  {
      renderSvg: onClick => <RoofLight onClick={onClick} />,
      top: '-5%',
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
      renderSvg: onClick => <Computer onClick={onClick} />,
      top: '64.6%',
      left: '8.3%',
      width: '33.8%',
    },
    entities: {
      switch: 'switch.gaming_pc_2',
    }
  }];

  return <OfficeContainer>
    <AreaCard base={officeBase} zones={zones} footer={<>
      <CoverCard entity="cover.curtain_office_curtain" label="Curtain" />
      <CoverCard entity="cover.roller_blind_office" label="Blind" />
    </>} />
  </OfficeContainer>
}
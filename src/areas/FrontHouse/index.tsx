import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import { AreaBase } from '../AreaBase';
import { AreaCard } from '../AreaCard';
import base from '@assets/front-house-base.jpg';
import mainGarage from '@assets/front-house-main-gargage-open.png';
import toolshedGarge from '@assets/front-house-tool-garage-open.png';
import { CameraCard } from '@components';
import { ToolShed, MainGarage, Circle } from './zones';
import { useHass, useEntity } from '@hooks';

const FrontHouseContainer = styled(AreaBase)`
  
`;
export function FrontHouse() {
  const { callCover } = useHass();
  const [activeCamera, setActiveCamera] = useState<null | {
    name: string;
    title: string;
  }>(null);
  const garageMain = useEntity('cover.garage_door_main');
  const zones = [{
    base: mainGarage,
    blendMode: 'none',
    overlay:  {
      renderSvg: onClick => <MainGarage onClick={onClick} />,
      top: '35.6%',
      left: '58%',
      width: '18%',
    },
    entities: {
      cover: 'cover.garage_door_main',
    }
  }, {
    base: toolshedGarge,
    blendMode: 'none',
    overlay:  {
      renderSvg: onClick => <ToolShed onClick={onClick}  />,
      top: '40.9%',
      left: '40.2%',
      width: '13.3%',
    },
    entities: {
      // cover: 'cover.garage_door_main',
    }
  }, {
    base: null,
    blendMode: 'none',
    stateless: true,
    overlay:  {
      renderSvg: () => <Circle onClick={() => {
        setActiveCamera({
          name: 'caravan',
          title: 'Caravan Camera'
        });
      }} />,
      top: '37.1%',
      left: '35.6%',
      width: '6%',
      zIndex: 4,
    },
  }, {
    base: null,
    blendMode: 'none',
    stateless: true,
    overlay:  {
      renderSvg: () => <Circle onClick={() => {
        setActiveCamera({
          name: 'backyard',
          title: 'Backyard Camera'
        });
      }} />,
      top: '34.1%',
      left: '26.6%',
      width: '5%',
      zIndex: 4,
    },
  }, {
    base: null,
    blendMode: 'none',
    stateless: true,
    overlay:  {
      renderSvg: () => <Circle onClick={() => {
        setActiveCamera({
          name: 'side',
          title: 'Side Camera'
        });
      }} />,
      top: '25.1%',
      left: '92.6%',
      width: '5%',
      zIndex: 4,
    },
  }];
  return <FrontHouseContainer>
    <AreaCard base={base} zones={zones} />
    {!!activeCamera && <CameraCard open={!!activeCamera} title={activeCamera?.title} camera={activeCamera?.name} onClose={() => {
      setActiveCamera(null);
    }} />}
  </FrontHouseContainer>
}
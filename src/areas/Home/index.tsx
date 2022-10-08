import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { AreaBase, AreaBaseProps } from '../AreaBase';
import { useMq } from '@hooks';
import { ThermostatCard } from '@components';
// import { SwitchCard } from '@components/index';
// import { CameraCard, ThermostatCard } from '@components/index';
import { LightbulbOutlined } from '@mui/icons-material';

// const StyledCameraCard = styled(CameraCard)``;

// const CameraSection = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   width: 50%;
//   justify-content: space-between;

//   ${StyledCameraCard} {
//     width: calc(50% - 10px);
//     margin:10px 0;
//   }
// `;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

// const StyledThermostatCard = styled(ThermostatCard)``;

const HomeContainer = styled(AreaBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  ${useMq(['desktop'], `
    ${Inner} {
      flex-direction: row;
    }
  `)}
`;

export function Home({ direction }: AreaBaseProps) {
  const cameras = [
    'camera.aarlo_arlo_camera_front_door',
    'camera.aarlo_arlo_camera_driveway_main',
    'camera.aarlo_arlo_camera_caravan',
  ];

  return <HomeContainer direction={direction}>
    <ThermostatCard />
  </HomeContainer>
}
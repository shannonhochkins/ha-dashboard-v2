import styled from '@emotion/styled';
import { AreaBase } from '../AreaBase';
import { ThermostatCard } from '@components';


const ACContainer = styled(AreaBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export function AirConditioner() {
  return <ACContainer>
    <ThermostatCard />
  </ACContainer>
}
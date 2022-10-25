import React from 'react';
import styled from '@emotion/styled';
import { useLowDevices } from '@hooks';

const AlertOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
`;

const AlertChild = styled.div`
  padding: 4px;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 4px;
  font-size: 12px;
`;


export function LowBatteryAlert() {
  const entities = useLowDevices();
  return entities ? <AlertOverlay>
    {entities.map(entitiy => {
     return <AlertChild>{entitiy}</AlertChild>
    })}
  </AlertOverlay> : null;
}
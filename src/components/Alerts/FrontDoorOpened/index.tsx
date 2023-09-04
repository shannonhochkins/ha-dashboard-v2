import { useState } from 'react';
import styled from '@emotion/styled';
import { mq } from '@hooks';
import { useEntity } from '@hakit/core';
import { Popup } from '@components';
import frontDoor from '@assets/front-door-open.jpg';

const FrontDoor = styled.div`
  width: 500px;
  height: 500px;
  max-width: 100%;
  max-height: 100%;
  background-image: url('${frontDoor}');
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  border-radius: 20px;
  ${mq(['mobile'], `
    width: 300px;
    height: 300px;
  `)}

`;

const Title = styled.h2`
  color: var(--ha-text-light);
`;

export function FrontDoorOpened() {  
  const frontDoor = useEntity('binary_sensor.front_door_contact_sensor');
  const [open, setOpen] = useState(false);
  const frontDoorOpened = frontDoor.state === 'on';
  if (frontDoorOpened && !open) {
    setOpen(true);
  } else if (!frontDoorOpened && open) {
    setOpen(false);
  }
  return <Popup open={open} onClose={() => {
    setOpen(false);
  }}>
    <Title>Front door open</Title>
    <FrontDoor />
  </Popup>
}

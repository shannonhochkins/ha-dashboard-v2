import { useState } from 'react';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import { useLowDevices } from '@hooks';
import { Popup } from '@components';


const AlertChild = styled.div`
  padding: 4px;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    padding: 0px 8px;
  }
`;

const Fab = styled.button`
  all: unset;
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0;
  color: var(--ha-text-light);
  border: 1px solid var(--ha-text-light);
  cursor: pointer;
  background-color: var(--ha-secondary);
  z-index: 2;
`;



export function LowBatteryAlert() {
  const entities = useLowDevices();
  const [open, setOpen] = useState(false);
  const someLowDevices = entities.some(entity => Number(entity.state) < 10);
  return <>
    {someLowDevices && <Fab onClick={() => setOpen(true)}><Icon icon="material-symbols:battery-alert" /></Fab>}
    <Popup onClose={() => setOpen(false)} open={open}>
      {entities ? <div>
      {entities.filter(entity => Number(entity.state) < 20).sort((a,b) => Number(a.state) - Number(b.state)).map(entity => {
      return <AlertChild key={entity.entity_id}><span>{entity.attributes.friendly_name}</span><span>{entity.state}%</span></AlertChild>
      })}
    </div> : null}
    </Popup>
  </>
}
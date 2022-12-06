import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useHass, useEntity, useMq } from '@hooks';
import { Popup } from '@components';
import { IconButton } from '../';

import { Icon } from '@iconify/react';

const FieldWrapper = styled.div`
  position: relative;
  width: calc(100% - 40px);
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding:12px 12px;
  flex-wrap: wrap;
  ${useMq(['fridge'], `
    padding: 40px 12px;
  `)}
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${useMq(['mobile'], `
    flex-direction: column;
  `)}
`;

const Button = styled.button`
  all: unset;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 20px 20px;
  margin:0 8px;
  background-color: rgba(255,255,255,0.9);
  svg {
    margin-right: 6px;
  }
  ${useMq(['mobile'], `
    width: calc(100% - 40px);
    margin: 8px 0;
  `)}
  ${useMq(['fridge'], `
    padding: 30px;
    font-size: 24px;
  `)}
`;

const FieldTitle = styled.label`
  position: absolute;
  top: -10px;
  left: 8px;
  transform: translateY(-50%);
  font-weight: 800;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  font-size: 0.65rem;
  pointer-events: none;
  user-select: none;
  &:after {
    content: attr(data-val);
    padding-left: 4px;
    font-variant-numeric: tabular-nums;
    color: #fff;
  }
  ${useMq(['fridge'], `
    font-size: 24px;
    margin-top: -20px;
  `)}
`;

const Cover = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-size: 16px;
  color: white;
  margin-top: 24px;
  ${useMq(['mobile'], `
    margin-top: 10px;
    font-size: 12px;
  `)}
`;


export function CoverCard({ 
  entity,
  label,
  type = null
}) {

  const { callService } = useHass();
  const [open, setOpen] = useState(false);
  const cover = useEntity(entity);
  const isCoverOpen = cover.state === 'open';

  const [value, setValue] = useState(cover.attributes.current_position);

  useEffect(() => {
    if (cover.attributes.current_position !== value) {
      setValue(cover.attributes.current_position);
    }
  }, [cover.attributes.current_position])

  const garageIcon = cover.state === 'open' ? 'mdi:garage-open': cover.state === 'closed' ? 'mdi:garage' : 'mdi:garage-alert';
  return <>
    <Cover onClick={() => {
      if (type === 'garage') {
        if (cover.state === 'open') {
          callService('cover', 'close_cover', {}, { entity_id: entity });
        } else if (cover.state === 'closed') {
          callService('cover', 'open_cover', {}, { entity_id: entity });
        } else {
          callService('cover', 'stop_cover', {}, { entity_id: entity });
        }
      } else {
        setOpen(true);
      }
    }}>
      <IconButton color={'#4343f5'}>
        {type === 'garage' ? <Icon icon={garageIcon} /> : isCoverOpen ?
          entity.toLowerCase().includes('curtain') ? <Icon icon="mdi:curtains" /> : <Icon icon="mdi:blinds-open" /> 
          :
          entity.toLowerCase().includes('curtain') ? <Icon icon="mdi:curtains-closed" /> : <Icon icon="mdi:blinds" /> 
        }
      </IconButton>
      <Label>{label}</Label>
    </Cover>
    {type !== 'garage' && <Popup open={open} onClose={() => setOpen(false)}>
      <FieldWrapper>
        {typeof value !== 'undefined' && <FieldTitle data-val={`${value}%`}>Current Position:</FieldTitle>}
        <ButtonRow>
          
          <Button onClick={() => {
              callService('cover', 'close_cover', {}, { entity_id: entity });
            }}>
            <Icon icon="ic:baseline-first-page" />
            CLOSE
          </Button>
          <Button onClick={() => {
              callService('cover', 'set_cover_position', {
                position: 25
              }, { entity_id: entity });
            }}>
            <Icon icon="ic:baseline-curtains" />
            25%
          </Button>
          <Button onClick={() => {
              callService('cover', 'set_cover_position', {
                position: 50
              }, { entity_id: entity });
            }}>
            <Icon icon="ic:baseline-curtains" />
            50%
          </Button>
          <Button onClick={() => {
              callService('cover', 'set_cover_position', {
                position: 75
              }, { entity_id: entity });
            }}>
            <Icon icon="ic:baseline-curtains" />
            75%
          </Button>
          <Button onClick={() => {
              callService('cover', 'open_cover', {}, { entity_id: entity });
            }}>
            <Icon icon="ic:baseline-last-page" />
            OPEN
          </Button>
        </ButtonRow>
      </FieldWrapper>
    </Popup>}
  </>
}


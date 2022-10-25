import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Curtains, CurtainsClosed, BlindsClosed, Blinds, FirstPage, Stop, LastPage } from '@mui/icons-material';
import { useHass, useEntity } from '@hooks';
import { Popup } from '@components';
import { IconButton } from '../';



// const Button = styled(MuiButton)`
//   border-radius: 8px;
//   border: 1px solid rgba(117, 130, 235, 0.5);
//   color: rgb(117, 130, 235);
//   box-shadow: none;
//   text-transform: none;
//   padding: 6px 16px;
//   svg {
//     color: currentColor;
//   }
//   &:hover, &:active, &:focus {
//     text-decoration: none;
//     background-color: rgba(117, 130, 235, 0.04);
//     border: 1px solid rgb(117, 130, 235);
//     box-shadow: none;
//   }
//   ${props => props.active && `
//     color: rgb(17, 24, 39);
//     background-color: rgb(117, 130, 235);
//     &:hover, &:active, &:focus {
//       background-color: rgb(81, 91, 164);
//     }
//   `}
// `;

const FieldWrapper = styled.div`
  position: relative;
  width: calc(100% - 24px);
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding:12px 12px;
  flex-wrap: wrap;
`;


const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Button = styled.button`
  all: unset;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 4px 8px;
  margin:0 6px;
  background-color: rgba(255,255,255,0.4);
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
`;

const RangeSlider = styled.div`
  position: relative;
  width: calc(100% - 24px);
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding:24px 12px;
  &::before,
  &::after {
    position: absolute;
    color: #fff;
    font-size: 0.9rem;
    font-weight: bold;
  }
  &::before {
    content: '${props => props.min}';
    left: 10px;
  }
  &::after {
    content: '${props => props.max}';
    right: 10px;
  }
  .title::after {
    content: attr(data-length);
    position: absolute;
    right: -16px;
    font-variant-numeric: tabular-nums;
    color: #fff;
  }

  input {
    -webkit-appearance: none;
    width: calc(100% - 70px);
    height: 2px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.314);
    outline: none;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgb(255, 255, 255);
      cursor: pointer;
      transition: all 0.15s ease-in-out;
      &:hover {
        background: rgb(212, 212, 212);
        transform: scale(1.2);
      }
    }
    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border: 0;
      border-radius: 50%;
      background: rgb(255, 255, 255);
      cursor: pointer;
      transition: background 0.15s ease-in-out;
      &:hover {
        background: rgb(212, 212, 212);
      }
    }
  }
`;

const Cover = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-size: 16px;
  color: white;
  margin-top: 18px;
`;

let timeout;

export function CoverCard({ 
  entity,
  label,
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

  function handleChange(event) {
    const value = parseInt(event.target.value);
    setValue(value);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      // call hass
      callService('cover', 'set_cover_position', {
        position: value,
      }, {
        entity_id: entity,
      })
    }, 200);
  }
  

  function onToggle() {
    // hass.callService('cover', 'toggle', { entity_id: entity });
  }

  return <>
    <Cover onClick={() => {
      setOpen(true);
    }}>
      <IconButton color={'#4343f5'}>
        {isCoverOpen ?
          entity.toLowerCase().includes('curtain') ? <Curtains /> : <Blinds />
          :
          entity.toLowerCase().includes('curtain') ? <CurtainsClosed /> : <BlindsClosed />
        }
      </IconButton>
      <Label>{label}</Label>
    </Cover>
    <Popup open={open} onClose={() => setOpen(false)}>
      <FieldWrapper>
        <FieldTitle>Controls:</FieldTitle>
        <ButtonRow>
          <Button onClick={() => {
              callService('cover', 'close_cover', {}, { entity_id: entity });
            }}>
            <FirstPage />
            CLOSE
          </Button>
          <Button onClick={() => {
              callService('cover', 'stop_cover', {}, { entity_id: entity });
            }}>
            <Stop />
            STOP
          </Button>
          <Button onClick={() => {
              callService('cover', 'open_cover', {}, { entity_id: entity });
            }}>
            <LastPage />
            OPEN
          </Button>
        </ButtonRow>
      </FieldWrapper>
      <RangeSlider min={1} max={100}>
        <FieldTitle data-val={`${value}%`}>Current Position:</FieldTitle>
        <input type="range" onChange={handleChange} min={1} max={100} value={value} />
      </RangeSlider>
    </Popup>
  </>
}


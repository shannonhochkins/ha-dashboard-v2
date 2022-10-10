import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Thermostat } from './slider';
import { useEntity } from '@hooks';
import { WbSunny, AcUnit } from '@mui/icons-material';

const RoundButton = styled.button`
  background-color: #293231;
  border: 2px solid #39393d;
  border-radius: 100%;
  cursor: pointer;
  padding: 4px;
`;


const coolingColors = ['#dae8eb', '#2c8e98'];
const heatingColors = ['#cfac48', '#cd5401'];

export const ThermostatCard = () => {
  const entity = 'climate.daikin_ac';
  const ac = useEntity(entity);
  const [value, setValue] = useState<number | null>(null);
  const [colors, setColors] = useState<string[]>(null);


  useEffect(() => {
    if (ac && ac.attributes) {
      const { current_temperature, fan_mode, fan_modes, hvac_action, hvac_modes, max_temp, min_temp, temperature} = ac.attributes;
      if (temperature !== value) {
        setValue(temperature);
        setColors(coolingColors);
      }
    }
  }, [ac]);


  


  return value !== null ? <>
    <RoundButton onClick={() => {
      setColors(heatingColors)
    }}><WbSunny /></RoundButton>
    <RoundButton onClick={() => {
      setColors(coolingColors)
    }}><AcUnit /></RoundButton>
    <Thermostat
      value={value}
      onChange={v => {
        setValue(v);
      }}
      min={6}
      max={30}
      track={{
        thickness: 30,
        colors
      }}
      size={300}
    />
  </> : null;
};

import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Thermostat } from './slider';
import { useHass } from '@store';
import { useEntity } from '@hooks';
import { WbSunny, AcUnit, LocalFireDepartment, PowerSettingsNew } from '@mui/icons-material';

const Fab = styled.button<{
  activeColor?: string;
  active?: boolean;
  size?: 'small' | 'large'
}>`
  background-color: var(--ha-button-primary-background);
  border: 2px solid ${props => props.active ? `var(--ha-button-primary-border)` : `var(--ha-button-primary-color)`};
  border-radius: 100%;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size === 'large' ? '80px' : '50px'};
  height: ${props => props.size === 'large' ? '80px' : '50px'};
  svg {
    font-size: ${props => props.size === 'large' ? '40px' : '20px'};
  }
  outline: 0;
  color: ${props => props.active ? `${props.activeColor}` : 'var(--ha-button-primary-color)'}
`;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Actions = styled.div`
  position: absolute;
  top: 0;
  right:0;
  display: flex;
  flex-direction: column;
  z-index: 4;
  > * {
    margin-bottom: 8px;
  }
`;

const CurrentTemperature = styled.div<{
  fontSize: number;
  color: string;
}>`
  position: absolute;
  top: 0;
  left:0;
  font-family: "Kanit", sans-serif;
  font-weight: 100;
  font-size: ${props => props.fontSize}px;
  line-height: ${props => props.fontSize}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  color: ${props => props.color};
  span {
    color: var(--ha-text-light);
    font-size: ${props => props.fontSize / 4}px;
    line-height: ${props => props.fontSize / 4}px;
  }
`;


const coolingColors = ['#dae8eb', '#2c8e98'];
const heatingColors = ['#cfac48', '#cd5401'];
const offColors = ['#848484', '#383838'];
const dryColors = ['#fff', '#ffc0bd'];
const fanColors = ['#fff', '#f9f9f9'];


export const ThermostatCard = () => {
  const { callService } = useHass();
  const entity = 'climate.daikin_ac';
  const ac = useEntity(entity);
  const { current_temperature, fan_mode, fan_modes, hvac_action, hvac_modes, max_temp, min_temp, temperature} = ac.attributes || {};
  const state = ac.state;
  const on = state !== 'off';
  const [colors, setColors] = useState<string[]>(null);
  const [internalFanMode, setInternalFanMode] = useState(fan_mode);
  const [internalState, setInternalState] = useState(state);
  const [internalTemperature, setInternalTemperature] = useState<number>(temperature);
  const size = 300;

  const action = (() => {
    switch (state) {
      case 'heat_cool':
        return 'HEAT COOLING';
      case 'heat':
        return 'HEATING';
      case 'cool':
        return 'COOLING';
      case 'dry':
        return 'DRY FAN';
      case 'fan_only':
        return 'FAN ONLY';
      case 'off':
        return 'OFF';
    }
  })();

  useEffect(() => {
    if (state.includes('heat')) {
      setColors(heatingColors);
    } else if (state.includes('cool')) {
      setColors(coolingColors);
    } else if (state.includes('dry')) {
      setColors(dryColors);
    } else if (state.includes('fan')) {
      setColors(fanColors);
    } else {
      setColors(offColors);
    }
  }, [state])


  useEffect(() => {
    if (typeof temperature !== 'undefined' && temperature !== internalTemperature) {
      setInternalTemperature(temperature);
      setColors(coolingColors);
    }
  }, [ac]);

  useEffect(() => {
    if (internalFanMode !== fan_mode) {
      callService('climate', 'set_fan_mode', {
        fan_mode: internalFanMode
      }, {
        entity_id: entity
      });
    }
  }, [internalFanMode]);

  useEffect(() => {
    if (internalState !== state || internalTemperature !== temperature) {
      callService('climate', 'set_temperature', {
        hvac_mode: internalState,
        temperature: internalTemperature
      }, {
        entity_id: entity
      });      
    }
  }, [internalState, internalTemperature]);

  const currentTempColor = state === 'off' ? 'var(--ha-text-light)' : colors[1];


  return internalTemperature !== null ? <Container>

    <CurrentTemperature color={currentTempColor} fontSize={size / 5}>
      {current_temperature}°
      <span>CURRENT</span>
    </CurrentTemperature>
    <Actions>
      <Fab active={state === 'heat'} activeColor={heatingColors[0]} onClick={() => {
        setInternalState('heat');
      }}><LocalFireDepartment /></Fab>
      <Fab active={state === 'dry'} activeColor={dryColors[0]} onClick={() => {
        setInternalState('dry');
      }}><WbSunny /></Fab>
      <Fab active={state === 'cool'} activeColor={coolingColors[1]} onClick={() => {
        setInternalState('cool');
      }}><AcUnit /></Fab>
    </Actions>
    <Thermostat
      value={internalTemperature}
      onChange={v => {
        setInternalTemperature(v);
      }}
      min={6}
      max={30}
      disabled={!on}
      track={{
        thickness: size / 10,
        colors
      }}
      size={size}
    />
    <Fab style={{
      marginTop: 20
    }} size="large" active={on} activeColor={'#cfac48'} onClick={() => {
      setInternalState('off');
    }}><PowerSettingsNew /></Fab>
  </Container> : null;
};

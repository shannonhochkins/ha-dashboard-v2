import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Thermostat } from 'react-thermostat';
import { useHass, useEntity, useDevice } from '@hooks';
import { Icon } from '@iconify/react';

const Fab = styled.button<{
  activeColor?: string;
  active?: boolean;
  size?: number;
}>`
  background-color: var(--ha-button-primary-background);
  border: 2px solid ${props => props.active ? `var(--ha-button-primary-border)` : `var(--ha-button-primary-color)`};
  border-radius: 100%;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size / 5}px;
  height: ${props => props.size / 5}px;
  svg {
    font-size: ${props => props.size / 10}px;
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

const FanIcon = styled(Icon)<{
  speed: FanMode | null;
}>`
  animation-name: spin;
  animation-duration: ${props => props.speed === 'Low' ? '5s' : props.speed === 'Mid' ? '3s' : props.speed === 'High' ? '1s' : '0s'};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }
`;

const ActionsLeft = styled.div`
  position: absolute;
  top: 17%;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 4;
  > * {
    margin-bottom: 8px;
  }
`;

const ActionsRight = styled.div`
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

type FanMode = 'Low' | 'Mid' | 'High';


export const ThermostatCard = () => {
  const { callService } = useHass();
  const device = useDevice();
  const entity = 'climate.daikin_ac';
  const ac = useEntity(entity);
  const { current_temperature, fan_mode, fan_modes, max_temp, temperature} = ac.attributes || {};
  const state = ac.state;
  const on = state !== 'off';
  const [colors, setColors] = useState<string[]>(offColors);
  const [internalFanMode, setInternalFanMode] = useState<FanMode>(fan_mode as FanMode);
  const [internalState, setInternalState] = useState(state);
  const [internalTemperature, setInternalTemperature] = useState<number>(temperature);
  const size = device === 'fridge' ? 400 : device === 'mobile' ? 220 : 350;

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

  const currentTempColor = state === 'off' ? 'var(--ha-text-light)' : colors ? colors[1] : 'transparent';


  return internalTemperature !== null ? <Container>

    <CurrentTemperature color={currentTempColor} fontSize={size / 5}>
      {current_temperature}°
      <span>CURRENT</span>
    </CurrentTemperature>
    <ActionsLeft>
      <Fab size={size} active={on} activeColor={colors[1]} onClick={() => {
          const currentIndex = fan_modes.findIndex(mode => mode === internalFanMode);
          setInternalFanMode(fan_modes[currentIndex + 1] ? fan_modes[currentIndex + 1] : fan_modes[0]);
        }}><FanIcon speed={on ? internalFanMode : null} icon="mdi:fan" /></Fab>
    </ActionsLeft>
    <ActionsRight>
      <Fab size={size} active={state === 'heat'} activeColor={colors[0]} onClick={() => {
        setInternalState('heat');
      }}><Icon icon="material-symbols:mode-heat" /></Fab>
      <Fab size={size} active={state === 'dry'} activeColor={colors[0]} onClick={() => {
        setInternalState('dry');
      }}><Icon icon="material-symbols:cool-to-dry-outline" /></Fab>
      <Fab size={size} active={state === 'cool'} activeColor={colors[1]} onClick={() => {
        setInternalState('cool');
      }}><Icon icon="ic:baseline-ac-unit" /></Fab>
    </ActionsRight>
    <Thermostat
      value={internalTemperature}
      onChange={v => {
        setInternalTemperature(v);
      }}
      min={16}
      max={max_temp}
      disabled={!on}
      track={{
        thickness: size / 10,
        colors
      }}
      size={size}
    />
    <Fab style={{
      marginTop: 20
    }} size={size * 1.5} active={on} activeColor={'#cfac48'} onClick={() => {
      setInternalState('off');
    }}><Icon icon="ic:round-power-settings-new" /></Fab>
  </Container> : null;
};

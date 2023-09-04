import { useEffect, useState, useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import { Thermostat } from 'react-thermostat';
import { useHass, useEntity, HvacMode } from '@hakit/core';
import { useDevice } from '@hooks';
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
  width: ${props => (props.size ?? 40) / 5}px;
  height: ${props => (props.size ?? 40) / 5}px;
  font-size: ${props => (props.size ?? 40) / 17}px;
  padding: 4px;
  svg {
    font-size: ${props => (props.size ?? 40) / 10}px;
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
  speed: FanMode;
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

const Timers = styled.div`
  position: absolute;
  bottom: -10%;
  right:0;
  display: flex;
  flex-direction: column;
  z-index: 4;
  align-items: center;
  > * {
    margin-bottom: 8px;
  }
`;

const TimerLabel = styled.span<{
  fontSize: number;
}>`
  font-size: ${props => props.fontSize * 1.5}px;
  text-align: center;
  color: var(--ha-text-light);
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotateZ(90deg);
  right: -100%;
  white-space: nowrap;
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

type FanMode = 'Low' | 'Mid' | 'High' | '';

const fanModes: FanMode[] = ['Low', 'Mid', 'High'];


export const ThermostatCard = () => {
  const { callService } = useHass();
  const device = useDevice();
  const entity = 'climate.air_conditioner';
  const ac = useEntity(entity);
  const ac_30 = useEntity('automation.turn_off_aircon_after_30mins');
  const ac_45 = useEntity('automation.turn_off_aircon_after_45_mins');
  const ac_60 = useEntity('automation.turn_off_aircon_after_60_mins');
  const { current_temperature, fan_mode, max_temp, temperature } = ac.attributes || {};
  const state = ac.state as HvacMode;
  const on = state !== 'off';
  const [colors, setColors] = useState<string[]>(offColors);
  const [internalFanMode, setInternalFanMode] = useState<FanMode>(fan_mode as FanMode);
  const [internalState, setInternalState] = useState<HvacMode>(state);
  const [internalTemperature, setInternalTemperature] = useState<number>(temperature);
  const size = device === 'fridge' ? 400 : device === 'mobile' ? 220 : 300;

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
  }, [ac, internalTemperature, temperature]);

  useEffect(() => {
    if (internalFanMode !== fan_mode) {
      callService({
        domain: 'climate',
        service: 'set_fan_mode',
        serviceData: {
          fan_mode: internalFanMode
        },
        target: {
          entity_id: entity
        }
      });
    }
  }, [callService, fan_mode, internalFanMode]);

  const turnOn = useCallback(() => {
    if (temperature >= 24) {
      setInternalState('heat');
    } else {
      setInternalState('cool');
    }
  }, [temperature]);

  const getElapsedTimeInMinutes = useCallback((date: string) => {
    const now = new Date();
    const pastDate = new Date(date); // Past date
    const timeDifference = now.getTime() - pastDate.getTime(); // Difference in milliseconds
    return Math.floor(timeDifference / (1000 * 60));
  }, []);

  useEffect(() => {
    if (internalState !== state || internalTemperature !== temperature) {
      callService({
        domain: 'climate',
        service: 'set_temperature',
        serviceData: {
          hvac_mode: internalState,
          temperature: internalTemperature
        },
        target: {
          entity_id: entity
        }
      });
    }
  }, [callService, internalState, internalTemperature, state, temperature]);

  const currentTempColor = state === 'off' ? 'var(--ha-text-light)' : colors ? colors[1] : 'transparent';

  const ac60Elapsed = useMemo(() => getElapsedTimeInMinutes(ac_60.attributes.last_triggered), [ac_60.attributes.last_triggered, getElapsedTimeInMinutes]);
  const ac45Elapsed = useMemo(() => getElapsedTimeInMinutes(ac_45.attributes.last_triggered), [ac_45.attributes.last_triggered, getElapsedTimeInMinutes]);
  const ac30Elapsed = useMemo(() => getElapsedTimeInMinutes(ac_30.attributes.last_triggered), [ac_30.attributes.last_triggered, getElapsedTimeInMinutes]);

  const ac60Active = useMemo(() => ac60Elapsed <= 60 && ac_60.state === 'on', [ac60Elapsed, ac_60]);
  const ac45Active = useMemo(() => ac45Elapsed <= 45 && ac_45.state === 'on', [ac45Elapsed, ac_45]);
  const ac30Active = useMemo(() => ac30Elapsed <= 30 && ac_30.state === 'on', [ac30Elapsed, ac_30]);

  const startTimer = useCallback((incoming: string) => {
    const list = [
      {
        entity_id: 'automation.turn_off_aircon_after_60_mins',
        active: ac60Active,
        state: ac_60.state,
      },
      {
        entity_id: 'automation.turn_off_aircon_after_45_mins',
        active: ac45Active,
        state: ac_45.state,
      },
      {
        entity_id: 'automation.turn_off_aircon_after_30mins',
        active: ac30Active,
        state: ac_30.state,
      }
    ];
    list.forEach(({ entity_id, active, state }) => {
      if (entity_id === incoming && !active && state !== 'on') {
        turnOn();
        callService({
          domain: 'automation',
          service: 'turn_on',
          target: {
            entity_id
          }
        });
        callService({
          domain: 'automation',
          service: 'trigger',
          target: {
            entity_id
          }
        });
      } else {
        callService({
          domain: 'automation',
          service: 'turn_off',
          target: {
            entity_id
          }
        });
      }
    });
  }, [ac60Active, ac_60.state, ac45Active, ac_45.state, ac30Active, ac_30.state, turnOn, callService])


  return internalTemperature !== null ? <Container>

    <CurrentTemperature color={currentTempColor} fontSize={size / 5}>
      {current_temperature}°
      <span>CURRENT</span>
    </CurrentTemperature>
    <ActionsLeft>
      <Fab size={size} active={on} activeColor={colors[1]} onClick={() => {
          const currentIndex = fanModes.findIndex(mode => mode === internalFanMode);
          setInternalFanMode(fanModes[currentIndex + 1] ? fanModes[currentIndex + 1] : fanModes[0]);
        }}><FanIcon speed={on ? internalFanMode : ''} icon="mdi:fan" />
      </Fab>
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

    <Timers>
      <TimerLabel fontSize={size / 40}>{on ? 'TURN OFF IN' : 'TURN ON FOR'}:</TimerLabel>
      <Fab size={size / 1.1} active={ac60Active} activeColor={colors[0]} onClick={() => {
        turnOn();
        startTimer('automation.turn_off_aircon_after_60_mins');
      }}>{ac60Active ? 60 - ac60Elapsed : 60}{ac60Active ? 'm left' : ' min'}</Fab>
      <Fab size={size / 1.1} active={ac45Active} activeColor={colors[0]} onClick={() => {
        startTimer('automation.turn_off_aircon_after_45_mins');
      }}>{ac45Active ? 45 - ac45Elapsed : 45}{ac45Active ? 'm left' : ' min'}</Fab>
      <Fab size={size / 1.1} active={ac30Active} activeColor={colors[1]} onClick={() => {
        startTimer('automation.turn_off_aircon_after_30mins');
      }}>{ac30Active ? 30 - ac30Elapsed : 30}{ac30Active ? 'm left' : ' min'}</Fab>
    </Timers>
    <div style={{
      width: size,
    }}>
      <Thermostat
        value={internalTemperature}
        onChange={v => {
          setInternalTemperature(Number(v.toFixed(0)));
        }}
        min={16}
        max={max_temp}
        disabled={!on}
        track={{
          thickness: size / 10,
          colors
        }}
      />
    </div>
    <Fab style={{
      marginTop: 20
    }} size={size * 1.5} active={on} activeColor={'#cfac48'} onClick={() => {
      if (on) {
        setInternalState('off');
      } else {
        turnOn();
      }
    }}><Icon icon="ic:round-power-settings-new" /></Fab>
  </Container> : null;
};

import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { LightMode, BlurOff } from '@mui/icons-material';

const TOGGLE_SIZE = 40;
const TOGGLE_HEIGHT = TOGGLE_SIZE * .55;

interface ToggleProps {
  className?: string;
  activeIcon?: ReactNode;
  inactiveIcon?: ReactNode;
  on: boolean;
}
const ToggleLabel = styled.label`
  position: relative;
  transform-origin: center center;
  transform: rotate3d(0,0,1,90deg);
`;

const ToggleSlot = styled.div`
  position: relative;
  height: ${TOGGLE_HEIGHT}px;
  width: ${TOGGLE_SIZE}px;
  border: ${TOGGLE_SIZE / 30}px solid #e4e7ec;
  border-radius: ${TOGGLE_HEIGHT}px;
  background-color: #374151;
  transition: background-color 250ms;
`;
const ToggleButton = styled.div`
  transform: translate(20%, -50%);
  position: absolute;
  top: 50%;
  height: ${TOGGLE_HEIGHT / 1.4}px;
  width: ${TOGGLE_HEIGHT / 1.4}px;
  border-radius: 50%;
  background-color: #485367;
  box-shadow: inset 0px 0px 0px ${TOGGLE_SIZE / 20}px white;
  transition: background-color 250ms, border-color 250ms, transform 500ms cubic-bezier(.26,2,.46,.71);
`;
const ToggleIcon = styled.div`
  position: absolute;
  height: ${TOGGLE_HEIGHT / 2}px;
  width: ${TOGGLE_HEIGHT / 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 100%;
    height: 100%;
  }
`;

interface IconProps {
  position: 'inactive' | 'active';
  checked: boolean;
}
const ToggleIconWrapper = styled.div<IconProps>`
  position: absolute;
  top: 50%;
  height: ${TOGGLE_HEIGHT / 2}px;
  width: ${TOGGLE_HEIGHT / 2}px;
  transform-origin: 50% 50%;
  transition: opacity 150ms, transform 500ms cubic-bezier(.26,2.5,.46,.71);
  ${props => props.position === 'inactive' && `
    opacity: ${props.checked ? '1' : '0'};
    transform: ${!props.checked ? `translate(calc(${TOGGLE_SIZE}px - 200%), -50%) rotate(15deg)` : `translate(calc(${TOGGLE_SIZE}px - 120%), -50%) rotate(0deg)`};
    color: red;
    ${ToggleIcon} {
      color: white;
    }
  `}
  ${props => props.position === 'active' && `
    opacity: ${props.checked ? '1' : '0'};
    transform: ${props.checked ? 'translate(30%, -50%) rotate(15deg)' : `translate(100%, -50%) rotate(15deg)`};
    ${ToggleIcon} {
      color: #ffbb52;
    }
  `}
`;



const ToggleCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
  &:checked ~ ${ToggleSlot} {
    background-color: white;
    ${ToggleButton} {
      background-color: #ffeccf;
      box-shadow: inset 0px 0px 0px ${TOGGLE_SIZE / 20}px #ffbb52;
      transform: translate(calc(${TOGGLE_SIZE}px - 120%), -50%);
    }
  }
`;

export function Toggle({
  activeIcon = <LightMode />,
  inactiveIcon = <BlurOff />,
  className,
  on,
}: ToggleProps) {
  return <ToggleLabel className={className}>
    <ToggleCheckbox type='checkbox' checked={on} />
    <ToggleSlot>
      <ToggleIconWrapper position="inactive" checked={!on}>
        <ToggleIcon>
          {inactiveIcon}
        </ToggleIcon>
      </ToggleIconWrapper>
      <ToggleButton></ToggleButton>
      <ToggleIconWrapper position="active" checked={on}>
        <ToggleIcon>
          {activeIcon}
        </ToggleIcon>
      </ToggleIconWrapper>
    </ToggleSlot>
  </ToggleLabel>
}

import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { adjustHue, darken } from 'polished'
import { WithActiveProps } from '@types';
import { useHass } from '@hooks';

const MediaCardContent = styled.div<{
  size: number;
  shiftColor?: number;
}>`
  position: absolute;
  left: 10%;
  bottom:0;
  width: 80%;
  height: 50%;
  align-items: center;
  justify-content: center;
  z-index: 2;
  color: ${({ shiftColor = 0 }) => `${darken(0.2, adjustHue(shiftColor, `#50999f`))}`};
  display: flex;
  text-align: center;
  font-size: 24px;
  font-weight: 300;
`;

interface MediaCardProps {
  className?: string;
  children?: ReactNode;
  color?: string;
  size?: number;
  background?: string;
  svg?: ReactNode;
  shiftColor?: number;
  entity?: string;
  onClick?: () => void;
}
function MediaCardBase({
  className,
  children,
  size = 200,
  background,
  svg = null,
  shiftColor,
  entity,
  onClick = () => {}
}: MediaCardProps) {
  const { getEntity, callSwitch } = useHass();
  const $switch = getEntity(entity);
  const isActive = $switch?.state === 'on';
  function onToggle() {
    callSwitch(entity, isActive ? 'turn_off' : 'turn_on');
  }
  return <div style={{
    filter: entity ? `saturate(${isActive ? 100 : 20}%)` : 'none'
  }} className={className} onClick={() => {
    onClick();
    if (entity) {
      onToggle();
    }
  }}>
    {background && <Background background={background} />}
    {svg !== null && <Background>{svg}</Background>}
    <MediaCardContent shiftColor={shiftColor} size={size}>
      {children}
    </MediaCardContent>
  </div>
}

export const MediaCard = styled(MediaCardBase)<MediaCardProps>`
  position: relative;
  border-radius: 30px;
  width: ${props => props.size || 200}px;
  height: ${props => props.size || 200}px;
  background: ${({ shiftColor = 0 }) => `linear-gradient(-45deg, ${adjustHue(shiftColor, `#75ffef`)} 0%, ${adjustHue(shiftColor, `#50999f`)} 100%)`};
  color: ${props => props.color === 'primary' || !props.color ? 'var(--ha-text-light)' : 'var(--ha-text-dark)'};
  overflow: hidden;
  cursor: pointer;
  transition: filter ease-in-out 0.3s;
  &:after {
    content: '';
    width: calc(95% - 2px);
    height: ${props => (props.size || 200)}px;
    border-radius: 20%;
    position: absolute;
    bottom:-50%;
    left:calc(2.5% + 1px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    -webkit-backdrop-filter: blur(3.5px);
    backdrop-filter: blur(3.5px);
    background: rgba(255, 255, 255, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.77);
    z-index: 1;
  }
`;

const Background = styled.div<{
  background?: string;
}>`
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  bottom:0;
  z-index:0;
  background-image: url(${props => props.background});
  background-position: 50% 0%;
  background-repeat: no-repeat;
  background-size: 100%;
  svg {
    width: 80%;
    height: 80%;
    position: absolute;
    top: 0;
    left: 10%;
  }
`;


export const SimpleCard = styled.div<WithActiveProps>`
  box-sizing: border-box;
  user-select: none;
  background:${props => props.isActive ? 'var(--ha-gradient-secondary)' : 'var(--ha-gradient-secondary)'};
  border-radius: 30px;
  padding: 1px;
  transition: 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition-property: background;
  overflow: hidden;
  cursor: pointer;
  svg, span {
    color: currentColor;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 10px;
  }
  span {
    font-size: 18px;
  }
  div {
    border-radius: 30px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    color:${props => props.isActive ? 'var(--ha-primary)' : 'var(--ha-text-light)'};
    background:${props => props.isActive ? 'var(--ha-gradient-primary)' : 'linear-gradient(-45deg, rgb(24 35 57) 0%, rgb(19 28 46) 100% )'};
    transition: 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition-property: background, color;
    padding: 20px 30px;
  }
`;

interface CardPanelBaseProps {
  className?: string;
  title: string;
  children: ReactNode;
}
const CardPanelBase = function ({
  className,
  title,
  children
}: CardPanelBaseProps) {
  return <div className={className}>
    <h4>{title}</h4>
    <div>
      {children}
    </div>
  </div>
}


export const CardPanel = styled(CardPanelBase)`
  display: flex;
  flex-direction: column;
  > h4 {
    color: var(--ha-text-light);
    width: 100%;
    white-space: nowrap;
  }
  > div {
    display: flex;
    align-items: space-evenly;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
  }
`
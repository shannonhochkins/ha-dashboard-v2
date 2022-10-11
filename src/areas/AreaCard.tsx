import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { useHass } from '@store';
interface ZoneOverlay {
  top: string;
  left: string;
  width: string;
  src: string;
}
const ZoneOverlay = styled.img<ZoneOverlay>`
  position: absolute;
  z-index: 2;
  cursor: pointer;
  ${({
    top,
    left,
    width
  }) => {
    return `
      top: ${top || '0'};
      left: ${left || '0'};
      width: ${width || '100%'} !important;
    `;
  }}
`;

interface ZoneBaseProps {
  opacity: number;
}
const ZoneBase = styled.img<ZoneBaseProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  mix-blend-mode: lighten;
  pointer-events: none;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.3s ease;
  opacity: ${props => props.opacity};
`;

const ZoneFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Zones = styled.div`
  position: relative;
`;

const Background = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 30px;
  img {
    height: auto;
    width: 100%;
  }
`;
interface ZoneProps {
  entities?: {
    light?: string;
    switch?: string;
  };
  base: string;
  active?: boolean;
  overlay: null | ZoneOverlay;
}
function Zone({
  entities,
  base,
  overlay = null,
  active = false
}: ZoneProps) {
  let brightness = 0;
  const { callSwitch, getEntity } = useHass();
  const light = getEntity(entities?.light || '');
  const $switch = getEntity(entities?.switch || '');
  if (light || $switch) {
    brightness = light && light.state !== 'unavailable' ? light.state === 'on' ? (light.attributes.brightness / 255) : 0 : $switch.state === 'on' ? 1 : 0;
  } else if (active) {
    brightness = 1;
  }
  
  return <>
    <ZoneBase opacity={brightness} src={base} />
    {overlay !== null && <ZoneOverlay onClick={() => {
      callSwitch(entities.switch);
    }} {...overlay} />}
  </>
}
interface AreaCardProps {
  zones: ZoneProps[];
  base: string;
  footer?: ReactElement;
}
export function AreaCard({
  base,
  zones,
  footer
}: AreaCardProps) {
  return <>
    <Background>
      <Zones>
        <img src={base} />
        {zones.map((zone, index) => <Zone {...zone} key={index} />)}
      </Zones>    
    </Background>
    {footer && <ZoneFooter>
      {footer}
    </ZoneFooter>}
  </>
}
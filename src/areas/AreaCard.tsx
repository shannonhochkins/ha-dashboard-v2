import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { useHass, useMq } from '@hooks';
import { omit } from 'lodash';

interface ZoneOverlay {
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  renderSvg?: (callback: () => void) => ReactNode;
}

const ZoneOverlay = styled.div`
  position: absolute;
  z-index: 2;
  svg {
    width: 100%;
    animation: fillAnimation 5s linear infinite;
    path, ellipse {
      stroke-width: 2;
      stroke: #5bbaff;
      cursor: pointer;
      filter: url(#glow);
    }
  }
  @keyframes fillAnimation {
    0% {
      fill: rgb(100 203 255 / 10%)
    }

    54% {
      fill: rgb(100 203 255 / 20%)
    }

    100% {
      fill: rgb(100 203 255 / 10%)
    }
  }
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
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 32px;
  > * {
    margin: 0 20px;
    
  }
  ${useMq(['mobile'], `
    padding: 10px 16px;
    > * {
      margin: 0 10px;
    }
  `)}
`;

const Zones = styled.div`
  position: relative;
`;

const Background = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  margin: 24px;
  max-width: 940px;
  img {
    height: auto;
    width: 100%;
  }
  ${useMq(['mobile'], `
    margin: 0;
  `)}
  
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
    {overlay !== null && overlay.renderSvg && <ZoneOverlay style={{...omit(overlay, 'svg')}}>
      {overlay.renderSvg(() => {
        callSwitch(entities.switch);
      })}
    </ZoneOverlay>}
  </>
}
interface AreaCardProps {
  zones: ZoneProps[];
  base: string;
  footer?: ReactNode;
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
      {footer && <ZoneFooter>
        {footer}
      </ZoneFooter>} 
    </Background>
  </>
}
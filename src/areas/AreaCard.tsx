import { ReactNode, useCallback } from 'react';
import styled from '@emotion/styled';
import { mq, useCurrentRoute } from '@hooks';
import { omit } from 'lodash';
import { useHass, useApi } from '@hakit/core';
import type { DomainService, SnakeToCamel } from '@hakit/core';

interface ZoneOverlay {
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  zIndex?: number;
  renderSvg?: (callback: () => void) => ReactNode;
}

const ZoneOverlay = styled.div<{
  on?: string;
  stateless: boolean;
}>`
  position: absolute;
  z-index: 2;
  svg {
    width: 100%;
    overflow: inherit;
    animation: fillAnimation 5s linear infinite;
    ${mq(['fridge'], `
      animation: none;
      fill: rgb(100 203 255 / 10%);
    `)}
    path, ellipse {
      stroke-width: 2;
      stroke: ${props => props.stateless ? 'rgb(91 141 255)' : props.on ? 'rgb(99 255 91)' : 'rgb(255 91 123)'};
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
  blendMode: string;
}
const ZoneBase = styled.img<ZoneBaseProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  mix-blend-mode: ${props => props.blendMode};
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
  ${mq(['mobile'], `
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
  ${mq(['mobile'], `
    margin: 0;
  `)}
  
`;
export interface ZoneProps {
  entities?: {
    light?: string;
    switch?: string;
    cover?: string;
  };
  base?: string;
  blendMode?: string;
  active?: boolean;
  stateless?: boolean;
  overlay: null | ZoneOverlay;
}
function Zone({
  entities,
  base,
  overlay = null,
  stateless = false,
  blendMode = 'lighten',
  active = false
}: ZoneProps) {
  let brightness = 0;
  const { getEntity } = useHass();
  const switchService = useApi('switch');
  const coverService = useApi('cover');
  const callSwitch = useCallback((entity: string) => {
    switchService.toggle(entity);
  }, []);
  const callCover = useCallback((entity: string, service: SnakeToCamel<DomainService<'cover'>>) => {
    coverService[service](entity);
  }, []);
  const light = entities?.light ? getEntity(entities.light) : null;
  const $switch = entities?.switch ? getEntity(entities.switch) : null;
  const cover = entities?.cover ? getEntity(entities.cover) : null;
  if (light || $switch) {
    brightness = light && light.state !== 'unavailable' ? light.state === 'on' ? (light.attributes.brightness / 255) : 0 : $switch?.state === 'on' ? 1 : 0;
  } else if (active) {
    brightness = 1;
  } else if (cover && cover.state === 'open') {
    brightness = 1;
  }
  const on = $switch?.state === 'on' || light?.state === 'on' || cover?.state === 'open';
  
  return <>
    {base && <ZoneBase blendMode={blendMode} opacity={brightness} src={base} />}
    {overlay !== null && overlay.renderSvg && <ZoneOverlay stateless={stateless} on={on ? 'on' : undefined} style={{...omit(overlay, 'svg')}}>
      {overlay.renderSvg(() => {
        if (entities?.switch) {
          callSwitch(entities.switch);
        }
        if (entities?.cover && cover) {
          callCover(entities.cover, cover.state === 'open' ? 'closeCover' : 'openCover');
        }
      })}
    </ZoneOverlay>}
  </>
}

const Temp = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  border-top-left-radius: 24px;
  border-bottom-right-radius: 12px;
  padding: 8px 12px;
  background-color: rgba(0,0,0,0.2);
  font-size: 14px;
`;

interface AreaCardProps {
  zones: ZoneProps[];
  base: string;
  footer?: ReactNode;
}
export function AreaCard({
  base,
  zones,
  footer,
}: AreaCardProps) {
  const currentRoute = useCurrentRoute();
  return <>
    <Background>
      <Zones>
        <img src={base} />
        {zones.map((zone, index) => <Zone {...zone} key={index} />)}
      </Zones>   
      {footer && <ZoneFooter>
        {footer}
      </ZoneFooter>} 
      {!!currentRoute && currentRoute.suffix && <Temp>{currentRoute.suffix}</Temp>}
    </Background>
  </>
}
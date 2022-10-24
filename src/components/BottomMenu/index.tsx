import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useRoutes, useHash, useResize } from '@hooks';
import { Widgets, AcUnit, Security } from '@mui/icons-material'; 


const Menu = styled.menu`
  position: relative;
  margin: 0;
  display: flex;
  width: 100%;
  font-size: 1.5em;
  padding: 0;
  align-items: center;
  justify-content: center;
  background-color: var(--ha-menu-background);
  z-index: 2;
  height: 100px;
`;

const MenuItem = styled.button<{
  active: boolean;
}>`
  all: unset;
  flex-grow: 1;
  z-index: 100;
  display: flex;
  cursor: pointer;
  position: relative;
  border-radius: 50%;
  align-items: center;
  will-change: transform;
  justify-content: center;
  height: 100%;
  
  transition: transform var(--ha-menu-animation-duration);
  &:before {
    content: "";
    z-index: -1;
    width: 4.2em;
    height: 4.2em;
    border-radius: 50%;
    position: absolute;
    transform: scale(0);
    transition: background-color var(--ha-menu-animation-duration), transform var(--ha-menu-animation-duration);
  }

  svg {
    width: 2.6em;
    height: 2.6em;
    stroke: white;
    fill: transparent;
    stroke-width: 1pt;
    stroke-miterlimit: 10;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 600;
  }
  ${props => props.active && `
    transform: translate3d(0, -.8em , 0);
    &:before {
      transform: scale(1);
      background-color: ${props.color};
    }
    svg {
      animation: strok 1.5s reverse;
    }
  `}
  @keyframes strok {
    100% {
      stroke-dashoffset: 600;
    }
  }
`;

const MenuBorder = styled.div`
  left: 0;
  bottom: 99%;
  width: 10.9em;
  height: 2.4em;
  position: absolute;
  clip-path: url(#menu);
  will-change: transform;
  background-color: var(--ha-menu-background);
  transition: transform var(--ha-menu-animation-duration);
`;

export function BottomMenu() {
  const routes = useRoutes();
  const size = useResize();
  const [hash, setHash] = useHash();
  const menuBorderRef = useRef(null);
  const roomRef = useRef<HTMLButtonElement>(null);
  const acRef = useRef<HTMLButtonElement>(null);
  const securityRef = useRef<HTMLButtonElement>(null);
  
  const roomRoutes = routes.filter(route => route.room);
  const isRoomActive = roomRoutes.some(route => route.active) || hash === '';
  const securityView = routes.find(route => route.hash === 'security');
  const acView = routes.find(route => route.hash === 'air-conditioner');


  function offsetBubble(item: HTMLButtonElement) {
    const offsetActiveItem = item.getBoundingClientRect();
    const left = Math.floor(offsetActiveItem.left - (menuBorderRef.current.offsetWidth  - offsetActiveItem.width) / 2) +  "px";
    menuBorderRef.current.style.transform = `translate3d(${left}, 0 , 0)`;
  }

  useEffect(() => {
    if (menuBorderRef && menuBorderRef.current) {
      if (isRoomActive) {
        offsetBubble(roomRef.current);
      } else if (acView && acView.active) {
        offsetBubble(acRef.current);
      } else if (securityView && securityView.active) {
        offsetBubble(securityRef.current);
      };
    }
  }, [menuBorderRef, routes, size]);

  // 4343f5
  // e0b115
  // 65ddb7
  return <>
    <Menu>
        <MenuItem ref={acRef} onClick={() => {
          setHash(acView.hash);
          offsetBubble(acRef.current);
        }} active={acView?.active} color="#f54888">
          <AcUnit />
        </MenuItem>
        <MenuItem ref={roomRef} onClick={() => {
          offsetBubble(roomRef.current);
          setHash('');
        }} active={isRoomActive} color="#ff8c00">
          <Widgets />
        </MenuItem>
        <MenuItem ref={securityRef} onClick={() => {
          setHash(securityView.hash);
          offsetBubble(securityRef.current);
        }} active={securityView?.active} color="#4343f5">
          <Security />
        </MenuItem>
        <MenuBorder ref={menuBorderRef} />
      </Menu>
      <div style={{
        width: 0,
        height: 0
      }}>
        <svg viewBox="0 0 202.9 45.5" >
          <clipPath id="menu" clipPathUnits="objectBoundingBox" transform="scale(0.0049285362247413 0.021978021978022)">
            <path  d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
              c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
              c9.2,3.6,17.6,4.2,23.3,4H6.7z"/>
          </clipPath>
        </svg>
      </div>
  </>
}
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { createRoot } from 'react-dom/client';
import { css, Global } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';

import { Hass } from '@hass';
import { useHass } from '@store';
import { useRoutes, useHash, FullScreen, useFullScreen } from '@hooks';
// import { HashRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { cssTheme } from './theme';

import { Sidebar } from '@components';

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/kanit/100.css";


const MIN_SWIPE_DISTANCE = 150;

const Areas = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
`;

interface RouteProps {
}
const Route = styled.div<RouteProps>`
  width: 100%;
`;

function Root() {
  const hass = useHass();
  // const location = useLocation();
  const routes = useRoutes();
  // const navigate = useNavigate();
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [hash, setHash] = useHash();

  const onTouchStart = (e) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  
  const goTo = ($hash: string) => {
    setHash($hash);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
    if (isLeftSwipe || isRightSwipe) {
      const newDirection = isLeftSwipe ? 1 : -1;
      const currentRouteIndex = routes.findIndex(route => route.hash === hash.replace('#', ''));
      setDirection(newDirection);
      
      if (newDirection === -1) {
        // swiped right, technically go backwards
        const newRouteIndex = currentRouteIndex - 1 < 0 ? routes.length - 1 : currentRouteIndex - 1;
        const nextRoute = routes[newRouteIndex];
        goTo(nextRoute.hash);
      }
      if (newDirection === 1) {
        // swiped left, technically go forwards
        const newRouteIndex = currentRouteIndex + 1 > routes.length - 1 ? 0 : currentRouteIndex + 1;
        const nextRoute = routes[newRouteIndex];
        goTo(nextRoute.hash);
      }
    }
  }
  return <>
    <Global
      styles={css`
        :root {
          ${cssTheme}
          @property --ha-x {
            syntax: '<percentage>';
            initial-value: 0%;
            inherits: false;
          }
          @property --ha-y {
            syntax: '<percentage>';
            initial-value: 0%;
            inherits: false;
          }
        }
        ::-webkit-scrollbar {
          background-color: transparent;
          width:8px
        }
        ::-webkit-scrollbar-track {
            background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: var(--ha-background);
          border-radius: 16px;
          border:5px solid transparent;
        }
        ::-webkit-scrollbar-button {display:none}
        html, body, #root {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          font-family: "Roboto";
          overflow: hidden;
        }
        
        #root {
          background-color: var(--ha-background);
        }
      `}
    />
    <Container>
      <Sidebar />
      <Areas onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
         {/* <AnimatePresence custom={direction}> */}
          {routes.map(route => route.active && <Route key={route.name}>{route.render(direction)}</Route>)}
         {/* </AnimatePresence>  */}
      </Areas>
    </Container>
  </>
}

function App() {
  const handle = useFullScreen();
  return <Hass>
    <>
      <button style={{ position: 'absolute', 'top': 0, left: 0, zIndex: 20}} onClick={handle.enter}>
        Enter fullscreen
      </button>
      <FullScreen handle={handle}>
        <Root />
      </FullScreen>
    </>
  </Hass>
};

const root = createRoot(document.getElementById('root'));

root.render(<App />);

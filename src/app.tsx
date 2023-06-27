import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { css, Global } from '@emotion/react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Hass } from '@hass';
import { useRoutes, useRefresh } from '@hooks';
import { cssTheme } from './theme';

import { BottomMenu, LowBatteryAlert, FrontDoorOpened } from '@components';

import { HassConnect, HassConnectProps } from 'ha-component-kit';
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.HA_URL_PROD : process.env.HA_URL_DEV;

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/kanit/100.css";

const Areas = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;
interface RouteProps {
  
}
const Route = styled.div<RouteProps>`
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  transition: 0.4s ease;
  transition-property: opacity, transform;
  &.route-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  &.route-enter-active {
    opacity: 1;
  }
  &.route-exit {
    opacity: 1;
  }
  &.route-exit-active {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }

  &.left-to-right-enter {
      transform: translateX(-100%);
  }
  &.left-to-right-enter-active {
      transform: translateX(0);
      transition:all 1s liner;
  }      

  &.left-to-right-exit {
      transform: translateX(0);
  }
  &.left-to-right-exit-active {
      transform: translateX(100%);
      transition:all 1s liner;
  }      
`;

const DateTime = styled.h3`
  position: absolute;
  top: 0;
  font-size: 20px;
  line-height:24px;
  font-family: "Kanit", sans-serif;
  color: var(--ha-text-light);
  z-index: 3;
  text-align: center;
  background-color: rgba(0,0,0,0.3);
  border-radius: 8px;
  padding: 6px;
  margin: 10px 0 0 0;
  left: 50%;
  transform: translate3d(-50%,0, 0);
  text-transform: uppercase;
`;

function toDate(dt: number, options?: Intl.DateTimeFormatOptions) {
  return new Date((dt * 1000)).toLocaleDateString('en-AU', options || {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  });
}

function Root() {
  useRefresh();
  const routes = useRoutes();
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
      <DateTime>{toDate(Date.now() / 1000)}</DateTime>
      <TransitionGroup  childFactory={child => React.cloneElement(child, { classNames: "left-to-right", timeout: 1000 })} component={Areas} className={'route-list'}>
        {routes.filter(route => route.active).map(route => <CSSTransition
          timeout={500}
          classNames="right-to-left"
          nodeRef={route.ref}
          key={route.name}
        >
          <Route ref={route.ref}>{route.render()}</Route>
        </CSSTransition>)}
      </TransitionGroup>
      <BottomMenu />
      <LowBatteryAlert />
      <FrontDoorOpened />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
          },
        }} />
    </Container>
  </>
}

function App() {
  return <HassConnect hassUrl={BASE_URL}>
    <Root />
  </HassConnect>
};

const root = createRoot(document.getElementById('root'));

root.render(<App />);

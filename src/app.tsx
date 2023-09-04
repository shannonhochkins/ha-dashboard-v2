import styled from '@emotion/styled';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { css, Global } from '@emotion/react';
import { useRoutes, useRefresh } from '@hooks';
import { cssTheme } from './theme';
import { ThemeProvider, RoomCard, Row, Column } from '@hakit/components';
import { BottomMenu, LowBatteryAlert, FrontDoorOpened } from '@components';
import { HassConnect, useHass } from '@hakit/core';
const BASE_URL = (import.meta.env.NODE_ENV === 'production' ? import.meta.env.VITE_HA_URL_PROD : import.meta.env.VITE_HA_URL_DEV) as string;

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/kanit/100.css";


const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
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
  const { getAllEntities } = useHass();
  console.log('xxx', getAllEntities());
  return <>
    
    <Container>
      <DateTime>{toDate(Date.now() / 1000)}</DateTime>
      <Column fullWidth fullHeight>
        <Row fullWidth gap={'0.5rem'}>
          {routes.map(route => (<RoomCard style={{
            display: route.room ? 'flex': 'none'
          }} image={route.background as string} hash={route.hash} key={route.name} title={route.name}>
            {route.render()}
          </RoomCard>))}
        </Row>
      </Column>
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

export function App() {
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
        scroll-behavior: smooth;
        background-color: var(--ha-background);
      }
      
      #root {
        background-color: var(--ha-background);
      }
      [class*="ChildContainer"] {
        padding: 5rem 0 0 0 !important;
      }
    `}
  />
  <ThemeProvider theme={{
    background: 'rgb(11, 15, 25)',
    backgroundOpaque: 'rgba(17, 24, 39, 0.5)',
    primary: {
      background: 'rgba(17, 24, 39, 1)',
    },
    secondary: {
      background: 'rgb(45, 55, 72)'
    }
  }} />
  <HassConnect hassUrl={BASE_URL}>
    <Root />
  </HassConnect>
  </>
}

const root = createRoot(document.getElementById('root') as HTMLHtmlElement);

root.render(<App />);

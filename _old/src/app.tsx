import styled from "@emotion/styled";
import { createRoot } from "react-dom/client";
import { css, Global } from "@emotion/react";
import { ThemeProvider, Row, SidebarCard } from "@hakit/components";
import {
  PaginatedWidget,
  Header,
  WeatherClock,
  WeatherCard,
  AreaSlider,
  Page,
  ScreenSaver,
  WeatherBackground,
} from "@components";
import { HassConnect, useHass } from "@hakit/core";
const BASE_URL = (
  import.meta.env.NODE_ENV === "production"
    ? import.meta.env.VITE_HA_URL_PROD
    : import.meta.env.VITE_HA_URL_DEV
) as string;

import { configuration } from "./config";

import "@fontsource/kanit/100.css";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  flex-direction: column;
  padding: 1rem;
  background-color: var(--ha-S100);
`;
function Root() {
  // useRefresh();
  // const routes = useRoutes();
  // const areas = useAreas();
  const { useStore } = useHass();
  const connection = useStore((state) => state.connection);
  return (
    <>
      <Row
        fullWidth
        fullHeight
        wrap="nowrap"
        alignItems="stretch"
        justifyContent="flex-start"
      >
        {configuration.sidebar && (
          <SidebarCard
            startOpen={false}
            includeTimeCard={false}
            {...configuration.sidebar}
          />
        )}
        <Container>
          <Header />
          <Row
            fullWidth
            gap="1rem"
            alignItems="flex-start"
            justifyContent="stretch"
          >
            {configuration.weather && (
              <WeatherCard
                className="xxs-12 xs-12 sm-12 md-8 lg-8 xlg-8"
                entity={configuration.weather.entity}
                disableScale
                disableActiveState
                disableRipples
                disableColumns
                {...configuration.weather.options}
              />
            )}
            <Row
              className="xxs-12 xs-12 sm-12 md-4 lg-4 xlg-4"
              gap="1rem"
              alignItems="flex-start"
              justifyContent="flex-start"
              fullHeight
            >
              <PaginatedWidget
                pages={configuration.featurePanel.map<Page>((panel) => ({
                  children: panel.children({
                    connection: connection!,
                  }),
                }))}
              />
            </Row>
          </Row>
          <Row fullWidth>
            <AreaSlider />
          </Row>
        </Container>
      </Row>
      {configuration.screenSaver && configuration.screenSaver.enabled && (
        <ScreenSaver duration={configuration.screenSaver.duration}>
          <WeatherBackground
            entity={configuration.screenSaver.entity}
            blur={configuration.screenSaver.blur}
          />
          <WeatherClock />
        </ScreenSaver>
      )}
    </>
  );
}

export function App() {
  return (
    <>
      <Global
        styles={css`
          html,
          body,
          #root {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            font-family: "kanit";
            overflow: hidden;
          }
          #root {
            transition: background-color 0.3s ease-in-out;
            background-color: var(--ha-S50, #000);
          }
        `}
      />
      <HassConnect hassUrl={BASE_URL}>
        <ThemeProvider />
        <Root />
      </HassConnect>
    </>
  );
}

const root = createRoot(document.getElementById("root") as HTMLHtmlElement);

root.render(<App />);

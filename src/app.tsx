import { ThemeProvider } from "@hakit/components";
import { HassConnect } from "@hakit/core";
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <HassConnect hassUrl={import.meta.env.VITE_HA_URL}>
        <ThemeProvider
          breakpoints={{
            xxs: 600,
            xs: 900,
            sm: 1200,
            md: 1536,
            lg: 1700,
          }}
          globalComponentStyles={{
            modal: `
              background: rgba(255, 255, 255, 0.1);
              border-radius: 16px;
              backdrop-filter: blur(5px);
              border: 2px solid rgba(255, 255, 255, 0.1);
              min-height: calc(100% - 4rem);
              .modal-inner, .calendar, .calendar > .fc {
                height: 100%;
              }
            `,
            cardBase: `
              background-color: rgba(255, 255, 255, 0.05);
              border: 2px solid rgba(255, 255, 255, 0.1);
              &:not(:disabled):hover, &:not(.disabled):hover {
                background-color: rgba(255, 255, 255, 0.1);
                color: var(--ha-500-contrast);
              }
            `,
          }}
          globalStyles={`
            #root {
              user-select: none;
              ~ * {
                user-select: none;
                * {
                  user-select: none;
                }
              }
            }
            html {
              .card-base.group {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                backdrop-filter: blur(5px);
                border: 2px solid rgba(255, 255, 255, 0.1);
              }
            }
          `}
        />
        <Dashboard />
      </HassConnect>
    </>
  );
}

export default App;

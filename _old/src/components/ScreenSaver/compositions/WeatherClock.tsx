import { TimeCard } from "@hakit/components";
import styled from "@emotion/styled";

const StyledTimeCard = styled(TimeCard)`
  position: relative;
  background: inherit;
  border-radius: 1rem;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  h4.time,
  h4.time-suffix {
    font-size: 7rem;
    line-height: 7rem;
    color: rgba(255, 255, 255, 0.9);
  }
  h4.time-suffix {
    font-size: 7rem;
    line-height: 7rem;
    color: rgba(255, 255, 255, 0.5);
  }
  .contents > div {
    padding: 2rem;
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.9);
  }
`;

export function WeatherClock() {
  return <StyledTimeCard disableColumns hideIcon center onlyFunctionality />;
}

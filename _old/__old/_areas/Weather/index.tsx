import styled from "@emotion/styled";
import { AreaBase } from "../AreaBase";
import { WeatherCard } from "src/_components";
import { mq } from "src/_hooks";

const WeatherContainer = styled(AreaBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    width: 100%;
    max-width: 1000px;
    ${mq(
      ["fridge"],
      `
      max-width: 800px;
    `,
    )}
  }
`;

export function Weather() {
  return (
    <WeatherContainer>
      <WeatherCard />
    </WeatherContainer>
  );
}

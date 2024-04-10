import styled from "@emotion/styled";
import { AreaBase } from "../AreaBase";
import { AreaCard, ZoneProps } from "../AreaCard";
import base from "@assets/garage-base.jpg";
import downlights from "@assets/garage-lights.jpg";
import { CoverCard } from "src/_components";
import { Downlights, GarageDoor } from "./zones";
import { useApi } from "@hakit/core";

const GarageContainer = styled(AreaBase)``;
export function Garage() {
  const coverService = useApi("cover");
  const zones: ZoneProps[] = [
    {
      base: downlights,
      overlay: {
        renderSvg: (onClick) => <Downlights onClick={onClick} />,
        top: "0%",
        left: "0%",
        width: "100%",
      },
      entities: {
        switch: "switch.switch_light_garage_main",
      },
    },
    {
      overlay: {
        renderSvg: () => (
          <GarageDoor
            onClick={() => {
              coverService.toggle("cover.garage_door_main");
            }}
          />
        ),
        top: "23.4%",
        left: "0%",
        width: "40.7%",
      },
    },
  ];
  return (
    <GarageContainer>
      <AreaCard
        base={base}
        zones={zones}
        footer={
          <>
            <CoverCard
              entity="cover.garage_door_main"
              label="Main Garage"
              type="garage"
            />
          </>
        }
      />
    </GarageContainer>
  );
}

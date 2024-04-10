import styled from "@emotion/styled";
import { AreaBase } from "../AreaBase";
import { AreaCard, ZoneProps } from "../AreaCard";
import base from "@assets/outdoor-kitchen-base.jpg";
import fridge from "@assets/outdoor-kitchen-fridge.jpg";
import striplights from "@assets/outdoor-kitchen-striplights.jpg";
import downlights from "@assets/outdoor-kitchen-downlights.jpg";
import bbq from "@assets/outdoor-kitchen-bbq.jpg";
import { Striplights, Fridge, Downlights, BBQ } from "./zones";

const OutdoorKitchenContainer = styled(AreaBase)``;

export function OutdoorKitchen() {
  const zones: ZoneProps[] = [
    {
      base: fridge,
      overlay: {
        renderSvg: (onClick) => <Fridge onClick={onClick} />,
        top: "55.9%",
        left: "42.5%",
        width: "6.9%",
        zIndex: 2,
      },
      entities: {
        switch: "switch.switch_outdoor_kitchen_fridge",
      },
    },
    {
      base: striplights,
      overlay: {
        renderSvg: (onClick) => <Striplights onClick={onClick} />,
        top: "59.7%",
        left: "32.3%",
        width: "23.9%",
        zIndex: 1,
      },
      entities: {
        switch: "switch.switch_outdoor_kitchen_striplights",
      },
    },
    {
      base: downlights,
      overlay: {
        renderSvg: (onClick) => <Downlights onClick={onClick} />,
        top: "0.1%",
        left: "0.1%",
        width: "68%",
        zIndex: 3,
      },
      entities: {
        switch: "switch.switch_outdoor_kitchen_roof_lights",
      },
    },
    {
      base: bbq,
      overlay: {
        renderSvg: (onClick) => <BBQ onClick={onClick} />,
        top: "40.1%",
        left: "32.2%",
        width: "9.6%",
        zIndex: 3,
      },
      entities: {
        switch: "switch.outdoor_bbq_switch",
      },
    },
  ];

  return (
    <OutdoorKitchenContainer>
      <AreaCard base={base} zones={zones} />
    </OutdoorKitchenContainer>
  );
}

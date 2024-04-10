import styled from "@emotion/styled";
import { AreaBase } from "../AreaBase";
import { AreaCard, ZoneProps } from "../AreaCard";
import kitchenBase from "@assets/kitchen-base.jpg";
import kitchenPantry from "@assets/kitchen-pantry.png";
import kitchenRoof from "@assets/kitchen-roof.png";
import kitchenSmartframe from "@assets/kitchen-smartframe.png";
import kitchenPendants from "@assets/kitchen-pendants.png";
import { Roof, Pendants, Pantry } from "./zones";

const KitchenContainer = styled(AreaBase)``;

export function Kitchen() {
  // 9pm - 8am
  const now = new Date().getHours();
  const smartFrameOn = now >= 8 && now <= 21;

  const zones: ZoneProps[] = [
    {
      base: kitchenPantry,
      overlay: {
        renderSvg: (onClick) => <Pantry onClick={onClick} />,
        top: "30.1%",
        left: "52.9%",
        width: "6.9%",
      },
      entities: {
        switch: "switch.switch_pantry_vertical_garden",
      },
    },
    {
      base: kitchenPendants,
      overlay: {
        renderSvg: (onClick) => <Pendants onClick={onClick} />,
        top: "25%",
        left: "54%",
        width: "14.1%",
      },
      entities: {
        switch: "switch.switch_kitchen_pendant_light",
      },
    },
    {
      base: kitchenRoof,
      overlay: {
        renderSvg: (onClick) => <Roof onClick={onClick} />,
        top: "12%",
        left: "46%",
        width: "8%",
      },
      entities: {
        switch: "switch.switch_kitchen_main_light",
      },
    },
    {
      base: kitchenSmartframe,
      overlay: null,
      active: smartFrameOn,
    },
  ];

  return (
    <KitchenContainer>
      <AreaCard base={kitchenBase} zones={zones} />
    </KitchenContainer>
  );
}

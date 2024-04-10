import React from "react";
import styled from "@emotion/styled";
import { AreaBase } from "../AreaBase";
import { AreaCard, ZoneProps } from "../AreaCard";
import { CoverCard } from "src/_components";
import livingBase from "@assets/living-base.jpg";
import livingLight from "@assets/living-light.jpg";
import livingTV from "@assets/living-tv.jpg";
import { TV, Roof } from "./zones";
import { useHass, useEntity } from "@hakit/core";
import { ModalLightControls } from "@hakit/components";
import { useLongPress } from "react-use";

const LivingContainer = styled(AreaBase)``;

export function Living() {
  const { callService } = useHass();
  const livingRoomTV = useEntity("media_player.samsung_tv_living_room");
  const [roofLightModal, setRoofLightModal] = React.useState(false);
  const longPressEvent = useLongPress((e) => {
    // ignore on right click
    if ("button" in e && e.button === 2) return;
    setRoofLightModal(true);
  });
  const zones: ZoneProps[] = [
    {
      base: livingLight,
      overlay: {
        top: "14%",
        left: "40.6%",
        width: "8%",
        renderSvg: (onClick) => (
          <Roof
            layoutId="roof-light-modal"
            {...longPressEvent}
            onClick={onClick}
          />
        ),
      },
      entities: {
        switch: "switch.switch_living_room_light",
      },
    },
    {
      base: livingTV,
      overlay: {
        top: "37%",
        left: "60%",
        width: "17.1%",
        renderSvg: () => (
          <TV
            onClick={() => {
              callService({
                domain: "mediaPlayer",
                service: livingRoomTV.state === "on" ? "turnOff" : "turnOn",
                target: {
                  entity_id: "media_player.samsung_tv_living_room",
                },
              });
            }}
          />
        ),
      },
      entities: {
        switch: "media_player.samsung_tv_living_room",
      },
    },
  ];

  return (
    <LivingContainer>
      <AreaCard
        base={livingBase}
        zones={zones}
        footer={
          <>
            <CoverCard
              entity="cover.sb_curtain_patio_secondary"
              label="Patio Curtain"
            />
            <CoverCard
              entity="cover.sb_curtain_bbq_window"
              label="BBQ Curtain"
            />
          </>
        }
      />
      <ModalLightControls
        onClose={() => {
          setRoofLightModal(false);
        }}
        id="roof-light-modal"
        open={roofLightModal}
        title="Roof Light"
        entity="light.light_living_room_main"
      />
    </LivingContainer>
  );
}

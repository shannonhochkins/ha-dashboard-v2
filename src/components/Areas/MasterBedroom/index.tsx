import styled from "@emotion/styled";
import { useHass, useEntity } from "@hakit/core";
import { AreaBase } from "../AreaBase";
import { AreaCard, ZoneProps } from "../AreaCard";
import base from "@assets/bedroom-base.jpg";
import tv from "@assets/bedroom-tv.jpg";
import roofLight from "@assets/bedroom-light-roof.jpg";
import { Roof, TV, Soundbar } from "./zones";

const MasterBedroomContainer = styled(AreaBase)``;

export function MasterBedroom() {
  const { callService } = useHass();
  const masterTV = useEntity("media_player.samsung_tv_master_bedroom");
  const zones: ZoneProps[] = [
    {
      base: roofLight,
      overlay: {
        top: "10.5%",
        left: "36.9%",
        width: "8.5%",
        renderSvg: (onClick) => <Roof onClick={onClick} />,
      },
      entities: {
        switch: "switch.master_bedroom_fan_switch",
      },
    },
    {
      base: tv,
      overlay: {
        top: "18.8%",
        left: "56%",
        width: "20.4%",
        renderSvg: () => {
          return (
            <TV
              onClick={() => {
                callService({
                  domain: "media_player",
                  service: masterTV.state === "on" ? "turn_off" : "turn_on",
                  target: {
                    entity_id: "media_player.samsung_tv_master_bedroom",
                  },
                });
              }}
            />
          );
        },
      },
      entities: {
        switch: "media_player.samsung_tv_master_bedroom",
      },
    },
    {
      overlay: {
        top: "40.2%",
        left: "57.3%",
        width: "14.4%",
        renderSvg: () => (
          <Soundbar
            onClick={() => {
              callService({
                domain: "remote",
                service: "sendCommand",
                target: {
                  device_id: "3b5cd884569e393b965c72ad576cd13b",
                },
                serviceData: {
                  command: "Power" as unknown as object,
                  device: "Soundbar",
                },
              });
            }}
          />
        ),
      },
    },
  ];

  return (
    <MasterBedroomContainer>
      <AreaCard base={base} zones={zones} />
    </MasterBedroomContainer>
  );
}

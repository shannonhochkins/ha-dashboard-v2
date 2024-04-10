import styled from "@emotion/styled";
import { AreaBase } from "../AreaBase";
import { AreaCard, ZoneProps } from "../AreaCard";
import { Roof } from "./zones";
import { CoverCard } from "src/_components";

import diningBase from "@assets/dining-base-optimised.jpg";
import diningLight from "@assets/dining-light-optimised.jpg";

const DiningContainer = styled(AreaBase)``;

export function Dining() {
  const zones: ZoneProps[] = [
    {
      base: diningLight,
      overlay: {
        top: "9%",
        left: "62%",
        width: "8%",
        renderSvg: (onClick) => <Roof onClick={onClick} />,
      },
      entities: {
        switch: "switch.stairs_bottom_dining",
      },
    },
  ];
  return (
    <DiningContainer>
      <AreaCard
        base={diningBase}
        zones={zones}
        footer={
          <>
            <CoverCard
              entity="cover.sb_curtain_patio_main"
              label="Main Curtain"
            />
            <CoverCard
              entity="cover.sb_curtain_pool_window"
              label="Pool Curtain"
            />
          </>
        }
      />
    </DiningContainer>
  );
}

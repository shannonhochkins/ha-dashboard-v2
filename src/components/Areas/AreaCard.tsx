import { ReactNode, useCallback } from "react";
import styled from "@emotion/styled";
import { mq } from "@hakit/components";
import { omit } from "lodash";
import { useService, useSubscribeEntity } from "@hakit/core";
import type { EntityName, DomainService, SnakeToCamel } from "@hakit/core";

interface ZoneOverlay {
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  zIndex?: number;
  renderSvg?: (callback: () => void) => ReactNode;
}

const ZoneOverlay = styled.div<{
  on?: string;
  stateless: boolean;
}>`
  position: absolute;
  z-index: 2;
  svg {
    width: 100%;
    overflow: inherit;
    animation: fillAnimation 5s linear infinite;
    path,
    ellipse {
      stroke-width: 2;
      stroke: ${(props) =>
        props.stateless
          ? "rgb(91 141 255)"
          : props.on
            ? "rgb(99 255 91)"
            : "rgb(255 91 123)"};
      cursor: pointer;
      filter: url(#glow);
    }
  }
  @keyframes fillAnimation {
    0% {
      fill: rgb(100 203 255 / 10%);
    }

    54% {
      fill: rgb(100 203 255 / 20%);
    }

    100% {
      fill: rgb(100 203 255 / 10%);
    }
  }
`;

interface ZoneBaseProps {
  opacity: number;
  blendMode: string;
}
const ZoneBase = styled.img<ZoneBaseProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  mix-blend-mode: ${(props) => props.blendMode};
  pointer-events: none;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.3s ease;
  opacity: ${(props) => props.opacity};
`;

const ZoneFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 32px;
  > * {
    margin: 0 20px;
  }
  ${mq(
    ["xxs", "xs", "sm"],
    `
    padding: 10px 16px;
    > * {
      margin: 0 10px;
    }
  `,
  )}
`;

const Zones = styled.div`
  position: relative;
`;

const Background = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  max-width: 100%;
  max-height: 80vh;
  img {
    height: 80vh;
    width: auto;
  }
  ${mq(
    ["xxs", "xs", "sm"],
    `
    margin: 0;
  `,
  )}
`;
export interface ZoneProps {
  entities?: {
    light?: EntityName;
    switch?: EntityName;
    cover?: EntityName;
  };
  base?: string;
  blendMode?: string;
  active?: boolean;
  stateless?: boolean;
  overlay: null | ZoneOverlay;
}
function Zone({
  entities,
  base,
  overlay = null,
  stateless = false,
  blendMode = "lighten",
  active = false,
}: ZoneProps) {
  let brightness = 0;
  const getLightEntity = useSubscribeEntity(entities?.light ?? "unknown");
  const getSwitchEntity = useSubscribeEntity(entities?.switch ?? "unknown");
  const getCoverEntity = useSubscribeEntity(entities?.cover ?? "unknown");
  const switchService = useService("switch");
  const coverService = useService("cover");
  const callSwitch = useCallback(
    (entity: string) => {
      switchService.toggle({
        target: entity,
      });
    },
    [switchService],
  );
  const callCover = useCallback(
    (entity: string, service: SnakeToCamel<DomainService<"cover">>) => {
      // @ts-expect-error - this is fine
      coverService[service]({
        target: entity,
      });
    },
    [coverService],
  );
  const light = getLightEntity(true);
  const $switch = getSwitchEntity(true);
  const cover = getCoverEntity(true);
  if (light || $switch) {
    brightness =
      light && light.state !== "unavailable"
        ? light.state === "on"
          ? light.attributes.brightness / 255
          : 0
        : $switch?.state === "on"
          ? 1
          : 0;
  } else if (active) {
    brightness = 1;
  } else if (cover && cover.state === "open") {
    brightness = 1;
  }
  const on =
    $switch?.state === "on" || light?.state === "on" || cover?.state === "open";

  return (
    <>
      {base && (
        <ZoneBase blendMode={blendMode} opacity={brightness} src={base} />
      )}
      {overlay !== null && overlay.renderSvg && (
        <ZoneOverlay
          stateless={stateless}
          on={on ? "on" : undefined}
          style={{ ...omit(overlay, "svg") }}
        >
          {overlay.renderSvg(() => {
            if (entities?.switch) {
              callSwitch(entities.switch);
            }
            if (entities?.cover && cover) {
              callCover(
                entities.cover,
                cover.state === "open" ? "closeCover" : "openCover",
              );
            }
          })}
        </ZoneOverlay>
      )}
    </>
  );
}

// const Temp = styled.span`
//   position: absolute;
//   top: 10px;
//   left: 10px;
//   color: white;
//   border-top-left-radius: 24px;
//   border-bottom-right-radius: 12px;
//   padding: 8px 12px;
//   background-color: rgba(0, 0, 0, 0.2);
//   font-size: 14px;
// `;

interface AreaCardProps {
  zones: ZoneProps[];
  base: string;
  footer?: ReactNode;
}
export function AreaCard({ base, zones, footer }: AreaCardProps) {
  return (
    <>
      <Background>
        <Zones>
          <img draggable={false} src={base} />
          {zones.map((zone, index) => (
            <Zone {...zone} key={index} />
          ))}
        </Zones>
        {footer && <ZoneFooter>{footer}</ZoneFooter>}
        {/* {!!currentRoute && currentRoute.suffix && (
          <Temp>{currentRoute.suffix}</Temp>
        )} */}
      </Background>
    </>
  );
}

import { EntityName, FilterByDomain, useEntity, HvacMode } from "@hakit/core";
import { useResizeDetector } from "react-resize-detector";
import { useId, useState } from "react";
import { FeatureButton, FeatureButtonProps } from "@components/FeatureButton";
import thermostat from "./thermostat.png";
import {
  Modal,
  Row,
  ClimateControls,
  ClimateControlsProps,
  computeHvacModeIcon,
} from "@hakit/components";
import styled from "@emotion/styled";
import { Icon } from "@iconify/react";

type HvacModeData<T> = {
  [key in HvacMode]: T;
};

const colors: HvacModeData<string> = {
  auto: "#f9f9f9",
  heat_cool: "#cd5401",
  heat: "#cd5401",
  cool: "#2c8e98",
  off: "#383838",
  fan_only: "#f9f9f9",
  dry: "#ffc0bd",
};

const Header = styled.span`
  font-weight: normal;
  margin: 0;
  > * {
    font-size: 2rem;
  }
`;

const Temperature = styled.span`
  position: absolute;
  inset: 31% 0 0 0;
  margin-left: 3px;
  text-align: center;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40%;
`;

const Image = styled.img`
  width: 100%;
  max-width: 80%;
  height: auto;
`;

const HvacIcon = styled(Icon)`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
`;

function ClimatePreview<E extends EntityName>({
  entity: _entity,
}: {
  entity: FilterByDomain<E, "climate">;
}) {
  const entity = useEntity(_entity);
  const { width, ref } = useResizeDetector();
  const { current_temperature } = entity.attributes;
  const mode = entity.state as HvacMode;
  const stateColor = colors[mode];
  return (
    <Wrapper>
      <Inner>
        <Temperature
          style={{
            fontSize: width ? width / 9 : "100%",
          }}
        >
          {current_temperature}
          <HvacIcon icon={computeHvacModeIcon(mode)} color={stateColor} />
        </Temperature>
        <Image src={thermostat} ref={ref} />
      </Inner>
    </Wrapper>
  );
}

export function Climate<E extends EntityName>({
  entity: _entity,
  climateControlsProps,
  ...props
}: Omit<FeatureButtonProps<E>, "entity"> & {
  entity: FilterByDomain<E, "climate">;
  climateControlsProps?: Omit<ClimateControlsProps, "entity">;
}) {
  const _id = useId();
  const [open, setOpen] = useState(false);
  return (
    <>
      <FeatureButton
        title="Air Conditioner"
        description="Show the climate controls"
        icon="mdi:home-climate"
        layoutId={_id}
        layoutType="slim-vertical"
        color1={"#297471"}
        color2={"#3deec4"}
        // @ts-expect-error - TODO  FIX LATER
        longPressCallback={() => {
          setOpen(true);
        }}
        {...props}
      >
        <ClimatePreview entity={_entity} />
      </FeatureButton>
      <Modal
        id={_id}
        title={
          <Header>
            <span>
              <b>Set</b>&nbsp;Conditioning
            </span>
          </Header>
        }
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        cssStyles={`
        `}
      >
        <Row fullWidth fullHeight>
          <Row
            fullWidth
            fullHeight
            wrap="nowrap"
            justifyContent="space-between"
          >
            <ClimateControls
              entity={_entity}
              cssStyles={`
              .control-slider-circular {
                --ha-control-slider-track-bg: #111;
                --ha-control-slider-track-bg-opacity: 0.4;
              }
              height: 100%;
              .controls {
                height: 100%;
                > div:not(.controls-scroll) {
                  width: auto;
                  aspect-ratio: 1/1;
                  height: 70%;
                }
                [class*="BigNumber"] {
                  font-size: 10vh;
                }
              }
              .buttons, .controls-scroll {
                .fab-card {
                  width: 65px;
                  height: 65px;
                }
              }
            `}
              {...(climateControlsProps ?? {})}
            />
            {/* {!supportsTargetTemperature && <Dial entity={_entity} invertDragDirection={invertDragDirection} />} */}
          </Row>
        </Row>
      </Modal>
    </>
  );
}

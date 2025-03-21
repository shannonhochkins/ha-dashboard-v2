import { EntityName, FilterByDomain } from "@hakit/core";
import { Modal, CameraCard, Row, FabCard } from "@hakit/components";
import { useId, useState } from "react";
import { FeatureButton, FeatureButtonProps } from "@components/FeatureButton";

import camera from "./camera.png";

export function Cameras<E extends EntityName>({
  entities,
  ...props
}: FeatureButtonProps<E> & {
  entities: FilterByDomain<EntityName, "camera">[];
}) {
  const _id = useId();
  const [open, setOpen] = useState(false);
  const [activeEntity, setActiveEntity] = useState<string | null>(null);
  return (
    <>
      <FeatureButton
        image={camera}
        layoutId={_id}
        title="Security"
        description="Show the security cameras"
        icon="mdi:security"
        layoutType="slim-vertical"
        // @ts-expect-error - TODO - fix later
        longPressCallback={() => {
          setOpen(true);
        }}
        {...props}
      ></FeatureButton>
      <Modal
        id={_id}
        title="Cameras"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        cssStyles={`
          --ha-modal-width: 98vw;
        `}
      >
        {activeEntity && (
          <Row>
            <FabCard
              icon="mdi:arrow-left"
              onClick={() => {
                setActiveEntity(null);
              }}
              cssStyles={`
              margin-bottom: 1rem;
            `}
            />
          </Row>
        )}
        <Row
          gap="1rem"
          fullWidth
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          {entities
            .filter((entity) => (activeEntity ? entity === activeEntity : true))
            .map((entity) => {
              return (
                <CameraCard
                  key={entity}
                  entity={entity}
                  sm={entity === activeEntity ? 12 : 12}
                  md={entity === activeEntity ? 12 : 6}
                  lg={entity === activeEntity ? 12 : 6}
                  hideViewControls
                  hideName
                  muted={entity !== activeEntity}
                  onClick={() => {
                    setActiveEntity(entity);
                  }}
                  xlg={entity === activeEntity ? 12 : 4}
                  view="live"
                />
              );
            })}
        </Row>
      </Modal>
    </>
  );
}

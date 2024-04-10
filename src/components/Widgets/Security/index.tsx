import { EntityName, FilterByDomain } from "@hakit/core";
import { Modal, CameraCard, Row } from "@hakit/components";
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
  console.log("entities", entities);
  return (
    <>
      <FeatureButton
        image={camera}
        layoutId={_id}
        title="Security"
        description="Show the security cameras"
        icon="mdi:security"
        defaultLayout="slim-vertical"
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
          --ha-modal-width: 90vw;
        `}
      >
        <Row
          gap="1rem"
          fullWidth
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          {entities.map((entity) => {
            return (
              <CameraCard
                key={entity}
                entity={entity}
                sm={12}
                md={6}
                lg={6}
                xlg={4}
                view="live"
              />
            );
          })}
        </Row>
      </Modal>
    </>
  );
}

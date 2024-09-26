import { useLowDevices, EntityName } from "@hakit/core";
import {
  ButtonCard,
  ButtonCardProps,
  Modal,
  CameraCard,
  Row,
} from "@hakit/components";
import { useId, useState } from "react";

export function Cameras<E extends EntityName>(props: ButtonCardProps<E>) {
  const _id = useId();
  const [open, setOpen] = useState(false);
  const devices = useLowDevices({
    blacklist: ["solis"],
  });
  return devices.length ? (
    <>
      <ButtonCard
        layoutId={_id}
        title="Show the cameras"
        description="Security"
        icon="mdi:security"
        layoutType="slim-vertical"
        onClick={() => {
          setOpen(true);
        }}
        {...props}
      />
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
          <CameraCard
            entity="camera.backyard_sub"
            sm={12}
            md={6}
            lg={6}
            xlg={4}
            view="live"
          />
          <CameraCard
            entity="camera.caravan_sub"
            sm={12}
            md={6}
            lg={6}
            xlg={4}
            view="live"
          />
          <CameraCard
            entity="camera.side_sub"
            sm={12}
            md={6}
            lg={6}
            xlg={4}
            view="live"
          />
        </Row>
      </Modal>
    </>
  ) : null;
}

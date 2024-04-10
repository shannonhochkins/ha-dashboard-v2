import { useLowDevices, EntityName } from "@hakit/core";
import {
  EntitiesCard,
  EntitiesCardRow,
  FabCard,
  Modal,
} from "@hakit/components";
import { useId, useState } from "react";

export function LowDevices() {
  const _id = useId();
  const [open, setOpen] = useState(false);
  const devices = useLowDevices({
    blacklist: ["solis"],
  });
  return devices.length ? (
    <>
      <FabCard
        layoutId={_id}
        icon="mdi:battery-alert"
        size={36}
        onClick={() => {
          setOpen(true);
        }}
      />
      <Modal
        id={_id}
        title="Low Devices"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <EntitiesCard disableColumns includeLastUpdated>
          {devices.map((device) => (
            <EntitiesCardRow
              key={device.entity_id}
              entity={device.entity_id as EntityName}
              renderState={(entity) => {
                return (
                  <div>
                    {entity.state}
                    {entity.attributes.unit_of_measurement}
                  </div>
                );
              }}
            />
          ))}
        </EntitiesCard>
      </Modal>
    </>
  ) : null;
}

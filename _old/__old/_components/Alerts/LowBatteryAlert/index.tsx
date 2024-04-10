import { useState } from "react";
import styled from "@emotion/styled";
import { useLowDevices, EntityName } from "@hakit/core";
import { EntitiesCard, FabCard } from "@hakit/components";
import { Popup } from "src/_components";

const Parent = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
`;

export function LowBatteryAlert() {
  const entities = useLowDevices({
    blacklist: ["phone", "tablet", "sm_t220", "solis"],
  });
  const [open, setOpen] = useState(false);
  const someLowDevices = entities.length > 0;
  return (
    <>
      {someLowDevices && (
        <Parent>
          <FabCard
            icon="material-symbols:battery-alert"
            onClick={() => setOpen(true)}
          />
        </Parent>
      )}
      <Popup onClose={() => setOpen(false)} open={open}>
        <EntitiesCard
          includeLastUpdated
          entities={entities.map((device) => ({
            entity: device.entity_id as EntityName,
            renderState(entity) {
              return (
                <div
                  style={{
                    color: "red",
                  }}
                >
                  {entity.state}
                  {entity.attributes.unit_of_measurement}
                </div>
              );
            },
          }))}
        />
      </Popup>
    </>
  );
}

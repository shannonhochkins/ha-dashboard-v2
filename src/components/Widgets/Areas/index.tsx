import {
  EntityName,
  useAreas,
  computeDomain,
  FilterByDomain,
  OFF,
} from "@hakit/core";
import { FeatureButton, FeatureButtonProps } from "@components/FeatureButton";
import styled from "@emotion/styled";
import { useLongPress } from "use-long-press";
import { groupBy, uniqBy, capitalize } from "lodash";
import { useState } from "react";
import { HassEntity } from "home-assistant-js-websocket";
import {
  Column,
  CameraCard,
  SensorCard,
  Group,
  TriggerCard,
  ButtonCard,
  MediaPlayerCard,
  Row,
  EntitiesCard,
  EntitiesCardRow,
} from "@hakit/components";
import { Modal } from "@components/Modal";
import { configuration } from "../../../config";

const Image = styled.img`
  border-radius: 1rem;
  overflow: hidden;
  height: 70%;
  width: 100%;
  object-fit: cover;
`;

function getDefaultService(entity: HassEntity): string {
  const domain = computeDomain(entity.entity_id as EntityName);
  switch (domain) {
    case "lock":
      return entity.state === "locked" ? "unlock" : "lock";
    case "water_heater":
      return entity.state === OFF ? "turnOn" : "turnOff";
    case "scene":
      return "turnOn";
    case "automation":
      return "trigger";
    default:
      return "toggle";
  }
}

export function Area<E extends EntityName>({
  image,
  title,
  entityCount,
  deviceCount,
  description: _description,
  id,
  ...props
}: FeatureButtonProps<E> & {
  deviceCount: number;
  entityCount: number;
  id: string;
}) {
  const areas = useAreas();
  const area = areas.find((area) => area.area_id === id) ?? {
    entities: [],
  };
  const configurationAreas = configuration?.areas ?? {};
  const [openArea, setOpenArea] = useState(false);
  const description =
    _description ||
    `${deviceCount > 0 ? `${deviceCount} devices` : ""}${
      entityCount > 0 && deviceCount > 0 ? ` and ` : ""
    }${entityCount > 0 ? `${entityCount} entities` : ""}`;

  const bind = useLongPress(
    () => {
      if (!openArea) {
        setOpenArea(true);
      }
    },
    {
      threshold: 300,
      cancelOnMovement: true,
      cancelOutsideElement: true,
      filterEvents(e) {
        return !("button" in e && e.button === 2);
      },
    },
  );

  // group the entities by domain
  const groupedByDomain = groupBy(
    uniqBy([...area.entities], (entity) => entity.entity_id),
    (e) => {
      return computeDomain(e.entity_id as EntityName);
    },
  );

  return (
    <>
      <FeatureButton
        {...bind()}
        id={id}
        layoutId={id}
        icon={configurationAreas[id]?.card?.icon ?? "mdi:information"}
        title={title}
        layoutType="slim-vertical"
        description={description}
        cssStyles={`
        .inner-column {
          justify-content: space-between;
        }
      `}
        {...props}
      >
        <Image src={image} draggable={false} />
      </FeatureButton>
      <Modal
        open={openArea}
        title={title}
        onClose={() => setOpenArea(false)}
        id={id}
        cssStyles={`--ha-modal-width: 90vw;`}
      >
        <Column
          gap="1rem"
          wrap="nowrap"
          fullWidth
          style={{
            padding: "1rem",
          }}
        >
          {configurationAreas[id]?.modal?.featureComponent ?? null}
          {Object.keys(groupedByDomain).length === 0 && (
            <Group title="No entities in this area" />
          )}
          {Object.entries(groupedByDomain).map(([domain, entities]) => {
            if (entities.length === 0) {
              return null;
            }
            const getContents = () => {
              if (
                domain === "light" ||
                domain === "switch" ||
                domain === "cover" ||
                domain === "script"
              ) {
                return entities.map((entity, index) => {
                  return (
                    <ButtonCard
                      key={index}
                      // @ts-expect-error - TODO - fix service types
                      service={getDefaultService(entity)}
                      entity={
                        entity.entity_id as FilterByDomain<
                          EntityName,
                          "cover" | "switch" | "light" | "script"
                        >
                      }
                    />
                  );
                });
              }
              if (domain === "media_player") {
                return entities.map((entity, index) => {
                  return (
                    <MediaPlayerCard
                      key={index}
                      entity={
                        entity.entity_id as FilterByDomain<
                          EntityName,
                          "media_player"
                        >
                      }
                    />
                  );
                });
              }
              if (domain === "camera") {
                return entities.map((entity, index) => {
                  return (
                    <CameraCard
                      key={index}
                      entity={
                        entity.entity_id as FilterByDomain<EntityName, "camera">
                      }
                    />
                  );
                });
              }
              if (domain === "sensor") {
                return entities.map((entity, index) => {
                  return (
                    <SensorCard
                      key={index}
                      entity={
                        entity.entity_id as FilterByDomain<EntityName, "sensor">
                      }
                    />
                  );
                });
              }
              if (domain === "automation") {
                return entities.map((entity, index) => {
                  return (
                    <TriggerCard
                      key={index}
                      entity={
                        entity.entity_id as FilterByDomain<
                          EntityName,
                          "automation"
                        >
                      }
                      service="trigger"
                    />
                  );
                });
              }
              return (
                <EntitiesCard includeLastUpdated>
                  {entities.map((entity, index) => {
                    return (
                      <EntitiesCardRow
                        key={index}
                        entity={entity.entity_id as EntityName}
                      />
                    );
                  })}
                </EntitiesCard>
              );
            };
            return (
              <Group
                key={domain}
                title={`${capitalize(domain).replace(/_/g, " ")} entities`}
              >
                <Row
                  gap="1rem"
                  fullWidth
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  {getContents()}
                </Row>
              </Group>
            );
          })}
        </Column>
      </Modal>
    </>
  );
}

import { FabCard, Modal, EntitiesCardRow } from "@hakit/components";
import { useHass, isUnavailableState, EntityName } from "@hakit/core";
import { List, AutoSizer } from "react-virtualized";
import { useMemo, useId, useState } from "react";
import { HassEntity } from "home-assistant-js-websocket";

import styled from "@emotion/styled";

const FormGroup = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem 0 0;
  > label,
  > div {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 12px;
    color: var(--ha-S300-contrast);
  }
`;

const FormField = styled.input`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--ha-A400);
  outline: 0;
  font-size: 16px;
  color: var(--ha-S300-contrast);
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
  &::placeholder {
    color: transparent;
  }
  &:placeholder-shown ~ label {
    font-size: 1rem;
    cursor: text;
    top: 20px;
  }
  &:focus ~ label {
    color: var(--ha-S50-contrast);
  }
  &:focus {
    padding-bottom: 6px;
    border-bottom: 2px solid var(--ha-A400);
  }
`;

const Label = styled.label``;

export function EntitySearch() {
  const _id = useId();
  const [open, setOpen] = useState(false);
  const { getAllEntities } = useHass();
  const entities = getAllEntities();
  const items = useMemo<HassEntity[]>(() => {
    return Object.keys(entities)
      .map((key) => {
        const entity = entities[key];
        if (isUnavailableState(entity.state)) {
          return null;
        }
        return entity;
      })
      .filter((entity): entity is HassEntity => !!entity);
  }, [entities]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [items, searchTerm]);

  return (
    <>
      <FabCard
        layoutId={_id}
        icon="mdi:search"
        size={36}
        onClick={() => {
          setOpen(true);
        }}
      />
      <Modal
        id={_id}
        title="Find Device"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <FormGroup>
          <FormField
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          ></FormField>
          <Label>Search...</Label>
        </FormGroup>
        <div style={{ height: "60vh", maxHeight: "100%", width: "100%" }}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowCount={filteredItems.length}
                rowHeight={56} // adjust as needed
                rowRenderer={({ key, index, style }) => {
                  const item = filteredItems[index];
                  return (
                    <div key={key} style={style}>
                      <EntitiesCardRow
                        entity={item.entity_id as EntityName}
                        name={
                          <>
                            {item.attributes.friendly_name}
                            <span>{item.entity_id}</span>
                          </>
                        }
                      />
                    </div>
                  );
                }}
              />
            )}
          </AutoSizer>
        </div>
      </Modal>
    </>
  );
}

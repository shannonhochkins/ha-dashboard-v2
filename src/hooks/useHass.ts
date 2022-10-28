import create from 'zustand';
import { ReactNode } from 'react';
import {
  HassServiceTarget,
  callService,
  HassEntities,
  Connection,
  HassEntity
} from "home-assistant-js-websocket";
import { isEqual } from 'lodash';

const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.HA_URL_PROD : process.env.HA_URL_DEV;

const WHITELIST: string[] = [
  
];
type SwitchServices = 'toggle' | 'turn_on' | 'turn_off';
type LightServices = 'toggle' | 'turn_on' | 'turn_off';

interface HassState {
  connection: Connection | null;
  ready: boolean;
  base: string;
  lastUpdated: number | null,
  setEntities: (entities: HassEntities) => void;
  appendToWhitelist: (entity: string) => void;
  setConnection: (connection: Connection) => void;
  getEntity: (entity: string) => HassEntity | null;
  callSwitch: (entity: string, service?: SwitchServices) => void,
  callLight: (entity: string, service?: LightServices) => void,
  getAllEntities: () => HassEntities;
  callService: (
    domain: string,
    service: string,
    serviceData: object,
    target: HassServiceTarget
  ) => void;
}

let ENTITIES: HassEntities = {};
let PREV_ENTITIES: HassEntities = null;
let lastUpdatedInternal = Date.now();
const THROTTLE_UPDATE = 150;
let throttleTimer: NodeJS.Timeout;

export const useHass = create<HassState>()((set, get) => ({
  lastUpdated: null,
  connection: null,
  ready: false,
  base: BASE_URL,
  setEntities: $entities => {
    const { ready } = get();
    // capture the time now
    const now = Date.now();
    // determine how long has passed since the last update from the socket
    const elapsed = now - lastUpdatedInternal;
    // after we've retrieved the elapsed time, update the lastUpdatedInternal time
    lastUpdatedInternal = now;
    // update the internal reference to the entities
    ENTITIES = $entities;
    // filter the inbound entities from the whitelist
    const filtered = Object.entries($entities)
      .filter(([entity]) => WHITELIST.includes(entity));
    // conver the filtered whitelist back to the HassEntities object
    const newEntities = Object.fromEntries(filtered);
    // if the elapsed time is below the throttle time, clear the previous timer if exists
    if (elapsed < THROTTLE_UPDATE && throttleTimer) {
      clearTimeout(throttleTimer);
    }
    // start a timer to wait X time
    throttleTimer = setTimeout(() => {
      // if the new entities are different, update the lastUpdated time which will
      // trigger an update for all those effects watching it
      if (!isEqual(newEntities, PREV_ENTITIES)) {
        PREV_ENTITIES = newEntities;
        console.log('ENTITIES', ENTITIES);
        set(state => ({ lastUpdated: Date.now(), }))
      }
    }, THROTTLE_UPDATE);
    // if we're not ready, set it at this point
    if (!ready) {
      return set(state => ({ ready: true }))
    }
    return null;
  },
  appendToWhitelist: (entity) => {
    if (!WHITELIST.includes(entity)) {
      WHITELIST.push(entity);
    }
    return null;
  },
  setConnection: connection => set(state => ({ connection })),
  getAllEntities: () => {
    return ENTITIES;
  },
  getEntity: entity => {
    const { appendToWhitelist } = get();
    appendToWhitelist(entity);
    // just return the raw entitiy from the list if it's available
    const found = ENTITIES && ENTITIES[entity] ? ENTITIES[entity] || null : null;
    if (found === null && entity) {
      alert(`Entity doesn't exist "${entity}"`);
    }
    return found;
  },
  callSwitch: (entity, service = 'toggle') => {
    const { callService } = get();
    callService('switch', service, {}, {
      entity_id: entity
    });
  },
  callLight: (entity, service = 'toggle') => {
    const { callService } = get();
    callService('light', service, {}, {
      entity_id: entity
    });
  },
  callService: async (
    domain: string,
    service: string,
    serviceData: object,
    target: HassServiceTarget
  ) => {
    const { connection, ready } = get();
    if (connection && ready) {
      await callService(connection, domain, service, serviceData, target);
    }
  }
}));
import { useEffect, useState, useMemo } from 'react';
import { useHass } from '@hakit/core';
import { HassEntity } from "home-assistant-js-websocket";

const BLACKLIST = [
  'phone',
  'tablet',
  'sm_t220',
  'solis'
];

export const useLowDevices = () => {
  const { getAllEntities, lastUpdated } = useHass();
  const [ lowEntities, setLowEntities ] = useState<HassEntity[]>([]);
  const entities = getAllEntities();

  useEffect(() => {
    const batteryEntities = Object.values(entities)
      .filter(e => e.attributes.unit_of_measurement === '%' && e.attributes.device_class === 'battery')
      .filter(x => BLACKLIST.every(y => !x.entity_id.includes(y)));
    if (batteryEntities) {
      setLowEntities(batteryEntities);
    }
  }, [lastUpdated, entities]);


  return useMemo(() => lowEntities, [lowEntities]);

};

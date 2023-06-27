import { useEffect, useState, useCallback, useMemo } from 'react';
import { useHass } from 'ha-component-kit';
import { HassEntity } from "home-assistant-js-websocket";

export const useLowDevices = () => {
  const { getAllEntities, lastUpdated } = useHass();
  const [ lowEntities, setLowEntities ] = useState<HassEntity[]>([]);
  const entities = getAllEntities();

  useEffect(() => {
    const batteryEntities = Object.values(entities)
      .filter(e => e.attributes.unit_of_measurement === '%' && e.attributes.device_class === 'battery')
      .filter(x => !x.entity_id.includes('phone') && !x.entity_id.includes('tablet') && !x.entity_id.includes('sm_t220'));
    if (batteryEntities) {
      setLowEntities(batteryEntities);
    }
  }, [lastUpdated]);


  return useMemo(() => lowEntities, [lowEntities]);

};

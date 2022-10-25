import { useEffect, useState, useCallback, useMemo } from 'react';
import { useHass } from './useHass';


export const useLowDevices = () => {
  const { getAllEntities, lastUpdated } = useHass();
  const [ lowEntities, setLowEntities ] = useState<string[] | null>(null);
  const entities = getAllEntities();


  useEffect(() => {
    const batteryEntities = Object.keys(entities)
      .filter(e => e.includes('battery'))
      .map(e => entities[e])
      .filter(b => !isNaN(Number(b.state)))
      .map(b => ({
        ...b,
        state: Number(b.state)
      }))
      .filter(x => !x.entity_id.includes('phone'))
      .filter(b => b.state <= 5 && b.state >= 0);
    if (batteryEntities) {
      setLowEntities(batteryEntities.map(e => `${e.attributes.friendly_name} ${e.state}%`));
    }
  }, [lastUpdated]);


  return useMemo(() => lowEntities, [lowEntities]);

};

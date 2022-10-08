import { useEffect, useMemo, useState } from "react";
import { useHass } from '@store';
import { isEqual } from 'lodash';
import { HassEntity } from "home-assistant-js-websocket";

export function useEntity(entity: string)  {
  const [ $entity, setEntity ] = useState<HassEntity | null>(null);
  const { getEntity, lastUpdated } = useHass();

  useEffect(() => {
    const foundEntity = getEntity(entity);
    if (foundEntity && !isEqual(foundEntity, $entity)) {
      setEntity(foundEntity);
    }
  }, [lastUpdated]);

  return useMemo(() => $entity, [$entity]);
}

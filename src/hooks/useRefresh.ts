import { useEffect, useState } from "react";
import { useHass, useEntity } from '@hooks';

const REFRESH_HOURLY_INTERVAL = 3;

function shouldRefresh(t2, t1) {
  if (!t2 || !t1) {
    return;
  }
  let diff = (t2 - t1) / 1000;
  diff /= (60 * 60);
  diff = Math.abs(Math.round(diff));
  if (diff === 0) {
    return false;
  }
  return diff % REFRESH_HOURLY_INTERVAL === 0;
}

export function useRefresh()  {
  const { callService } = useHass();
  const [hasFinished, setFinished] = useState(false);
  const timer = useEntity('timer.refresh_internal');
  useEffect(() => {
    if (timer.state === 'idle') {
      if (hasFinished) {
        window.location.reload();
      } else {
        setFinished(true);
        callService('timer', 'start', {}, {
          entity_id: 'timer.refresh_internal'
        })
      }
    }
  }, [timer]);
}

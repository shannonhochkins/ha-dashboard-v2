import { useEffect, useState } from "react";
import { useHass, useEntity } from '@hooks';

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

import { useEffect } from "react";
import { useHass, useEntity } from '@hooks';

interface TimerEvent {
  data: {
    entity_id: string;
    finished_at: string;
  }
  event_type: string;
  origin: string;
  time_fired: string;
}

export function useRefresh()  {
  const { callService, connection } = useHass();
  const timer = useEntity('timer.refresh_internal');
  // authenticated user must be admin for this event listener to work
  connection.subscribeEvents((ev: TimerEvent) => {
    try {
      if (ev?.data?.entity_id === 'timer.refresh_internal') {
        window.location.reload();
      }
    } catch (e) {
      // failed to reload
    }
  }, 'timer.finished').then(r => {
  });
  useEffect(() => {
    if (timer.state === 'idle') {
      callService('timer', 'start', {}, {
        entity_id: 'timer.refresh_internal'
      })
    }
  }, [timer]);
}

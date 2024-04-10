import { useEffect } from "react";
import { useHass, useEntity } from "@hakit/core";

interface TimerEvent {
  data: {
    entity_id: string;
    finished_at: string;
  };
  event_type: string;
  origin: string;
  time_fired: string;
}

export function useRefresh() {
  const { callService, useStore } = useHass();
  const connection = useStore((store) => store.connection);
  const timer = useEntity("timer.refresh_internal");
  // authenticated user must be admin for this event listener to work
  if (connection) {
    connection?.subscribeEvents((ev: TimerEvent) => {
      try {
        if (ev?.data?.entity_id === "timer.refresh_internal") {
          window.location.reload();
        }
      } catch (e) {
        // failed to reload
      }
    }, "timer.finished");
  }

  useEffect(() => {
    let localUnsubscribe: null | Promise<() => void> = null;
    if (connection) {
      localUnsubscribe = connection.subscribeEvents((ev: TimerEvent) => {
        try {
          if (ev?.data?.entity_id === "timer.refresh_internal") {
            window.location.reload();
          }
        } catch (e) {
          // failed to reload
        }
      }, "timer.finished");
    }
    return () => {
      if (localUnsubscribe !== null) {
        localUnsubscribe.then((unsubscribe) => unsubscribe());
      }
    };
  }, [connection]);

  useEffect(() => {
    if (timer.state === "idle") {
      callService({
        domain: "timer",
        service: "start",
        target: {
          entity_id: "timer.refresh_internal",
        },
      });
    }
  }, [timer, callService]);
}

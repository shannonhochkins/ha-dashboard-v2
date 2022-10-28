import { useEffect, useMemo, useState } from "react";
import { BREAKPOINTS } from './useMq';

type Devices = keyof typeof BREAKPOINTS;

function determineDevice() {
  const matched = Object.entries(BREAKPOINTS)
    .map(([device, query]) => [device, window.matchMedia(query.replace(/^[^(]+/, ''))])
    .sort()
    .find(([device, query]) => (query as MediaQueryList).matches);
  return matched[0] as Devices;
}

export function useDevice() {
  const [ currentDevice, setDevice ] = useState(determineDevice());

  useEffect(() => {
    const handler = () => setDevice(determineDevice());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return useMemo(() => currentDevice, [currentDevice]);
}

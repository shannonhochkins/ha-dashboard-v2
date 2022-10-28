import React, { useState, useEffect, useMemo } from 'react';
import { RouteDefinition, useRoutes } from './useRoutes';


export function useCurrentRoute() {
  const routes = useRoutes();
  const [ route, setRoute ] = useState<RouteDefinition | null>(null);
  useEffect(() => {
    const activeRoute = routes.find(route => route.active);
    if (activeRoute) {
      setRoute(activeRoute);
    }
  }, [routes]);

  return useMemo(() => route, [route]);
}
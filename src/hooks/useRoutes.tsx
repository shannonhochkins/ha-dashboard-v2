import React, { useState, useEffect, useMemo, ReactElement } from 'react';
// import { useLocation } from "react-router-dom";
import { Chair, Home as HomeIcon, Warehouse, Weekend, TableBar, Blender, Bed } from '@mui/icons-material';
import { useEntity, useHash } from '@hooks';
import { useHass } from '@store';
import {
  Home,
  Office,
  Dining,
  Living,
  Kitchen,
  Garage,
  MasterBedroom,
} from '@areas';
import { isEqual, pick } from 'lodash';

interface RouteDefinition {
  name: string;
  icon: ReactElement;
  hash: string;
  render: (direction: number) => ReactElement;
  active: boolean;
  suffix?: string;
}

export function useRoutes() {
  const [ routes, setRoutes ] = useState<RouteDefinition[]>([]);
  const [hash] = useHash();
  const { lastUpdated, getEntity } = useHass();

  useEffect(() => {
    const livingTemp = getEntity('sensor.living_room_temperature_sensor_2');
    const officeTemp = getEntity('sensor.office_temperature_sensor_2');
    const masterTemp = getEntity('sensor.master_bed_temperature_sensor_2');
    const kitchenTemp = getEntity('sensor.pantry_contact_sensor_temperature');
    const garageTemp = getEntity('sensor.garage_door_contact_sensor_temperature');
    const $routes = [{
      name: 'Home',
      icon: <HomeIcon />,
      hash: '',
      render: direction => <Home direction={direction} />,
    }, {
      name: 'Living Room',
      icon: <Weekend />,
      hash: 'living-room',
      render: direction => <Living direction={direction} />,
      suffix: `${livingTemp.state}${livingTemp.attributes.unit_of_measurement}`
    }, {
      name: 'Dining Room',
      icon: <TableBar />,
      hash: 'dining-room',
      render: direction => <Dining direction={direction} />,
    }, {
      name: 'Kitchen',
      icon: <Blender />,
      hash: 'kitchen',
      render: direction => <Kitchen direction={direction} />,
      suffix: `${kitchenTemp.state}${kitchenTemp.attributes.unit_of_measurement}`
    }, {
      name: 'Master Bedroom',
      icon: <Bed />,
      hash: 'master-bedroom',
      render: direction => <MasterBedroom direction={direction} />,
      suffix: `${masterTemp.state}${masterTemp.attributes.unit_of_measurement}`
    }, {
      name: 'Office',
      icon: <Chair />,
      hash: 'office',
      render: direction => <Office direction={direction} />,
      suffix: `${officeTemp.state}${officeTemp.attributes.unit_of_measurement}`
    }, {
      name: 'Garage',
      icon: <Warehouse />,
      hash: 'garage',
      render: direction => <Garage direction={direction} />,
      suffix: `${garageTemp.state}${garageTemp.attributes.unit_of_measurement}`
    }].map(route => ({
      ...route,
      active: hash.replace('#', '') === route.hash
    }));
    function dynamicProps(routes) {
      return routes.map(route => pick(route, ['suffix', 'active']));
    }
    // only set the routes if it's changed values from the entities hash
    if (!isEqual(dynamicProps(routes), dynamicProps($routes))) {
      setRoutes($routes);
    }
  }, [hash, lastUpdated]);

  return useMemo(() => routes, [routes]);
}
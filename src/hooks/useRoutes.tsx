import React, { useState, useEffect, useMemo, ReactElement, createRef } from 'react';
import { Chair, Home as HomeIcon, Warehouse, Weekend, TableBar, Blender, Bed, Security as SecurityIcon, AcUnit } from '@mui/icons-material';
import { useHash, useHass } from '@hooks';
import {
  Home,
  Office,
  Dining,
  Living,
  Kitchen,
  Garage,
  MasterBedroom,
  Security,
  AirConditioner,
} from '@areas';
import { isEqual, pick } from 'lodash';
import dining from '@assets/dining-base-optimised.jpg';
import garage from '@assets/garage-base.jpg';
import kitchen from '@assets/kitchen-base.jpg';
import living from '@assets/living-base.jpg';
import office from '@assets/office-base.jpg';
import master from '@assets/bedroom-base.jpg';

interface RouteDefinition {
  name: string;
  icon: ReactElement;
  hash: string;
  render: (direction: number) => ReactElement;
  active: boolean;
  suffix?: string;
  background: null | string;
  room: boolean;
  ref: any;
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
      room: false,
      background: null,
      hash: '',
      render: direction => <Home direction={direction} />,
    }, {
      name: 'Security',
      icon: <SecurityIcon />,
      room: false,
      background: null,
      hash: 'security',
      render: direction => <Security direction={direction} />,
    }, {
      name: 'Air Conditioner',
      icon: <AcUnit />,
      room: false,
      background: null,
      hash: 'air-conditioner',
      render: direction => <AirConditioner direction={direction} />,
    }, {
      name: 'Living Room',
      icon: <Weekend />,
      background: living,
      room: true,
      hash: 'living-room',
      render: direction => <Living direction={direction} />,
      suffix: `${livingTemp.state}${livingTemp.attributes.unit_of_measurement}`
    }, {
      name: 'Dining Room',
      icon: <TableBar />,
      background: dining,
      room: true,
      hash: 'dining-room',
      render: direction => <Dining direction={direction} />,
    }, {
      name: 'Kitchen',
      icon: <Blender />,
      hash: 'kitchen',
      background: kitchen,
      room: true,
      render: direction => <Kitchen direction={direction} />,
      suffix: `${kitchenTemp.state}${kitchenTemp.attributes.unit_of_measurement}`
    }, {
      name: 'Master Bedroom',
      icon: <Bed />,
      hash: 'master-bedroom',
      background: master,
      room: true,
      render: direction => <MasterBedroom direction={direction} />,
      suffix: `${masterTemp.state}${masterTemp.attributes.unit_of_measurement}`
    }, {
      name: 'Office',
      icon: <Chair />,
      background: office,
      hash: 'office',
      room: true,
      render: direction => <Office direction={direction} />,
      suffix: `${officeTemp.state}${officeTemp.attributes.unit_of_measurement}`
    }, {
      name: 'Garage',
      icon: <Warehouse />,
      background: garage,
      hash: 'garage',
      room: true,
      render: direction => <Garage direction={direction} />,
      suffix: `${garageTemp.state}${garageTemp.attributes.unit_of_measurement}`
    }].map(route => ({
      ...route,
      ref: createRef(),
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
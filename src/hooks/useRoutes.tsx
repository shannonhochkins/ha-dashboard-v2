import React, { useState, useEffect, useMemo, ReactElement, createRef } from 'react';
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
  Weather,
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
  hash: string;
  render: () => ReactElement;
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
      room: false,
      background: null,
      hash: '',
      render: () => <Home />,
    }, {
      name: 'Security',
      room: false,
      background: null,
      hash: 'security',
      render: () => <Security />,
    }, {
      name: 'Air Conditioner',
      room: false,
      background: null,
      hash: 'air-conditioner',
      render: () => <AirConditioner />,
    }, {
      name: 'Weather',
      room: false,
      background: null,
      hash: 'weather',
      render: () => <Weather />,
    }, {
      name: 'Living Room',
      background: living,
      room: true,
      hash: 'living-room',
      render: () => <Living />,
      suffix: `${livingTemp.state}${livingTemp.attributes.unit_of_measurement}`
    }, {
      name: 'Dining Room',
      background: dining,
      room: true,
      hash: 'dining-room',
      render: () => <Dining />,
    }, {
      name: 'Kitchen',
      hash: 'kitchen',
      background: kitchen,
      room: true,
      render: () => <Kitchen />,
      suffix: `${kitchenTemp.state}${kitchenTemp.attributes.unit_of_measurement}`
    }, {
      name: 'Master Bedroom',
      hash: 'master-bedroom',
      background: master,
      room: true,
      render: () => <MasterBedroom />,
      suffix: `${masterTemp.state}${masterTemp.attributes.unit_of_measurement}`
    }, {
      name: 'Office',
      background: office,
      hash: 'office',
      room: true,
      render: () => <Office />,
      suffix: `${officeTemp.state}${officeTemp.attributes.unit_of_measurement}`
    }, {
      name: 'Garage',
      background: garage,
      hash: 'garage',
      room: true,
      render: () => <Garage />,
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
// import { useState, useEffect, useMemo, ReactElement, createRef, RefObject } from 'react';
// import { useHash, useEntity } from '@hakit/core';
// import {
//   Office,
//   Dining,
//   Living,
//   Kitchen,
//   Garage,
//   MasterBedroom,
//   Weather,
//   AirConditioner,
//   OutdoorKitchen,
//   FrontHouse,
// } from 'src/_areas';
// import { isEqual, pick } from 'lodash';
// import dining from '@assets/dining-base-optimised.jpg';
// import garage from '@assets/garage-base.jpg';
// import frontHouse from '@assets/front-house-base.jpg';
// import kitchen from '@assets/kitchen-base.jpg';
// import living from '@assets/living-base.jpg';
// import office from '@assets/office-base.jpg';
// import master from '@assets/bedroom-base.jpg';
// import outdoorKitchen from '@assets/outdoor-kitchen-base.jpg';

// export interface RouteDefinition {
//   name: string;
//   hash: string;
//   render: () => ReactElement;
//   active: boolean;
//   suffix?: string;
//   background: null | string;
//   room: boolean;
//   ref: RefObject<HTMLElement>;
// }

// export function useRoutes() {
//   const [ routes, setRoutes ] = useState<RouteDefinition[]>([]);
//   const [hash] = useHash();
//   const livingTemp = useEntity('sensor.living_room_temperature_sensor_2');
//   const officeTemp = useEntity('sensor.office_temperature_sensor_2');
//   const masterTemp = useEntity('sensor.master_bed_temperature_sensor_2');
//   const kitchenTemp = useEntity('sensor.pantry_contact_sensor_temperature');
//   const garageTemp = useEntity('sensor.garage_door_contact_sensor_temperature');

//   useEffect(() => {
//     const $routes: RouteDefinition[] = [{
//       name: 'Air Conditioner',
//       room: false,
//       background: null,
//       hash: 'air-conditioner',
//       render: () => <AirConditioner />,
//     }, {
//       name: 'Weather',
//       room: false,
//       background: null,
//       hash: 'weather',
//       render: () => <Weather />,
//     }, {
//       name: 'Living Room',
//       background: living,
//       room: true,
//       hash: 'living-room',
//       render: () => <Living />,
//       suffix: `${livingTemp.state}${livingTemp.attributes.unit_of_measurement}`
//     }, {
//       name: 'Dining Room',
//       background: dining,
//       room: true,
//       hash: 'dining-room',
//       render: () => <Dining />,
//     }, {
//       name: 'Kitchen',
//       hash: 'kitchen',
//       background: kitchen,
//       room: true,
//       render: () => <Kitchen />,
//       suffix: `${kitchenTemp.state}${kitchenTemp.attributes.unit_of_measurement}`
//     }, {
//       name: 'Outdoor Kitchen',
//       hash: 'outdoor-kitchen',
//       background: outdoorKitchen,
//       room: true,
//       render: () => <OutdoorKitchen />,
//     }, {
//       name: 'Master Bedroom',
//       hash: 'master-bedroom',
//       background: master,
//       room: true,
//       render: () => <MasterBedroom />,
//       suffix: `${masterTemp.state}${masterTemp.attributes.unit_of_measurement}`
//     }, {
//       name: 'Office',
//       background: office,
//       hash: 'office',
//       room: true,
//       render: () => <Office />,
//       suffix: `${officeTemp.state}${officeTemp.attributes.unit_of_measurement}`
//     }, {
//       name: 'Garage',
//       background: garage,
//       hash: 'garage',
//       room: true,
//       render: () => <Garage />,
//       suffix: `${garageTemp.state}${garageTemp.attributes.unit_of_measurement}`
//     }, {
//       name: 'Front House',
//       background: frontHouse,
//       hash: 'front-house',
//       room: true,
//       render: () => <FrontHouse />,
//     }].map(route => ({
//       ...route,
//       ref: createRef(),
//       active: hash.replace('#', '') === route.hash
//     }));
//     function dynamicProps(routes: RouteDefinition[]) {
//       return routes.map(route => pick(route, ['suffix', 'active']));
//     }
//     // only set the routes if it's changed values from the entities hash
//     if (!isEqual(dynamicProps(routes), dynamicProps($routes))) {
//       setRoutes($routes);
//     }
//   }, [garageTemp.attributes.unit_of_measurement, garageTemp.state, hash, kitchenTemp.attributes.unit_of_measurement, kitchenTemp.state, livingTemp.attributes.unit_of_measurement, livingTemp.state, masterTemp.attributes.unit_of_measurement, masterTemp.state, officeTemp.attributes.unit_of_measurement, officeTemp.state, routes]);
//   return useMemo(() => routes, [routes]);
// }

import React, { useContext, useEffect, useState, useRef } from 'react';
import { CircularSlider } from './slider';

export const ThermostatCard = () => {
  const entity = 'climate.daikin_ac';
  const [value, setValue] = useState(50);

  return <CircularSlider
    handle={{
      value,
      onChange: v => {
        setValue(v);
      }
    }}
    angleType={	{"direction":"ccw","axis":"+y"} }
    startAngle={40}
    endAngle={320}
    trackWidth={20}
    shadowWidth={20}
    size={200}
    handleSize={10}
    trackColors={['#ec008c', '#fc6767']}
  />
};
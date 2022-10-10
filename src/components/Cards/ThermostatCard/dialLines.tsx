import React from 'react';

interface Tick {
  thickness?: number;
  length?: number;
  color?: string;
  cap?: 'round' | 'butt' | 'square'
}

interface DialLinesProps {
  size: number;
  mask?: string | null;
  ticks?: {
    count?: number;
    every?: number;
    main?: Tick;
    sub?: Tick;
  };
}
const TICK_DEFAULTS_MAIN: Tick = {
  thickness: 3,
  length: 7,
  color: 'black',
  cap: 'round'
};
const TICK_DEFAULTS_SUB: Tick = {
  thickness: 1,
  length: 4,
  color: 'black',
  cap: 'round'
};
const TICK_DEFAULTS = {
  count: 48,
  every: 4,
  main: TICK_DEFAULTS_MAIN,
  sub: TICK_DEFAULTS_SUB
};

export function DialLines({
  size,
  mask = null,
  ticks = TICK_DEFAULTS,
}: DialLinesProps) {
  const radius = size / 2;
  const {
    count,
    every,
    sub: subInput,
    main: mainInput,
  } = {
    ...TICK_DEFAULTS,
    ...ticks,
  }
  const main = {
    ...TICK_DEFAULTS_MAIN,
    ...mainInput
  };
  const sub = {
    ...TICK_DEFAULTS_SUB,
    ...subInput
  }
  return (
    <g mask={mask ? `url(#${mask})` : undefined}>
      {
        Array(count).fill(undefined).map((u, i) => {
          const cos = Math.cos(2 * Math.PI / count * i);
          const sin = Math.sin(2 * Math.PI / count * i);
          const isMain = i % every === 0;
          const {
            color,
            length,
            thickness,
            cap
          } = isMain ? main : sub;
          return (
            <line
              key={i}
              stroke={color}
              strokeWidth={thickness}
              strokeLinecap={cap}
              x1={cos * radius + radius}
              y1={sin * radius + radius}
              x2={cos * (radius - length) + radius}
              y2={sin * (radius - length) + radius}
            />
          );
        })
      }
    </g>
  );
}
import React from 'react';
import { Glow } from '@components';

export function Downlights({ onClick }: { onClick: () => void}) {
  return <svg viewBox="-210.165 -223.219 1402.445 238.601" xmlns="http://www.w3.org/2000/svg">
    <Glow />
    <path onClick={onClick} d="M -210.165 -65.151 L 359.085 15.382 L 1192.28 -72.995 L 1191.635 -221.017 L -209.34 -223.219 L -210.165 -65.151 Z"/>
  </svg>;
}

export function GarageDoor({ onClick }: { onClick: () => void}) {
  return <svg viewBox="-147.591 1.679 568.98 475.131" xmlns="http://www.w3.org/2000/svg">
    <Glow />
    <path onClick={onClick} d="M 291.004 273.865 L 47.675 301.691 L 16.31 299.451 L 12.519 301.734 L 12.636 307.321 C 12.636 307.321 25.201 308.551 25.201 308.676 C 25.201 308.801 28.887 376.767 27.88 377.888 C 26.873 379.009 27.578 381.564 27.578 381.564 L 19.859 374.99 C 19.859 374.99 7.005 372.659 4.481 383.072 C 1.957 393.485 8.338 395.917 12.219 395.78 C 16.1 395.643 25.562 392.229 25.562 392.229 L 26.209 438.413 L -146.357 476.81 L -147.591 1.679 L 421.389 55.432 L 421.121 112.363 C 421.121 112.363 369.41 119.105 354.033 123.778 C 338.656 128.451 329.087 137.855 319.744 158.79 C 310.401 179.725 300.339 273.682 300.339 273.682 L 290.76 273.882"/>
  </svg>;
}
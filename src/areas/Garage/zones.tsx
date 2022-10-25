import React from 'react';
import { Glow } from '@components';

export function Downlights({ onClick }) {
  return <svg viewBox="-210.165 -223.219 1402.445 238.601" xmlns="http://www.w3.org/2000/svg">
    <Glow />
    <path onClick={onClick} d="M -210.165 -65.151 L 359.085 15.382 L 1192.28 -72.995 L 1191.635 -221.017 L -209.34 -223.219 L -210.165 -65.151 Z"/>
  </svg>;
}

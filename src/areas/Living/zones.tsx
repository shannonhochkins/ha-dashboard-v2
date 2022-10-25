import React from 'react';
import { Glow } from '@components';


export function Roof({ onClick }) {
  return <svg viewBox="487.282 -72.135 81.232 87.092" xmlns="http://www.w3.org/2000/svg">
    <Glow />
    <ellipse onClick={onClick} cx="527.898" cy="-28.589" rx="40.616" ry="43.546"/>
  </svg>;
}


export function TV({ onClick }) {
  return <svg viewBox="493.498 171.247 235.772 171.433" xmlns="http://www.w3.org/2000/svg">
    <Glow />
    <path onClick={onClick} d="M 494.294 171.247 C 494.294 171.247 729.27 172.159 729.27 172.248 C 729.27 172.337 723.493 342.68 723.493 342.68 L 493.498 307.98 L 494.294 171.247 Z"/>
  </svg>;
}

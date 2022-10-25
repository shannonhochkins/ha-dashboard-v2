import React from 'react';
import { Glow } from '@components';

export function Computer({ onClick }) {
  return <svg viewBox="-129.494 388.502 466.863 193.191" xmlns="http://www.w3.org/2000/svg">
    <Glow />
    <path onClick={onClick} d="M -124.264 424.64 L 30.049 403.591 L 169.617 393.116 L 336.773 388.502 L 337.369 514.601 C 337.369 514.601 228.222 513.32 157.93 519.491 C 87.638 525.662 -48.767 561.263 -49.22 561.263 C -49.673 561.263 -129.494 582.139 -129.494 581.686"/>
  </svg>
}

export function RoofLight({ onClick }) {
  return <svg viewBox="608.458 -217.268 138.732 100.899" xmlns="http://www.w3.org/2000/svg">
    <Glow />
    <path onClick={onClick} d="M 608.458 -214.848 L 608.856 -167.512 C 608.856 -167.512 613.437 -116.983 678.463 -122.842 C 743.489 -128.701 747.419 -175.796 747.181 -176.034 C 746.943 -176.272 745.523 -217.268 745.523 -217.268"/>
  </svg>;
}

export function Downlights({ onClick }) {
  return <svg viewBox="517.22 -156.932 631.408 248.282" xmlns="http://www.w3.org/2000/svg">
    <Glow />
    <path onClick={onClick} d="M 517.22 66.958 L 718.249 91.35 L 1148.628 -8.327 L 1147.736 -156.932 C 1147.736 -156.932 518.037 66.671 517.22 66.958 Z"/>
  </svg>;
}

export function Striplights({ onClick }) {
  return <svg viewBox="617.264 115.744 531.524 77.829" xmlns="http://www.w3.org/2000/svg">
    <Glow />
    <path onClick={onClick} d="M 617.264 185.876 L 1147.891 115.744 C 1147.891 115.744 1149.763 147.026 1148.098 147.026 C 1146.433 147.026 713.011 193.573 713.011 193.573 L 617.264 185.876 Z"/>
  </svg>;
}
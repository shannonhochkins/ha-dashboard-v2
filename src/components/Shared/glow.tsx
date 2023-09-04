
export function Glow() {
  return <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="7" result="blur1">
      <animate attributeType="XML"
        attributeName="stdDeviation"
        from="0" to="7"
        dur="5s"
        repeatCount="indefinite"
        values="0; 7; 7; 0;"
        keyTimes="0; 0.45; 0.75; 1"
        keySplines=".42 0 1 1;
                    0 0 .59 1;
                    .42 0 1 1;
                    0 0 .59 1;
                    .42 0 1 1;
                    0 0 .59 1;
                    .42 0 1 1;
                    0 0 .59 1;"/>
      </feGaussianBlur>
      <feComposite in="SourceGraphic" in2="spec1" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
    </filter>
  </defs>
}
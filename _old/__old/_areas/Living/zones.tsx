import { Glow } from "src/_components";
import { m, MotionProps } from "framer-motion";

export function Roof({
  onClick,
  ...rest
}: {
  onClick: () => void;
} & MotionProps) {
  return (
    <m.svg
      {...rest}
      viewBox="487.282 -72.135 81.232 87.092"
      xmlns="http://www.w3.org/2000/motionsvg"
    >
      <Glow />
      <ellipse
        onClick={onClick}
        cx="527.898"
        cy="-28.589"
        rx="40.616"
        ry="43.546"
      />
    </m.svg>
  );
}

export function TV({ onClick }: { onClick: () => void }) {
  return (
    <svg
      viewBox="493.498 171.247 235.772 171.433"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Glow />
      <path
        onClick={onClick}
        d="M 494.294 171.247 C 494.294 171.247 729.27 172.159 729.27 172.248 C 729.27 172.337 723.493 342.68 723.493 342.68 L 493.498 307.98 L 494.294 171.247 Z"
      />
    </svg>
  );
}

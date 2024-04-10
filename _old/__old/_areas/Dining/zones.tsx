import { Glow } from "src/_components";

export function Roof({ onClick }: { onClick: () => void }) {
  return (
    <svg
      viewBox="487.282 -72.135 81.232 87.092"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Glow />
      <ellipse
        onClick={onClick}
        cx="527.898"
        cy="-28.589"
        rx="40.616"
        ry="43.546"
      />
    </svg>
  );
}

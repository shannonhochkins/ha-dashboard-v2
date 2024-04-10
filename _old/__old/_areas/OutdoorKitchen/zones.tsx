import { Glow } from "src/_components";

export function Fridge({ onClick }: { onClick: () => void }) {
  return (
    <svg
      viewBox="343.328 302.575 103.355 265.063"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Glow />
      <path
        onClick={onClick}
        d="M 343.328 302.575 L 444.459 348.69 L 446.683 567.638 L 345.739 477.493 L 343.328 302.575 Z"
      />
    </svg>
  );
}

export function Striplights({ onClick }: { onClick: () => void }) {
  return (
    <svg
      viewBox="198.576 323.948 344.209 351.078"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Glow />
      <path
        onClick={onClick}
        d="M 200.576 320.948 L 345.532 450.689 L 345.888 513.27 L 200.703 365.131 L 200.576 320.948 Z"
      />
      <path
        onClick={onClick}
        d="M 446.165 546.756 C 446.165 546.756 540.573 641.948 544.769 642.534 C 545.965 643.12 539.32 690.026 539.32 690.026 L 444.01 600.268 L 446.165 566.756 Z"
      />
    </svg>
  );
}

export function Downlights({ onClick }: { onClick: () => void }) {
  return (
    <svg
      viewBox="-249.979 -220.448 960.637 202.075"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Glow />
      <path
        onClick={onClick}
        d="M -203.622 -30.824 L 289.226 -18.373 L 710.658 -220.448 L -249.979 -218.892 L -248.661 -119.467 C -248.661 -119.467 -203.86 -29.543 -203.622 -30.824 Z"
      />
    </svg>
  );
}

export function BBQ({ onClick }: { onClick: () => void }) {
  return (
    <svg
      viewBox="230.549 159.998 137.006 117.591"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Glow />
      <path
        onClick={onClick}
        d="M 271.447 277.589 L 271.058 244.928 L 367.555 238.72 L 364.209 167.11 L 308.98 161.397 L 266.98 159.998 L 242.355 187.827 L 242.032 195.599 L 230.549 197.238 L 235.431 258.185 L 271.447 277.589 Z"
      />
    </svg>
  );
}

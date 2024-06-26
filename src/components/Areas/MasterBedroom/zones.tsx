import { Glow } from "@components/Glow";

export function Roof({ onClick }: { onClick: () => void }) {
  return (
    <svg
      viewBox="308.715 -113.567 114.341 50.679"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Glow />
      <path
        onClick={onClick}
        d="M 308.715 -112.704 C 308.715 -112.704 311.998 -102.857 311.998 -102.995 C 311.998 -103.133 316.784 -97.253 316.921 -97.253 C 317.058 -97.253 322.254 -87.95 322.254 -87.95 C 322.254 -87.95 334.587 -64.297 365.885 -62.94 C 397.183 -61.583 412.181 -87.11 412.181 -87.11 L 416.661 -96.547 L 416.246 -99.867 L 420.457 -105.408 L 423.056 -113.567 L 308.715 -112.704 Z"
      />
    </svg>
  );
}

export function TV({ onClick }: { onClick: () => void }) {
  return (
    <svg
      viewBox="576.212 -35.399 284.537 189.076"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Glow />
      <path
        onClick={onClick}
        d="M 580.831 -35.399 L 860.749 -18.684 C 860.749 -18.684 838.608 153.812 838.608 153.677 C 838.608 153.542 576.212 115.468 576.212 115.468 L 580.831 -35.399 Z"
      />
    </svg>
  );
}

export function Soundbar({ onClick }: { onClick: () => void }) {
  return (
    <svg
      viewBox="595.451 165.351 196.928 48.254"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Glow />
      <path
        onClick={onClick}
        d="M 595.519 180.305 L 785.227 213.605 L 791.501 210.6 C 791.501 210.6 792.379 197.025 792.379 196.914 C 792.379 196.803 601.771 165.351 601.771 165.351 C 601.771 165.351 595.54 170.305 595.54 170.194 C 595.54 170.083 595.355 181.069 595.519 180.305 Z"
      />
    </svg>
  );
}

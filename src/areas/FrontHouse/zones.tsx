
import { Glow } from '@components';

export function ToolShed({ onClick }: { onClick: () => void}) {
  return <svg viewBox="67.078 96.256 186.941 209.987" xmlns="http://www.w3.org/2000/svg">
    <Glow />
    <path onClick={onClick} d="M 81.844 306.243 L 254.019 262.885 L 252.4 96.256 L 67.078 120.291 L 81.844 306.243 Z"/>
  </svg>
}

export function MainGarage({ onClick }: { onClick: () => void}) {
  return <svg viewBox="169.825 106.847 252.853 190.954"  xmlns="http://www.w3.org/2000/svg">
    <Glow />
    <path onClick={onClick} d="M 169.825 297.801 L 375.654 247.419 L 376.674 226.96 C 376.674 226.96 377.577 221.094 382.832 219.489 C 388.087 217.884 380.492 215.609 385.658 199.507 C 390.824 183.405 397.81 183.984 397.81 183.984 C 397.81 183.984 402.828 168.822 407.931 164.642 C 413.034 160.462 418.752 146.586 418.752 146.586 L 422.678 106.847 L 170.474 141.71 L 169.825 297.801 Z"/>
  </svg>
}

export function Circle({ onClick }: { onClick: () => void}) {
  return <svg viewBox="-132.634 137.242 57.196 57.196"  xmlns="http://www.w3.org/2000/svg">
    <Glow />
    <ellipse onClick={onClick} cx="-104.036" cy="165.84" rx="28.598" ry="28.598"/>
  </svg>
}
import styled from "@emotion/styled";
import defaultBackground from "./default.jpg";
import { CSSProperties } from "react";

const BackgroundElement = styled.div<{
  backgroundImage: string;
  backgroundColor: string;
  blendMode: CSSProperties["mixBlendMode"];
  blur?: number;
  opacity?: number;
}>`
  position: absolute;
  inset: 0;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  pointer-events: none;
  z-index: -1;
  filter: ${({ blur }) => (blur ? `blur(${blur}px)` : "none")};
  ${({ backgroundImage, backgroundColor, opacity, blendMode }) => `
    ${backgroundImage ? `background-image: url(${backgroundImage});` : ""}
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: inherit;
      opacity: ${opacity};
      background: ${backgroundColor};
      mix-blend-mode: ${blendMode};
    }
    &:after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top center, ${backgroundColor} 0%, rgba(255, 255, 255, 0) 100%);
      width: 80vw;
      height: 80vh;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      mix-blend-mode: color-dodge;
    }
  `}
`;

export interface BackgroundProps extends React.ComponentProps<"div"> {
  /** the background image to apply to the dashboard @default defaultBackground */
  backgroundImage?: string;
  /** the background color to apply to the background overlay color @default "#4254c5" */
  backgroundColor?: string;
  /** the blend mode to apply to the background overlay color, this essentially applies an effect to the image @default "multiply" */
  blendMode?: CSSProperties["mixBlendMode"];
  /** the blur amount to apply to the background image of the dashboard @default 15 */
  blur?: number;
  /** the opacity of the background overlay color @default 0.9 */
  opacity?: number;
}

export function Background({
  backgroundImage = defaultBackground,
  backgroundColor = "#4254c5",
  blendMode = "multiply",
  blur = 15,
  opacity = 0.9,
  ...props
}: BackgroundProps) {
  return (
    <BackgroundElement
      blendMode={blendMode}
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      blur={blur}
      opacity={opacity}
      {...props}
    />
  );
}


import styled from '@emotion/styled';
import { mq } from '@hooks';

export const IconButton = styled.button<{
  color?: string;
}>`
  all: unset;
  flex-grow: 1;
  display: flex;
  cursor: pointer;
  position: relative;
  border-radius: 50%;
  align-items: center;
  will-change: transform;
  justify-content: center;
  height: 100%;
  &:before {
    z-index: -1;
    content: "";
    width: 4.2em;
    height: 4.2em;
    border-radius: 50%;
    position: absolute;
    transform: scale(1);
    background-color: ${props => props.color};
  }
  svg {
    width: 1.6em;
    height: 1.6em;
    stroke: white;
    color: white;
    fill: transparent;
    stroke-width: 1pt;
    stroke-miterlimit: 10;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 600;
    path {
      fill: transparent;
    }
  }
  ${mq(['mobile', 'tablet'], `
    &:before {
      width: 2.1em;
      height: 2.1em;
    }
    svg {
      width: 0.8em;
      height: 0.8em;
    }
  `)}
`;

import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { useMq } from '@hooks';

const BottomMenuFill = styled.span`
  content: '';
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
  background: linear-gradient(to top, rgba(25, 49, 58, 0.5) 0%, rgba(17, 24, 39, 0) 100%);
  height: 50vh;
  pointer-events: none;
`;

const AreaBaseStyled = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  
  > div {
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 48px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    > * {
      max-height: 100%;
    }
    ${useMq(['mobile'], `
      padding: 0 24px;
    `)}
  }
  ${useMq(['desktop'], `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    > * {
      display: flex;
      flex-shrink: 0;
    }
  `)}
  ${useMq(['mobile', 'tablet'], `
    &:after {
      height: 100px;
      position: absolute;
      pointer-events: none;
      content: '';
      left: 0;
      right: 0;
      bottom: 1px;
      z-index:0;
      background: linear-gradient(to top, rgba(0, 0, 0, 1) 2%, rgba(0, 0, 0, 0) 100%);
    }
  `)}
  background: radial-gradient(circle at var(--ha-x) var(--ha-y), var(--ha-radial-animation-start) 0%, var(--ha-radial-animation-end) 50%, var(--ha-radial-animation-end) 100%);
  background-size: cover;
  animation: gradientAnimation 15s linear infinite;
  @keyframes gradientAnimation {
    0% { 
      --ha-x: 0%;
      --ha-y: 0%;
    }
    25% { 
      --ha-x: 0%;
      --ha-y: 100%;
    }
    50% { 
      --ha-x: 100%;
      --ha-y: 100%;
    }
    75% { 
      --ha-x: 100%;
      --ha-y: 0%;
    }
    100% { 
      --ha-x: 0%;
      --ha-y: 0%;
    }
  }
  ${useMq(['fridge'], `
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `)}
`;

export interface AreaBaseProps {
  className?: string;
  children?: ReactNode;
}
export function AreaBase({ children, className }: AreaBaseProps) {
  return <AreaBaseStyled className={className}>
    <BottomMenuFill />
    <div>{children && children}</div>
  </AreaBaseStyled>
}
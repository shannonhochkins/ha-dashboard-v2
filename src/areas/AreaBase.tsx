import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useMq } from '@hooks';
import { Responsive } from '@types';


const Space = styled.div`
  width: 100%;
  height: 60px;
`;

const AreaBaseStyled = styled.div`
  width: calc(100% - 48px);
  height: calc(100vh - 48px);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 24px;
  ${useMq(['desktop'], `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    ${Space} {
      height: 0;
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
    justify-content: flex-start;
    flex-direction: column;
    ${Space} {
      height: 0;
    }
  `)}



`;

const variants = {
  enter: (direction: number) => {
    return {
      x: (window.innerWidth * -1) * (direction * -1),
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: window.innerWidth * (direction * -1),
      opacity: 0,
    };
  }
};

export interface AreaBaseProps {
  direction: number;
  className?: string;
  children?: ReactElement;
}
export function AreaBase({ children, className, direction }: AreaBaseProps) {
  return <AreaBaseStyled className={className}>
    {children && children}
    <Space />
  </AreaBaseStyled>
}
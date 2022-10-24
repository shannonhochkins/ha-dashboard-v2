import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface PopupProps {
  className?: string;
  open: boolean;
  onClose?: () => void,
  children?: ReactNode;
}

const Backdrop = styled.div<Partial<PopupProps>>`
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color: rgba(0,0,0,0.4);
  transition: 0.3s ease-in-out;
  transition-property: opacity;
  z-index: 19;
  ${({ open }) => {
    return `
      opacity: ${open ? '1' : '0'};
      transform: translate3d(0, ${open ? '0' : '100%'}, 0);
    `;
  }}
`;

export const Popup = styled(PopupBase)<PopupProps>`
  position: fixed;
  bottom:0;
  left:2.5%;
  width: 95%;
  transition: 0.3s ease-in-out;
  transition-property: opacity, transform;
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(70px);
  backdrop-filter: blur(70px);
  background: rgb(41 46 108 / 10%);
  border: 1px solid rgba(0, 0, 0, 0.77);
  transform: rotate3d(0, 0, 1, 45deg);
  border-top-left-radius: 5vh;
  border-top-right-radius: 5vh;
  z-index: 20;
  ${({ open }) => {
    return `
      opacity: ${open ? '1' : '0'};
      transform: translate3d(0, ${open ? '0' : '100%'}, 0);
    `;
  }}
`;

function PopupBase({ 
  className,
  children,
  open,
  onClose = () => {},
}: PopupProps) {
  return <>
    <Backdrop open={open} onClick={() => onClose()} />
    <div className={className}>
      {children && <div>{children}</div>}
    </div>
  </>
}
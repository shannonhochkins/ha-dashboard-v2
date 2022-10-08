
import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { WithActiveProps } from '@types';


export const SimpleCard = styled.div<WithActiveProps>`
  box-sizing: border-box;
  user-select: none;
  background:${props => props.isActive ? 'var(--ha-gradient-secondary)' : 'var(--ha-gradient-secondary)'};
  border-radius: 30px;
  padding: 1px;
  transition: 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition-property: background;
  overflow: hidden;
  cursor: pointer;
  svg, span {
    color: currentColor;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 10px;
  }
  span {
    font-size: 18px;
  }
  div {
    border-radius: 30px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    color:${props => props.isActive ? 'var(--ha-primary)' : 'var(--ha-text-light)'};
    background:${props => props.isActive ? 'var(--ha-gradient-primary)' : 'linear-gradient(-45deg, rgb(24 35 57) 0%, rgb(19 28 46) 100% )'};
    transition: 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition-property: background, color;
    padding: 20px 30px;
  }
`;

interface CardPanelBaseProps {
  className?: string;
  title: string;
  children: ReactNode;
}
const CardPanelBase = function ({
  className,
  title,
  children
}: CardPanelBaseProps) {
  return <div className={className}>
    <h4>{title}</h4>
    <div>
      {children}
    </div>
  </div>
}


export const CardPanel = styled(CardPanelBase)`
  display: flex;
  flex-direction: column;
  > h4 {
    color: var(--ha-text-light);
    width: 100%;
    white-space: nowrap;
  }
  > div {
    display: flex;
    align-items: space-evenly;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
  }
`
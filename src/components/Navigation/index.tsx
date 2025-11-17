import { Row, TimeCard } from "@hakit/components";
import styled from "@emotion/styled";
import { Fab } from "@components/Fab";
import React from "react";

const Nav = styled.nav`
  display: flex;
  padding: 1rem;
`;

const Link = styled.a`
  color: rgba(255, 255, 255, 0.4);
  padding: 1rem 2rem;
  transition: color var(--ha-transition-duration) var(--ha-easing);
  cursor: pointer;
  &:hover,
  &:focus {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const StyledTimeCard = styled(TimeCard)`
  &.card-base {
    border: none;
    background: transparent;
    &:hover,
    &:focus {
      &:not(:disabled) {
        background: transparent;
      }
    }
  }
`;

const TransparentFabCard = styled(Fab)`
  &.card-base {
    border: none;
    background: transparent;
  }
`;

export interface NavigationProps extends React.ComponentPropsWithRef<"nav"> {}

export function Navigation({ ...props }: NavigationProps) {
  return (
    <Nav {...props}>
      <Row fullWidth wrap="nowrap" justifyContent="space-between">
        <Row>
          <StyledTimeCard hideDate hideIcon onlyFunctionality />
        </Row>
        <Row fullWidth>
          <Fab
            icon="mdi:view-dashboard"
            style={{
              marginRight: "4rem",
            }}
          />
          <Link>Rooms</Link>
          <Link>Music</Link>
          <Link>Devices</Link>
        </Row>
        <Row>
          <TransparentFabCard icon="mdi:dots-vertical" />
        </Row>
      </Row>
    </Nav>
  );
}

import React, { ReactElement } from 'react';
// import SimpleBarBase from 'simplebar-react';
// import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import shannon from './assets/shannon.jpg';
import tash from './assets/tash.jpg';
// import 'simplebar/dist/simplebar.min.css';
import { Time } from './Time';
import { Weather } from './Weather';
import { useInnerHeight, useRoutes, useHash, useMq } from '@hooks';

import { Chair, Home, Warehouse, Weekend, TableBar, Blender, Bed, ChevronRight, ChevronLeft } from '@mui/icons-material';

const Drawer = styled.div`
  flex: 0 0 auto;
  width: var(--ha-sidebar-width);
  background-color: var(--ha-sidebar-background);
  border-right: 1px solid var(--ha-highlight);
  color: var(--ha-text-light);
  height: 100vh;
  z-index: 2;
  position: relative;
  &:after {
    content: '';
    display: block;
    position: absolute;
    height: 15vh;
    width: 1px;
    top: -50%;
    right: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #ffffff 75%, #ffffff 100%);
    animation: drop 7s 0s infinite;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97);
  }
  @keyframes drop {
    0% { top: -50%}
    100% { top: 110% }
  }
`;

const Header = styled.div`
  padding: 0px 16px;
`;
const Footer = styled.div`
  padding: 16px;
`;

const Scroller = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
`;

const Divider = styled.hr`
  margin: 24px 0px;
  flex-shrink: 0;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: var(--ha-highlight);
`;

const SidebarContent = styled.div`
  padding: 0px 16px;
`;
const Avatar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  line-height: 1;
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
  border: 2px solid var(--ha-text-light);
  box-sizing: content-box;
  margin-left: -8px;
  img {
    width: 100%;
    height: 100%;
    text-align: center;
    object-fit: cover;
    color: transparent;
    text-indent: 10000px;
  }
`;

const AvatarGroup = styled.div`
  display: flex;
  flex-direction: row-reverse;
  ${Avatar}:last-of-type {
    margin-left: 0;
  }
`;

const Menu = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
  position: relative;
`;
interface MenuItemProps {
  active: boolean;
}
const MenuItem = styled.li<MenuItemProps>`
  justify-content: flex-start;
  align-items: center;
  position: relative;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  display: flex;
  margin-bottom: 4px;
  padding: 0px;
  ${useMq(['fridge'], `
    margin-bottom: 8px;
  `)}
  a {
    ${props => props.active && `
      color: rgb(16, 185, 129);
      background-color: rgba(255, 255, 255, 0.04);
      font-weight: 700;
    `}
  }
`;

const Link = styled.a`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-size: 0.875rem;
  line-height: 1.75;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition-properties
  box-shadow: none;
  padding: 9px 24px;
  border-radius: 8px;
  color: rgb(209, 213, 219);
  text-transform: none;
  width: 100%;
  background-color: transparent;
  font-weight: 400;
  letter-spacing: 0.3px;
  ${useMq(['fridge'], `
    padding: 12px 24px;
    font-size: 0.95rem;
  `)}
  &:hover, &:active, &:focus {
    text-decoration: none;
    box-shadow: none;
    background-color: rgba(255, 255, 255, 0.04);
  }
  i {
    color: currentColor;
    display: inherit;
    margin-right: 8px;
    margin-left: -4px;
    svg {
      font-size: 20px;
    }
  }
`;

const LinkSuffix = styled.div`
  color: var(--ha-text-grey);
  font-size: 12px;
`;

const LinkText = styled.div`
  margin-left: 8px;
`;

const LinkPrefix = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;


interface SidebarProps {

}

export function Sidebar(props: SidebarProps): ReactElement {
  const maxHeight = useInnerHeight(height => height - 80);
  const routes = useRoutes();
  const [hash, setHash] = useHash();
  return <Drawer>
    <Scroller style={{ maxHeight }}>
      <Header>
        <Time />
        <Weather />
      </Header>
      <Divider />
      <SidebarContent>
        <Menu>
          {routes.map(({
            active,
            name,
            hash,
            icon,
            suffix
          }, index) => {
            return <MenuItem key={index} active={active}>
              <Link onClick={() => setHash(hash)}>
                <LinkPrefix>
                  {icon}
                  <LinkText>{name}</LinkText>
                </LinkPrefix>
                {suffix && <LinkSuffix>{suffix}</LinkSuffix>}
              </Link>
            </MenuItem>
          })}
        </Menu>
      </SidebarContent>
    </Scroller>
    <Footer>
      <AvatarGroup>
        <Avatar><img src={tash} /></Avatar>
        <Avatar><img src={shannon} /></Avatar>
      </AvatarGroup>
    </Footer>
  </Drawer>
}



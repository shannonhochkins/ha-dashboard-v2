import React from 'react';
import styled from '@emotion/styled';
import { AreaBase } from '../AreaBase';
import { useRoutes, useHash, useMq } from '@hooks';

const HomeContainer = styled(AreaBase)``;

const Items = styled.div`
  display: flex;
	flex-wrap: wrap;
	/* Compensate for excess margin on outer gallery flex items */
	margin: -1rem -1rem;
  max-width: 1260px;
  ${useMq(['mobile'], `
    margin: 0;
    max-width: 100%;
  `)}
`;
const Item = styled.div`
	flex: 1 0 24rem;
	overflow: hidden;
  cursor: pointer;
  max-width: 100%;
  max-height: 100%;
  margin: 1rem;
  border-radius: 24px;
  ${useMq(['mobile'], `
    margin: 1rem 0;
    flex: none;
  `)}
`;
const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease-out;
	box-shadow: 0.3rem 0.4rem 0.4rem rgba(0, 0, 0, 0.4);
  border-radius: 24px;
  &:hover, &:active, &:focus {
    transform: scale(1.15);
  }
`;
const Title = styled.span``;


export function Home() {
  const routes = useRoutes();
  const [hash, setHash] = useHash();
  const rooms = routes.filter(route => route.room);
  return <HomeContainer>
    <Items>
      {rooms.map(({
        active,
        name,
        background,
        hash,
        icon,
        suffix
      }, index) => {
        return <Item key={index}  onClick={() => setHash(hash)}>
          <Image src={background} />
          <Title>{name}</Title>
        </Item>
      })}
    </Items>
  </HomeContainer>
}
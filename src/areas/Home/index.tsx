import React, { useState } from 'react';
import styled from '@emotion/styled';
import { AreaBase, AreaBaseProps } from '../AreaBase';
import { useMq, useRoutes, useHash } from '@hooks';
import { Popup } from '@components';

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;


const HomeContainer = styled(AreaBase)`
  
`;

const Items = styled.div`
  display: flex;
	flex-wrap: wrap;
	/* Compensate for excess margin on outer gallery flex items */
	margin: -1rem -1rem;
`;
const Item = styled.div`
	flex: 1 0 24rem;
	overflow: hidden;
  cursor: pointer;
  max-width: 100%;
  max-height: 100%;
  margin: 1rem;
  border-radius: 24px;
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


export function Home({ direction }: AreaBaseProps) {
  const routes = useRoutes();
  const [hash, setHash] = useHash();
  const rooms = routes.filter(route => route.room);
  return <HomeContainer direction={direction}>
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
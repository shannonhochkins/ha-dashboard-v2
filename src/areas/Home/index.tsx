import React from 'react';
import styled from '@emotion/styled';
import { AreaBase } from '../AreaBase';
import { useRoutes, useHash, useMq } from '@hooks';
import { ImagePreloader } from './ImagePreloader';

const HomeContainer = styled(AreaBase)``;

const Items = styled.div`
  display: flex;
	flex-wrap: wrap;
  max-width: 1260px;
  ${useMq(['mobile'], `
    margin: 0;
    max-width: 100%;
  `)}
`;
const Item = styled.div`
  position: relative;
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

const Temp = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  border-top-left-radius: 24px;
  border-bottom-right-radius: 12px;
  padding: 8px 12px;
  background-color: rgba(0,0,0,0.2);
  font-size: 14px;
`;


export function Home() {
  const routes = useRoutes();
  const [hash, setHash] = useHash();
  const rooms = routes.filter(route => route.room);
  return <HomeContainer>
    <Items>
      {rooms.map(({
        name,
        background,
        hash,
        suffix
      }, index) => {
        return <Item key={index}  onClick={() => setHash(hash)}>
          <ImagePreloader src={background} />
          {suffix && <Temp>{suffix}</Temp>}
        </Item>
      })}
    </Items>
  </HomeContainer>
}
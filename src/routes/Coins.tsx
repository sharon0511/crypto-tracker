import { SyntheticEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import "@fontsource/borel";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.liColor};
  color: ${props => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor}; 
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 52px;
  font-family: "Borel", cursive;
`
const Loader = styled.div`
  text-align: center;
  display: block;

  span {
    display: inline-block;
    animation: bounce 0.6s infinite ease-in-out;
    margin: 0px 2px;
  }

  span:nth-child(1) { animation-delay: 0s; }
  span:nth-child(2) { animation-delay: 0.1s; }
  span:nth-child(3) { animation-delay: 0.2s; }
  span:nth-child(4) { animation-delay: 0.3s; }
  span:nth-child(5) { animation-delay: 0.4s; }
  span:nth-child(6) { animation-delay: 0.5s; }
  span:nth-child(7) { animation-delay: 0.6s; }

  @keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}`

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = `https://cryptoicon-api.pages.dev/icons/128/color/_no_image_.png`;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </Loader>
      ) : (<CoinsList>
        {data?.slice(0,100).map(coin => (
          <Coin key={coin.id}>
            <Link to={{
              pathname: `/${coin.id}`,
              state: { name : coin.name },
            }}>
              <Img src={`https://cryptoicon-api.pages.dev/icons/128/color/${coin.symbol.toLowerCase()}.png`} onError={addDefaultImg}/>
              {coin.name} &rarr;
            </Link>
          </Coin>
        ))}
      </CoinsList>)}
    </Container>
  );
}

export default Coins;
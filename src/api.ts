const BASE_URL = `https://api.coinpaprika.com/v1`


export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) =>
  // return fetch("/coinsData.json").then((response) =>
    response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json());
  // return fetch("/infoData.json")
  // .then((response) => response.json())
  // .then((coins) => coins.find((coin: any) => coin.id === coinId));
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json());
  // return fetch("/tickersData.json")
  // .then((response) => response.json())
  // .then((coins) => coins.find((coin: any) => coin.id === coinId));
}

export function fetchCoinHistory(coinId: string) {
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 24 * 7;
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((response) =>
    response.json());
}
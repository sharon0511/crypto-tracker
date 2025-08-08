import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.liColor};
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0,0,0,0.2);
  }
`;

const CardTitle = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.bgColor};
  text-transform: uppercase;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardValue = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${(props) => props.theme.accentColor};
  
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const Badge = styled.div<{ isPositive: boolean }>`
  background-color: ${(props) => props.theme.liColor};
  color: ${(props) => (props.isPositive ? "#a3cb38" : "#ff6b81")};
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  text-align: center;
  transition: all 0.2s ease;
  box-shadow: inset 0 0 1px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
`;

const ChangeBadgeGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const AthCard = styled.div`
  background-color: ${(props) => props.theme.liColor};
  padding: 20px;
  border-radius: 16px;
  margin: 24px 0px;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  color: ${(props) => props.theme.bgColor};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
`;

const AthTitle = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AthValue = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 12px;
`;

const AthChangeRate = styled.div<{ isNegative: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isNegative ? "#ff6b81" : "#a3cb38")};
`;

function formatNumber(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function ChangeBadge({ label, value }: ChangeBadgeProps) {
  const isPositive = value >= 0;
  const formatted = `${isPositive ? "+" : ""}${value.toFixed(2)}%`;

  return (
    <Badge isPositive={isPositive}>
      {label}: {formatted}
    </Badge>
  );
}

interface PriceData {
  "id": string,
  "name": string,
  "symbol": string,
  "rank": number,
  "total_supply": number,
  "max_supply": number,
  "beta_value": number,
  "first_data_at": string,
  "last_updated": string,
  "quotes": {
    "USD": {
      "price": number,
      "volume_24h": number,
      "volume_24h_change_24h": number,
      "market_cap": number,
      "market_cap_change_24h": number,
      "percent_change_15m": number,
      "percent_change_30m": number,
      "percent_change_1h": number,
      "percent_change_6h": number,
      "percent_change_12h": number,
      "percent_change_24h": number,
      "percent_change_7d": number,
      "percent_change_30d": number,
      "percent_change_1y": number,
      "ath_price": number,
      "ath_date": string,
      "percent_from_price_ath": number
    }
  }
}

interface PriceProps {
  coinId: string;
}

interface ChangeBadgeProps {
  label: string;
  value: number;
}

function Price({ coinId } : PriceProps) {
  const {isLoading: priceLoading, data: priceData} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId),
      {
        refetchInterval: 5000,
      }
    );
    const isNegative = (priceData?.quotes.USD.percent_from_price_ath ?? 0) < 0;

  return (
    <>
      <Grid3>
        <Card>
          <CardTitle>Price</CardTitle>
          <CardValue>{formatNumber(priceData?.quotes.USD.price ?? 0)}</CardValue>
        </Card>
        <Card>
          <CardTitle>24h Volume</CardTitle>
          <CardValue>{formatNumber(priceData?.quotes.USD.volume_24h ?? 0)}</CardValue>
        </Card>
        <Card>
          <CardTitle>Market Cap</CardTitle>
          <CardValue>{formatNumber(priceData?.quotes.USD.market_cap ?? 0)}</CardValue>
        </Card>
      </Grid3>
      <ChangeBadgeGroup>
        <ChangeBadge label="15m" value={priceData?.quotes.USD.percent_change_15m ?? 0} />
        <ChangeBadge label="30m" value={priceData?.quotes.USD.percent_change_30m ?? 0} />
        <ChangeBadge label="1h" value={priceData?.quotes.USD.percent_change_1h ?? 0} />
        <ChangeBadge label="6h" value={priceData?.quotes.USD.percent_change_6h ?? 0} />
        <ChangeBadge label="12h" value={priceData?.quotes.USD.percent_change_12h ?? 0} />
        <ChangeBadge label="24h" value={priceData?.quotes.USD.percent_change_24h ?? 0} />
        <ChangeBadge label="7d" value={priceData?.quotes.USD.percent_change_7d ?? 0} />
        <ChangeBadge label="30d" value={priceData?.quotes.USD.percent_change_30d ?? 0} />
      </ChangeBadgeGroup>
      <AthCard>
      <AthTitle>All-Time High ({new Date(priceData?.quotes.USD.ath_date ?? 0).toLocaleDateString()})</AthTitle>
      <AthValue>${(priceData?.quotes.USD.ath_price ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}</AthValue>
      <AthChangeRate isNegative={isNegative}>
        {(priceData?.quotes.USD.percent_from_price_ath ?? 0) > 0 ? "+" : ""}
        {(priceData?.quotes.USD.percent_from_price_ath ?? 0).toFixed(2)}%
        {isNegative ? " 🔻" : " 🚀"}
      </AthChangeRate>
    </AthCard>
    </>
  )
}

export default Price;
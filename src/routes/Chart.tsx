import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  
  const isError = !Array.isArray(data);

  return <div>{isLoading ? "Loading chart..." : isError ? <h1>Data Not Found</h1> : (
    <ApexCharts
      type="candlestick"
      series={[
        {
          data: data?.map((price) => ({
            x: new Date(price.time_close * 1000),
            y: [
              Number(price.open),
              Number(price.high),
              Number(price.low),
              Number(price.close),
            ],
          })) ?? [],
        },
      ]}
      options={{
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#a3cb38",
              downward: "#ff6b81",
            }
          }
        },
        chart: {
          type: 'candlestick',
          height: 350,
        },
        xaxis: {
          labels: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        },
      }}
      height={350}
    />
  )}
  </div>
}

export default Chart;
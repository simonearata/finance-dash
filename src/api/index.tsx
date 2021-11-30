import { apiConfig } from "../config";

export interface IIndexResponse {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap?: any;
  priceAvg50: number;
  priceAvg200: number;
  volume: number;
  avgVolume: number;
  exchange: string;
  open: number;
  previousClose: number;
  eps?: any;
  pe?: any;
  earningsAnnouncement?: any;
  sharesOutstanding?: any;
  timestamp: number;
}

const fetchApi = (api: string) => {
  const { dev, qlt, prod } = apiConfig?.environments;
  const url = `${prod?.apiUrl}${api}?apikey=${prod?.apiKey}`;
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const getIndexes = () => {
  return fetchApi("/quote/%5EGSPC,%5EDJI,%5EIXIC");
};

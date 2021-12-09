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

export interface IForex {
  ticker: string;
  bid: string;
  ask: string;
  open: string;
  low: string;
  high: string;
  changes: string;
  date: string;
}

export interface IHistoricalFx {
  symbol: string;
  historical: IHistoricalItem[];
}

export interface IHistoricalItem {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  change: number;
  changePercent: number;
  label: string;
  changeOverTime: number;
}

export interface ICommodities {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}

export interface IHistoricalCom {
  symbol: string;
  historical: IHistoricalItemCom[];
}

export interface IHistoricalItemCom {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
  unadjustedVolume: number;
  change: number;
  changePercent: number;
  vwap: number;
  label: string;
  changeOverTime: number;
}

export interface INews {
  meta: IMeta;
  data: IDatum[];
}

export interface IDatum {
  uuid: string;
  title: string;
  description: string;
  keywords: string;
  snippet: string;
  url: string;
  image_url: string;
  language: string;
  published_at: string;
  source: string;
  relevance_score?: any;
  entities: IEntity[];
  similar: Similar[];
}

export interface Similar {}

export interface IEntity {
  symbol: string;
  name: string;
  exchange: string;
  exchange_long: string;
  country: string;
  type: string;
  industry: string;
  match_score: number;
  sentiment_score: number;
  highlights: IHighlight[];
}

export interface IHighlight {
  highlight: string;
  sentiment: number;
  highlighted_in: string;
}

export interface IMeta {
  found: number;
  returned: number;
  limit: number;
  page: number;
}

const fetchApiNews = (api: string) => {
  const { dev, qlt, prod } = apiConfig?.environments;
  const url = `${prod?.apiUrlNews}${api}api_token=${prod?.apiKeyNews}`;
  /* return fetch(url).then((res) => res.json()); */
  return new Promise((resolve, reject) => {
    fetch(url).then((res) => {
      const result = res.json();

      if (res.status === 403) {
        reject(result);
      }

      resolve(result);
    });
  });
};

export const getNews = () => {
  return fetchApiNews("all?exchanges=NYSE&filter_entities=true&language=en&");
};

const fetchApi = (api: string) => {
  const { dev, qlt, prod } = apiConfig?.environments;
  const url = `${prod?.apiUrl}${api}?apikey=${prod?.apiKey}`;
  /* return fetch(url).then((res) => res.json()); */
  return new Promise((resolve, reject) => {
    fetch(url).then((res) => {
      const result = res.json();

      if (res.status === 403) {
        reject(result);
      }

      resolve(result);
    });
  });
};

export const getIndexes = () => {
  return fetchApi("/quote/%5EGSPC,%5EDJI,%5EIXIC");
};

export const getFx = () => {
  return fetchApi("fx");
};

export const getCommodities = () => {
  return fetchApi("symbol/available-commodities");
};

export const getHistoricalFXeurusd = () => {
  return fetchApi("historical-price-full/EURUSD");
};

export const getHistoricalFXusdjpy = () => {
  return fetchApi("historical-price-full/USDJPY");
};

export const getHistoricalFXgbpusd = () => {
  return fetchApi("historical-price-full/GBPUSD");
};

export const getHistoricalComkcusx = () => {
  return fetchApi("historical-price-full/KCUSX");
};

export const getHistoricalComzgusd = () => {
  return fetchApi("historical-price-full/GCUSD");
};

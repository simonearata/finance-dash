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

const fetchSecondApi = (api: string) => {
  const { dev, qlt, prod } = apiConfig?.environments;
  const url = `${prod?.apiUrl}${api}?apikey=${prod?.apiKey3}`;
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

export const getForex = () => {
  return fetchSecondApi("fx");
};

export function fetchApi<T>(api: string): Promise<T> {
  const { dev, qlt, prod } = apiConfig?.environments;
  const url = `${prod?.apiUrl}${api}?apikey=${prod?.apiKey3}`;
  /* return fetch(url).then((res) => res.json()); */
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        const result = res.json();

        if (res.status === 403) {
          reject(result);
        }

        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/* getItems<T>(api: string) è l'input
Promise<T> è l'output */

interface IStoreData {
  time: number;
  data: any;
}

export function getItems<T>(api: string): Promise<T> {
  const diff: number = 25 * 60 * 1000;
  const currentTime = new Date().getTime(); // restituisci la data in millesimi
  const storedData: string | null = localStorage.getItem(api); // salvo in una variabile gli elementi dello storage
  const parsedStoreData: IStoreData | null = storedData // se esistono degli elementi nello storage me li retituisci sennò null
    ? JSON.parse(storedData)
    : null;
  const storedTime: number = parsedStoreData?.time || 0; // salvo in una variabile il tempo dello storage

  if (storedTime + diff < currentTime) {
    // quando sono passati 25 minuti
    return new Promise<T>((resolve, reject) => {
      fetchApi<T>(api) // ritorni una fetch che ritorna i dati della chiamata
        .then((data) => {
          // se la chiamata va a buon fine
          const savedData: IStoreData = { time: currentTime, data }; //  creiamo una variabile che contiene un oggetto time e data
          localStorage.setItem(api, JSON.stringify(savedData)); // settiamo il local storage salvando l'oggetto
          resolve(data); // ritorna  i nuovi dati
        })
        .catch((err) => {
          resolve(parsedStoreData?.data); // se va in errore ritorna i  dati salvati nello storage
        });
    });
  }

  const parsedData: T = parsedStoreData?.data;
  if (parsedData) {
    return Promise.resolve(parsedData);
  }

  return Promise.reject();
}

import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useRef, useState } from "react";
import { fetchApi, getItems, IForex, IHistoricalFx } from "../api";

function Forex() {
  const [historicalFxeurusd, setHistoricalFxeurusd] = useState<IHistoricalFx>();
  const [historicalFxusdjpy, setHistoricalFxusdjpy] = useState<IHistoricalFx>();
  const [historicalFxgbpusd, setHistoricalFxgbpusd] = useState<IHistoricalFx>();
  const [selectedCurrency, setSelectedCurrency] = useState<string>("EUR/USD");

  const [forex, setForex] = useState<IForex[]>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getItems<IForex[]>("fx")
      .then((data) => {
        setForex(data);
      })
      .catch((err) => {
        setError(true);
      });

    [
      { api: "historical-price-full/EURUSD", setter: setHistoricalFxeurusd },
      { api: "historical-price-full/USDJPY", setter: setHistoricalFxusdjpy },
      { api: "historical-price-full/GBPUSD", setter: setHistoricalFxgbpusd },
    ].forEach((apiCall) => {
      fetchApi<IHistoricalFx>(apiCall?.api)
        .then((data) => {
          apiCall?.setter(data);
        })
        .catch((err) => {
          setError(true);
        });
    });
  }, []);

  const dataCharteurusd: number[] =
    historicalFxeurusd?.historical?.map((hfx) => {
      return hfx?.close;
    }) || [];

  const dataChartusdjpy: number[] =
    historicalFxusdjpy?.historical?.map((hfx) => {
      return hfx?.close;
    }) || [];

  const dataChartgbpusd: number[] =
    historicalFxgbpusd?.historical?.map((hfx) => {
      return hfx?.close;
    }) || [];

  const chartList: Highcharts.Options[] = [
    { title: "EUR/USD", data: dataCharteurusd },
    { title: "USD/JPY", data: dataChartusdjpy },
    { title: "GBP/USD", data: dataChartgbpusd },
  ].map((chartItem) => {
    return {
      chart: {
        width: 500,
        height: 300,
      },

      title: {
        text: chartItem?.title,
      },

      series: [
        {
          type: "line",
          data: chartItem?.data,
        },
      ],
    };
  });

  const selectedChart: Highcharts.Options | undefined = chartList.find(
    (chart) => chart.title?.text === selectedCurrency
  );

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <Box>
      <Table variant="table-card">
        <Thead>
          <Tr>
            <Th>Currency</Th>
            <Th isNumeric>Bid</Th>
            <Th isNumeric>Ask</Th>
          </Tr>
        </Thead>
        <Tbody>
          {forex?.slice(0, 3)?.map((fx) => {
            return (
              <Tr py="5px">
                <Td>
                  <Button
                    fontSize="sm"
                    onClick={() => setSelectedCurrency(fx?.ticker)}
                  >
                    {fx?.ticker}
                  </Button>
                </Td>
                <Td isNumeric>{fx?.bid}</Td>
                <Td isNumeric>{fx?.ask}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {!error && (
        <HighchartsReact
          highcharts={Highcharts}
          options={selectedChart}
          ref={chartComponentRef}
        />
      )}
    </Box>
  );
}

export default Forex;

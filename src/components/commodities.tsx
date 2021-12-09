import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useRef, useState } from "react";
import {
  getCommodities,
  getHistoricalComkcusx,
  getHistoricalComzgusd,
  ICommodities,
  IHistoricalCom,
} from "../api";

function Commodities() {
  const [commodities, setCommodities] = useState<ICommodities[]>([]);
  const [historicalComkcusx, setHistoricalComkcusx] =
    useState<IHistoricalCom>();
  const [historicalComzgusd, setHistoricalComzgusd] =
    useState<IHistoricalCom>();
  const [selectedCommodities, setSelectedCommodities] =
    useState<string>("KCUSX");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getCommodities()
      .then((data) => {
        const parsedData = data as ICommodities[];
        setCommodities(parsedData);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
    getHistoricalComkcusx().then((data) => {
      const parsedData = data as IHistoricalCom;
      setHistoricalComkcusx(parsedData);
    });
    getHistoricalComzgusd().then((data) => {
      const parsedData = data as IHistoricalCom;
      setHistoricalComzgusd(parsedData);
    });
  }, []);

  const dataChartkcusx: number[] =
    historicalComkcusx?.historical?.map((kcusx) => {
      return kcusx?.close;
    }) || [];

  const dataChartzgusd: number[] =
    historicalComzgusd?.historical?.map((zgusd) => {
      return zgusd?.close;
    }) || [];

  const chartList: Highcharts.Options[] = [
    { title: "KCUSX", data: dataChartkcusx },
    { title: "GCUSD", data: dataChartzgusd },
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
    (chart) => chart.title?.text === selectedCommodities
  );

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  if (error) {
    return <Box>finite le chiamate</Box>;
  }

  return (
    <Box>
      <Table variant="table-card">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Commodity</Th>
            <Th isNumeric>Symbol</Th>
            <Th isNumeric>Stock Exchange</Th>
          </Tr>
        </Thead>
        <Tbody>
          {commodities?.slice(0, 3)?.map((commodity) => {
            return (
              <Tr py="5px">
                <Td>
                  <Image
                    src={commodity?.symbol + ".jpg"}
                    alt={commodity?.name}
                    boxSize="25px"
                    borderRadius="full"
                  />
                </Td>
                <Td>
                  <Button
                    fontSize="sm"
                    onClick={() => setSelectedCommodities(commodity?.symbol)}
                  >
                    {commodity?.name}
                  </Button>
                </Td>
                <Td isNumeric>{commodity?.symbol}</Td>
                <Td isNumeric>{commodity?.stockExchange}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {selectedChart && (
        <HighchartsReact
          highcharts={Highcharts}
          options={selectedChart}
          ref={chartComponentRef}
        />
      )}
    </Box>
  );
}

export default Commodities;

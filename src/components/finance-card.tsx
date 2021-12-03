import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import {
  getIndexes,
  getFx,
  IIndexResponse,
  IForex,
  ICommodities,
  getCommodities,
} from "../api";

function FinanceCard() {
  const [indexes, setIndexes] = useState<IIndexResponse[]>([]);
  const [forex, setForex] = useState<IForex[]>([]);
  const [commodities, setCommodities] = useState<ICommodities[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    getIndexes().then((data) => {
      const parsedData = data as IIndexResponse[];
      setIndexes(parsedData);
    });
    getFx().then((data) => {
      const parsedData = data as IForex[];
      setForex(parsedData);
    });
    getCommodities().then((data) => {
      const parsedData = data as ICommodities[];
      setCommodities(parsedData);
    });
  }, []);

  const menuCard: string[] = ["Indici", "Valute", "Commodities"];

  return (
    <Box>
      <Tabs size="sm" variant="unstyled" mt="50px">
        <TabList>
          {menuCard.map((menu, index) => {
            return (
              <Tab
                onClick={() => {
                  setSelectedIndex(index);
                }}
                bg="#dfdfdf"
                borderRadius="20px"
                mr="20px"
              >
                {menu}
              </Tab>
            );
          })}
        </TabList>
        <TabPanels variant="tabPanels-card">
          <TabPanel>
            {selectedIndex === 0 &&
              indexes?.map((indexMarket) => {
                const variantPerc = (
                  ((indexMarket?.price - indexMarket?.previousClose) /
                    indexMarket?.previousClose) *
                  100
                ).toFixed(2);
                return (
                  <HStack py="5px">
                    <Image src={"img.jpg"} alt="bandiera usa" boxSize="25px" />
                    {/* <img src={require("../img/img.jpg").default} /> */}
                    <Text fontSize="sm">{indexMarket?.name}</Text>
                    <Text fontSize="md">{indexMarket?.price}</Text>
                    <Text fontSize="md">{variantPerc}%</Text>
                  </HStack>
                );
              })}
          </TabPanel>
          <TabPanel>
            {selectedIndex === 1 &&
              forex?.slice(0, 3).map((fx) => {
                return (
                  <HStack py="5px">
                    <Text fontSize="sm">{fx?.ticker}</Text>
                    <Text fontSize="md">{fx?.bid}</Text>
                    <Text fontSize="md">{fx?.ask}</Text>
                  </HStack>
                );
              })}
          </TabPanel>
          <TabPanel>
            {selectedIndex === 2 &&
              commodities?.slice(0, 3).map((commodity) => {
                return (
                  <HStack py="5px">
                    <Image
                      src={commodity?.symbol + ".jpg"}
                      alt={commodity?.name}
                      boxSize="25px"
                      borderRadius="full"
                    />
                    <Text fontSize="sm">{commodity?.name}</Text>
                    <Text fontSize="md">{commodity?.symbol}</Text>
                    <Text fontSize="md">{commodity?.stockExchange}</Text>
                  </HStack>
                );
              })}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default FinanceCard;

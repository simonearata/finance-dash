import { IconButton } from "@chakra-ui/button";
import { Box, HStack, List, ListItem, Text, VStack } from "@chakra-ui/layout";
import { parse } from "path";
import React, { useEffect, useState } from "react";
import { getIndexes, IIndexResponse } from "../api";

function FinanceCard() {
  const [indexes, setIndexes] = useState<IIndexResponse[]>([]);

  useEffect(() => {
    getIndexes().then((data) => {
      const parsedData = data as IIndexResponse[];
      console.log(parsedData);
      setIndexes(parsedData);
    });
  }, []);

  return (
    <VStack maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <List orientation="horizontal">
        <ListItem>Indici</ListItem>
        <ListItem>Valute</ListItem>
        <ListItem>Futures</ListItem>
        <ListItem>Crypto</ListItem>
        <ListItem>Obbligazioni</ListItem>
      </List>

      <Box>GRAFICO</Box>

      {indexes?.map((indexMarket) => {
        const variantPerc = (
          ((indexMarket?.price - indexMarket?.previousClose) /
            indexMarket?.previousClose) *
          100
        ).toFixed(2);
        return (
          <HStack>
            <IconButton aria-label="Search database" />
            <Text fontSize="sm">{indexMarket?.name}</Text>
            <Text fontSize="md">{indexMarket?.price}</Text>
            <Text fontSize="md">{variantPerc}%</Text>
          </HStack>
        );
      })}
    </VStack>
  );
}

export default FinanceCard;

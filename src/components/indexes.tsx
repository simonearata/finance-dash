import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import { getItems, IIndexResponse } from "../api";

function Indexes() {
  const [indexes, setIndexes] = useState<IIndexResponse[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getItems<IIndexResponse[]>("/quote/%5EGSPC,%5EDJI,%5EIXIC")
      .then((data) => {
        setIndexes(data);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  if (error) {
    return <Box>Errore</Box>;
  }

  return (
    <Box>
      <Table variant="table-card">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Index</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>variant</Th>
          </Tr>
        </Thead>
        <Tbody>
          {indexes &&
            indexes?.map((indexMarket) => {
              const variantPerc = (
                ((indexMarket?.price - indexMarket?.previousClose) /
                  indexMarket?.previousClose) *
                100
              ).toFixed(2);
              return (
                <Tr py="5px">
                  <Td>
                    <Image src={"img.jpg"} alt="bandiera usa" boxSize="25px" />
                  </Td>
                  <Td>
                    <Button fontSize="sm">{indexMarket?.name}</Button>
                  </Td>
                  <Td isNumeric>{indexMarket?.price}</Td>
                  <Td isNumeric>{variantPerc}%</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Indexes;

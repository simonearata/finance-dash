import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { ListItem, UnorderedList, Input } from "@chakra-ui/react";
import { getForex, IForex } from "../../api";

function Mercati() {
  const [forexMarket, setForexMarket] = useState<IForex[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [searchForex, setSearchForex] = useState<string>("");

  useEffect(() => {
    getForex()
      .then((data) => {
        const parseData = data as IForex[];
        setForexMarket(parseData);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  const searchInMarket = (forex: string) => {
    return forexMarket?.filter((fx) => {
      return fx.ticker?.toLowerCase().includes(forex?.toLowerCase());
    });
  };

  if (error) {
    return <Box>finite le chiamate</Box>;
  }

  return (
    <Box>
      <Input
        placeholder="cerca valuta"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchForex(e?.target.value);
        }}
      />
      <Box>
        {searchForex !== "" &&
          searchInMarket(searchForex).map((currency) => {
            return (
              <UnorderedList>
                <ListItem textAlign={"left"} listStyleType={"none"}>
                  {currency?.ticker}
                </ListItem>
              </UnorderedList>
            );
          })}
      </Box>
    </Box>
  );
}

export default Mercati;

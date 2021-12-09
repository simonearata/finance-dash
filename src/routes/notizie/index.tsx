import { Box, Center, Heading } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { getNews, INews } from "../../api";
import { Divider } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";

function Notizie() {
  const [news, setNews] = useState<INews>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getNews()
      .then((data) => {
        const parseData = data as INews;
        console.log(parseData);

        setNews(parseData);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, []);

  news?.data?.map((d) => {
    console.log(d.title);

    return d.title;
  });

  if (error) {
    return <Box>finite le chiamate</Box>;
  }

  return (
    <Box>
      {news?.data?.map((item) => {
        return (
          <Box mt="50px">
            <Heading as="h3" size="lg">
              {item?.title}
            </Heading>
            <Box w="100%">
              <Image src={item?.image_url} my="10px" resizeMode="cover" />
            </Box>
            <Box>{item?.description}</Box>
            <Center height="5px">
              <Divider />
            </Center>
          </Box>
        );
      })}
    </Box>
  );
}

export default Notizie;

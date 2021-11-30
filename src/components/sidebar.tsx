import { Button } from "@chakra-ui/button";
import { Box, List, ListItem, UnorderedList, VStack } from "@chakra-ui/layout";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Box mt={5}>
      <VStack>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/mercati">
          <Button>Mercati</Button>
        </Link>
        <Link to="/notizie">
          <Button>Notizie</Button>
        </Link>
        <Link to="/portafoglio">
          <Button>Portafoglio</Button>
        </Link>
      </VStack>
    </Box>
  );
}

export default Sidebar;

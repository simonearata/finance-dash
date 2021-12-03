import { Button } from "@chakra-ui/button";
import { Box, VStack } from "@chakra-ui/layout";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const buttonMenu: any[] = [
    { link: "/", name: "Home" },
    { link: "/mercati", name: "Mercati" },
    { link: "/notizie", name: "Notizie" },
    { link: "/portafoglio", name: "Portafoglio" },
  ];

  return (
    <Box mt={5}>
      <VStack>
        {buttonMenu.map((button) => {
          return (
            <Link to={button?.link}>
              <Button variant="button-menu">{button.name}</Button>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
}

export default Sidebar;

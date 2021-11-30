import { Box, HStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Route, Routes } from "react-router";
import Mercati from "../routes/mercati";
import Notizie from "../routes/notizie";
import Portafoglio from "../routes/portafoglio";
import Sidebar from "../components/sidebar";
import FinanceCard from "../components/finance-card";
import { IconButton } from "@chakra-ui/button";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useBreakpointValue } from "@chakra-ui/media-query";

function FinanceDash() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  /* const variants = useBreakpointValue({base: smVariant, }) */
  return (
    <HStack>
      <Box w="25%" h="100vh" bg="#dfdfdf">
        <Box>
          <IconButton
            aria-label="arrow"
            icon={<ChevronRightIcon w={8} h={8} />}
            colorScheme="blackAlpha"
            variant="outline"
            mt="50px"
          />
        </Box>
        <Sidebar />
      </Box>
      <Box w="75%" h="100vh">
        <Routes>
          <Route path="/mercati" element={<Mercati />} />

          <Route path="/notizie" element={<Notizie />} />

          <Route path="/portafoglio" element={<Portafoglio />} />
        </Routes>

        <FinanceCard />
      </Box>
    </HStack>
  );
}

export default FinanceDash;

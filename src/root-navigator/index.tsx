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
import Header from "../components/header";

function FinanceDash() {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [visibleFinanceCard, setVisibleFinanceCard] = useState<boolean>(true);

  const smVariant = { navigation: "drawer", navigationButton: true };
  const mdVariant = { navigation: "sidebar", navigationButton: false };

  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Box>
      <Box>
        <Header
          showSidebarButton={variants?.navigationButton}
          onShowSidebar={toggleSidebar}
        />
      </Box>
      <HStack>
        <Sidebar
          variant={variants?.navigation}
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          setVisible={setVisibleFinanceCard}
        />
        <Box w="75%" h="100vh" overflow="overlay">
          <Routes>
            <Route path="/mercati" element={<Mercati />} />

            <Route path="/notizie" element={<Notizie />} />

            <Route path="/portafoglio" element={<Portafoglio />} />
          </Routes>

          {visibleFinanceCard && <FinanceCard />}
        </Box>
      </HStack>
    </Box>
  );
}

export default FinanceDash;

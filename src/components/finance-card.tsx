import { Box } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import Forex from "./forex";
import Commodities from "./commodities";
import Indexes from "./indexes";

function FinanceCard() {
  const menuCard: string[] = ["Indici", "Valute", "Commodities"];

  return (
    <Box w="90%" border="1px" borderRadius="20" boxShadow="2xl">
      <Tabs size="sm" variant="unstyled" mt="50px">
        <TabList ml="20px">
          {menuCard.map((menu, index) => {
            return (
              <Tab bg="#FFFAF0" borderRadius="20px" mr="20px">
                {menu}
              </Tab>
            );
          })}
        </TabList>
        <TabPanels variant="tabPanels-card">
          <TabPanel>
            <Indexes />
          </TabPanel>

          <TabPanel>
            <Forex />
          </TabPanel>

          <TabPanel>
            <Commodities />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default FinanceCard;

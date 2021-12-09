import { IconButton } from "@chakra-ui/button";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import React from "react";

interface IHeader {
  onShowSidebar: () => void;
  showSidebarButton?: boolean;
}

function Header(props: IHeader) {
  return (
    <Flex bg="#FBD38D" p={4} color="white" justifyContent="center">
      <Box flex="1">
        {props?.showSidebarButton && (
          <IconButton
            aria-label="arrow"
            icon={<ChevronRightIcon w={8} h={8} />}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={props?.onShowSidebar}
          />
        )}
      </Box>
      <Center flex="1" h="40px">
        <Text fontSize="xl">Dashboard</Text>
      </Center>
      <Box flex="1" />
    </Flex>
  );
}

export default Header;

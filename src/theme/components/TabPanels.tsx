import { extendTheme } from "@chakra-ui/react";

const tabPanels = extendTheme({
  components: {
    TabPanels: {
      variants: {
        "tabPanels-card": {
          bg: "orange.200",
        },
      },
    },
  },
});

export default tabPanels;

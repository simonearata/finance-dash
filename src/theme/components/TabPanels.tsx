import { extendTheme } from "@chakra-ui/react";

const tabPanels = extendTheme({
  components: {
    TabPanels: {
      variants: {
        "tabPanels-card": {
          border: "1px solid",
        },
      },
    },
  },
});

export default tabPanels;

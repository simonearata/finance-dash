import { extendTheme } from "@chakra-ui/react";
import button from "./components/button";
import border from "./foundations/borders";
import styles from "./styles";
import tabPanels from "./components/TabPanels";

const overrides = {
  styles,
  border,

  components: {
    button,
    tabPanels,
  },
};

export default extendTheme(overrides);

import { extendTheme } from "@chakra-ui/react";
import button from "./components/button";
import border from "./foundations/borders";
import styles from "./styles";
import tabPanels from "./components/tabPanels";
import table from "./components/table";

const overrides = {
  styles,
  border,

  components: {
    button,
    tabPanels,
    table,
  },
};

export default extendTheme(overrides);

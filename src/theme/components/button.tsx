import { extendTheme } from "@chakra-ui/react";

const button = extendTheme({
  components: {
    Button: {
      variants: {
        "button-menu": {
          bg: "orange.200",
          boxShadow: "0 0 2px 2px #efdfde",
          minWidth: "114px",
        },
      },
    },
  },
});

export default button;

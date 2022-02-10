import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const semanticTokens = {
  colors: {
    "primary-text": {
      default: "gray.900",
      _dark: "gray.50",
    },
    "secondary-text": {
      default: "gray.700",
      _dark: "gray.400",
    },
  },
};

export const theme = extendTheme({ config, semanticTokens });

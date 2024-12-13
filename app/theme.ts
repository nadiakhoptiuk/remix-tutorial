import { createTheme, DEFAULT_THEME, mergeMantineTheme } from "@mantine/core";

const themeOverride = createTheme({
  colors: {
    teal: [
      "#2f97a6",
      "#3d9fad",
      "#4aa2af",
      "#53a5b1",
      "#5da8b3",
      "#69a9b3",
      "#78b2bb",
      "#85b7bf",
      "#8fbcc3",
      "#a0c6cb",
    ],
  },
  primaryColor: "teal",
  cursorType: "pointer",
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);

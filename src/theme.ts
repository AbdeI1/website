"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: "#d50000",
          contrastText: "#000",
        },
        secondary: {
          main: "#18ffff",
          contrastText: "#000",
        },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;

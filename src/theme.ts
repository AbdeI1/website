"use client";
import { responsiveFontSizes, createTheme } from "@mui/material/styles";

let theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

theme = responsiveFontSizes(theme);

export { theme };

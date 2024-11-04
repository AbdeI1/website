"use client";
import { styled, createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 650,
      lg: 1200,
      xl: 1536,
    },
  },
  colorSchemes: {
    dark: true,
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

const Body = styled("body")(({ theme }) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 32,
    },
    [theme.breakpoints.down("md")]: {
      fontSize: 64,
    }
  }
}))

export { theme, Body };

import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { CssBaseline } from "@mui/material";

import "@/css/globals.css";
import { theme, Body } from "@/theme";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "mokbel.dev",
  description: "Personal Website",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <html lang="en" className={roboto.className}>
          <Body>{children}</Body>
        </html>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

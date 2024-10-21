import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { CssBaseline } from "@mui/material";

import "@/css/globals.css";
import theme from "@/theme";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

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
          <body>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
          </body>
        </html>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

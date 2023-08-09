import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

const themeDark = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "monospace",
  },
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#000000",
    },
    background: {
      default: "#35A29F",
    },
    text: {
      primary: "#000000",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </ThemeProvider>
    </>
  );
}

export default api.withTRPC(MyApp);

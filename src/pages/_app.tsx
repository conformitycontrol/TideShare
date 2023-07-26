import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { createTheme } from "@mui/material"; 
import { ThemeProvider } from "@emotion/react";

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
    "fontFamily": "monospace"
  },
  palette: {
    primary: {
      main: "#042440"
    },
    secondary: {
      main: "#ffffff"
    },
    background: {
      default: "#042440",
    },
    text: {
      primary: "#000000",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themeDark}>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </ThemeProvider>

  );
}
 

export default api.withTRPC(MyApp);

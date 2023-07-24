import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { createTheme } from "@mui/material"; 
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    background: {
      default: "#f5eed5"
    },
    primary: {
      main: "#f5eed5"
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </ThemeProvider>

  );
}
 

export default api.withTRPC(MyApp);

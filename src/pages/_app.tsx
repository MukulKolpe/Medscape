import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "@/components/Navbar/Navbar";
import * as React from "react";
import { PolybaseProvider, AuthProvider } from "@polybase/react";
import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";
export default function App({ Component, pageProps }: AppProps) {
  const colors = {
    brand: {
      50: "#ecefff",
      100: "#cbceeb",
      200: "#a9aed6",
      300: "#888ec5",
      400: "#666db3",
      500: "#4d5499",
      600: "#3c4178",
      700: "#2a2f57",
      800: "#181c37",
      900: "#080819",
    },
  };
  const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  };

  const theme = extendTheme({ colors, config });

  const polybase = new Polybase();
  const auth = typeof window !== "undefined" ? new Auth() : null;

  return (
    <PolybaseProvider polybase={polybase}>
      <AuthProvider auth={auth} polybase={polybase}>
        <ChakraProvider theme={theme}>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </PolybaseProvider>
  );
}

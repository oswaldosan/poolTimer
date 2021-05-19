import { AppContextProvider } from "../context/context";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;




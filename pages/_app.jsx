import { ContextProvider } from "context";
import "./global.css";
import React from "react";

function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default App;

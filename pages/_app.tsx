import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WordDataContextProvider } from "../context";
import { ApplicationStateProvider } from "../context/ApplicationStateContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WordDataContextProvider>
      <ApplicationStateProvider>
        <Component {...pageProps} />
      </ApplicationStateProvider>
    </WordDataContextProvider>
  );
}
export default MyApp;

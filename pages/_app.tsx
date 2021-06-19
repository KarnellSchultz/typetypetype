import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WordProvider } from "../context";
import { FullWordListContextProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FullWordListContextProvider>
      <WordProvider>
        <Component {...pageProps} />
      </WordProvider>
    </FullWordListContextProvider>
  );
}
export default MyApp;

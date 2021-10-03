import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WordDataContextProvider } from "../context";
import { ApplicationStateProvider } from "../context/AppContext/ApplicationStateContext";

import styled from "styled-components";

const AppWrapper = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
  padding-top: 10rem;
  height: 100vh;
  width: 100vw;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <WordDataContextProvider>
        <ApplicationStateProvider>
          <Component {...pageProps} />
        </ApplicationStateProvider>
      </WordDataContextProvider>
    </AppWrapper>
  );
}
export default MyApp;

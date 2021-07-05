import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, signIn, signOut, useSession } from "next-auth/client";
import { WordProvider } from "../context";
import { FullWordListContextProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  const [session, loading] = useSession();

  return (
    <Provider session={pageProps.session}>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session?.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
      <FullWordListContextProvider>
        <WordProvider>
          <Component {...pageProps} />
        </WordProvider>
      </FullWordListContextProvider>
    </Provider>
  );
}
export default MyApp;

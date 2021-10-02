import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";

import { useApplicationState } from "../context";

export default function Home() {
  const { state, dispatch } = useApplicationState();

  return (
    <div>
      <Head>
        <title>typetypetype app ⌨️</title>
        <meta name="home" content="Type type type" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => dispatch({ type: "NextSlice" })} type="button">
        Click
      </button>
      <ul>
        {state.CurrentWordSlice.map(({ id, word }) => {
          return <li key={id}>{word} </li>;
        })}
      </ul>
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";

import { useTestWords } from "hooks/useTestWords";

export default function Home() {
  const { WordSlices, slice, setSlice} = useTestWords()
  
  return (
    <div>
      <Head>
        <title>typetypetype app ⌨️</title>
        <meta name="home" content="Type type type" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

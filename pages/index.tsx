import React, { useEffect, useRef, useState } from "react";
import useSwr from "swr";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

export default function Home() {
  const [state, setstate] = useState("");
  const [wordList, setWordList] = useState<string[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.currentTarget.value.toLowerCase().split("").pop() == " "
      ? setstate("")
      : setstate(e.currentTarget.value);
  };

  const { data, error } = useSwr("/api/words", fetcher);
  if (error) return <div>Failed to load words</div>;
  if (!data) return <div>Loading...</div>;


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <input type="text" onChange={(e) => handleInput(e)} value={state} />

        <p>{state}</p>
        {data.wordList.map((el: {} | null | undefined) => (
          <p key={el}>{el}</p>
        ))}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

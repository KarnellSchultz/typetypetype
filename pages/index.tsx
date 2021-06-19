import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { InputBox } from "../components/inputBox";
import { useWord } from "../context/word";
import { useFullWordList } from "../context";

export default function Home() {

  const { state:{word} } = useWord();

  const {fullWordListState} = useFullWordList()
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Type type type" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <InputBox />
        <p>{word}</p>
        {fullWordListState ? fullWordListState.map((el: {} | null | undefined) => (
          <p key={el}>{el}</p>
          )): <p>loading </p>}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

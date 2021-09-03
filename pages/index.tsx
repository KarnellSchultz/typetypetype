import React, { useEffect, useState } from "react";
import Head from "next/head";

import styles from "../styles/Home.module.css";

import { useFullWordList } from "../context";

import { TextContainer } from "../components";
import { Header } from "../components";
import { TestBar } from "../components/testBar";

export default function Home() {
  const { fullWordListState } = useFullWordList();

  const [currentWordCount, setCurrentWordCount] = useState(0);
  const [currentSlice, setCurrentSlice] = useState([0, 20]);
  const [correctWordBank, setCorrectWordBank] = useState<string[]>([]);
  0;
  const [incorrectWordBank, setIncorrectWordBank] = useState<string[]>([]);
  const currentTwentyWords = fullWordListState.slice(
    currentSlice[0],
    currentSlice[1]
  );

  const currentTenWords = React.useMemo(() => currentTwentyWords.slice(0, 10), [
    currentTwentyWords,
  ]);
  const nextTenWords = React.useMemo(() => currentTwentyWords.slice(10, 20), [
    currentTwentyWords,
  ]);

  useEffect(() => {
    makeSlice();
  }, [currentWordCount]);

  const makeSlice = () => {
    if (currentWordCount > 0 && currentWordCount % 10 === 0) {
      setCurrentSlice((prev) => [prev[0] + 10, prev[1] + 10]);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>typetypetype app ⌨️</title>
        <meta name="home" content="Type type type" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.container}>
        <h3>{fullWordListState[currentWordCount]}</h3>
        <TextContainer
          currentWordCount={currentWordCount}
          currentTenWords={currentTenWords}
          nextTenWords={nextTenWords}
          incorrectWordBank={incorrectWordBank}
          correctWordBank={correctWordBank}
        />
        <TestBar
          currentWordCount={currentWordCount}
          setCurrentWordCount={setCurrentWordCount}
          setCorrectWordBank={setCorrectWordBank}
          incorrectWordBank={incorrectWordBank}
          correctWordBank={correctWordBank}
          setIncorrectWordBank={setIncorrectWordBank}
        />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}

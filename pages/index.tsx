import React, { useEffect, useState } from "react";
import Head from "next/head";

import styles from "../styles/Home.module.css";

import { InputBox } from "../components/inputBox";
import { useWord } from "../context/word";
import { useFullWordList } from "../context";
import { useTimerHook } from "../hooks/useTimer";

export default function Home() {
  // const { state:{word} } = useWord();

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

  const firstTen = currentTwentyWords.slice(0, 10);
  const nextTen = currentTwentyWords.slice(10, 20);

  useEffect(() => {
    makeSlice();
  }, [currentWordCount]);

  const makeSlice = () => {
    if (currentWordCount > 0 && currentWordCount % 10 === 0) {
      setCurrentSlice((prev) => [prev[0] + 10, prev[1] + 10]);
    }
  };

  const evaluateUserInput = (value: string) => {
    value = Array.from(value)
      .splice(0, value.length - 1)
      .join("");
    if (value !== fullWordListState[currentWordCount]) {
      setIncorrectWordBank((prev) => [
        ...prev,
        fullWordListState[currentWordCount],
      ]);
      setCurrentWordCount((prev) => prev + 1);
    }

    if (value === fullWordListState[currentWordCount]) {
      setCorrectWordBank((prev) => [
        ...prev,
        fullWordListState[currentWordCount],
      ]);
      setCurrentWordCount((prev) => prev + 1);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.toLowerCase();

    if (Array.from(value).pop() == " ") {
      evaluateUserInput(value);
      e.currentTarget.value = "";
    }
  };
  let time = new Date();

  const {
    start,
    restartTimer,
    isRunning,
    days,
    hours,
    minutes,
    seconds,
  } = useTimerHook({ initTime: 32 });

  console.log({ incorrectWordBank, correctWordBank });

  return (
    <div className={styles.container}>
      <Head>
        <title>typetypetype app ⌨️</title>
        <meta name="description" content="Type type type" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <input type="text" onChange={(e) => handleChange(e)} />
        <h3>{fullWordListState[currentWordCount]}</h3>
        <h3>{firstTen}</h3>
        <h3>{nextTen}</h3>

        <button onClick={start}>Start</button>
        <button onClick={() => restartTimer()}>Restart</button>
        <p>{isRunning ? "Running" : "Not running"}</p>
        <div style={{ fontSize: "40px" }}>
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

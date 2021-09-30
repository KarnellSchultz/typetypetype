import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import styled from "styled-components";

import styles from "../styles/Home.module.css";

import { useFullWordList } from "../context";

import { TextContainer, StyledContainer } from "../components";
import { Header } from "../components";
import { TestBar } from "../components/testBar";

const Main = styled.main`
  min-height: 100vh;
  min-width: 100vw;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--background);
`;

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
`;

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

  const currentTenWords = useMemo(
    () => currentTwentyWords.slice(0, 10),
    [currentTwentyWords]
  );
  const nextTenWords = useMemo(
    () => currentTwentyWords.slice(10, 20),
    [currentTwentyWords]
  );

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
      <Main>
        <TextContainer
          currentWordCount={currentWordCount}
          currentTenWords={currentTenWords}
          nextTenWords={nextTenWords}
          incorrectWordBank={incorrectWordBank}
          correctWordBank={correctWordBank}
        ></TextContainer>
        <TestBar
          currentWordCount={currentWordCount}
          setCurrentWordCount={setCurrentWordCount}
          setCorrectWordBank={setCorrectWordBank}
          incorrectWordBank={incorrectWordBank}
          correctWordBank={correctWordBank}
          setIncorrectWordBank={setIncorrectWordBank}
        />
      </Main>
      <Footer></Footer>
    </div>
  );
}

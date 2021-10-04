import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

import { useTimer } from "react-timer-hook";

import { useApplicationState } from "../context";
import { useKeyPress } from "hooks/useKeyPress";
import styled from "styled-components";
import { calculateWpm } from "../util/util";

const getNewTimestamp = (timeInSeconds = 30) => {
  const date = new Date();
  return new Date(date.setSeconds(date.getSeconds() + timeInSeconds));
};

const Ul = styled.ul`
  list-style: none;
  display: flex;
`;

type LiProps = { highlighted?: boolean };
const Li = styled.li<LiProps>`
  padding: 0 0.2rem;
  background-color: ${({ highlighted }) => highlighted && `#020202`};
  transition: all 0.2s ease;
`;

const InformationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 2rem;
`;

export default function Home() {
  const initInputState = "";
  const { state, dispatch } = useApplicationState();
  const [inputState, setInputState] = useState(initInputState);
  const [currentWordCount, setCurrnetWordCount] = useState(0);
  const [wordsPerMin, setWordsPerMin] = useState(0);

  const spacebarPress = useKeyPress(" ");

  useEffect(() => {
    if (spacebarPress) {
      console.log("hello");
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spacebarPress]);

  useEffect(() => {
    dispatch({ type: "Ready" });
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch({
      type: "SubmitWord",
      payload: {
        ...state,
        UserSubmittedWord: inputState.trim(),
        CurrentWordIndex: currentWordCount + 1,
      },
    });

    setCurrnetWordCount((c) => c + 1);
    // Check to see if we need to switch to the next slice
    // This can be moved to the reducer logic
    if (currentWordCount % 9 === 0 && currentWordCount !== 0) {
      dispatch({ type: "NextSlice" });
      setCurrnetWordCount(0);
    }
    setInputState(initInputState);
  };

  const handleStartClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setInputState(initInputState);
    restart(getNewTimestamp());
    setWordsPerMin(0);
    setCurrnetWordCount(0);
    dispatch({ type: "Restart" });
  };

  //use the onExpire for something slick
  const { seconds, isRunning, restart } = useTimer({
    expiryTimestamp: getNewTimestamp(),
    onExpire: () => console.warn("onExpire called"),
    autoStart: false,
  });

  useEffect(() => {
    const WPM = calculateWpm(state.CorrectWordBank);
    setWordsPerMin(WPM);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  useEffect(() => {
    if (isRunning) {
      inputRef.current?.focus();
    }
  }, [isRunning, seconds]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div>
      <Head>
        <title>typetypetype app ⌨️</title>
        <meta name="home" content="Type type type" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Ul>
          {state.CurrentWordSlice.map(({ id, word }) => {
            const highlighted =
              state?.CurrentWordSlice[currentWordCount]?.id === id
                ? true
                : false;
            return (
              <Li key={id} highlighted={highlighted}>
                {word}{" "}
              </Li>
            );
          })}
        </Ul>
        <Ul>
          {state.NextTenWordSlice.map(({ id, word }) => {
            return <Li key={id}>{word} </Li>;
          })}
        </Ul>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            disabled={!isRunning}
            value={inputState}
            onChange={(e) => setInputState(e.currentTarget.value)}
            type="text"
            ref={inputRef}
          />
        </div>
      </div>
      <InformationContainer>
        <button
          // move logic into func
          onClick={(e) => {
            handleStartClick(e);
          }}
          type="reset"
        >
          Start / Restart
        </button>
        <div style={{ textAlign: "center" }}>
          <p>Time</p>
          <p>{seconds}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p>WPM</p>
          <p>{wordsPerMin}</p>
        </div>
      </InformationContainer>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Head from "next/head";

import { useTimer } from "react-timer-hook";

import { useApplicationState } from "../context";
import { useKeyPress } from "hooks/useKeyPress";
import styled from "styled-components";

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
  }, [spacebarPress]);

  useEffect(() => {
    calculateWpm();
  }, [currentWordCount]);

  useEffect(() => {
    dispatch({ type: "Ready" });
  }, []);

  const handleSubmit = () => {
    dispatch({
      type: "SubmitWord",
      payload: {
        ...state,
        UserSubmittedWord: inputState.trim(),
        CurrentWordIndex: currentWordCount + 1,
      },
    });

    // Check to see if we need to witch to the next slice
    // This can be moved to the reducer logic
    if (currentWordCount % 9 === 0 && currentWordCount !== 0) {
      dispatch({ type: "NextSlice" });
      setCurrnetWordCount(0);
    }
    setCurrnetWordCount((c) => c + 1);
    setInputState(initInputState);
  };

  //use the onExpire for something slick
  const { seconds, isRunning, restart } = useTimer({
    expiryTimestamp: getNewTimestamp(),
    onExpire: () => console.warn("onExpire called"),
    autoStart: false,
  });

  //https://www.speedtypingonline.com/typing-equations
  const calculateWpm = (): void => {
    const tempCorrectWordArr = state?.CorrectWordBank?.map((el) => el.length);
    if (!tempCorrectWordArr.length) {
      return;
    }
    const temp = tempCorrectWordArr.reduce((a, c) => a + c);

    const numerator = temp + state.CorrectWordBank.length;
    // half a min is .5 one min is 1
    const denominator = 0.5;
    let result = Math.floor(numerator / denominator);
    setWordsPerMin(result);
  };

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
              state.CurrentWordSlice[currentWordCount].id === id ? true : false;
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
          />
        </div>
      </div>
      <InformationContainer>
        <button
          // move logic into func
          onClick={() => {
            restart(getNewTimestamp());
            setWordsPerMin(0);
            setCurrnetWordCount(0);
            dispatch({ type: "Restart" });
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

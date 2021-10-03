import React, { useEffect, useState } from "react";
import Head from "next/head";

import { useStopwatch, useTimer } from "react-timer-hook";

import { useApplicationState } from "../context";
import { useKeyPress } from "hooks/useKeyPress";

const getNewTimestamp = (timeInSeconds = 30) => {
  const date = new Date();
  return new Date(date.setSeconds(date.getSeconds() + timeInSeconds));
};

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
      <button onClick={() => dispatch({ type: "NextSlice" })} type="button">
        Click
      </button>

      <ul>
        {state.CurrentWordSlice.map(({ id, word }) => {
          return <li key={id}>{word} </li>;
        })}
      </ul>
      <ul>
        {state.NextTenWordSlice.map(({ id, word }) => {
          return <li key={id}>{word} </li>;
        })}
      </ul>

      <input
        disabled={!isRunning}
        value={inputState}
        onChange={(e) => setInputState(e.currentTarget.value)}
        type="text"
      />
      <div>
        <button
          onClick={() => {
            restart(getNewTimestamp());
            setWordsPerMin(0);
            dispatch({ type: "Restart" });
          }}
          type="reset"
        >
          Start / Restart
        </button>
        <p>{wordsPerMin}</p>
        <p>{seconds}</p>
      </div>
    </div>
  );
}

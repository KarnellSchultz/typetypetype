import React, { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";

import { useApplicationState } from "../context";
import { useKeyPress } from "hooks/useKeyPress";

const initInputState = "";
export default function Home() {
  const { state, dispatch } = useApplicationState();
  const [inputState, setInputState] = useState(initInputState);
  const [currentWordCount, setCurrnetWordCount] = useState(0);

  const spacebarPress = useKeyPress(" ");

  useEffect(() => {
    if (spacebarPress) {
      console.log("hello");
      handleSubmit();
    }
  }, [spacebarPress]);

  useEffect(() => {
    dispatch({ type: "Ready" });
  }, []);

  const handleSubmit = () => {
    dispatch({
      type: "SubmitWord",
      payload: {
        ...state,
        UserSubmittedWord: inputState.trim(),
      },
    });
    setCurrnetWordCount(currentWordCount + 1);
    setInputState(initInputState);
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
        value={inputState}
        onChange={(e) => setInputState(e.currentTarget.value)}
        type="text"
      />
    </div>
  );
}

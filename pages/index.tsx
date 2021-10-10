import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

import { useTimer } from "react-timer-hook";

import { useApplicationState } from "../context";
import { useKeyPress } from "hooks/useKeyPress";
import { calculateWpm } from "../util/util";

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
    <div className="bg-gray-100 h-screen grid place-items-center ">
      <Head>
        <title>typetypetype app ⌨️</title>
        <meta name="home" content="Type type type" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid pt-4 justify-items-center bg-gray-100">
        <section className="bg-gray-100 text-gray-800">
          <ul className="flex">
            {state.CurrentWordSlice.map(({ id, word }) => {
              const highlighted =
                state?.CurrentWordSlice[currentWordCount]?.id === id
                  ? true
                  : false;
              return (
                <li
                  className={`px-1 rounded-sm text-center transition-colors ${
                    highlighted && `bg-gray-300`
                  } `}
                  key={id}
                >
                  {word}
                </li>
              );
            })}
          </ul>
          <ul className="flex">
            {state.NextTenWordSlice.map(({ id, word }) => {
              return (
                <li className="px-1 text-center" key={id}>
                  {word}{" "}
                </li>
              );
            })}
          </ul>
          <div className="p-4 grid justify-items-center ">
            <input
              className="rounded-sm py-2 px-3 border-gray-200 bg-gray-200 shadow-sm
            focus:outline-none  focus:ring-1 focus:ring-indigo-400
            "
              disabled={!isRunning}
              value={inputState}
              onChange={(e) => setInputState(e.currentTarget.value)}
              type="text"
              ref={inputRef}
            />
          </div>
        </section>
        <div className="p-4 grid grid-cols-3 gap-4">
          <button
            className="px-3 py-1 shadow-sm rounded-sm font-semibold text-gray-50 tracking-wider	focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50
          bg-indigo-500 hover:bg-indigo-600 "
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
        </div>
      </div>
    </div>
  );
}

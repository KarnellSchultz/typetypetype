import React, { useEffect, useRef } from "react";

import { useTimer } from "react-timer-hook";

import { useApplicationState } from "../context";
import { useKeyPress } from "hooks/useKeyPress";
import { calculateWpm, testWordColor } from "../util";
import { TestBar } from "components/TestBar";
import { Layout } from "components/Layout";

import { useStore, useWordCountStore } from "../zu-stores";

const getNewTimestamp = (timeInSeconds = 30) => {
  const date = new Date();
  return new Date(date.setSeconds(date.getSeconds() + timeInSeconds));
};

function Home() {
  const initInputState = "";
  const { state, dispatch } = useApplicationState();

  const inputState = useStore((state) => state.inputState);
  const setInputState = useStore((state) => state.setInputState);

  const wordsPerMin = useStore((state) => state.wordsPerMin);
  const setWordsPerMin = useStore((state) => state.setWordsPerMin);

  const currentWordCount = useWordCountStore((state) => state.currentWordCount);
  const resetWordCount = useWordCountStore((state) => state.resetWordCount);
  const incramentWordCount = useWordCountStore(
    (state) => state.incramentWordCount
  );

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

    incramentWordCount();
    // Check to see if we need to switch to the next slice
    // This can be moved to the reducer logic
    if (currentWordCount % 9 === 0 && currentWordCount !== 0) {
      dispatch({ type: "NextSlice" });
      resetWordCount();
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
    resetWordCount();
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
    <Layout pageTitle="Test">
      <div>
        <div className="grid pt-4 justify-items-center ">
          <section className="text-gray-800">
            <ul className="flex">
              {state.CurrentWordSlice.map(({ id, word }) => {
                const highlighted =
                  state?.CurrentWordSlice[currentWordCount]?.id === id
                    ? true
                    : false;
                return (
                  <li
                    className={`px-1 rounded-sm text-center transition-colors
                    ${testWordColor(word, state)}  
                    ${highlighted && `bg-gray-300`} `}
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
                className="rounded-sm shadow-sm py-2 px-3 border-gray-900 border-2 border-opacity-10 bg-gray-300 
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
          <TestBar
            handleStartClick={handleStartClick}
            seconds={seconds}
            wordsPerMin={wordsPerMin}
            isRunning={isRunning}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Home;

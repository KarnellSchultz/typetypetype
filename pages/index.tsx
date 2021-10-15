import React, { useEffect, useRef, useState } from "react";

import { useTimer } from "react-timer-hook";
import create from "zustand";

import { useApplicationState } from "../context";
import { useKeyPress } from "hooks/useKeyPress";
import { calculateWpm } from "../util/util";
import { TestBar } from "components/TestBar";
import { Layout } from "components/Layout";

const getNewTimestamp = (timeInSeconds = 30) => {
  const date = new Date();
  return new Date(date.setSeconds(date.getSeconds() + timeInSeconds));
};

const useStore = create((set) => ({
  inputState: "",
  setInputState: (value) => set((state) => ({ inputState: value })),
  // currentWordCount: 0,
  // wordsPerMin: 0,
}));

function Home() {
  const initInputState = "";
  const { state, dispatch } = useApplicationState();

  // const [inputState, setInputState] = useState(initInputState);
  const [currentWordCount, setCurrnetWordCount] = useState(0);
  const [wordsPerMin, setWordsPerMin] = useState(0);

  const inputState = useStore((state) => state.inputState);

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

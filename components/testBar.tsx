import React from "react";

import { useFullWordList } from "../context/fullWordListContext";
import { useTimerHook } from "../hooks/useTimer";

type TestBarProps = {
  currentWordCount: number;
  setCurrentWordCount: React.Dispatch<React.SetStateAction<number>>;
  setCorrectWordBank: React.Dispatch<React.SetStateAction<string[]>>;
  incorrectWordBank: string[];
  setIncorrectWordBank: React.Dispatch<React.SetStateAction<string[]>>;
  correctWordBank: string[];
};

export const TestBar = ({
  currentWordCount,
  setCurrentWordCount,
  setCorrectWordBank,
  setIncorrectWordBank,
  correctWordBank,
}: TestBarProps) => {
  const { fullWordListState } = useFullWordList();

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

  let WPMCalculation = ((correctWordBank.join(" ").length / 5) * 6).toFixed(0);

  const { start, restartTimer, isRunning, minutes, seconds } = useTimerHook({
    initTime: 10,
  });

  return (
    <div>
      {" "}
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        spellCheck="false"
        autoComplete="off"
        disabled={isRunning ? false : true}
      />
      <button onClick={start}>Start</button>
      <button onClick={() => restartTimer()}>Restart</button>
      <div style={{ fontSize: "40px" }}>
        <p >{isRunning ? "Running" : "Not running"}</p>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <div>{WPMCalculation}</div>
    </div>
  );
};

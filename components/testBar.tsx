import React from "react";
import styled from "styled-components";
import { VscDebugRestart } from "react-icons/vsc";

import { useFullWordList } from "../context/fullWordListContext";
import { useTimerHook } from "../hooks/useTimer";
import { BasicColors, colors } from "../styles/colors";

const TestingDataBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0.5rem auto;
  width: 100%;
`;

const DataBarItems = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 16rem;
  margin: 0.5rem;
  background-color: ${colors.background.activeWordBackground};
`;

const Button = styled.div`
  justify-content: center;
  align-items: center;
  padding: 0.9rem 2rem;
  margin: 0.5rem;
  border-radius: 4px;
  font-weight: 500;
  color: ${BasicColors.blue2};
  background-color: ${colors.background.background};

  :hover {
    color: ${BasicColors.grey2};
    background-color: ${BasicColors.blue2};
    cursor: pointer;
  }
`;

const WordPerMin = styled.span`
  font-size: 2rem;
`;

const Time = styled.span`
  font-size: 2rem;
`;

const Input = styled.input`
  z-index: 1;
  outline: 0;
  transition: 0.2s;
  margin: 2rem 0;
  width: 22rem;
  border: 2px solid ${colors.border};
  border-radius: 4px;

  :focus {
    border: 2px solid ${BasicColors.blue2};
  }
`;

type TestBarProps = {
  currentWordCount: number;
  incorrectWordBank: string[];
  correctWordBank: string[];
  setCurrentWordCount: React.Dispatch<React.SetStateAction<number>>;
  setCorrectWordBank: React.Dispatch<React.SetStateAction<string[]>>;
  setIncorrectWordBank: React.Dispatch<React.SetStateAction<string[]>>;
};

export const TestBar = ({
  currentWordCount,
  setCurrentWordCount,
  setCorrectWordBank,
  setIncorrectWordBank,
  correctWordBank,
}: TestBarProps) => {
  const { fullWordListState, setFullWordListState } = useFullWordList();

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
    initTime: 30,
  });

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleRestart = () => {
    restartTimer();
    inputRef?.current?.focus();
    setFullWordListState([]);
    setCorrectWordBank([]);
    setIncorrectWordBank([]);
    setCurrentWordCount(0);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <Input
        ref={inputRef}
        onChange={(e) => handleChange(e)}
        type="text"
        spellCheck="false"
        autoComplete="off"
        disabled={isRunning ? false : true}
      />
      <TestingDataBar>
        <DataBarItems>
          <WordPerMin>{WPMCalculation} wpm</WordPerMin>
          <Time>
            <p>{isRunning ? <span>✅</span> : <span>❌</span>}</p>
            <span>{seconds}</span>
          </Time>
          <Button role="button" onClick={handleRestart}>
            <VscDebugRestart />
            RESTART
          </Button>
        </DataBarItems>
      </TestingDataBar>
    </>
  );
};

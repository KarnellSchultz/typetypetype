import React from "react";
import styled from "styled-components";
import { VscDebugRestart } from "react-icons/vsc";

import { useFullWordList } from "../context/fullWordListContext";
import { useTimerHook } from "../hooks/useTimer";
import { BasicColors, colors } from "../styles/colors";

const StyledTestBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0.5rem auto;
  width: 100%;
  justify-content: center;
`;

const StyledBarItems = styled.div`
  display: flex;
  flex-direction: row;

  padding: 1rem 2rem;
  background-color: var(--operator);
`;

const Button = styled.div`
  height: 4rem;
  width: 4rem;
  padding: 0.75rem 1rem;
  margin: 1rem;
  text-align: center;
  color: ${BasicColors.blue0};
  background-color: ${BasicColors.success0};
  :hover {
    cursor: pointer;
  }
`;

const StyledInput = styled.input`
  width: 100%;
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

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleRestart = () => {
    restartTimer();
    inputRef?.current?.focus();
  };

  return (
    <StyledTestBar>
      <StyledInput
        ref={inputRef}
        onChange={(e) => handleChange(e)}
        type="text"
        spellCheck="false"
        autoComplete="off"
        // disabled={isRunning ? false : true}
      />
      <StyledBarItems>
        <Button role="button" onClick={handleRestart}>
          <VscDebugRestart />
          RESTART
        </Button>
        <div style={{ fontSize: "20px" }}>
          <p>{isRunning ? <div>✅</div> : <div>❌</div>}</p>
          <span>{seconds}</span>
        </div>
        <div>{WPMCalculation}</div>
      </StyledBarItems>
    </StyledTestBar>
  );
};

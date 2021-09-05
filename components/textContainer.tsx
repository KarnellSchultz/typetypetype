import React from "react";

import { useFullWordList, useWord } from "../context";

import { colors, BasicColors, border } from "../styles/colors";

import styled from "styled-components";

type TestWordType = {
  active?: boolean;
  correct?: boolean;
  incorrect?: boolean;
};

const testWordAnimation = () => `animation: fade-in .1s forwards;
  animation-name: fade-in;
  animation-duration: 0.1s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;`;

const TestWord = styled.span<TestWordType>`
  padding: 0.2rem 0.2rem 0.4rem 0.2rem;
  font-size: 1.5rem;
  font-weight: 400;
  white-space: pre-wrap;
  border-radius: ${border.borderRadious};
  color: ${BasicColors.textLight};

  transition: background-color 0.15s ease;

  ${({ correct }) => correct && `color: ${colors.string};`}
  ${({ incorrect }) => incorrect && `color: ${colors.error};`}

  ${({ active }) =>
    active &&
    `background-color: ${
      colors.background.activeWordBackground
    }; ${testWordAnimation()} `}
`;

export const StyledContainer = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  user-select: none;
  background-color: ${colors.background.codeBackgroundColor};
  line-height: 2rem;
  padding: 1.5rem 2rem;
  border-radius: ${border.borderRadious};
`;

type TextContainerProps = {
  nextTenWords: string[];
  currentTenWords: string[];
  currentWordCount: number;
  incorrectWordBank: string[];
  correctWordBank: string[];
};

export const TextContainer = ({
  children,
  nextTenWords,
  currentTenWords,
  currentWordCount,
  incorrectWordBank,
  correctWordBank,
}: TextContainerProps) => {
  const { fullWordListState } = useFullWordList();

  const getTestWordProps = (word: string) => {
    const incorrect = incorrectWordBank.includes(word);
    const correct = correctWordBank.includes(word);

    return { correct, incorrect };
  };

  return (
    <div>
      <StyledContainer>
        <div>
          {currentTenWords.map((word) =>
            word === fullWordListState[currentWordCount] ? (
              <TestWord active {...getTestWordProps(word)} key={word}>
                {word}
              </TestWord>
            ) : (
              <TestWord {...getTestWordProps(word)} key={word}>
                {word}
              </TestWord>
            )
          )}
        </div>
        <br />
        <div>
          {nextTenWords.map((word) => (
            <TestWord key={word}>{word}</TestWord>
          ))}
        </div>
      </StyledContainer>
      {children}
    </div>
  );
};

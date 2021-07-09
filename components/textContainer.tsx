import React from "react";
import { useFullWordList } from "../context";

import styles from "../styles/Home.module.css";
import { colors, BasicColors } from "../styles/colors";

import styled from "styled-components";

type TestWordType = {
  active?: boolean;
};

const getAnimation = () => `animation: fade-in .1s forwards;
  animation-name: fade-in;
  animation-duration: 0.1s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;`;

const TestWord = styled.span<TestWordType>`
  padding: 0.25rem 0.75rem 0.25rem 0.55rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: ${BasicColors.textLight};

  transition: background-color 0.1s ease;
  ${({ active }) =>
    active && `background-color: ${colors.string}; ${getAnimation()} `}
`;

const StyledContainer = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  width: min(50rem, 100%);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: ${colors.background.codeBackgroundColor};
  line-height: 2.4rem;
  padding: 1.5rem 2.25rem;
  /* height: 10rem; */
`;

type TextContainerProps = {
  nextTenWords: string[];
  currentTenWords: string[];
  currentWordCount: number;
};

export const TextContainer = ({
  nextTenWords,
  currentTenWords,
  currentWordCount,
}: TextContainerProps) => {
  const { fullWordListState } = useFullWordList();

  return (
    <div>
      <StyledContainer>
        <span>
          {currentTenWords.map((word) =>
            word === fullWordListState[currentWordCount] ? (
              <TestWord active>{word}</TestWord>
            ) : (
              <TestWord>{word}</TestWord>
            )
          )}
        </span>
        <br></br>
        <span>
          {nextTenWords.map((word) => (
            <TestWord>{word}</TestWord>
          ))}
        </span>
      </StyledContainer>
    </div>
  );
};

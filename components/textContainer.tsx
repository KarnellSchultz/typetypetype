import React from "react";
import { useFullWordList } from "../context";

import styles from "../styles/Home.module.css";
import {colors, BasicColors} from "../styles/colors";

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
  animation-play-state: running;`

const TestWord = styled.span<TestWordType>`
padding: .25rem .15rem .25rem .55rem;
/* background-color: white; */

transition: background-color 0.1s ease;
${({ active }) => active && `background-color: ${colors.string}; ${getAnimation()} `}    

`;

const StyledContainer = styled.div`
overflow: hidden;
box-sizing: border-box;
width: min(50rem,100%);
border-radius: 4px;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
background-color: ${colors.background.lightBackground};
line-height: 2.4rem;
height: 10rem;
padding: 1.5rem 2.25rem;
`

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

  console.log(currentWordCount);

  return (
    <StyledContainer className={styles.textContainer}>
      <h3>
        {currentTenWords.map((word) =>
          word === fullWordListState[currentWordCount] ? (
            <TestWord active>{word}</TestWord>
          ) : (
            <TestWord>{word}</TestWord>
          )
        )}
      </h3>
      <h3>
        {nextTenWords.map((word) => (
            <span>{word} </span>
        ))}
      </h3>
    </StyledContainer>
  );
};

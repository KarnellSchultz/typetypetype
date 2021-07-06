import React from "react";

type TextContainerProps = {
  nextTenWords: string[];
  currentTenWords: string[];
};

export const TextContainer = ({
  nextTenWords,
  currentTenWords,
}: TextContainerProps) => {
  return (
    <div>
      <h3>
        {currentTenWords.map((word) => (
          <span>{word} </span>
        ))}
      </h3>
      <h3>
        {nextTenWords.map((word) => (
          <span>{word} </span>
        ))}
      </h3>
    </div>
  );
};

import React, { useState } from "react";
import { useFullWordList, useWord } from "../context";

export const InputBox = () => {
  const { state, dispatch } = useWord();

  const { fullWordListState, setFullWordListState } = useFullWordList();

  const [count, setCount] = useState(0);
  console.log(fullWordListState);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const spaceBarPressed: boolean =
      e.currentTarget.value.toLowerCase().split("").pop() == " ";

    if (spaceBarPressed && state.word === fullWordListState[count]) {
      console.log("correct", count);
      setCount(count + 1);
      setFullWordListState(fullWordListState.filter(el => el !== el[count]));
    }

    if (!spaceBarPressed) {
      dispatch({ type: "update", payload: e.currentTarget.value });
    }
    if (spaceBarPressed) {
      dispatch({ type: "check" });
    }
  };
  return (
    <>
      <input type="text" onChange={(e) => handleInput(e)} value={state.word} />
    </>
  );
};

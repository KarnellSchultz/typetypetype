import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WordListData } from "../wordData";

import { WordDataType } from "../context/WordDataContext";

type TestWords = {
  WordSlices: {
    CurrentWordSlice: WordDataType[];
    NextTenWordSlice: WordDataType[];
  };
};

type UseTestWordsReturn = TestWords & {
  slice: number;
  setSlice: React.Dispatch<React.SetStateAction<number>>;
};

const getRandomNumber = (): number =>
  Math.floor(Math.random() * WordListData.length - 10);

export const useTestWords = (): UseTestWordsReturn => {
  const [slice, setSlice] = useState(0);

  const sliceStart = getRandomNumber();

  const CreateNewSlice = () => WordListData.slice(sliceStart, sliceStart + 10);

  const CurrentWordSlice = CreateNewSlice();
  const NextTenWordSlice = CreateNewSlice();

  const WordSlices = {
    CurrentWordSlice,
    NextTenWordSlice,
  };

  return { WordSlices, slice, setSlice };
};

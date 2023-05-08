import { GameDurations, useTypeStore } from "app/store";
import { getWordList } from "lib/utils";
import { RefObject, useEffect, useState } from "react";
import { TestWordType, WordListData } from "wordData";


export function useKeyPress(targetKey: string): boolean {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // Add event listeners
  useEffect(() => {
    // If pressed key is our target key then set to true
    const downHandler = ({ key }: { key?: string }): void => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    // If released key is our target key then set to false
    const upHandler = ({ key }: { key?: string }): void => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}


const MAX_TEST_WORDS = 200

export const useWordList = (count = MAX_TEST_WORDS) => {
  const [wordList, setWordList] = useTypeStore(({ wordList, setWordList }) => [wordList, setWordList])

  useEffect(() => {
    setWordList(getWordList())
    return () => {
      setWordList([])
    }
  }, [count, setWordList])

  return wordList
}

export const useCountdown = () => {
  const [seconds, setSeconds] = useTypeStore(({ seconds, setSeconds }) => [seconds, setSeconds]);
  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      intervalId = setInterval(() => setSeconds(seconds - 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, seconds, setSeconds]);

  useEffect(() => {
    if (seconds <= 0) {
      setIsRunning(false);
    }
  }, [seconds, isRunning]);

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = (initSeconds: number) => {
    setSeconds(initSeconds);
    setIsRunning(false);
  };

  return { seconds, startAndStop, isRunning, reset }
}

// https://support.sunburst.com/hc/en-us/articles/229335208-Type-to-Learn-How-are-Words-Per-Minute-and-Accuracy-Calculated-#:~:text=Calculating%20Words%20per%20Minute%20(WPM)&text=Therefore%2C%20the%20number%20of%20words,elapsed%20time%20(in%20minutes).
export const useWPM = () => {
  const { correctList, incorrectList, selectedDuration, seconds } =
    useTypeStore(({ correctList, incorrectList, selectedDuration, seconds }) =>
      ({ correctList, incorrectList, selectedDuration, seconds }))

  let letterCount = 0
  for (let values of correctList.values()) {
    letterCount += values.length
  }
  for (let values of incorrectList.values()) {
    letterCount += values.length
  }
  const spacesCount = correctList.size + incorrectList.size
  const keysPressed = Math.round((letterCount + spacesCount) / 5)
  const elapsedInMinutes = (selectedDuration - seconds) / 60 !== 0 ? (selectedDuration - seconds) / 60 : selectedDuration / 60
  const wpm = Math.round(keysPressed / elapsedInMinutes)
  return wpm
}


export const useFocusInput = (ref: RefObject<HTMLInputElement>) => {
  const [gameStatus] = useTypeStore(({ gameStatus }) => [gameStatus])
  useEffect(() => {
    if (!ref.current) return
    if (gameStatus === "READY") {
      ref.current?.focus()
    }
  }, [gameStatus, ref])
}

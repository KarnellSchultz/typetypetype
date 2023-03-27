import { useEffect, useRef, useState } from "react";
import { TestWordType, WordListData } from "wordData";

export function useKeyPress(targetKey: string): boolean {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }: { key?: string }): void {
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
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}


const MAX_TEST_WORDS = 200

export const useWordList = (count = MAX_TEST_WORDS) => {
  const [list, setList] = useState<TestWordType[]>([])

  const getRandomIndex = () => Math.floor(Math.random() * WordListData.length)
  const getRandomWord = () => WordListData[getRandomIndex()]

  const getUniqueWord = (set: Set<any>): TestWordType => {
    const randomWord = getRandomWord()
    if (set.has(randomWord)) return getUniqueWord(set)
    return randomWord
  }

  const createTestList = () => {
    const list: Set<TestWordType> = new Set()
    for (let i = 1; i <= count; i++) {
      list.add(getUniqueWord(list))
    }
    return Array.from(list)
  }

  useEffect(() => {
    setList(createTestList())
  }, [])

  return list
}


export const useCountdown = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef<any>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
    }
  }, [timeLeft]);


  const reset = (seconds: number) => {
    setTimeLeft(seconds);
  };

  return { timeLeft, reset }
}
import React from "react";

interface Props {
  handleStartClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  seconds: number;
  wordsPerMin: number;
  isRunning: boolean;
}

export const TestBar = ({
  handleStartClick,
  seconds,
  wordsPerMin,
  isRunning,
}: Props) => {
  return (
    <section>
      <div className="p-5 grid grid-cols-3 gap-4 grid-">
        <button
          className="px-3 py-2 shadow-sm rounded-sm font-semibold text-gray-50 tracking-wider	focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50
          bg-indigo-500 hover:bg-indigo-600 "
          onClick={(e) => {
            handleStartClick(e);
          }}
          type="reset"
        >
          Start
        </button>
        <div className="grid place-items-center bg-gray-300 p-2">
          {isRunning ? <p>00:{seconds}</p> : <p>00:00</p>}
        </div>
        <div className="grid place-items-center bg-gray-300 p-2">
          <p>{wordsPerMin} WPM</p>
        </div>
      </div>
    </section>
  );
};

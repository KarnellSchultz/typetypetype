import { useTimer } from "react-timer-hook";

type UseTimerHook = { initTime: number; autoStart?: boolean };

export const useTimerHook = ({
  initTime = 30,
  autoStart = false,
}: UseTimerHook) => {
  let time = new Date();
  let expiryTimestamp = time.setSeconds(time.getSeconds() + initTime);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.log("onExpire called"),
    autoStart,
  });

  const restartTimer = () => restart(expiryTimestamp);

  return {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
    restartTimer,
  };
};

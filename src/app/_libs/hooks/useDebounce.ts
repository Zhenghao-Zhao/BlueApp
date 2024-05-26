import { useEffect, useState } from "react";

const MIN_TIMEOUT = 200;

export default function useDebounce(
  func: () => void,
  dependency: any,
  timeout = MIN_TIMEOUT
) {
  const [timer, setTimer] = useState<number | undefined>();

  useEffect(() => {
    debounce();
    return () => clearTimeout(timer);
  }, [dependency]);

  const debounce = () => {
    if (!timer) {
      func();
    }
    clearTimeout(timer);
    setTimer(
      window.setTimeout(() => {
        func();
        setTimer(undefined);
      }, timeout)
    );
  };

  return null;
}
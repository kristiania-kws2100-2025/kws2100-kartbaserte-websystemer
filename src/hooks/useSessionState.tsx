import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useSessionState<T extends string>(
  defaultValue: T,
  key: string,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(
    () => (window.sessionStorage.getItem(key) as T) || defaultValue,
  );
  useEffect(() => {
    window.sessionStorage.setItem(key, value);
  }, [value]);
  return [value, setValue];
}

import { useEffect, useState } from "react";

export function useColorScheme(): "light" | "dark" {
  const [matches, setMatches] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  function handleChange(e: MediaQueryListEvent) {
    setMatches(e.matches);
  }

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);
  return matches ? "dark" : "light";
}

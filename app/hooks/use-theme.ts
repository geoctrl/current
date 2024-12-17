import { useEffect, useState } from "react";
import { isClient } from "../utils/is-client";

export const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (isClient()) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      return "light";
    }
  });

  useEffect(() => {
    let mediaQuery: MediaQueryList | undefined;
    let handleChange: ((event: MediaQueryListEvent) => void) | undefined;
    if (isClient() && mediaQuery) {
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (event: MediaQueryListEvent) => {
        setTheme(event.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener("change", handleChange);
    }
    return () => {
      if (window && mediaQuery && handleChange) {
        mediaQuery.removeEventListener("change", handleChange);
      }
    };
  }, []);

  return theme;
};

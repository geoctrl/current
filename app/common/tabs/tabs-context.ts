import { createContext } from "react";

export const TabsContext = createContext<{
  value: unknown;
  block: boolean;
  onChange: ((value: unknown) => void) | undefined;
}>({
  value: undefined,
  block: false,
  onChange: undefined,
});

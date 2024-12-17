import { createPortal } from "react-dom";
import { ReactNode, ReactPortal } from "react";

export function createClientPortal(
  children: ReactNode,
  key?: string | null | undefined,
): ReactPortal | ReactNode {
  if (typeof window !== "undefined") {
    return createPortal(children, document.body, key);
  }
  return children;
}

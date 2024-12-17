import React, {
  ReactNode,
  CSSProperties,
  HTMLAttributes,
  ComponentProps,
} from "react";
import { always } from "../../utils/classname-helpers";

export type LabelProps = ComponentProps<"label">;

export function Label(props: LabelProps) {
  const { children, className, ...rest } = props;
  return (
    <label {...rest} className={always(className, "typo-label")}>
      {children}
    </label>
  );
}

import React, { HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

export type HighlightProps = HTMLAttributes<HTMLSpanElement> & {
  color?: "puce" | "almond" | "zomp" | "tropical-indigo";
};

export function Highlight(props: HighlightProps) {
  const { color = "puce", children, className, ...spanProps } = props;
  return (
    <span
      {...spanProps}
      className={tv({
        base: "rounded-[.2em] px-[.2em] py-[.1em]",
        variants: {
          color: {
            puce: "bg-puce-75",
            almond: "bg-almond-75",
            zomp: "bg-zomp-75",
            "tropical-indigo": "bg-tropical-indigo-75",
          },
        },
      })({ color })}
    >
      {children}
    </span>
  );
}

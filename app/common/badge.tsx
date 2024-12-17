import React, { ReactNode, CSSProperties } from "react";
import { tv } from "tailwind-variants";

type BadgeProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  color?: "puce" | "zomp" | "tropical-indigo" | "almond";
};

export function Badge(props: BadgeProps) {
  const { children, color = "puce" } = props;
  return (
    <div
      className={tv({
        base: "inline-flex items-center rounded-md px-1.5 text-sm form-height-sm",
        variants: {
          color: {
            zomp: "bg-zomp-25 text-zomp-900",
            "tropical-indigo": "bg-tropical-indigo-25 text-tropical-indigo-900",
            almond: "bg-almond-25 text-almond-900",
            puce: "bg-puce-25 text-puce-900",
          },
        },
      })({ color })}
    >
      {children}
    </div>
  );
}

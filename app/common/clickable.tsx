import React, { HTMLAttributes, ButtonHTMLAttributes } from "react";
import { always } from "../utils/classname-helpers";
import { Link, LinkProps } from "@remix-run/react";

type ClickableDiv = { as?: "div" } & HTMLAttributes<HTMLDivElement>;
type ClickableButton = {
  as: "button";
} & ButtonHTMLAttributes<HTMLButtonElement>;
type Clickable = {
  as?: typeof Link;
} & LinkProps;
export type ClickableProps = ClickableDiv | ClickableButton | Clickable;

export function Clickable(props: ClickableProps) {
  const { as = "button", className, ...rest } = props;
  let Component: typeof Link | string = as;

  let otherProps = {};
  if (as === "div") {
    otherProps = { tabIndex: 0 } as ButtonHTMLAttributes<HTMLButtonElement>;
  }

  return (
    <Component
      className={always(
        className,
        "cursor-pointer rounded-lg p-2 transition ease-out",
        "hover:bg-grey-500/10 active:bg-grey-500/15 dark:hover:bg-grey-100/10",
        "dark:text-grey-100 dark:active:bg-grey-100/15",
      )}
      {...(rest as any)}
      {...otherProps}
    />
  );
}

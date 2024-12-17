import { HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

import { a, always, maybe } from "../../utils/classname-helpers";

export type LoaderIntent =
  | "primary"
  | "primaryReverse"
  | "grey"
  | "greyReverse"
  | "onColor";

export type LoaderSize = "xs" | "sm" | "md" | "lg";

export type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  size?: LoaderSize;
  intent?: LoaderIntent;
};

export function Loader(props: LoaderProps) {
  const { className, style, size = "md", intent = "primary", ...rest } = props;
  return (
    <div
      role="status"
      className={always(
        className,
        "relative",
        maybe(size === "xs", "size-4"),
        maybe(size === "sm", "size-5"),
        maybe(size === "md", "size-6"),
        maybe(size === "lg", "size-8"),
      )}
      style={style}
      {...rest}
    >
      <svg
        aria-hidden="true"
        className="text-gray-200 dark:text-gray-600 fill-blue-600 h-full w-full animate-spin"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/*background*/}
        <path
          className={tv({
            base: "",
            variants: {
              intent: {
                primary: "fill-grey-990/20 dark:fill-grey-10/20",
                primaryReverse: "fill-grey-10/20 dark:fill-grey-990/20",
                grey: "fill-grey-990/20 dark:fill-grey-10/20",
                greyReverse: "fill-grey-10/20 dark:fill-grey-990/20",
                onColor: "fill-grey-10/20",
              },
            },
          })({
            intent,
          })}
          fill="currentColor"
          d="M50,100C22.4,100,0,77.6,0,50S22.4,0,50,0s50,22.4,50,50-22.4,50-50,50ZM50,15c-19.3,0-35,15.7-35,35s15.7,35,35,35,35-15.7,35-35S69.3,15,50,15Z"
        />
        {/*partial line*/}
        <path
          className={tv({
            base: "",
            variants: {
              intent: {
                primary: "fill-primary-500",
                primaryReverse: "fill-primary-500",
                grey: "fill-grey-990/50 dark:fill-grey-10/50",
                greyReverse: "fill-grey-10/50 dark:fill-grey-990/50",
                onColor: "fill-grey-10",
              },
            },
          })({
            intent,
          })}
          fill="currentColor"
          d="M92,51.3c-3.7,0-6.9-2.7-7.4-6.4-2.5-17-17.4-29.9-34.6-29.9s-4.8.2-7.1.7c-4.1.8-8-1.8-8.9-5.8-.8-4.1,1.8-8,5.8-8.9,3.3-.7,6.7-1,10.1-1,24.6,0,45.9,18.4,49.5,42.7.6,4.1-2.2,7.9-6.3,8.5-.4,0-.7,0-1.1,0Z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

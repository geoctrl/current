import { always, maybe, toggle } from "../utils/classname-helpers";
import { ChangeEvent, forwardRef, useRef } from "react";

export type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
  size?: "sm" | "md" | "lg";
};

export const Toggle = forwardRef<HTMLDivElement, ToggleProps>((props, ref) => {
  const { checked, onChange, size = "md" } = props;

  let toggleRef = useRef<HTMLInputElement>(null);

  return (
    <div
      ref={ref}
      className={always(
        "relative inline-block rounded-full",
        maybe(size === "sm", "h-6"),
        maybe(size === "md", "h-7"),
        maybe(size === "lg", "h-8"),
      )}
    >
      <input
        ref={toggleRef}
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked, e);
        }}
        type="checkbox"
        className="absolute left-2 top-2 opacity-0"
      />
      <div
        className={always(
          "relative inline-block h-full cursor-pointer rounded-full align-middle transition-colors",
          toggle(
            !checked,
            "bg-grey-900/25 dark:bg-grey-100/25",
            "bg-primary-500",
          ),
          maybe(size === "sm", "w-10"),
          maybe(size === "md", "w-12"),
          maybe(size === "lg", "w-14"),
        )}
        onClick={() => {
          if (toggleRef) {
            toggleRef.current?.focus();
            toggleRef.current?.click();
          }
        }}
      >
        <div
          className={always(
            "absolute left-1 top-1 rounded-full bg-grey-10 transition-transform",
            maybe(checked, "translate-x-full"),
            maybe(size === "sm", "h-4 w-4"),
            maybe(size === "md", "h-5 w-5"),
            maybe(size === "lg", "h-6 w-6"),
          )}
        />
      </div>
    </div>
  );
});

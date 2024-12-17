import { tv } from "tailwind-variants";

export const inputVariants = tv({
  base: "block w-full bg-grey-100 align-middle text-base dark:border-grey-100/10 dark:bg-grey-100/5",
  variants: {
    size: {
      sm: "h-8 rounded-md px-2 text-sm",
      md: "h-10 rounded-lg px-3",
      lg: "h-12 rounded-lg px-4 text-lg",
    },
    iconLeft: {
      true: "pl-10",
    },
    iconRight: {
      true: "pr-10",
    },
  },
});

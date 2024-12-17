import { tv } from "tailwind-variants";
import { always } from "../../utils/classname-helpers";
import { formSizes } from "../../types/form-sizes";

export const buttonVariants = tv({
  base: "relative inline-flex shrink-0 cursor-pointer select-none items-center whitespace-nowrap rounded-lg align-middle font-medium transition ease-out",
  variants: {
    intent: {
      primary:
        "bg-primary-500 text-grey-100 hover:bg-primary-600 active:bg-primary-700",
      secondary: always(
        "bg-grey-500/10 text-grey-900 hover:bg-grey-500/20 active:bg-grey-500/25 dark:text-grey-100",
        "dark:bg-grey-500/10 dark:text-grey-100 dark:hover:bg-grey-500/20 active:dark:bg-grey-500/25",
      ),
      secondaryColor:
        "bg-primary-500/10 text-primary-500 hover:bg-primary-500/20 active:bg-primary-500/25",
      outline: always(
        "border border-solid border-grey-900/30 hover:bg-grey-500/10 active:bg-grey-500/15 dark:text-grey-100",
        "dark:border-grey-100/50 dark:text-grey-100 dark:hover:bg-grey-100/10 dark:active:bg-grey-100/15",
      ),
      tertiary: always(
        "text-grey-900",
        "hover:bg-grey-500/10 active:bg-grey-500/15 dark:hover:bg-grey-100/10",
        "dark:text-grey-100 dark:active:bg-grey-100/15",
      ),
      listItem: always(
        "rounded-none text-grey-900 shadow-none outline-none focus:bg-grey-500/15 active:bg-grey-500/15",
        "dark:text-grey-100 dark:focus:bg-grey-100/15 dark:active:bg-grey-100/15",
      ),
    },
    asAnchor: {
      true: "no-underline",
    },
    formSize: {
      sm: `h-${formSizes.sm} gap-1.5 px-2.5 text-sm`,
      md: `h-${formSizes.md} gap-2 px-3 text-base`,
      lg: `h-${formSizes.lg} gap-3 px-4 text-lg`,
    },
    alignContent: {
      left: "justify-start",
      right: "justify-end",
      center: "justify-center",
    },
    block: {
      true: "flex w-full",
    },
    isActive: {
      true: "",
    },
    disabled: {
      true: "cursor-default opacity-50",
    },
    iconOnly: {
      true: "justify-center p-0",
    },
  },
  compoundVariants: [
    // list item AND size "md"
    { intent: "listItem", formSize: "md", class: "px-4" },

    // icon only width
    { formSize: "sm", iconOnly: true, class: `size-8 p-0` },
    { formSize: "md", iconOnly: true, class: `size-10 p-0` },
    { formSize: "lg", iconOnly: true, class: `size-12 p-0` },
    // isActive
    {
      intent: "primary",
      isActive: true,
      class: "bg-primary-700 hover:bg-primary-700",
    },
    {
      intent: "secondary",
      isActive: true,
      class: always(
        "bg-grey-500/25 hover:bg-grey-500/25",
        "dark:bg-grey-500/25 dark:hover:bg-grey-500/25",
      ),
    },
    {
      intent: "secondaryColor",
      isActive: true,
      class: "bg-primary-500/25 hover:bg-primary-500/25",
    },
    {
      intent: "outline",
      isActive: true,
      class: always(
        "border-grey-900/50 bg-grey-500/15 hover:border-grey-900/50 hover:bg-grey-500/15",
        "dark:bg-grey-100/15 dark:hover:bg-grey-100/15",
      ),
    },
    {
      intent: "tertiary",
      isActive: true,
      class: always(
        "bg-grey-500/15 hover:bg-grey-500/15",
        "dark:bg-grey-100/15 dark:hover:bg-grey-100/25",
      ),
    },
    // disabled
    {
      disabled: true,
      intent: "primary",
      class:
        "cursor hover:bg-primary-500 focus:bg-primary-500 active:bg-primary-500",
    },
    {
      disabled: true,
      intent: "secondary",
      class:
        "hover:bg-grey-500/10 focus:bg-grey-500/10 active:bg-grey-500/10 dark:hover:bg-grey-500/10 dark:focus:bg-grey-500/10 dark:active:bg-grey-500/10",
    },
    {
      disabled: true,
      intent: "secondaryColor",
      class:
        "hover:bg-primary-500/10 focus:bg-primary-500/10 active:bg-primary-500/10",
    },
    {
      disabled: true,
      intent: "outline",
      class:
        "hover:bg-transparent focus:bg-transparent active:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent",
    },
    {
      disabled: true,
      intent: "tertiary",
      class:
        "hover:bg-transparent focus:bg-transparent active:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent",
    },
    {
      disabled: true,
      intent: "listItem",
      class:
        "hover:bg-transparent focus:bg-transparent active:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent",
    },
  ],
});

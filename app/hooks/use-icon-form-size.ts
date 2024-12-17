import { tv } from "tailwind-variants";
import { FormSize } from "../types/form-sizes";

export function useIconFormSize(formSize: FormSize) {
  return tv({
    base: "size-4",
    variants: {
      formSize: {
        sm: "size-3.5",
        md: "size-4",
        lg: "size-5",
      },
    },
  })({ formSize });
}

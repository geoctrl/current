import { always } from "../../utils/classname-helpers";
import {
  FormEvent,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { RenderIconOrElement } from "../icon/render-icon-or-element";
import { IconOrElement } from "../../types/icons";
import { useIconFormSize } from "../../hooks/use-icon-form-size";
import { inputVariants } from "./input-variants";
import { Label } from "../label/label";

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value?: string;
  onChange?: (value: string, event: FormEvent<HTMLInputElement>) => void;
  formSize?: "sm" | "md" | "lg";
  label?: string | ReactNode;
  iconLeft?: IconOrElement;
  iconRight?: IconOrElement;
  inputProps?: HTMLAttributes<HTMLDivElement>;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    iconLeft,
    iconRight,
    id,
    inputProps,
    formSize = "md",
    onChange,
    label,
    style,
    required,
    ...rest
  } = props;

  const iconSize = useIconFormSize(formSize);

  return (
    <>
      {!!label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative" {...rest}>
        <input
          id={id}
          className={always(
            inputVariants({
              size: formSize,
              iconLeft: !!iconLeft,
              iconRight: !!iconRight,
            }),
            inputProps?.className,
          )}
          onChange={(e) => {
            onChange?.(e.target.value, e);
          }}
          required={required}
          style={style}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 flex size-10 items-center justify-center">
          <RenderIconOrElement iconOrElement={iconLeft} className={iconSize} />
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 flex size-10 items-center justify-center">
          <RenderIconOrElement iconOrElement={iconRight} className={iconSize} />
        </div>
      </div>
    </>
  );
});

import React from "react";
import { Link, LinkProps } from "@remix-run/react";

import { RenderIconOrElement } from "../icon/render-icon-or-element";
import { IconOrElement } from "../../types/icons";
import { Loader, LoaderSize, LoaderIntent } from "../loader/loader";
import { buttonVariants } from "./button-variants";
import { FormSize } from "../../types/form-sizes";
import { useIconFormSize } from "../../hooks/use-icon-form-size";

type ButtonButtonProps = {
  as?: "button";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAnchorProps = {
  as?: "a";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonLinkProps = {
  as?: typeof Link;
} & LinkProps;

type ButtonAs = ButtonButtonProps | ButtonAnchorProps | ButtonLinkProps;

type ButtonIntent =
  | "primary"
  | "secondary"
  | "secondaryColor"
  | "outline"
  | "tertiary"
  | "listItem";

const intentToIntentMap: Record<ButtonIntent, LoaderIntent> = {
  primary: "onColor",
  secondary: "grey",
  secondaryColor: "primary",
  outline: "grey",
  tertiary: "grey",
  listItem: "grey",
};

const formSizeToSizeMap: Record<FormSize, LoaderSize> = {
  sm: "xs",
  md: "sm",
  lg: "md",
};

export type ButtonProps = ButtonAs & {
  alignContent?: "left" | "right" | "center";
  block?: boolean;
  disabled?: boolean;
  formSize?: FormSize;
  iconLeft?: IconOrElement;
  iconOnly?: IconOrElement;
  iconRight?: IconOrElement;
  intent?: ButtonIntent;
  isActive?: boolean;
  isLoading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      alignContent = "center",
      as = "button",
      children,
      className,
      block,
      disabled,
      formSize = "md",
      iconLeft,
      iconRight,
      iconOnly,
      intent = "secondary",
      isActive,
      isLoading,
      ...rest
    } = props;
    const Wrapper = as === "a" ? "a" : as === "button" ? "button" : Link;

    const iconSize = useIconFormSize(formSize);

    let isDisabled = isLoading || disabled;

    const renderLoader = (
      <Loader
        intent={intentToIntentMap[intent]}
        size={formSizeToSizeMap[formSize]}
      />
    );

    return (
      <Wrapper
        {...(rest as any)}
        ref={ref}
        disabled={isDisabled}
        role={intent === "listItem" ? "menuitem" : undefined}
        className={buttonVariants({
          asAnchor: as === "a",
          intent,
          formSize,
          iconOnly: !!iconOnly,
          block: !!block,
          alignContent,
          isActive,
          className,
          disabled: isDisabled,
        })}
      >
        {!!iconOnly ? (
          <>
            {isLoading ? (
              renderLoader
            ) : (
              <RenderIconOrElement
                iconOrElement={iconOnly}
                className={iconSize}
              />
            )}
          </>
        ) : (
          <>
            {iconLeft && !isLoading && (
              <RenderIconOrElement
                iconOrElement={iconLeft}
                className={iconSize}
              />
            )}
            {isLoading && renderLoader}
            {children}
            {iconRight && (
              <RenderIconOrElement
                iconOrElement={iconRight}
                className={iconSize}
              />
            )}
          </>
        )}
      </Wrapper>
    );
  },
);

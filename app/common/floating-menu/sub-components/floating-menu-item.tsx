import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentType,
  ReactNode,
} from "react";
import { Link, LinkProps } from "@remix-run/react";

import { Menu, MenuProps } from "../menu";
import { Icon } from "../../../common/icon/icon";
import { RenderIconOrElement } from "../../../common/icon/render-icon-or-element";
import { always, maybe } from "../../../utils/classname-helpers";
import { IconOrElement } from "../../../types/icons";

type FloatingMenuItemAsButton = {
  as?: "button";
} & ButtonHTMLAttributes<HTMLButtonElement>;
type FloatingMenuItemAsAnchor = {
  as?: "a";
} & AnchorHTMLAttributes<HTMLAnchorElement>;
type FloatingMenuItemAsLink = { as?: typeof Link } & LinkProps;

type FloatingMenuItemAs =
  | FloatingMenuItemAsButton
  | FloatingMenuItemAsAnchor
  | FloatingMenuItemAsLink;

type MenuItemProps = MenuProps &
  FloatingMenuItemAs & {
    text: string | ReactNode;
    iconLeft?: IconOrElement;
    iconRight?: IconOrElement;
    block?: boolean;
  };

export const FloatingMenuItem = React.forwardRef<
  HTMLButtonElement,
  MenuItemProps
>(({ text, iconLeft, iconRight, as = "button", block, ...props }, ref) => {
  const Wrapper: ComponentType<any> | string = as;
  const renderItem = ({ isSubMenu, ...refProps }: any) => (
    <Wrapper
      {...props}
      {...refProps}
      role="menuitem"
      className={always(
        "flex h-8 w-full cursor-pointer items-center justify-between gap-6 border-none bg-none px-4 text-grey-900",
        "dark:text-grey-10 dark:focus:bg-grey-750 dark:active:bg-grey-750",
        "focus:bg-grey-100 focus:outline-none active:bg-grey-100",
        maybe(block, "--block"),
      )}
    >
      <div className="flex items-center justify-between gap-4">
        {!!iconLeft && (
          <RenderIconOrElement iconOrElement={iconLeft} className="size-3.5" />
        )}
        {text}
      </div>
      {!!iconRight && !isSubMenu && (
        <RenderIconOrElement iconOrElement={iconRight} className="size-3.5" />
      )}
      {isSubMenu && <Icon className="size-3.5" name="angle-right" />}
    </Wrapper>
  );

  if (props.children) {
    return <Menu {...props} ref={ref} renderItem={renderItem} />;
  }
  return renderItem({ ref, isSubMenu: false });
});

FloatingMenuItem.displayName = "MenuItem";

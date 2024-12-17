import React, { isValidElement, ReactNode } from "react";

import { Icon, IconProps } from "../../common/icon/icon";
import { Icons } from "../../types/icons";
import { IconOrElement } from "../../types/icons";

export type RenderIconProps = Omit<IconProps, "name"> & {
  iconOrElement: IconOrElement;
};

export function RenderIconOrElement({
  iconOrElement,
  className,
}: RenderIconProps): ReactNode | null {
  if (typeof iconOrElement === "string") {
    return <Icon name={iconOrElement as Icons} className={className} />;
  }
  const iconProps = iconOrElement as IconProps;
  if (typeof iconProps === "object" && iconProps?.name) {
    return <Icon {...iconProps} className={className} />;
  }
  if (isValidElement(iconOrElement)) {
    return iconOrElement;
  }
  return null;
}

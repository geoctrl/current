import { forwardRef } from "react";
import { useFloatingParentNodeId, FloatingTree } from "@floating-ui/react";

import { Menu, MenuProps } from "./menu";

export type FloatingMenuProps = Omit<MenuProps, "label">;

export const FloatingMenu = forwardRef<HTMLButtonElement, FloatingMenuProps>(
  function FloatingMenu(props, ref) {
    const parentId = useFloatingParentNodeId();

    if (parentId == null) {
      return (
        <FloatingTree>
          <Menu {...props} ref={ref} />
        </FloatingTree>
      );
    }

    return <Menu {...props} ref={ref} />;
  },
);

FloatingMenu.displayName = "Menu";

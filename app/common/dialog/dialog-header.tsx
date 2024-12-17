import React, { ReactNode, CSSProperties } from "react";
import { Button } from "../button/button";
import { useDialogContext } from "./dialog-context";
import { formSizes } from "../../types/form-sizes";
import { always, toggle } from "../../utils/classname-helpers";

type DialogHeaderProps = {
  className?: string;
  title: string;
  style?: CSSProperties;
  description?: string;
  actions?: ReactNode;
  hideCloseButton?: boolean;
};

export function DialogHeader(props: DialogHeaderProps) {
  const { title, actions, description, hideCloseButton } = props;
  const { closeDialog } = useDialogContext();
  return (
    <>
      <div
        className={always(
          `flex justify-between min-h-${formSizes.sm + 2} w-full gap-4 pl-4 pr-4 pt-4`,
          toggle(!!description, "items-start", "items-center"),
        )}
      >
        <div className="flex items-center gap-4">
          <div>
            <div className="text-lg font-semibold">{title}</div>
            {description && (
              <div className="text-sm opacity-50">{description}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {actions}
          {!hideCloseButton && (
            <Button
              onClick={() => closeDialog()}
              iconOnly="xmark"
              intent="tertiary"
              formSize="sm"
            />
          )}
        </div>
      </div>
    </>
  );
}

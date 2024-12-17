import React, { ReactNode, CSSProperties } from "react";

type DialogFooterProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function DialogFooter(props: DialogFooterProps) {
  const { children } = props;
  return (
    <div className="flex items-center justify-end gap-4 border-t p-4 app-border">
      {children}
    </div>
  );
}

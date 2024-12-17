import React, { ReactNode, CSSProperties } from "react";

type DialogBodyProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function DialogBody(props: DialogBodyProps) {
  const { children } = props;
  return <div className="p-4">{children}</div>;
}

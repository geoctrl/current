import { ReactNode, CSSProperties } from "react";
import { always, maybe } from "../../utils/classname-helpers";
import { TabsContext } from "../../common/tabs/tabs-context";

type TabsProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  border?: boolean;
  onChange?: (value: unknown) => void;
  value?: unknown;
  block?: boolean;
};

export function Tabs(props: TabsProps) {
  const {
    children,
    className,
    style,
    border,
    value,
    onChange,
    block = false,
  } = props;
  return (
    <div
      style={style}
      className={always(
        className,
        "flex items-center border-b px-4 app-border",
        maybe(border, "border-b app-border"),
      )}
    >
      <TabsContext.Provider value={{ value, onChange, block }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
}

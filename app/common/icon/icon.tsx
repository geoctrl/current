import { ForwardedRef, forwardRef, SVGAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { Icons } from "../../types/icons";

export type IconProps = SVGAttributes<SVGSVGElement> & {
  name?: Icons;
};

export const Icon = forwardRef(function Icon(
  props: IconProps,
  ref: ForwardedRef<any>,
) {
  const { name, className, fill, style, ...rest } = props;

  return (
    <svg
      ref={ref}
      className={twMerge("inline-block size-5 fill-current", className)}
      style={{
        flexShrink: 0,
        ...(fill ? { fill } : {}),
        ...(style || {}),
      }}
      viewBox="0 0 24 24"
      {...rest}
    >
      <use href={`#${name}`} xlinkHref={`#${name}`} />
    </svg>
  );
});

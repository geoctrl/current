export const always = (...args: (string | undefined)[]): string => {
  return args.filter(Boolean).join(" ");
};

export const maybe = (
  enabled: boolean | undefined | null,
  ...className: string[]
): string => {
  return enabled ? className.join(" ") : "";
};

export const toggle = (
  enabled: boolean | undefined | null,
  className1: string | string[],
  className2: string | string[],
): string => {
  const one = Array.isArray(className1) ? className1.join(" ") : className1;
  const two = Array.isArray(className2) ? className2.join(" ") : className2;
  return enabled ? one : two;
};

export { always as a, maybe as m, toggle as t };

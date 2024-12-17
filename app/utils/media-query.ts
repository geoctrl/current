import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { isServer } from "./is-client";
import { EventBus } from "./event-bus";

const fullConfig = resolveConfig(tailwindConfig);
const screenSizes = fullConfig.theme.screens;

export type MediaQueryScreenSize = keyof typeof screenSizes;
export type MediaQueryState = Record<MediaQueryScreenSize, boolean>;

const serverScreenSizes = {
  sm: true,
  md: true,
  lg: true,
  xl: false,
  "2xl": false,
};

const initializeMediaQueryState = (): MediaQueryState => {
  if (isServer()) return serverScreenSizes;
  const queries = Object.keys(screenSizes).map((size) => ({
    size: size as MediaQueryScreenSize,
    query: `(min-width: ${screenSizes[size as MediaQueryScreenSize]})`,
  }));

  return queries.reduce((acc, { size, query }) => {
    acc[size] = window.matchMedia(query).matches;
    return acc;
  }, {} as MediaQueryState);
};

const mediaQueryState = initializeMediaQueryState();
const getMediaQueryState = () => mediaQueryState;
const mediaQueryEventBus = new EventBus<MediaQueryState>();

// Update media query state and emit changes
const handleChange = () => {
  if (isServer()) return;

  const queries = Object.keys(screenSizes).map((size) => ({
    size: size as MediaQueryScreenSize,
    query: `(min-width: ${screenSizes[size as MediaQueryScreenSize]})`,
  }));

  const newState = queries.reduce((acc, { size, query }) => {
    acc[size] = window.matchMedia(query).matches;
    return acc;
  }, {} as MediaQueryState);

  // Emit the new state via the EventBus
  mediaQueryEventBus.emit(newState);
};

// Attach listeners to each media query
const queries = Object.keys(screenSizes).map(
  (size) => `(min-width: ${screenSizes[size as MediaQueryScreenSize]})`,
);
queries.forEach((query) => {
  if (isServer()) return;
  const mql = window.matchMedia(query);
  mql.addEventListener("change", handleChange);
});

export { mediaQueryEventBus, screenSizes, getMediaQueryState };

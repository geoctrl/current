import { useState, useEffect } from "react";
import {
  mediaQueryEventBus,
  getMediaQueryState,
  MediaQueryScreenSize,
} from "../utils/media-query";

export function useMediaQuery(
  ...sizes: MediaQueryScreenSize[]
): Partial<Record<MediaQueryScreenSize, boolean>> {
  const [matches, setMatches] = useState<
    Partial<Record<MediaQueryScreenSize, boolean>>
  >(() => {
    return sizes.reduce(
      (acc, size) => {
        acc[size] = getMediaQueryState()[size];
        return acc;
      },
      {} as Partial<Record<MediaQueryScreenSize, boolean>>,
    );
  });

  useEffect(() => {
    const subscription = mediaQueryEventBus.on((newState) => {
      const hasChanged = sizes.some((size) => matches[size] !== newState[size]);
      if (!hasChanged) return;
      setMatches(
        sizes.reduce(
          (acc, size) => {
            acc[size] = newState[size];
            return acc;
          },
          {} as Partial<Record<MediaQueryScreenSize, boolean>>,
        ),
      );
    });

    return () => {
      subscription.remove();
    };
  }, [sizes, matches]);

  return matches;
}

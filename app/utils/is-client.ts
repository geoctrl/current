export function isClient() {
  return typeof window !== "undefined";
}

export function isServer() {
  return typeof window === "undefined";
}

export function getLocalStorage() {
  if (isClient()) {
    return window.localStorage;
  }
}

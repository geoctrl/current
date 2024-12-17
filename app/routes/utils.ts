export function stringToArray(str: string) {
  return str
    .trim()
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);
}

export function parseEachThing(str: string) {
  const parser = new DOMParser();

  const doc = parser.parseFromString(str, "text/html");
  const els = doc.documentElement.querySelectorAll("style, script, svg, link");
  els.forEach((el) => {
    el.remove();
  });
  return doc.documentElement.outerHTML;
}

export function getUrlHostname(urlStr: string) {
  const url = new URL(urlStr);
  return url.hostname;
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

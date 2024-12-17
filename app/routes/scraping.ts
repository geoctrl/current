import { API_TOKEN } from "./api-token";
const BASE_URL = "https://app.scrapingbee.com/api/v1/";
const MILLIS_TO_WAIT = 3000;

/**
 * Fetches and processes a single URL using the ScrapingBee API.
 * @param url - The URL to fetch.
 * @returns A Promise resolving to the response text.
 */
async function fetchAndProcessUrl(url: string): Promise<string> {
  const encodedUrl = encodeURIComponent(url);
  const fullUrl = `${BASE_URL}?api_key=${API_TOKEN}&url=${encodedUrl}&wait=${MILLIS_TO_WAIT}`;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Error fetching ${url}: ${(error as Error).message}`);
  }
}

/**
 * Scrapes multiple URLs concurrently with a concurrency limit.
 * @param urls - The array of URLs to scrape.
 * @param concurrencyLimit - The maximum number of concurrent workers.
 * @returns A Promise resolving to an array of results.
 */
async function scrapeUrls(
  urls: string[],
  concurrencyLimit: number = 5,
): Promise<string[]> {
  const results: string[] = [];
  const failedUrls: string[] = [];
  let currentIndex = 0;

  // Mutex-like lock to ensure thread-safe access to currentIndex
  const indexLock = new Promise<void>((resolve) => resolve());

  async function worker() {
    while (true) {
      let url: string | undefined;

      // Lock access to currentIndex
      await indexLock.then(() => {
        if (currentIndex < urls.length) {
          url = urls[currentIndex++];
        }
      });

      if (!url) break; // No more URLs to process

      try {
        const result = await fetchAndProcessUrl(url);
        results.push(result);
      } catch (error) {
        console.error(`Error processing URL ${url}:`, error);
        failedUrls.push(url);
      }
    }
  }

  // Start workers
  const tasks = Array.from({ length: concurrencyLimit }, () => worker());
  await Promise.all(tasks);

  if (failedUrls.length > 0) {
    console.warn(`Some URLs failed to scrape:`, failedUrls);
  }

  return results;
}

/**
 * Main function to scrape URLs.
 * @param urls - An array of URLs.
 * @returns A Promise resolving to the scraped results.
 */
export async function runScraper(urls: string[]): Promise<string[]> {
  try {
    return await scrapeUrls(urls);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    throw error;
  }
}

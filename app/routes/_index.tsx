import React, { useState } from "react";
import { Button, Icon, Input } from "../common";
import {
  getUrlHostname,
  isValidUrl,
  parseEachThing,
  stringToArray,
} from "./utils";
import { runScraper } from "./scraping";
import { API_TOKEN } from "./api-token";
import { useSetApiTokenDialog } from "./use-set-api-token-dialog";

export default function () {
  const [urls, setUrls] = useState("");
  const [working, setWorking] = useState(false);
  const setApiTokenDialog = useSetApiTokenDialog();
  const [apiToken, setApiToken] = useState(API_TOKEN);

  const urlArray = stringToArray(urls);
  const hasUrls = !!urlArray.length;
  const canGo =
    hasUrls &&
    urlArray.reduce((acc, url) => acc && isValidUrl(url), true) &&
    apiToken;

  async function go() {
    setWorking(true);
    const results = await runScraper(urlArray);
    const parsedDocs = results.map(parseEachThing);
    const blob = new Blob([parsedDocs.join("\n\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${getUrlHostname(urlArray[0])}.txt`;
    a.click();
    setWorking(false);
  }

  return (
    <div>
      <div className="flex h-[5rem] items-center border-b app-border">
        <div className="app-container-padding">
          <div className="flex select-none items-center gap-3 text-lg font-bold">
            <Icon name="water" className="size-6 text-primary-500" /> Current
          </div>
        </div>
      </div>
      <div className="py-4 app-container-padding">
        <div className="mb-4">
          <Input
            label="URL"
            id="url"
            value={urls}
            onChange={setUrls}
            autoComplete="false"
          />
        </div>
        <div className="mb-4 flex gap-4">
          <Button
            onClick={async () => {
              if (await setApiTokenDialog()) {
                setApiToken(API_TOKEN);
              }
            }}
            iconLeft={apiToken ? "circle-check-solid" : undefined}
          >
            Set API Token
          </Button>
          <Button
            intent="primary"
            onClick={go}
            isLoading={working}
            disabled={!canGo}
          >
            Go
          </Button>
        </div>

        <div>
          {hasUrls && (
            <div className="mb-2 font-bold">Urls being processed:</div>
          )}
          {urlArray.map((url, i) => (
            <div key={i} className="align-baseline">
              <span className="opacity-50">{i + 1}.</span> {url}{" "}
              {isValidUrl(url) ? null : (
                <span className="ml-2 text-xs text-puce-500">
                  (Invalid URL)
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

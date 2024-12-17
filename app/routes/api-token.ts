import { getLocalStorage } from "../utils/is-client";

export let API_TOKEN = getLocalStorage()?.getItem("API_TOKEN") || "";

export function updateApiToken(token: string) {
  API_TOKEN = token;
  getLocalStorage()?.setItem("API_TOKEN", token);
}

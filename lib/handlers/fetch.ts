import { RequestError } from "@/lib/http-errors";
import logger from "@/lib/logger";
import { ActionResponse } from "@/types";

import handleError from "./error";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

function isError(err: unknown): err is Error {
  return err instanceof Error;
}

const fetchHandler = async <T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> => {
  const {
    timeout = 100000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);

    clearTimeout(id);

    if (!response.ok) {
      throw new RequestError(response.status, `HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown error");

    if (error.name === "AbortError") {
      logger.warn(`Request to ${url} timed out`);
    } else {
      logger.error(`Error fetching ${url}: ${error.message}`);
    }

    return handleError(error) as ActionResponse<T>;
  }
};

export default fetchHandler;

import { xanFetchCore } from "./core";
import { XanFetchOptions } from "./types";
import { addPendingRequest, getRequestKey, removePendingRequest } from "./utils/duplication";

async function xanFetch(url: string, options: XanFetchOptions = {}): Promise<Response> {
  options = {
    method: 'GET',
    headers: {},
    body: null,
    timeout: 0,
    params: {},
    onProgress: undefined,
    onDownloadProgress: undefined,
    signal: undefined,
    withCredentials: false,
    responseType: 'response',
    deduplicate: false,
    ...options,
  }
  const key = getRequestKey(url, options);
  if (options.deduplicate) {
    const controller = new AbortController();
    options.signal = controller.signal;
    addPendingRequest(key, controller);
  }
  const res = await xanFetchCore(url, options);
  if (options.deduplicate) {
    removePendingRequest(key);
  }
  return res
}

export default xanFetch;
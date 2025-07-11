import { buildBody } from './utils/buildBody';
import { parseHeaders } from './utils/parseHeaders';
import { XanFetchOptions } from './types';
import { buildUrl } from './utils/BuildUrl';
import { XanFetchError } from './utils/error';

export async function xanFetchCore(
   inputUrl: string,
   options: XanFetchOptions = {}
): Promise<Response> {
   return new Promise((resolve, reject) => {
      const url = buildUrl(inputUrl, options.params);
      const method = (options.method || 'GET').toUpperCase();
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.responseType = 'blob';

      if (options.withCredentials !== undefined) {
         xhr.withCredentials = options.withCredentials;
      }

      if (options.timeout) {
         xhr.timeout = options.timeout;
      }

      if (options.headers) {
         for (const [key, value] of Object.entries(options.headers)) {
            xhr.setRequestHeader(key, value);
         }
      }

      if (xhr.upload && options.onProgress) {
         xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
               options.onProgress!((event.loaded / event.total) * 100);
            }
         };
      }

      if (options.onDownloadProgress) {
         xhr.onprogress = (event) => {
            if (event.lengthComputable) {
               options.onDownloadProgress!((event.loaded / event.total) * 100);
            }
         };
      }

      xhr.onload = async () => {
         const headers = parseHeaders(xhr.getAllResponseHeaders());

         const response = new Response(xhr.response, {
            status: xhr.status,
            statusText: xhr.statusText,
            headers,
         });

         let d = null
         switch (options.responseType) {
            case 'response':
               d = response;
               break;
            case 'json':
               d = await response.json();
               break;
            case 'text':
               d = await response.text();
               break;
            case 'blob':
               d = await response.blob();
               break;
            case 'arrayBuffer':
               d = await response.arrayBuffer();
               break;
            case 'document':
               d = await response.text();
               const parser = new DOMParser();
               d = parser.parseFromString(d, 'text/html');
               break;
            default:
               d = response;
         }
         resolve(d);
      };

      xhr.onerror = () => {
         reject(
            new XanFetchError('Network error', {
               isNetworkError: true,
            })
         );
      };

      xhr.ontimeout = () => {
         reject(
            new XanFetchError('Request timed out', {
               isTimeout: true,
            })
         );
      };

      if (options.signal) {
         options.signal.addEventListener('abort', () => {
            xhr.abort();
            reject(
               new XanFetchError('Request aborted', {
                  isAbort: true,
               })
            );
         });
      }

      let bodyToSend: XMLHttpRequestBodyInit | null = null;
      if (method !== 'GET' && method !== 'HEAD') {
         bodyToSend = buildBody(options.body, options.headers);
      }

      xhr.send(bodyToSend);
   });
}

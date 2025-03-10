export type XanFetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: BodyInit | null;
  timeout?: number;
  onProgress?: (progress: number) => void;
  onDownloadProgress?: (progress: number) => void;
  signal?: AbortSignal;
  withCredentials?: boolean;
};

function xanFetch(url: string, options: XanFetchOptions = {}): Promise<Response> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method || 'GET', url, true);

    // Set withCredentials if specified
    if (options.withCredentials !== undefined) {
      xhr.withCredentials = options.withCredentials;
    }

    // Set request headers
    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });
    }

    // Handle timeouts
    if (options.timeout) {
      xhr.timeout = options.timeout;
    }

    // Handle progress
    if (options.onProgress && xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && options?.onProgress) {
          options.onProgress((event.loaded / event.total) * 100);
        }
      };
    }

    // Handle download progress
    if (options.onDownloadProgress && xhr) {
      xhr.onprogress = (event) => {
        if (event.lengthComputable && options?.onDownloadProgress) {
          options.onDownloadProgress((event.loaded / event.total) * 100);
        }
      };
    }

    // Handle response
    xhr.onload = () => {
      resolve(
        new Response(xhr.response, {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: new Headers(xhr.getAllResponseHeaders().split('\r\n').reduce((acc, line) => {
            const [key, value] = line.split(': ');
            if (key) acc[key] = value;
            return acc;
          }, {} as Record<string, string>)),
        })
      );
    };

    // Handle errors
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.ontimeout = () => reject(new Error('Request timed out'));

    // Handle abort
    if (options.signal) {
      options.signal.addEventListener('abort', () => {
        xhr.abort();
        reject(new Error('Request aborted'));
      });
    }
    xhr.responseType = 'blob';
    xhr.send(options.body as XMLHttpRequestBodyInit | Document | null | undefined);
  });
}

export default xanFetch;
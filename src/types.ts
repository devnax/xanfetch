export type XanfetchParams = Record<string, string | number | boolean | null | undefined>;
export type XanfetchBody = BodyInit | object | null | undefined;
export type XanfetchHeaders = Record<string, string>;

export type XanFetchOptions = {
   method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
   headers?: XanfetchHeaders;
   body?: XanfetchBody;
   timeout?: number;
   params?: XanfetchParams;
   onProgress?: (progress: number) => void;
   onDownloadProgress?: (progress: number) => void;
   signal?: AbortSignal;
   withCredentials?: boolean;
   responseType?: 'response' | 'json' | 'text' | 'blob' | 'arrayBuffer' | 'document';
   deduplicate?: boolean;
};
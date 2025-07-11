const pendingRequests = new Map<string, AbortController>();

export function getRequestKey(url: string, options: any): string {
   const method = options.method?.toUpperCase() || 'GET';
   const params = options.params ? JSON.stringify(options.params) : '';
   const body = options.body ? JSON.stringify(options.body) : '';
   return `${method}::${url}::${params}::${body}`;
}

export function addPendingRequest(key: string, controller: AbortController) {
   if (pendingRequests.has(key)) {
      // Abort previous request
      pendingRequests.get(key)!.abort();
   }
   pendingRequests.set(key, controller);
}

export function removePendingRequest(key: string) {
   pendingRequests.delete(key);
}

export class XanFetchError extends Error {
   status?: number;
   response?: Response;
   isNetworkError?: boolean;
   isTimeout?: boolean;
   isAbort?: boolean;

   constructor(message: string, options: Partial<XanFetchError> = {}) {
      super(message);
      Object.assign(this, options);
      this.name = 'XanFetchError';
   }
}

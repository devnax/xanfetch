import { XanfetchBody, XanfetchHeaders } from "../types";


export function buildBody(body: XanfetchBody, headers?: XanfetchHeaders): XMLHttpRequestBodyInit | null {
   if (body == null) return null;
   // If body is a plain object (not FormData), stringify if JSON
   if (
      typeof body === 'object' &&
      !(body instanceof FormData) &&
      !(body instanceof Blob) &&
      !(body instanceof ArrayBuffer) &&
      !(body instanceof URLSearchParams)
   ) {
      const contentType =
         headers?.['Content-Type'] || headers?.['content-type'] || '';

      if (!contentType || contentType.includes('application/json')) {
         return JSON.stringify(body);
      }
   }

   return body as XMLHttpRequestBodyInit;
}

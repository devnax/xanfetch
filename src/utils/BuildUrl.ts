import { XanfetchParams } from "../types";

export function buildUrl(baseUrl: string, params?: XanfetchParams): string {
   if (!params) return baseUrl;
   const queryString = Object.entries(params)
      .filter(([, value]) => value !== null && value !== undefined)
      .map(
         ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      )
      .join('&');

   if (!queryString) return baseUrl;
   return baseUrl + (baseUrl.includes('?') ? '&' : '?') + queryString;
}

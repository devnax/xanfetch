export function parseHeaders(rawHeaders: string): Headers {
   const headers = new Headers();

   rawHeaders
      .trim()
      .split('\r\n')
      .forEach((line) => {
         const [key, ...vals] = line.split(': ');
         if (key) headers.append(key, vals.join(': '));
      });

   return headers;
}

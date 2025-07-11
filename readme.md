# 📦 XanFetch - Advanced XMLHttpRequest Client

**XanFetch** is a lightweight, extensible HTTP client built on top of `XMLHttpRequest`, designed for modern web applications that need advanced features like:

* Query param injection
* Automatic body serialization
* Upload/download progress tracking
* Response type control
* Abort, timeout, and deduplication support

---

## 🚀 Installation

```bash
npm install xanfetch
```

Or copy the modular files into your own project structure.

---

## ✨ Features

* ✅ Smart query parameter injection
* ✅ Auto JSON stringification for body
* ✅ Upload/Download progress handlers
* ✅ Abort and timeout support
* ✅ Deduplication for identical in-flight requests
* ✅ Flexible `responseType`: `json`, `blob`, `text`, etc.

---

## 🛠 Usage

```ts
import xanFetch from 'xanfetch';

const response = await xanFetch('https://api.example.com/data', {
  method: 'POST',
  params: { userId: 123 },
  body: { name: 'Naxrul' },
  headers: { 'Authorization': 'Bearer token' },
  responseType: 'json',
  onProgress: (p) => console.log('Upload:', p),
  onDownloadProgress: (p) => console.log('Download:', p),
  timeout: 5000,
  deduplicate: true
});

console.log(response); // response data (JSON parsed)
```

---

## 🧩 API

### xanFetch(url: string, options?: XanFetchOptions): Promise<any>

### XanFetchOptions

| Option               | Type                                                                      | Description                                             |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------- |
| `method`             | `'GET' \| 'POST' \| 'PUT' \| 'DELETE' \| 'PATCH' \| 'HEAD'`               | HTTP method to use (default: `GET`)                     |
| `headers`            | `Record<string, string>`                                                  | Optional request headers                                |
| `body`               | `BodyInit \| object \| null \| undefined`                                 | Request body; plain objects are auto-serialized as JSON |
| `timeout`            | `number`                                                                  | Timeout in milliseconds before aborting the request     |
| `params`             | `Record<string, string \| number \| boolean \| null \| undefined>`        | Query parameters to append to the URL                   |
| `onProgress`         | `(progress: number) => void`                                              | Upload progress callback (0-100)                        |
| `onDownloadProgress` | `(progress: number) => void`                                              | Download progress callback (0-100)                      |
| `signal`             | `AbortSignal`                                                             | Signal for request cancellation                         |
| `withCredentials`    | `boolean`                                                                 | Whether to send cookies and auth headers                |
| `responseType`       | `'response' \| 'json' \| 'text' \| 'blob' \| 'arrayBuffer' \| 'document'` | Determines how the response is parsed/returned          |
| `deduplicate`        | `boolean`                                                                 | If true, cancels previous identical in-flight request   |

## 🧠 Tips

* `GET`/`HEAD` methods will ignore `body`
* Use `params` for safe URL query construction
* Use `AbortController` to cancel long requests
* Enable `deduplicate` to auto-abort previous identical request

---

## 📚 License

MIT © Naxrul Ahmed

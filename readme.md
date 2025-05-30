# xanfetch

**xanfetch** is a lightweight and flexible wrapper around `XMLHttpRequest`, designed for modern JavaScript and TypeScript applications. It provides a promise-based API with extended support for timeouts, progress tracking, abort signals, and credentials—making it ideal for precise control over HTTP requests.

---

## 🚀 Features

- ✅ All HTTP methods supported
- ⏱ Timeout support
- 📤 Upload progress tracking
- 📥 Download progress tracking
- ❌ Abortable requests via `AbortController`
- 🔐 Credentials support (`withCredentials`)
- 🔧 Fully typed with TypeScript

---

## 📦 Installation

```bash
npm install xanfetch
```

# 🛠 Usage

```ts
import xanfetch from 'xanfetch';

const controller = new AbortController();

xanfetch({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ message: 'Hello World' }),
  timeout: 5000,
  onProgress: (progress) => console.log(`Upload: ${progress}%`),
  onDownloadProgress: (progress) => console.log(`Download: ${progress}%`),
  signal: controller.signal,
  withCredentials: true,
})
  .then((response) => {
    console.log('Response:', response);
  })
  .catch((error) => {
    console.error('Request failed:', error);
  });

```


# 📄 API

| Option               | Type                         | Description                                                                 |
| -------------------- | ---------------------------- | --------------------------------------------------------------------------- |
| `method`             | `string`                     | HTTP method (GET, POST, etc). Defaults to `"GET"`.                          |
| `headers`            | `Record<string, string>`     | HTTP request headers.                                                       |
| `body`               | `BodyInit \| null`           | Request body. Can be `FormData`, `Blob`, `string`, etc.                     |
| `timeout`            | `number`                     | Request timeout in milliseconds.                                            |
| `onProgress`         | `(progress: number) => void` | Callback for upload progress (0–100).                                       |
| `onDownloadProgress` | `(progress: number) => void` | Callback for download progress (0–100).                                     |
| `signal`             | `AbortSignal`                | Used to abort the request externally.                                       |
| `withCredentials`    | `boolean`                    | Whether to include credentials (cookies, auth headers). Defaults to `false` |


# ✅ Type Definitions

```ts
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

```

# 🧪 Example: Aborting a Request

```ts
const controller = new AbortController();

setTimeout(() => controller.abort(), 3000); // abort after 3s

xanfetch({
  url: '/api/data',
  signal: controller.signal,
})
  .then(res => console.log('Response:', res))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.warn('Request was aborted');
    } else {
      console.error('Request failed:', err);
    }
  });
```


# 💡 Notes
- Progress values are emitted as percentage (0 to 100).
- Aborting a request via AbortController will reject the promise with a DOMException (AbortError).
- The request will also timeout if it exceeds the specified timeout duration.

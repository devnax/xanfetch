import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import xanfetch from './src';

const load = async () => {
  const data = new TextEncoder().encode("Hello, this is binary data!");
  const formdata = new FormData()
  formdata.append('file', new Blob([data], { type: 'application/octet-stream' }), 'example.txt')

  const res = await xanfetch('http://localhost:5000/wp.zip', {
    body: formdata,
    headers: {
    },
    onDownloadProgress(progress) {
      console.log(progress);
    },
  });
  const blob = await res.blob()
  const buffer = await blob.arrayBuffer()
  const text = new TextDecoder().decode(buffer);
}

const App = () => {
  useEffect(() => {
    load()
  }, []);
  return (
    <div style={{ fontFamily: 'monospace,math, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to makepack CLI!</h1>
      <p>Edit <code>index.tsx</code> and save to reload.</p>
      <a
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#61dafb', textDecoration: 'none' }}
      >
        Learn React
      </a>
      <div style={{ marginTop: "50px" }}>
      </div>
    </div>
  );
}
const rootEle = document.getElementById('root')
if (rootEle) {
  const root = createRoot(rootEle);
  root.render(<App />);
}

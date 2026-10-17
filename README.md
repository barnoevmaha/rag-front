# RAG Sandbox — Frontend

Web UI for [rag-back](https://github.com/barnoevmaha/rag-back): drag a PDF, DOCX or TXT in,
watch it get indexed, then chat with it. Every answer shows the source chunks it was built from.

## Pages

- **Upload** — dropzone with progress, file validation
- **Documents** — indexed documents with status badges, delete
- **Chat** — conversation per document, typing indicator, source panel under each answer
- **Settings** — chunk size, overlap and model as served by the backend

## Stack

React 18, Vite, React Router 6, Axios, `marked` for rendering answers. Served by nginx in Docker
(`nginx.conf.template` proxies `/api` to the backend).

## Run

```bash
npm install
npm run dev            # http://localhost:5173, /api proxied to localhost:8000
```

Production: `docker build -t rag-front .` and set `BACKEND_URL` for the nginx proxy.

# GestaPYME - Desktop (Electron) prototype

This repository contains a prototype to turn the existing `GestionPYME (6).html` UI into an Electron desktop app with a local API (Express) and SQLite database.

Quick start (dev):

1. Install dependencies:

```bash
npm install
```

2. In one terminal start the API server:

```bash
npm run server
```

3. In another terminal start the Electron app:

```bash
npm run electron
```

Notes:
- The server runs on `http://localhost:3000` and exposes simple REST endpoints under `/api`.
- The renderer can call the API via `window.GestAPI` (see `src/renderer/js/api.js`).
- To build a Windows installer run `npm run package` after installing `electron-builder`.

Next steps I can take for you:
- Patch `GestionPYME (6).html` to replace local state operations with `window.GestAPI` calls.
- Add a small `preload.js` to expose safe APIs to the renderer via `contextBridge`.
- Implement migrations/seed data and unit tests.
- Configure `electron-builder` signing and NSIS options for a polished installer.

Tell me which of the next steps you want me to do now.
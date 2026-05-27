const { contextBridge } = require('electron');

// Exponer namespace vacío por ahora; la API del servidor se inyecta desde `src/renderer/js/api.js`
contextBridge.exposeInMainWorld('electronAPI', {});

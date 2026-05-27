(function(){
  const BASE = 'http://localhost:3000/api';
  window.GestAPI = {
    ventas: {
      list: async () => (await fetch(`${BASE}/ventas`)).json(),
      create: async (v) => (await fetch(`${BASE}/ventas`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(v) })).json(),
      delete: async (id) => (await fetch(`${BASE}/ventas/${id}`, { method: 'DELETE' })).json()
    },
    egresos: {
      list: async () => (await fetch(`${BASE}/egresos`)).json(),
      create: async (e) => (await fetch(`${BASE}/egresos`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(e) })).json(),
      delete: async (id) => (await fetch(`${BASE}/egresos/${id}`, { method: 'DELETE' })).json()
    },
    productos: {
      list: async () => (await fetch(`${BASE}/productos`)).json(),
      create: async (p) => (await fetch(`${BASE}/productos`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(p) })).json(),
      update: async (id,p) => (await fetch(`${BASE}/productos/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(p) })).json(),
      delete: async (id) => (await fetch(`${BASE}/productos/${id}`, { method: 'DELETE' })).json()
    },
    boletas: {
      create: async (b) => (await fetch(`${BASE}/boletas`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(b) })).json()
    },
    perfil: {
      get: async () => (await fetch(`${BASE}/perfil`)).json(),
      save: async (p) => (await fetch(`${BASE}/perfil`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(p) })).json()
    }
  };
})();

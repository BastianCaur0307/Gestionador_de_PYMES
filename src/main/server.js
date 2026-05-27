const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const DB_PATH = path.join(DATA_DIR, 'db.sqlite');
const db = new sqlite3.Database(DB_PATH);

// Inicializar tablas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS ventas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT,
    total REAL,
    cliente TEXT,
    items TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS egresos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT,
    monto REAL,
    categoria TEXT,
    descripcion TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    precio REAL,
    stock INTEGER,
    meta TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS boletas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    venta_id INTEGER,
    fecha TEXT,
    data TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS perfil (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    rut TEXT,
    direccion TEXT,
    telefono TEXT,
    email TEXT
  )`);
});

// Rutas básicas
app.get('/api/ventas', (req, res) => {
  db.all('SELECT * FROM ventas ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/ventas', (req, res) => {
  const { fecha, total, cliente, items } = req.body;
  const stmt = db.prepare('INSERT INTO ventas (fecha, total, cliente, items) VALUES (?, ?, ?, ?)');
  stmt.run(fecha, total, cliente, JSON.stringify(items || []), function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

app.delete('/api/ventas/:id', (req, res) => {
  db.run('DELETE FROM ventas WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Egresos
app.get('/api/egresos', (req, res) => {
  db.all('SELECT * FROM egresos ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
app.post('/api/egresos', (req, res) => {
  const { fecha, monto, categoria, descripcion } = req.body;
  const stmt = db.prepare('INSERT INTO egresos (fecha, monto, categoria, descripcion) VALUES (?, ?, ?, ?)');
  stmt.run(fecha, monto, categoria, descripcion, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});
app.delete('/api/egresos/:id', (req, res) => {
  db.run('DELETE FROM egresos WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Productos
app.get('/api/productos', (req, res) => {
  db.all('SELECT * FROM productos ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
app.post('/api/productos', (req, res) => {
  const { nombre, precio, stock, meta } = req.body;
  const stmt = db.prepare('INSERT INTO productos (nombre, precio, stock, meta) VALUES (?, ?, ?, ?)');
  stmt.run(nombre, precio, stock || 0, meta || '', function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});
app.put('/api/productos/:id', (req, res) => {
  const { nombre, precio, stock, meta } = req.body;
  db.run('UPDATE productos SET nombre = ?, precio = ?, stock = ?, meta = ? WHERE id = ?', [nombre, precio, stock, meta, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changed: this.changes });
  });
});
app.delete('/api/productos/:id', (req, res) => {
  db.run('DELETE FROM productos WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Boletas
app.post('/api/boletas', (req, res) => {
  const { venta_id, fecha, data } = req.body;
  const stmt = db.prepare('INSERT INTO boletas (venta_id, fecha, data) VALUES (?, ?, ?)');
  stmt.run(venta_id, fecha, JSON.stringify(data || {}), function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Perfil (singleton)
app.get('/api/perfil', (req, res) => {
  db.get('SELECT * FROM perfil ORDER BY id DESC LIMIT 1', [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {});
  });
});
app.post('/api/perfil', (req, res) => {
  const { nombre, rut, direccion, telefono, email } = req.body;
  const stmt = db.prepare('INSERT INTO perfil (nombre, rut, direccion, telefono, email) VALUES (?, ?, ?, ?, ?)');
  stmt.run(nombre, rut, direccion, telefono, email, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});

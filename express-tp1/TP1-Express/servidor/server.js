const express = require("express");
const path = require("path");

const app = express();

// Ruta a los archivos estáticos (build de React)
app.use(express.static(path.join(__dirname, "../dist")));

// Ruta específica para el index
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// Ruta para manejar todas las demás solicitudes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
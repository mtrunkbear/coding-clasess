const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Sirve archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

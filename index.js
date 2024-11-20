const express = require('express');
const bodyParser = require('body-parser');

// Importar las funciones de las rutas
const askRoute = require('./ask');
const drawRoute = require('./draw');

// Crear la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Usar body-parser para manejar solicitudes JSON
app.use(bodyParser.json());

// Ruta principal para comprobar que el servidor está activo
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Herc.ai!');
});

// Ruta para consultas GET (para obtener respuestas con parámetros de consulta)
app.get('/ask', async (req, res) => {
  const question = req.query.question;
  const model = req.query.model || 'v3';  // Opción de modelo, si no se pasa, se usa 'v3'

  if (!question) {
    return res.status(400).json({ error: "La pregunta es obligatoria" });
  }

  try {
    const { Hercai } = require('hercai');
    const herc = new Hercai();
    const response = await herc.question({ model, content: question });
    return res.json({ reply: response.reply });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener respuesta de Herc.ai", details: error.message });
  }
});

// Ruta para la función de hacer preguntas (POST)
app.use('/ask', askRoute);

// Ruta para la función de generar imágenes (POST)
app.use('/draw', drawRoute);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

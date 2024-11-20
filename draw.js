const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { prompt, model = "v3" } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "El prompt es obligatorio" });
    }

    try {
      const response = await herc.drawImage({ model, prompt });
      return res.json({ imageUrl: response.url });
    } catch (error) {
      return res.status(500).json({ error: "Error al generar la imagen", details: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
};

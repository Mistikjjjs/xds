const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { question, model = "v3" } = req.body;

    if (!question) {
      return res.status(400).json({ error: "La pregunta es obligatoria" });
    }

    try {
      const response = await herc.question({ model, content: question });
      return res.json({ reply: response.reply });
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener respuesta de Herc.ai", details: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
};

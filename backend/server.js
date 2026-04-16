const express = require("express");
const axios = require("axios");
const sharp = require("sharp");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// (WEBP u otros → JPG)
app.post("/convert", async (req, res) => {
  try {
    const { url } = req.body;

    // Validación
    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Debes enviar una URL"
      });
    }

    // Descargar imagen
    const response = await axios({
      url,
      responseType: "arraybuffer",
      timeout: 10000
    });

    // a JPG con sharp
    const jpgBuffer = await sharp(response.data)
      .jpeg({ quality: 90 })
      .toBuffer();

    // Convertir a base64
    const base64 = `data:image/jpeg;base64,${jpgBuffer.toString("base64")}`;

    // Respuesta
    res.json({
      success: true,
      image: base64
    });

  } catch (error) {
    console.error("Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Error al procesar la imagen"
    });
  }
});

// Puerto (Render usa process.env.PORT)
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
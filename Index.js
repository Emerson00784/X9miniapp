const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(__dirname)); // Serve os arquivos HTML/CSS/JS

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 X9 Mini App rodando na porta ${PORT}`));

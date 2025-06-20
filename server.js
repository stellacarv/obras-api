const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();

// Importando rotas
const obraRoutes = require("./routes/obraRoutes");
const fiscalizacaoRoutes = require("./routes/fiscalizacaoRoutes");

// Inicializando o app
const app = express();

// Conectando ao banco de dados
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/obras", obraRoutes);
app.use("/api/fiscalizacoes", fiscalizacaoRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "API de Acompanhamento de Obras funcionando!" });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Erro interno do servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

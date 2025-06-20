const express = require("express");
const router = express.Router();
const fiscalizacaoController = require("../controllers/fiscalizacaoController");
const { body } = require("express-validator");

// Validações
const validarFiscalizacao = [
  body("data").isISO8601().withMessage("Data inválida"),
  body("status")
    .isIn(["em_andamento", "concluida", "atrasada", "suspensa"])
    .withMessage("Status inválido"),
  body("observacoes").notEmpty().withMessage("Observações são obrigatórias"),
  body("localizacao.latitude").isNumeric().withMessage("Latitude inválida"),
  body("localizacao.longitude").isNumeric().withMessage("Longitude inválida"),
  body("foto").notEmpty().withMessage("Foto é obrigatória"),
  body("obra").isMongoId().withMessage("ID da obra inválido"),
];

// Rotas
router.get("/", fiscalizacaoController.listarFiscalizacoes);
router.get("/:id", fiscalizacaoController.buscarFiscalizacao);
router.post("/", validarFiscalizacao, fiscalizacaoController.criarFiscalizacao);
router.put(
  "/:id",
  validarFiscalizacao,
  fiscalizacaoController.atualizarFiscalizacao
);
router.delete("/:id", fiscalizacaoController.deletarFiscalizacao);
router.get("/obra/:obraId", fiscalizacaoController.listarFiscalizacoesPorObra);

module.exports = router;

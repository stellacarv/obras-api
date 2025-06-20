const express = require("express");
const router = express.Router();
const obraController = require("../controllers/obraController");
const { body } = require("express-validator");

// Validações
const validarObra = [
  body("nome").notEmpty().withMessage("Nome é obrigatório"),
  body("responsavel").notEmpty().withMessage("Responsável é obrigatório"),
  body("data_inicio").isISO8601().withMessage("Data de início inválida"),
  body("data_fim").isISO8601().withMessage("Data de fim inválida"),
  body("localizacao.latitude").isNumeric().withMessage("Latitude inválida"),
  body("localizacao.longitude").isNumeric().withMessage("Longitude inválida"),
  body("descricao").notEmpty().withMessage("Descrição é obrigatória"),
  body("foto").notEmpty().withMessage("Foto é obrigatória"),
];

// Rotas
router.get("/", obraController.listarObras);
router.get("/:id", obraController.buscarObra);
router.post("/", validarObra, obraController.criarObra);
router.put("/:id", validarObra, obraController.atualizarObra);
router.delete("/:id", obraController.deletarObra);
router.post(
  "/:id/enviar-email",
  body("email").isEmail().withMessage("E-mail inválido"),
  obraController.enviarDetalhesPorEmail
);

module.exports = router;

const mongoose = require("mongoose");

const obraSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Nome da obra é obrigatório"],
      trim: true,
    },
    responsavel: {
      type: String,
      required: [true, "Responsável é obrigatório"],
      trim: true,
    },
    data_inicio: {
      type: Date,
      required: [true, "Data de início é obrigatória"],
    },
    data_fim: {
      type: Date,
      required: [true, "Data de fim é obrigatória"],
    },
    localizacao: {
      latitude: {
        type: Number,
        required: [true, "Latitude é obrigatória"],
      },
      longitude: {
        type: Number,
        required: [true, "Longitude é obrigatória"],
      },
    },
    descricao: {
      type: String,
      required: [true, "Descrição é obrigatória"],
      trim: true,
    },
    foto: {
      type: String,
      required: [true, "Foto é obrigatória"],
    },
  },
  {
    timestamps: true,
  }
);

// Índice para melhorar a performance de buscas
obraSchema.index({ nome: 1, responsavel: 1 });

module.exports = mongoose.model("Obra", obraSchema);

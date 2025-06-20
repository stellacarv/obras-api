const mongoose = require("mongoose");

const fiscalizacaoSchema = new mongoose.Schema(
  {
    data: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["em_andamento", "concluida", "atrasada", "suspensa"],
      default: "em_andamento",
    },
    observacoes: {
      type: String,
      required: [true, "Observações são obrigatórias"],
      trim: true,
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
    foto: {
      type: String,
      required: [true, "Foto é obrigatória"],
    },
    obra: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Obra",
      required: [true, "Referência à obra é obrigatória"],
    },
  },
  {
    timestamps: true,
  }
);

// Índices para melhorar a performance de buscas
fiscalizacaoSchema.index({ obra: 1, data: -1 });
fiscalizacaoSchema.index({ status: 1 });

module.exports = mongoose.model("Fiscalizacao", fiscalizacaoSchema);

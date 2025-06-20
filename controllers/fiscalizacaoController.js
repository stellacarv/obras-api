const Fiscalizacao = require("../models/Fiscalizacao");
const Obra = require("../models/Obra");

// Listar todas as fiscalizações
exports.listarFiscalizacoes = async (req, res) => {
  try {
    const fiscalizacoes = await Fiscalizacao.find()
      .populate("obra", "nome responsavel")
      .sort({ data: -1 });
    res.json(fiscalizacoes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao listar fiscalizações", error: error.message });
  }
};

// Buscar uma fiscalização específica
exports.buscarFiscalizacao = async (req, res) => {
  try {
    const fiscalizacao = await Fiscalizacao.findById(req.params.id).populate(
      "obra",
      "nome responsavel"
    );
    if (!fiscalizacao) {
      return res.status(404).json({ message: "Fiscalização não encontrada" });
    }
    res.json(fiscalizacao);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar fiscalização", error: error.message });
  }
};

// Criar nova fiscalização
exports.criarFiscalizacao = async (req, res) => {
  try {
    // Verifica se a obra existe
    const obra = await Obra.findById(req.body.obra);
    if (!obra) {
      return res.status(404).json({ message: "Obra não encontrada" });
    }

    const fiscalizacao = new Fiscalizacao(req.body);
    await fiscalizacao.save();

    // Popula a obra antes de retornar
    await fiscalizacao.populate("obra", "nome responsavel");
    res.status(201).json(fiscalizacao);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao criar fiscalização", error: error.message });
  }
};

// Atualizar fiscalização
exports.atualizarFiscalizacao = async (req, res) => {
  try {
    const fiscalizacao = await Fiscalizacao.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("obra", "nome responsavel");

    if (!fiscalizacao) {
      return res.status(404).json({ message: "Fiscalização não encontrada" });
    }
    res.json(fiscalizacao);
  } catch (error) {
    res.status(400).json({
      message: "Erro ao atualizar fiscalização",
      error: error.message,
    });
  }
};

// Deletar fiscalização
exports.deletarFiscalizacao = async (req, res) => {
  try {
    const fiscalizacao = await Fiscalizacao.findByIdAndDelete(req.params.id);
    if (!fiscalizacao) {
      return res.status(404).json({ message: "Fiscalização não encontrada" });
    }
    res.json({ message: "Fiscalização deletada com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar fiscalização", error: error.message });
  }
};

// Listar fiscalizações de uma obra específica
exports.listarFiscalizacoesPorObra = async (req, res) => {
  try {
    const fiscalizacoes = await Fiscalizacao.find({ obra: req.params.obraId })
      .populate("obra", "nome responsavel")
      .sort({ data: -1 });
    res.json(fiscalizacoes);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao listar fiscalizações da obra",
      error: error.message,
    });
  }
};

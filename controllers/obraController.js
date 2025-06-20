const Obra = require("../models/Obra");
const nodemailer = require("nodemailer");

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Listar todas as obras
exports.listarObras = async (req, res) => {
  try {
    const obras = await Obra.find().sort({ createdAt: -1 });
    res.json(obras);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar obras", error: error.message });
  }
};

// Buscar uma obra específica
exports.buscarObra = async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.id);
    if (!obra) {
      return res.status(404).json({ message: "Obra não encontrada" });
    }
    res.json(obra);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar obra", error: error.message });
  }
};

// Criar nova obra
exports.criarObra = async (req, res) => {
  try {
    const obra = new Obra(req.body);
    await obra.save();
    res.status(201).json(obra);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar obra", error: error.message });
  }
};

// Atualizar obra
exports.atualizarObra = async (req, res) => {
  try {
    const obra = await Obra.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!obra) {
      return res.status(404).json({ message: "Obra não encontrada" });
    }
    res.json(obra);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar obra", error: error.message });
  }
};

// Deletar obra
exports.deletarObra = async (req, res) => {
  try {
    const obra = await Obra.findByIdAndDelete(req.params.id);
    if (!obra) {
      return res.status(404).json({ message: "Obra não encontrada" });
    }
    res.json({ message: "Obra deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar obra", error: error.message });
  }
};

// Enviar detalhes da obra por e-mail
exports.enviarDetalhesPorEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Email recebido do front-end:", email); // ✅ debug

    if (!email) {
      return res.status(400).json({ message: "E-mail é obrigatório" });
    }

    const obra = await Obra.findById(req.params.id);
    if (!obra) {
      return res.status(404).json({ message: "Obra não encontrada" });
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: `Detalhes da Obra: ${obra.nome}`,
      html: `
        <h1>Detalhes da Obra</h1>
        <p><strong>Nome:</strong> ${obra.nome}</p>
        <p><strong>Responsável:</strong> ${obra.responsavel}</p>
        <p><strong>Data de Início:</strong> ${new Date(obra.data_inicio).toLocaleDateString()}</p>
        <p><strong>Data de Fim:</strong> ${new Date(obra.data_fim).toLocaleDateString()}</p>
        <p><strong>Descrição:</strong> ${obra.descricao}</p>
        <p><strong>Localização:</strong> ${obra.localizacao.latitude}, ${obra.localizacao.longitude}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "E-mail enviado com sucesso" });

  } catch (error) {
    console.error("Erro ao enviar e-mail:", error); // ✅ log completo do erro
    res.status(500).json({ message: "Erro ao enviar e-mail", error: error.message });
  }
};

# API de Acompanhamento de Obras

API RESTful para sistema de cadastro e acompanhamento de obras em andamento.

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Nodemailer

## Pré-requisitos

- Node.js (v14 ou superior)
- MongoDB (local ou Atlas)
- NPM ou Yarn

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/stellacarv/obras-api
cd obras-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

- Copie o arquivo `.env.example` para `.env`
- Preencha as variáveis necessárias:
  - `PORT`: Porta do servidor (padrão: 3000)
  - `MONGODB_URI`: URL de conexão com o MongoDB
  - `NODE_ENV`: Ambiente (development/production)
  - Configurações do SMTP para envio de e-mails

## Executando o Projeto

```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

## Documentação da API

### Obras

#### Listar todas as obras

```http
GET /api/obras
```

#### Buscar obra específica

```http
GET /api/obras/:id
```

#### Criar nova obra

```http
POST /api/obras
Content-Type: application/json

{
  "nome": "Nome da Obra",
  "responsavel": "Nome do Responsável",
  "data_inicio": "2024-01-01",
  "data_fim": "2024-12-31",
  "localizacao": {
    "latitude": -23.550520,
    "longitude": -46.633308
  },
  "descricao": "Descrição da obra",
  "foto": "base64_da_foto_ou_url"
}
```

#### Atualizar obra

```http
PUT /api/obras/:id
Content-Type: application/json

{
  // Mesmos campos do POST
}
```

#### Deletar obra

```http
DELETE /api/obras/:id
```

#### Enviar detalhes por e-mail

```http
POST /api/obras/:id/enviar-email
Content-Type: application/json

{
  "email": "destinatario@exemplo.com"
}
```

### Fiscalizações

#### Listar todas as fiscalizações

```http
GET /api/fiscalizacoes
```

#### Buscar fiscalização específica

```http
GET /api/fiscalizacoes/:id
```

#### Criar nova fiscalização

```http
POST /api/fiscalizacoes
Content-Type: application/json

{
  "data": "2024-01-01",
  "status": "em_andamento",
  "observacoes": "Observações da fiscalização",
  "localizacao": {
    "latitude": -23.550520,
    "longitude": -46.633308
  },
  "foto": "base64_da_foto_ou_url",
  "obra": "id_da_obra"
}
```

#### Atualizar fiscalização

```http
PUT /api/fiscalizacoes/:id
Content-Type: application/json

{
  // Mesmos campos do POST
}
```

#### Deletar fiscalização

```http
DELETE /api/fiscalizacoes/:id
```

#### Listar fiscalizações de uma obra

```http
GET /api/fiscalizacoes/obra/:obraId
```

## Status Codes

- 200: Sucesso
- 201: Criado
- 400: Erro na requisição
- 404: Não encontrado
- 500: Erro interno do servidor

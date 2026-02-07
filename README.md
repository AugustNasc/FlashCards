# 🧠 FlashCards IA

**FlashCards IA** é uma **plataforma de estudos** leve, moderna e **mobile-first** — com **flashcards**, **modo prova (múltipla escolha)**, **desafios compartilhados** e **métricas** para acompanhar evolução.

Construído com **Flask + SQLite**, funciona **sem login**, é simples de rodar localmente e oferece recursos completos de estudo, organização por coleções e integração com **OpenAI ou Gemini** (para gerar conteúdo quando você quiser).

---

## 🔗 Acessos rápidos

- App principal: `http://localhost:5000`
- Modo estudo: `http://localhost:5000/study`
- Modo prova: `http://localhost:5000/exam`

---

## ✨ Recursos (visão geral)

- **Conteúdo**
  - flashcards: criação manual, importação/exportação e geração com IA
  - coleções para organizar por tema/assunto
- **Estudo**
  - modo estudo com controle de respostas, acertos/erros e dificuldade
  - relatórios e sessões salvas
  - logs por coleção e indicador de foco (últimos 7 dias)
- **Provas**
  - modo prova (múltipla escolha) com revisão completa e histórico
  - filtro na revisão por **acertos/erros**
- **Compartilhamento**
  - links de template e desafio (com senha opcional, limite de acessos e expiração)
- **Qualidade de vida**
  - temas rápidos (Light/Dark/Sand/Mint)
  - sons do app (geral/ambiente/estudo) + volume
  - ajuda de importação com exemplos e “modelo para IA” copiável

> Mudanças detalhadas em `CHANGELOG.md`.

---

## 🧩 Tecnologias

- Python 3.10+
- Flask
- SQLite
- HTML, CSS e JavaScript
- OpenAI API ou Gemini API

---

## 📋 Requisitos

- Python **3.10 ou superior**

---

## 🚀 Instalação e execução

### Linux / macOS

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Rodar

```bash
python app.py
```

---

## 🔐 Configuração da API Key (OpenAI ou Gemini)

### Opção 1 — Pelo próprio app (recomendado)

- Clique em **Configurações**
- Cole a chave em **API Key (OpenAI ou Gemini)**
- Salve

> A chave fica salva no `localStorage` do navegador.

### Opção 2 — Variável de ambiente

```bash
export OPENAI_API_KEY="sua_chave_aqui"
# ou
export GEMINI_API_KEY="sua_chave_aqui"
python app.py
```

---

## 🗂️ Coleções (organização)

- Crie coleções para organizar seus conteúdos (ex.: `Segurança`, `História`, `JavaScript`)
- Filtre **geração**, **importação**, **exportação**, **estudo** e **provas** por coleção
- Ao excluir uma coleção, os cards associados são apagados (com opção de migração antes)

---

## 📥 Importação / 📤 Exportação

### Cards — Importação (CSV)

```csv
question,answer
O que é SQL?,Linguagem para bancos relacionais
O que é HTTP?,Protocolo da web
```

### Cards — Importação (JSON)

```json
[
  { "question": "O que é Python?", "answer": "Uma linguagem de programação" }
]
```

Ou, no formato:

```json
{
  "cards": [
    { "question": "O que é uma API?", "answer": "Uma interface entre sistemas" }
  ]
}
```

### Cards — Exportação

- Escolha CSV ou XLSX
- Respeita a coleção selecionada

---

## 🗃️ Estrutura do projeto

```
app.py
templates/
static/
flashcards.db
```

---

## 🔌 API (endpoints principais)

### Cards
- `GET /api/cards`
- `POST /api/cards`
- `DELETE /api/cards/:id`
- `POST /api/generate`
- `POST /api/import`
- `GET /api/export/csv`
- `GET /api/export/xlsx`

### Coleções e métricas
- `GET /api/collections`
- `POST /api/collections`
- `DELETE /api/collections/:id`
- `GET /api/collections/:id/logs`
- `GET /api/study/summary`

### Modo estudo
- `GET /api/study/cards`
- `GET /api/study/collections`
- `GET /api/study/sessions`
- `POST /api/study/sessions`
- `DELETE /api/study/sessions/:id`

### Modo prova
- `POST /api/exam/generate`
- `GET /api/exam/sessions`
- `POST /api/exam/sessions`
- `DELETE /api/exam/sessions/:id`
- `POST /api/exam/sessions/clear`

### Compartilhamento / Desafio
- `POST /api/share`
- `GET /api/share/:token`
- `POST /api/share/:token/access`
- `POST /api/share/:token/complete`
- `POST /api/share/:token/disable`
- `GET /share/:token`
- `GET /challenge/:token`

---

## 🛠️ Troubleshooting

### XLSX não funciona?

```bash
pip install openpyxl
```

### IA não gera cards?
- Verifique a API key
- Confira a variável de ambiente

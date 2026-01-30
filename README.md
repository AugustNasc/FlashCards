# 🧠 FlashCards IA

**FlashCards IA** é um web app leve, moderno e **mobile-first**, criado para **gerar, estudar e gerenciar flashcards com ajuda de IA**.

Construído com **Flask + SQLite**, funciona **sem login**, é simples de rodar localmente e oferece recursos completos de estudo, organização por coleções e integração com a **API da OpenAI**.

---

## ✨ Principais recursos

- 🤖 **Geração de flashcards com IA**, por tema  
  - até **60 cards por geração**
- ✍️ **Criação manual de cards**
- 🗂️ **Coleções** para organização  
  - ex.: `Segurança`, `História`, `JavaScript`
- 📖 **Modo de estudo dedicado**, com:
  - mostrar / ocultar resposta
  - marcar **acertos e erros**
  - dificuldade (**fácil / difícil**)
  - **relatório final**
  - sessões salvas (tempo + score) com opção de exclusão
- 📤 **Exportação** de cards em **CSV** e **XLSX**
- 📥 **Importação** de cards via **CSV** ou **JSON**
  - validação automática de `question` e `answer`
- 🎨 **Temas rápidos**  
  - Light, Dark, Sand, Mint
- 🎯 **Metas de estudo por coleção**
  - escolha os dias da semana para estudar cada tema
- ⚙️ **Configurações**
  - API key da OpenAI

---

## 🆕 Updates e melhorias

As mudanças detalhadas estão em `CHANGELOG.md`.

- 🎯 **Metas de estudo por coleção** com seleção de dias da semana
- ✅ **Modo estudo com setup** (coleção, tempo máximo e filtro por dificuldade quando disponível)
- 🧭 **Acesso ao estudo bloqueado** sem coleção criada
- 🗂️ **Migração de cards entre coleções**
- 🧨 **Exclusão de coleção remove os cards associados**
- 📦 **Importação com painel dedicado** em “Meus Cards”
- 🏷️ **Cards mostram a coleção de origem**

---

## 🧩 Tecnologias

- Python 3.10+
- Flask
- SQLite
- HTML, CSS e JavaScript
- OpenAI API

---

## 📋 Requisitos

- Python **3.10 ou superior**

---

## 🚀 Instalação

### Linux / macOS

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

---

## ▶️ Como rodar

```bash
python app.py
```

Acesse:
- App principal: `http://localhost:5000`
- Modo estudo: `http://localhost:5000/study`

---

## 🔐 Configuração da API Key da OpenAI

### Opção 1 — Pelo próprio app (recomendado)

- Clique em **Configurações**
- Cole a chave em **API Key (OpenAI)**
- Salve

> A chave fica salva no `localStorage` do navegador.

### Opção 2 — Variável de ambiente

```bash
export OPENAI_API_KEY="sua_chave_aqui"
python app.py
```

---

## 🗂️ Coleções

- Crie coleções para organizar seus cards
- Filtre geração, importação, exportação e estudo por coleção
- Ao excluir uma coleção, os cards associados são apagados
- Você pode migrar cards para outra coleção antes de excluir

---

## 📥 Importação de cards

### CSV

```csv
question,answer
O que é SQL?,Linguagem para bancos relacionais
O que é HTTP?,Protocolo da web
```

### JSON

```json
[
  { "question": "O que é Python?", "answer": "Uma linguagem de programação" }
]
```

Ou:

```json
{
  "cards": [
    { "question": "O que é uma API?", "answer": "Uma interface entre sistemas" }
  ]
}
```

---

## 📤 Exportação

- Escolha CSV ou XLSX
- Respeita a coleção selecionada

---

---

## 🗃️ Estrutura do projeto

```
app.py
templates/
static/
flashcards.db
```

---

## 🔌 Endpoints principais

- `GET /api/cards`
- `POST /api/cards`
- `DELETE /api/cards/:id`
- `POST /api/generate`
- `GET /api/export/csv`
- `GET /api/export/xlsx`
- `GET /api/collections`
- `POST /api/collections`
- `DELETE /api/collections/:id`
- `POST /api/import`
- `GET /api/study/cards`
- `GET /api/study/sessions`
- `POST /api/study/sessions`
- `DELETE /api/study/sessions/:id`

---

## 🛠️ Troubleshooting

### XLSX não funciona?

```bash
pip install openpyxl
```

### IA não gera cards?
- Verifique a API key
- Confira a variável de ambiente

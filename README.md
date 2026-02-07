# 🧠 FlashCards IA

**FlashCards IA** é um web app leve, moderno e **mobile-first**, criado para **gerar, estudar e gerenciar flashcards com ajuda de IA**.

Construído com **Flask + SQLite**, funciona **sem login**, é simples de rodar localmente e oferece recursos completos de estudo, organização por coleções e integração com **OpenAI ou Gemini**.

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
- 📝 **Modo prova (múltipla escolha)**, com IA
  - 4 alternativas por pergunta
  - suporte a perguntas com **2 respostas corretas**
  - **limite de tempo** opcional
  - **histórico** de provas (acertos/erros)
- 📤 **Exportação** de cards em **CSV** e **XLSX**
- 📥 **Importação** de cards via **CSV** ou **JSON**
  - pré-visualização e mapeamento de colunas
- 🔗 **Compartilhamento de coleções**
  - link de **template** (JSON)
  - link de **desafio** para outro usuário testar
  - senha opcional, limite de acessos e expiração do desafio
- 🎨 **Temas rápidos**  
  - Light, Dark, Sand, Mint
- 📊 **Logs de estudo por coleção**
  - sessões completas, cards resolvidos e tempo total
- 🧠 **Indicador de foco em estudo** (últimos 7 dias)
- ⚙️ **Configurações**
  - API key OpenAI ou Gemini
  - sons do app (geral, ambiente e study) + volume

---

## 🆕 Updates e melhorias

As mudanças detalhadas estão em `CHANGELOG.md`.

- 📊 **Logs de estudo por coleção** (sessões completas, cards resolvidos e tempo total)
- 🧠 **Indicador de foco em estudo**
- ✅ **Modo estudo com setup** (coleção, tempo máximo e filtro por dificuldade quando disponível)
- 📝 **Modo prova**: revisão completa + filtro por **acertos/erros** e visualização de provas concluídas
- 🧾 **Minhas Provas**: tentativas **agrupadas por prova** para evitar poluição visual
- 🔀 **Aleatório** agora prioriza cards não respondidos
- 🧭 **Acesso ao estudo bloqueado** sem coleção criada
- 🗂️ **Migração de cards entre coleções**
- 🧨 **Exclusão de coleção remove os cards associados**
- 📦 **Importação com painel dedicado** em “Meus Cards”
- ❓ **Ajuda de importação melhorada** com botão para **copiar exemplos** e **modelo para IA**
- 🔗 **Compartilhamento por links** (template e desafio)
- 🧭 **Onboarding rápido** quando não há coleções/cards
- 🏷️ **Cards mostram a coleção de origem**
- 🔊 **Sons separados** (geral, ambiente e study) com controle de volume

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
- Modo prova: `http://localhost:5000/exam`

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

> Dica: você pode mapear colunas diferentes na pré-visualização antes de importar.

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
- `GET /api/study/collections`
- `GET /api/study/sessions`
- `POST /api/study/sessions`
- `DELETE /api/study/sessions/:id`
- `GET /api/collections/:id/logs`
- `GET /api/study/summary`
- `POST /api/share`
- `POST /api/exam/generate`
- `GET /api/exam/sessions`
- `POST /api/exam/sessions`
- `DELETE /api/exam/sessions/:id`
- `POST /api/exam/sessions/clear`
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

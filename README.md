# FlashCards

App web para criar e estudar flashcards. Roda localmente com Flask + SQLite, sem login.

O projeto inclui:
- Flashcards com coleções
- Modo estudo (acertos/erros, dificuldade, sessões salvas e métricas)
- Modo prova (múltipla escolha, revisão e histórico)
- Importação e exportação (CSV/JSON e export para CSV/XLSX)
- Compartilhamento por link (template/desafio, senha opcional, limite de acessos e expiração)
- Geração com IA (opcional): OpenAI ou Gemini

Mudanças detalhadas em `CHANGELOG.md`.

## Rodando localmente

Requisitos: Python 3.10+

Windows (PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Linux / macOS:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Acessos:
- Home: `http://localhost:5000`
- Estudo: `http://localhost:5000/study`
- Prova: `http://localhost:5000/exam`

## IA (opcional)

O app funciona sem IA. Para gerar conteúdo, configure uma API key de OpenAI ou Gemini.

Opção 1: pelo próprio app (Configurações). A chave fica salva no `localStorage` do navegador.

Opção 2: variável de ambiente:

Linux/macOS:

```bash
export OPENAI_API_KEY="sua_chave_aqui"
# ou
export GEMINI_API_KEY="sua_chave_aqui"
python app.py
```

Windows (PowerShell):

```powershell
$env:OPENAI_API_KEY="sua_chave_aqui"
# ou
$env:GEMINI_API_KEY="sua_chave_aqui"
python app.py
```

## Dados locais e segurança

- O banco `flashcards.db` é criado localmente na primeira execução.
- Arquivos `.env` e o banco não devem ir para o Git (já estão no `.gitignore`).
- Use `.env.example` como referência, mas nunca suba uma chave real para o repositório.

## Importação e exportação

Exemplo de CSV:

```csv
question,answer
O que é SQL?,Linguagem para bancos relacionais
O que é HTTP?,Protocolo da web
```

Exemplo de JSON:

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

## API

O backend expõe endpoints em `/api/*` (cards, coleções, estudo, prova e compartilhamento). Para um mapa completo, veja `app.py`.

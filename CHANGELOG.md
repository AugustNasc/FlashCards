# Changelog

Todas as mudanças relevantes são documentadas aqui.

## 2026-02-02

### IA e configurações
- API Key aceita **OpenAI ou Gemini** (detecção automática).
- Novo header `X-API-Key` no front-end.
- Configurações com **sons separados** (geral, ambiente e estudo) e **controle de volume**.

### Modo estudo
- **Tempo/Progresso** aparecem apenas após iniciar a sessão.
- **Aleatório** agora sorteia apenas cards não respondidos.
- Correções de scroll no desktop e foco automático no card ao iniciar.
- Lista de sessões salva em **carrossel horizontal** (4 itens visíveis).
- Som do modo study dedicado.

### Coleções e métricas
- Endpoint para coleções do study (`/api/study/collections`) com contagem de cards e dificuldade.
- Contador de **coleção concluída** e logs de estudo por coleção (sessões completas, cards resolvidos, tempo).
- Indicador de **Foco em estudo** baseado nas sessões dos últimos 7 dias.

### UI e textos
- Ajuste de headlines e descrições.
- Remoção de referência a “Anki”.

## 2026-01-30

### Modo estudo
- Centralização do layout no desktop e ajustes específicos para mobile (tipografia, header e navegação).
- Botões **Anterior / Aleatório / Próximo** reunidos na mesma linha com ícones e melhor espaçamento.
- Botão **Aleatório** para pular para um card aleatório da coleção atual.
- Bloqueio de rolagem durante a sessão, mantendo **Tempo** e **Progresso** visíveis (header sticky).
- Modal próprio para alertas no modo estudo.
- Efeitos de entrada na sessão e animação ao excluir sessões.
- Toggle para **passar cards automaticamente** com tempo configurável.
- Toggle para **limite de tempo da sessão**.

### Sons
- Sons leves para botões e ações importantes.
- Sons diferentes para navegação, aleatório, exclusão e metas.
- Som especial ao criar cards (manual e via IA).
- Som ao encerrar o tempo da sessão.
- Opção **Sons do app** nas configurações.

### Interface geral
- Correções visuais em botões de exclusão e confirmação.
- Ajustes de temas no mobile (oculta seleção de temas no modo estudo).

## 2026-01-29

### Melhorias adicionadas (listadas no README)
- Metas de estudo por coleção com seleção de dias da semana.
- Modo estudo com setup (coleção, tempo máximo e filtro por dificuldade quando disponível).
- Acesso ao estudo bloqueado sem coleção criada.
- Migração de cards entre coleções.
- Exclusão de coleção remove os cards associados.
- Importação com painel dedicado em “Meus Cards”.
- Cards mostram a coleção de origem.

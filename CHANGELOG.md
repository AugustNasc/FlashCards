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

### Compartilhamento e importação
- Links de **template** e **desafio** para compartilhar coleções.
- Páginas dedicadas para consumir template ou realizar desafio.
- Importação com **pré-visualização** e **mapeamento de colunas**.
- Bloco “Primeiros passos” quando não há coleções/cards.
- Proteções nos links: senha opcional, limite de acessos, expiração do desafio e revogação.

### UI e textos
- Ajuste de headlines e descrições.
- Remoção de referência a “Anki”.

## 2026-02-07

### Modo prova
- Setup mais claro: **Gerar automaticamente** (com API Key) vs **Usar prova salva** (sem geração).
- “Configurações adicionais” agrupa opções menos essenciais (ex.: nome da prova).
- Revisão passa a exibir as **alternativas** e marcações (correta/selecionada).
- Filtro no resultado: clique em **Acertos** ou **Erros** para ver apenas as questões correspondentes.
- Visualização de provas no histórico é permitida **apenas após concluir** (com respostas registradas).
- Quando “2 respostas corretas” está ativo, apenas poucas questões (≈5%) pedem 2 alternativas e o hint só aparece quando necessário.
- Pós-processamento no backend para reduzir vieses (ex.: gabarito sempre em A) e remover frases do tipo “Selecione todas as corretas”.

### Minhas Provas (histórico)
- Tentativas de uma mesma prova são **agrupadas em um único card** (reduz poluição visual).
- Lista de tentativas acessível pelo botão `≡`, com **visualizar** e **excluir** por tentativa (modal com fechar ao clicar fora/ESC).

### Importação (ajuda)
- Ajuda (`?`) de importação de **Provas** e **Cards** com botões de **copiar** exemplos e **modelo para IA**.
- Layout do painel de ajuda ajustado para ficar mais legível no mobile e no desktop.

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

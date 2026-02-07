const cardsEl = document.getElementById("cards");
const cardCountEl = document.getElementById("card-count");
const generateBtn = document.getElementById("generate");
const saveBtn = document.getElementById("save");
const refreshBtn = document.getElementById("refresh");
const generateStatus = document.getElementById("generate-status");
const saveStatus = document.getElementById("save-status");
const usageStatus = document.getElementById("usage-status");
const topicInput = document.getElementById("topic");
const countInput = document.getElementById("count");
const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");
const progressBar = document.getElementById("progress-bar");
const downloadBtn = document.getElementById("download");
const downloadFormat = document.getElementById("download-format");
const toggleCardsBtn = document.getElementById("toggle-cards");
const collapseCardsBtn = document.getElementById("collapse-cards");
const cardsWrapper = document.getElementById("cards-wrapper");
const openStudyBtn = document.getElementById("open-study");
const openExamBtn = document.getElementById("open-exam");
const studyFocusEl = document.getElementById("study-focus");
const examsList = document.getElementById("exams-list");
const examsWrapper = document.getElementById("exams-wrapper");
const refreshExamsBtn = document.getElementById("refresh-exams");
const clearExamsBtn = document.getElementById("clear-exams");
const examsStatus = document.getElementById("exams-status");
const collapseExamsBtn = document.getElementById("collapse-exams");
const openExamsImportBtn = document.getElementById("open-exams-import");
const examsImportPanel = document.getElementById("exams-import-panel");
const examsImportHelpBtn = document.getElementById("exams-import-help");
const examsImportHelpPanel = document.getElementById("exams-import-help-panel");
const examsImportFileInput = document.getElementById("exams-import-file");
const importExamsBtn = document.getElementById("import-exams");
const examsImportStatus = document.getElementById("exams-import-status");
const examsDownloadFormat = document.getElementById("exams-download-format");
const downloadExamsBtn = document.getElementById("download-exams");
const cardsPagination = document.getElementById("cards-pagination");
const cardsPagePrev = document.getElementById("cards-page-prev");
const cardsPageNext = document.getElementById("cards-page-next");
const cardsPageInfo = document.getElementById("cards-page-info");
const faqPanel = document.getElementById("faq-panel");
const openFaqBtn = document.getElementById("open-faq");

const openSettingsBtn = document.getElementById("open-settings");
const closeSettingsBtn = document.getElementById("close-settings");
const settingsPanel = document.getElementById("settings");
const saveSettingsBtn = document.getElementById("save-settings");
const settingsStatus = document.getElementById("settings-status");
const apiKeyInput = document.getElementById("api-key");
const soundSettingsToggle = document.getElementById("sound-settings-toggle");
const soundSettingsGroup = document.getElementById("sound-settings-group");
const languageButtons = document.querySelectorAll(".lang-btn");
const soundToggle = document.getElementById("sound-toggle");
const bgSoundToggle = document.getElementById("bg-sound-toggle");
const themeButtons = document.querySelectorAll(".theme-btn");
const collectionSelect = document.getElementById("collection-select");
const collectionNameInput = document.getElementById("collection-name");
const createCollectionBtn = document.getElementById("create-collection");
const collectionStatus = document.getElementById("collection-status");
const collectionCompletions = document.getElementById("collection-completions");
const deleteCollectionBtn = document.getElementById("delete-collection");
const importFileInput = document.getElementById("import-file");
const importCardsBtn = document.getElementById("import-cards");
const importStatus = document.getElementById("import-status");
const importHelpBtn = document.getElementById("import-help");
const importHelpPanel = document.getElementById("import-help-panel");
const openImportBtn = document.getElementById("open-import");
const importPanel = document.getElementById("import-panel");
const importBackdrop = document.getElementById("import-backdrop");
const goalsStatus = document.getElementById("goals-status");
const openGoalsBtn = document.getElementById("open-goals");
const goalsPanel = document.getElementById("goals-panel");
const goalLogSessions = document.getElementById("goal-log-sessions");
const goalLogCards = document.getElementById("goal-log-cards");
const goalLogTime = document.getElementById("goal-log-time");
const goalLogExams = document.getElementById("goal-log-exams");
const goalLogQuestions = document.getElementById("goal-log-questions");
const goalLogExamTime = document.getElementById("goal-log-exam-time");
const bgSoundVolume = document.getElementById("bg-sound-volume");
const studySoundToggle = document.getElementById("study-sound-toggle");
const studySoundVolume = document.getElementById("study-sound-volume");
const migrateSelect = document.getElementById("migrate-select");
const migrateCardsBtn = document.getElementById("migrate-cards");
const migrateStatus = document.getElementById("migrate-status");
const collectionWarning = document.getElementById("collection-warning");
const focusCollectionBtn = document.getElementById("focus-collection");
const confirmModal = document.getElementById("confirm-modal");
const confirmTitle = document.getElementById("confirm-title");
const confirmMessage = document.getElementById("confirm-message");
const confirmCancel = document.getElementById("confirm-cancel");
const confirmOk = document.getElementById("confirm-ok");
const focusHelpBtn = document.getElementById("focus-help");
const focusHelpPanel = document.getElementById("focus-help-panel");
const focusHelpToggle = document.getElementById("focus-help-toggle");
const focusHelpDetails = document.getElementById("focus-help-details");
const focusBreakdownPeriod = document.getElementById("focus-breakdown-period");
const focusBreakdownSessions = document.getElementById("focus-breakdown-sessions");
const focusBreakdownScore = document.getElementById("focus-breakdown-score");
const onboardingSection = document.getElementById("onboarding");
const onboardingFocusCollection = document.getElementById("onboarding-focus-collection");
const onboardingOpenImport = document.getElementById("onboarding-open-import");
const onboardingOpenStudy = document.getElementById("onboarding-open-study");
const onboardingOpenExam = document.getElementById("onboarding-open-exam");
const onboardingStatus = document.getElementById("onboarding-status");
const shareTemplateBtn = document.getElementById("share-template");
const shareChallengeBtn = document.getElementById("share-challenge");
const shareLinkInput = document.getElementById("share-link");
const copyShareLinkBtn = document.getElementById("copy-share-link");
const openShareLink = document.getElementById("open-share-link");
const shareStatus = document.getElementById("share-status");
const sharePasswordInput = document.getElementById("share-password");
const shareMaxUsesInput = document.getElementById("share-max-uses");
const deleteShareLinkBtn = document.getElementById("delete-share-link");
const openShareModalBtn = document.getElementById("open-share-modal");
const shareModal = document.getElementById("share-modal");
const closeShareModalBtn = document.getElementById("close-share-modal");
const shareLinksList = document.getElementById("share-links-list");
const shareLinksStatus = document.getElementById("share-links-status");
const shareLinksRefreshBtn = document.getElementById("share-links-refresh");
const shareLinksRevokeBtn = document.getElementById("share-links-revoke");
const importPreview = document.getElementById("import-preview");
const importMapQuestion = document.getElementById("import-map-question");
const importMapAnswer = document.getElementById("import-map-answer");
const importPreviewCount = document.getElementById("import-preview-count");
const importPreviewTable = document.getElementById("import-preview-table");

let progressInterval = null;
let collectionsCache = [];
let confirmAction = null;
let clickAudioCtx = null;
let bgAudioCtx = null;
let bgNoise = null;
let bgFilter = null;
let bgLfo = null;
let bgGain = null;
let bgStartPending = false;
let lastCardsCount = 0;
let importParsed = null;
let importOverlay = null;
let cardsCache = [];
let cardsPage = 1;
const cardsPageSize = 16;
let shareLinksCache = [];
const modalStack = [];

const I18N = {
  pt: {
    "topbar.help": "Ajuda",
    "app.title": "FlashCards IA",
    "faq.title": "Ajuda · Flashcards e Provas",
    "faq.intro":
      "Flashcards são pares de pergunta e resposta. No modo prova, você treina múltipla escolha e revisa explicações.",
    "faq.list.create": "Crie cards manualmente ou com IA.",
    "faq.list.import": "Importe CSV/JSON e organize por coleções.",
    "faq.list.study": "Estude marcando acertos/erros e dificuldade.",
    "faq.list.exam": "Use o modo prova para treinar com múltipla escolha e revisar explicações.",
    "faq.list.share": "Use desafios e compartilhe coleções com links.",
    "faq.list.logs": "Acompanhe logs e foco das sessões.",
    "settings.title": "Configurações",
    "settings.api.label": "API Key (OpenAI ou Gemini)",
    "settings.api.placeholder": "Cole sua chave aqui",
    "settings.api.note": "A chave fica salva no seu navegador.",
    "settings.language.label": "Idioma",
    "settings.language.note": "Detectado automaticamente pelo navegador, você pode trocar.",
    "settings.sound.title": "Sons",
    "settings.sound.general": "Sons do app (geral)",
    "settings.sound.generalNote": "Ative para ouvir feedback sonoro nos botões.",
    "settings.sound.ambient": "Som ambiente",
    "settings.sound.ambientNote": "Ative para um fundo sonoro suave durante o uso.",
    "settings.sound.study": "Som do modo estudo",
    "settings.sound.studyNote": "Ative para ouvir o som enquanto estuda.",
    "settings.sound.volume": "Volume",
    "settings.save": "Salvar configurações",
    "settings.saved": "Configurações salvas.",
    "hero.eyebrow": "FLASHCARDS + PROVAS + IA",
    "hero.title": "Estude com flashcards e simulados em um só lugar.",
    "hero.subtitle":
      "Gere perguntas e respostas em segundos, pratique em modo prova e acompanhe seu histórico.",
    "hero.stats.cards": "Meus Cards",
    "hero.stats.focus": "Foco em estudo",
    "hero.focusHelp.title": "Como funciona",
    "hero.focusHelp.text":
      "Indicador baseado nas sessões (estudo e provas) dos últimos 7 dias. Quanto maior a proporção de questões respondidas, maior o foco.",
    "hero.focusHelp.more": "Ver mais",
    "hero.focusHelp.less": "Ver menos",
    "hero.focusHelp.formula":
      "Fórmula: <code>respondidas = acertos + erros</code>; <code>razão = respondidas ÷ total</code>; <code>foco% = média(razão nos últimos 7 dias) × 100</code>.",
    "hero.focusHelp.period": "Período",
    "hero.focusHelp.sessions": "Sessões",
    "hero.focusHelp.score": "Pontuação",
    "hero.focusHelp.includes": "Inclui sessões de estudo e provas (quando você finaliza e salva).",
    "hero.focus.none": "Sem dados",
    "hero.focus.noSessions": "Sem sessões recentes",
    "hero.focus.noData": "Sem dados",
    "hero.focus.title": "Indicador baseado nas sessões dos últimos 7 dias.",
    "hero.stats.logs": "Logs",
    "hero.logs.button": "Ver logs",
    "hero.logs.title": "Resumo da coleção",
    "hero.logs.text": "Confira métricas de estudo e provas da coleção selecionada.",
    "hero.logs.sessions": "Sessões completas",
    "hero.logs.cards": "Cards resolvidos",
    "hero.logs.time": "Tempo total",
    "hero.logs.exams": "Provas feitas",
    "hero.logs.questions": "Questões respondidas",
    "hero.logs.examTime": "Tempo em provas",
    "hero.logs.note":
      "Sessões completas contam apenas quando todos os cards recebem resultado (Acertei ou Errei). Provas contabilizam questões respondidas e tempo total.",
    "hero.cta": "Abrir modo estudo",
    "hero.ctaExam": "Abrir modo prova",
    "hero.examNote": "Modo prova: múltipla escolha com explicações e histórico.",
    "onboarding.title": "Primeiros passos",
    "onboarding.step1.title": "Crie uma coleção",
    "onboarding.step1.text": "para organizar seus estudos.",
    "onboarding.step2.title": "Adicione cards",
    "onboarding.step2.text": "manualmente, por importação ou com IA.",
    "onboarding.step3.title": "Inicie o modo estudo",
    "onboarding.step3.text": "para revisar e marcar resultados.",
    "onboarding.step4.title": "Experimente o modo prova",
    "onboarding.step4.text": "para treinar múltipla escolha (opcional).",
    "onboarding.action.collection": "Criar coleção",
    "onboarding.action.import": "Importar cards",
    "onboarding.action.study": "Abrir modo estudo",
    "onboarding.action.exam": "Abrir modo prova",
    "onboarding.status.noCollections": "1/3: Crie sua primeira coleção para começar.",
    "onboarding.status.noCards": "2/3: Agora importe, crie ou gere cards para a coleção.",
    "collections.title": "Coleções",
    "collections.warning":
      "Selecione uma coleção (não “Visualizar todas”) para criar, importar ou gerar cards.",
    "collections.warningAction": "Criar coleção",
    "collections.select": "Selecionar coleção",
    "collections.delete": "Excluir coleção",
    "collections.new.label": "Nova coleção",
    "collections.new.placeholder": "Ex.: Segurança",
    "collections.new.create": "Criar",
    "collections.migrate.summary": "Migrar cards",
    "collections.migrate.label": "Migrar cards para",
    "collections.migrate.button": "Migrar",
    "collections.share.label": "Compartilhar coleção",
    "collections.share.button": "Abrir compartilhamento",
    "collections.share.note": "Crie links de template ou desafio para sua coleção.",
    "collections.viewAll": "Visualizar todas",
    "collections.migrate.placeholder": "Selecione destino",
    "collections.migrate.source": "Selecione uma coleção de origem.",
    "collections.migrate.target": "Selecione uma coleção de destino.",
    "collections.delete.select": "Selecione uma coleção para excluir.",
    "generate.title": "Gerar com IA",
    "generate.subtitle":
      "Defina um tema e a quantidade de cards. A IA cria e salva tudo automaticamente.",
    "generate.topic.label": "Tema",
    "generate.topic.placeholder": "Ex.: Anatomia, História do Brasil, JavaScript",
    "generate.count.label": "Quantidade",
    "generate.button": "Gerar cards",
    "generate.selectCollection": "Selecione uma coleção antes de gerar cards.",
    "manual.title": "Criar manualmente",
    "manual.subtitle": "Use quando quiser ajustar algo específico ou adicionar cards rápidos.",
    "manual.question.label": "Pergunta",
    "manual.question.placeholder": "Digite a pergunta...",
    "manual.answer.label": "Resposta",
    "manual.answer.placeholder": "Digite a resposta...",
    "manual.save": "Salvar card",
    "manual.selectCollection": "Selecione uma coleção antes de salvar.",
    "exams.title": "Minhas Provas",
    "exams.refresh": "Atualizar",
    "exams.clear": "Limpar histórico",
    "exams.expand": "Expandir",
    "exams.collapse": "Recolher",
    "exams.import": "Importar",
    "exams.import.file": "Arquivo",
    "exams.import.note": "Importe CSV/XLSX/JSON para criar provas no histórico.",
    "exams.import.help.title": "Como importar provas",
    "exams.import.help.intro":
      "Você pode importar CSV/XLSX (planilha) ou JSON. O formato exportado em <em>Baixar</em> também é aceito.",
    "exams.import.help.required":
      "Obrigatório por questão: <em>question</em>, 4 alternativas (<em>option_1</em>…<em>option_4</em> ou <em>a</em>…<em>d</em>) e <em>correct</em>.",
    "exams.import.help.correct":
      "Em <em>correct</em>, use A/B/C/D (ou 0–3 / 1–4). Para duas corretas: <em>A,C</em>.",
    "exams.import.help.examId": "Use <em>exam_id</em> para separar múltiplas provas no mesmo arquivo.",
    "exams.import.help.example": "Exemplo (CSV):",
    "exams.import.help.aiTitle": "Modelo para IA (copie e cole):",
    "exams.import.button": "Importar",
    "exams.import.selectFile": "Selecione um arquivo CSV, XLSX ou JSON válido.",
    "exams.import.loading": "Importando provas...",
    "exams.import.imported": "Importadas {count} prova(s).",
    "exams.import.importedWithSkipped": "Importadas {count} prova(s) · Ignoradas {skipped}.",
    "exams.download": "Baixar",
    "exams.empty": "Nenhuma prova salva ainda.",
    "exams.item": "Tempo {duration} · {total} questões",
    "exams.summary": "Provas: {count} · Acertos {correct} · Erros {incorrect}",
    "exams.stats.correct": "Acertos",
    "exams.stats.incorrect": "Erros",
    "exams.stats.unanswered": "Pendentes",
    "exams.name.edit": "Renomear prova",
    "exams.name.save": "Salvar",
    "exams.name.cancel": "Cancelar",
    "exams.name.placeholder": "Nome da prova...",
    "exams.start": "Começar",
    "exams.view": "Visualizar",
    "exams.attemptsCount": "Tentativas {count}",
    "exams.attemptsTitle": "Tentativas ({count})",
    "exams.attempts.col.date": "Data",
    "exams.attempts.col.score": "Resultado",
    "exams.attempts.col.time": "Tempo",
    "exams.attempts.col.actions": "Ações",
    "exams.attempts.close": "Fechar",
    "exams.notCompleted": "Visualização disponível após concluir a prova.",
    "exams.retake": "Refazer",
    "exams.retakeMissing": "Não encontrei as questões desta prova.",
    "exams.delete": "Excluir",
    "exams.list.clearing": "Limpando histórico...",
    "exams.list.cleared": "Histórico limpo.",
    "exams.action.clear.title": "Limpar histórico",
    "exams.action.clear.messageAll": "Deseja remover todo o histórico de provas?",
    "exams.action.clear.messageCollection": "Deseja remover o histórico de provas desta coleção?",
    "exams.action.clear.ok": "Limpar",
    "cards.title": "Meus Cards",
    "cards.toggleAnswers": "Esconder respostas",
    "cards.showAnswers": "Mostrar respostas",
    "cards.hideAnswers": "Esconder respostas",
    "cards.expand": "Expandir",
    "cards.collapse": "Recolher",
    "cards.refresh": "Atualizar",
    "cards.import": "Importar cards",
    "cards.download": "Baixar",
    "import.file.label": "Arquivo",
    "import.help.title": "Como importar",
    "import.help.csv": "CSV: precisa ter colunas <em>question</em> e <em>answer</em>. Exemplo:",
    "import.help.json": "JSON: array de objetos ou objeto com <em>cards</em>:",
    "import.help.aiTitle": "Modelo para IA (copie e cole):",
    "import.help.map":
      "Após carregar, use o mapeamento para indicar quais colunas são pergunta e resposta.",
    "import.help.warn": "Evite arquivos muito grandes e revise se não há linhas vazias.",
    "import.map.label": "Mapear colunas",
    "import.map.select": "Selecione",
    "import.map.selectPrompt": "Selecione as colunas de pergunta e resposta.",
    "import.preview.count": "{count} linhas detectadas",
    "import.preview.question": "Pergunta",
    "import.preview.answer": "Resposta",
    "import.button": "Importar",
    "import.loading": "Importando cards...",
    "import.loadingShort": "Importando...",
    "import.fileTooLarge": "Arquivo muito grande. Tente até 2MB.",
    "import.noColumns": "Não encontrei colunas para mapear.",
    "import.noRows": "Nenhuma linha encontrada para importar.",
    "import.previewReady": "Prévia carregada. Ajuste as colunas e importe.",
    "import.imported": "Importados {count} cards.",
    "import.selectCollection": "Selecione uma coleção antes de importar.",
    "import.selectFile": "Selecione um arquivo CSV ou JSON válido.",
    "import.invalidJson": "JSON inválido.",
    "import.networkFail": "Falha de rede ao importar. Tente novamente.",
    "cards.pageInfo": "Página 1/1",
    "goals.selectCollection": "Selecione uma coleção para ver os logs.",
    "goals.updated": "Logs atualizados.",
    "cards.page": "Página {page}/{total}",
    "footer.prefix": "© 2026 FlashCards · Projeto open source por AugustNasc ·",
    "footer.link": "Acesse o repositório",
    "confirm.title": "Confirmar ação",
    "confirm.cancel": "Cancelar",
    "confirm.ok": "Confirmar",
    "common.copy": "Copiar",
    "common.copied": "Copiado",
    "common.copyFail": "Não foi possível copiar automaticamente.",
    "share.title": "Compartilhar coleção",
    "share.protection": "Proteção",
    "share.password.placeholder": "Senha (opcional)",
    "share.maxUses.placeholder": "Limite de acessos",
    "share.generate": "Gerar link",
    "share.template": "Gerar link de template",
    "share.challenge": "Gerar link de desafio",
    "share.link": "Link",
    "share.link.placeholder": "Link gerado aparece aqui",
    "share.copy": "Copiar",
    "share.open": "Abrir",
    "share.delete": "Excluir link",
    "share.list.label": "Links da coleção",
    "share.list.refresh": "Atualizar",
    "share.list.clear": "Limpar tudo",
    "share.note": "Links de desafio expiram em 20 minutos e são desativados ao finalizar o desafio.",
    "share.type.template": "Template",
    "share.type.challenge": "Desafio",
    "share.selectCollection": "Selecione uma coleção antes de compartilhar.",
    "share.list.empty": "Nenhum link encontrado.",
    "share.list.select": "Selecione uma coleção para ver os links.",
    "share.list.loading": "Carregando links...",
    "share.list.error": "Erro ao carregar links.",
    "share.list.clearing": "Limpando links...",
    "share.list.noneToClear": "Nenhum link disponível para limpar.",
    "share.list.cleared": "Removidos: {success}",
    "share.list.clearedWithFail": "Removidos: {success} · Falhas: {failed}",
    "share.list.expires": "Expira em {date}",
    "share.list.noExpiry": "Sem expiração",
    "share.list.uses": "Usos: {used}",
    "share.list.usesOf": "Usos: {used}/{max}",
    "share.status.disabled": "Desativado",
    "share.status.expired": "Expirado",
    "share.status.exhausted": "Limite atingido",
    "share.status.active": "Ativo",
    "share.action.copied": "Link copiado.",
    "share.action.copyFail": "Não foi possível copiar automaticamente.",
    "share.action.noPermission": "Sem permissão para esta ação.",
    "share.action.noPermissionExpire": "Sem permissão para expirar este link.",
    "share.action.noPermissionDelete": "Sem permissão para excluir este link.",
    "share.action.copy": "Copiar",
    "share.action.open": "Abrir",
    "share.action.expire": "Expirar",
    "share.action.expired": "Link expirado.",
    "share.action.disabled": "Link desativado.",
    "share.action.expire.title": "Expirar link",
    "share.action.expire.message": "Deseja expirar este link agora?",
    "share.action.expire.ok": "Expirar",
    "share.action.delete.title": "Excluir link",
    "share.action.delete.message": "Deseja desativar este link compartilhado?",
    "share.action.delete.ok": "Excluir",
    "share.action.clear.title": "Limpar links",
    "share.action.clear.message": "Deseja remover {count} link(s) desta coleção e apagar o histórico?",
    "share.action.clear.ok": "Limpar",
  },
  en: {
    "topbar.help": "Help",
    "app.title": "FlashCards AI",
    "faq.title": "Help · Flashcards and Exams",
    "faq.intro":
      "Flashcards are pairs of questions and answers. In exam mode you practice multiple choice and review explanations.",
    "faq.list.create": "Create cards manually or with AI.",
    "faq.list.import": "Import CSV/JSON and organize by collections.",
    "faq.list.study": "Study by marking correct/incorrect and difficulty.",
    "faq.list.exam": "Use exam mode to practice multiple choice and review explanations.",
    "faq.list.share": "Use challenges and share collections with links.",
    "faq.list.logs": "Track logs and session focus.",
    "settings.title": "Settings",
    "settings.api.label": "API Key (OpenAI or Gemini)",
    "settings.api.placeholder": "Paste your key here",
    "settings.api.note": "The key is saved in your browser.",
    "settings.language.label": "Language",
    "settings.language.note": "Detected automatically by your browser, but you can change it.",
    "settings.sound.title": "Sound",
    "settings.sound.general": "App sounds (general)",
    "settings.sound.generalNote": "Enable to hear button feedback sounds.",
    "settings.sound.ambient": "Ambient sound",
    "settings.sound.ambientNote": "Enable a soft background sound during use.",
    "settings.sound.study": "Study mode sound",
    "settings.sound.studyNote": "Enable sound while studying.",
    "settings.sound.volume": "Volume",
    "settings.save": "Save settings",
    "settings.saved": "Settings saved.",
    "hero.eyebrow": "FLASHCARDS + EXAMS + AI",
    "hero.title": "Study with flashcards and mock exams in one place.",
    "hero.subtitle": "Generate Q&A in seconds, practice in exam mode, and track your history.",
    "hero.stats.cards": "My Cards",
    "hero.stats.focus": "Study focus",
    "hero.focusHelp.title": "How it works",
    "hero.focusHelp.text":
      "Indicator based on the last 7 days (study sessions and exams). The higher the ratio of answered questions, the higher the focus.",
    "hero.focusHelp.more": "See more",
    "hero.focusHelp.less": "See less",
    "hero.focusHelp.formula":
      "Formula: <code>answered = correct + incorrect</code>; <code>ratio = answered ÷ total</code>; <code>focus% = avg(ratio over last 7 days) × 100</code>.",
    "hero.focusHelp.period": "Period",
    "hero.focusHelp.sessions": "Sessions",
    "hero.focusHelp.score": "Score",
    "hero.focusHelp.includes": "Includes study sessions and exams (when you finish and save).",
    "hero.focus.none": "No data",
    "hero.focus.noSessions": "No recent sessions",
    "hero.focus.noData": "No data",
    "hero.focus.title": "Indicator based on sessions from the last 7 days.",
    "hero.stats.logs": "Logs",
    "hero.logs.button": "View logs",
    "hero.logs.title": "Collection summary",
    "hero.logs.text": "Check study and exam metrics for the selected collection.",
    "hero.logs.sessions": "Completed sessions",
    "hero.logs.cards": "Solved cards",
    "hero.logs.time": "Total time",
    "hero.logs.exams": "Exams done",
    "hero.logs.questions": "Questions answered",
    "hero.logs.examTime": "Exam time",
    "hero.logs.note":
      "Completed sessions only count when every card is answered (Correct or Incorrect). Exams track answered questions and total time.",
    "hero.cta": "Open study mode",
    "hero.ctaExam": "Open exam mode",
    "hero.examNote": "Exam mode: multiple choice with explanations and history.",
    "onboarding.title": "Getting started",
    "onboarding.step1.title": "Create a collection",
    "onboarding.step1.text": "to organize your studies.",
    "onboarding.step2.title": "Add cards",
    "onboarding.step2.text": "manually, by import, or with AI.",
    "onboarding.step3.title": "Start study mode",
    "onboarding.step3.text": "to review and mark results.",
    "onboarding.step4.title": "Try exam mode",
    "onboarding.step4.text": "to practice multiple choice (optional).",
    "onboarding.action.collection": "Create collection",
    "onboarding.action.import": "Import cards",
    "onboarding.action.study": "Open study mode",
    "onboarding.action.exam": "Open exam mode",
    "onboarding.status.noCollections": "1/3: Create your first collection to get started.",
    "onboarding.status.noCards": "2/3: Import, create, or generate cards for the collection.",
    "collections.title": "Collections",
    "collections.warning":
      "Select a collection (not “View all”) to create, import, or generate cards.",
    "collections.warningAction": "Create collection",
    "collections.select": "Select collection",
    "collections.delete": "Delete collection",
    "collections.new.label": "New collection",
    "collections.new.placeholder": "e.g., Security",
    "collections.new.create": "Create",
    "collections.migrate.summary": "Move cards",
    "collections.migrate.label": "Move cards to",
    "collections.migrate.button": "Move",
    "collections.share.label": "Share collection",
    "collections.share.button": "Open sharing",
    "collections.share.note": "Create template or challenge links for your collection.",
    "collections.viewAll": "View all",
    "collections.migrate.placeholder": "Select destination",
    "collections.migrate.source": "Select a source collection.",
    "collections.migrate.target": "Select a destination collection.",
    "collections.delete.select": "Select a collection to delete.",
    "generate.title": "Generate with AI",
    "generate.subtitle": "Choose a topic and quantity. AI creates and saves everything automatically.",
    "generate.topic.label": "Topic",
    "generate.topic.placeholder": "e.g., Anatomy, Brazilian History, JavaScript",
    "generate.count.label": "Quantity",
    "generate.button": "Generate cards",
    "generate.selectCollection": "Select a collection before generating cards.",
    "manual.title": "Create manually",
    "manual.subtitle": "Use when you want to adjust something specific or add quick cards.",
    "manual.question.label": "Question",
    "manual.question.placeholder": "Type the question...",
    "manual.answer.label": "Answer",
    "manual.answer.placeholder": "Type the answer...",
    "manual.save": "Save card",
    "manual.selectCollection": "Select a collection before saving.",
    "exams.title": "My Exams",
    "exams.refresh": "Refresh",
    "exams.clear": "Clear history",
    "exams.expand": "Expand",
    "exams.collapse": "Collapse",
    "exams.import": "Import",
    "exams.import.file": "File",
    "exams.import.note": "Import CSV/XLSX/JSON to create exams in history.",
    "exams.import.help.title": "How to import exams",
    "exams.import.help.intro":
      "You can import CSV/XLSX (spreadsheet) or JSON. The export format under <em>Download</em> is also accepted.",
    "exams.import.help.required":
      "Required per question: <em>question</em>, 4 options (<em>option_1</em>…<em>option_4</em> or <em>a</em>…<em>d</em>) and <em>correct</em>.",
    "exams.import.help.correct":
      "In <em>correct</em>, use A/B/C/D (or 0–3 / 1–4). For two correct answers: <em>A,C</em>.",
    "exams.import.help.examId": "Use <em>exam_id</em> to split multiple exams in the same file.",
    "exams.import.help.example": "Example (CSV):",
    "exams.import.help.aiTitle": "AI template (copy & paste):",
    "exams.import.button": "Import",
    "exams.import.selectFile": "Select a valid CSV, XLSX or JSON file.",
    "exams.import.loading": "Importing exams...",
    "exams.import.imported": "Imported {count} exam(s).",
    "exams.import.importedWithSkipped": "Imported {count} exam(s) · Skipped {skipped}.",
    "exams.download": "Download",
    "exams.empty": "No exams saved yet.",
    "exams.item": "Time {duration} · {total} questions",
    "exams.summary": "Exams: {count} · Correct {correct} · Incorrect {incorrect}",
    "exams.stats.correct": "Correct",
    "exams.stats.incorrect": "Incorrect",
    "exams.stats.unanswered": "Unanswered",
    "exams.name.edit": "Rename exam",
    "exams.name.save": "Save",
    "exams.name.cancel": "Cancel",
    "exams.name.placeholder": "Exam name...",
    "exams.start": "Start",
    "exams.view": "View",
    "exams.attemptsCount": "Attempts {count}",
    "exams.attemptsTitle": "Attempts ({count})",
    "exams.attempts.col.date": "Date",
    "exams.attempts.col.score": "Score",
    "exams.attempts.col.time": "Time",
    "exams.attempts.col.actions": "Actions",
    "exams.attempts.close": "Close",
    "exams.notCompleted": "Viewing is available after finishing the exam.",
    "exams.retake": "Retake",
    "exams.retakeMissing": "Could not load this exam questions.",
    "exams.delete": "Delete",
    "exams.list.clearing": "Clearing history...",
    "exams.list.cleared": "History cleared.",
    "exams.action.clear.title": "Clear history",
    "exams.action.clear.messageAll": "Do you want to remove the entire exam history?",
    "exams.action.clear.messageCollection": "Do you want to remove this collection's exam history?",
    "exams.action.clear.ok": "Clear",
    "cards.title": "My Cards",
    "cards.toggleAnswers": "Hide answers",
    "cards.showAnswers": "Show answers",
    "cards.hideAnswers": "Hide answers",
    "cards.expand": "Expand",
    "cards.collapse": "Collapse",
    "cards.refresh": "Refresh",
    "cards.import": "Import cards",
    "cards.download": "Download",
    "import.file.label": "File",
    "import.help.title": "How to import",
    "import.help.csv": "CSV: must have <em>question</em> and <em>answer</em> columns. Example:",
    "import.help.json": "JSON: array of objects or object with <em>cards</em>:",
    "import.help.aiTitle": "AI template (copy & paste):",
    "import.help.map":
      "After loading, use the mapping to indicate which columns are question and answer.",
    "import.help.warn": "Avoid very large files and check for empty rows.",
    "import.map.label": "Map columns",
    "import.map.select": "Select",
    "import.map.selectPrompt": "Select the question and answer columns.",
    "import.preview.count": "{count} rows detected",
    "import.preview.question": "Question",
    "import.preview.answer": "Answer",
    "import.button": "Import",
    "import.loading": "Importing cards...",
    "import.loadingShort": "Importing...",
    "import.fileTooLarge": "File too large. Try up to 2MB.",
    "import.noColumns": "Couldn't find columns to map.",
    "import.noRows": "No rows found to import.",
    "import.previewReady": "Preview loaded. Adjust columns and import.",
    "import.imported": "Imported {count} cards.",
    "import.selectCollection": "Select a collection before importing.",
    "import.selectFile": "Select a valid CSV or JSON file.",
    "import.invalidJson": "Invalid JSON.",
    "import.networkFail": "Network error while importing. Please try again.",
    "cards.pageInfo": "Page 1/1",
    "goals.selectCollection": "Select a collection to view logs.",
    "goals.updated": "Logs updated.",
    "cards.page": "Page {page}/{total}",
    "footer.prefix": "© 2026 FlashCards · Open source project by AugustNasc ·",
    "footer.link": "View repository",
    "confirm.title": "Confirm action",
    "confirm.cancel": "Cancel",
    "confirm.ok": "Confirm",
    "common.copy": "Copy",
    "common.copied": "Copied",
    "common.copyFail": "Unable to copy automatically.",
    "share.title": "Share collection",
    "share.protection": "Protection",
    "share.password.placeholder": "Password (optional)",
    "share.maxUses.placeholder": "Access limit",
    "share.generate": "Generate link",
    "share.template": "Generate template link",
    "share.challenge": "Generate challenge link",
    "share.link": "Link",
    "share.link.placeholder": "Generated link appears here",
    "share.copy": "Copy",
    "share.open": "Open",
    "share.delete": "Delete link",
    "share.list.label": "Collection links",
    "share.list.refresh": "Refresh",
    "share.list.clear": "Clear all",
    "share.note":
      "Challenge links expire in 20 minutes and are disabled when the challenge ends.",
    "share.type.template": "Template",
    "share.type.challenge": "Challenge",
    "share.selectCollection": "Select a collection before sharing.",
    "share.list.empty": "No links found.",
    "share.list.select": "Select a collection to view links.",
    "share.list.loading": "Loading links...",
    "share.list.error": "Failed to load links.",
    "share.list.clearing": "Clearing links...",
    "share.list.noneToClear": "No links available to clear.",
    "share.list.cleared": "Removed: {success}",
    "share.list.clearedWithFail": "Removed: {success} · Failed: {failed}",
    "share.list.expires": "Expires {date}",
    "share.list.noExpiry": "No expiration",
    "share.list.uses": "Uses: {used}",
    "share.list.usesOf": "Uses: {used}/{max}",
    "share.status.disabled": "Disabled",
    "share.status.expired": "Expired",
    "share.status.exhausted": "Limit reached",
    "share.status.active": "Active",
    "share.action.copied": "Link copied.",
    "share.action.copyFail": "Unable to copy automatically.",
    "share.action.noPermission": "No permission for this action.",
    "share.action.noPermissionExpire": "No permission to expire this link.",
    "share.action.noPermissionDelete": "No permission to delete this link.",
    "share.action.copy": "Copy",
    "share.action.open": "Open",
    "share.action.expire": "Expire",
    "share.action.expired": "Link expired.",
    "share.action.disabled": "Link disabled.",
    "share.action.expire.title": "Expire link",
    "share.action.expire.message": "Expire this link now?",
    "share.action.expire.ok": "Expire",
    "share.action.delete.title": "Delete link",
    "share.action.delete.message": "Disable this shared link?",
    "share.action.delete.ok": "Delete",
    "share.action.clear.title": "Clear links",
    "share.action.clear.message": "Remove {count} link(s) from this collection and delete history?",
    "share.action.clear.ok": "Clear",
  },
};

let currentLanguage = "pt";

function detectLanguage() {
  const stored = localStorage.getItem("language");
  if (stored) return stored;
  const browserLang =
    (navigator.languages && navigator.languages[0]) || navigator.language || "pt";
  return browserLang.toLowerCase().startsWith("en") ? "en" : "pt";
}

function formatText(text, vars = {}) {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)),
    text
  );
}

function t(key, vars) {
  const dict = I18N[currentLanguage] || I18N.pt;
  const base = dict[key] || I18N.pt[key] || "";
  return vars ? formatText(base, vars) : base;
}

const STATUS_TRANSLATIONS_EN = {
  "Gerando cards...": "Generating cards...",
  "Erro ao gerar cards": "Failed to generate cards.",
  "Erro ao salvar card": "Failed to save card.",
  "Erro ao criar coleção.": "Failed to create collection.",
  "Gerando link...": "Generating link...",
  "Erro ao gerar link.": "Failed to generate link.",
  "Link de template gerado.": "Template link generated.",
  "Link de desafio gerado.": "Challenge link generated.",
  "Nenhum link disponível.": "No link available.",
  "Link copiado.": "Link copied.",
  "Não foi possível copiar automaticamente.": "Unable to copy automatically.",
  "Gere um link primeiro.": "Generate a link first.",
  "Nenhum link disponível para excluir.": "No link available to delete.",
  "Não tenho permissão para excluir este link.": "You don't have permission to delete this link.",
  "Não foi possível excluir.": "Unable to delete.",
  "Link desativado.": "Link disabled.",
  "Link removido.": "Link removed.",
  "Não foi possível desativar.": "Unable to disable.",
  "Não foi possível remover.": "Unable to remove.",
  "Não foi possível expirar.": "Unable to expire.",
  "Erro ao migrar.": "Failed to move cards.",
  "Nenhuma linha encontrada para importar.": "No rows found to import.",
  "Nenhum card válido. Confira as colunas selecionadas.": "No valid cards. Check the selected columns.",
  "Erro ao importar.": "Failed to import.",
  "Erro ao carregar logs.": "Failed to load logs.",
  "Erro ao carregar foco.": "Failed to load focus.",
};

function translateStatus(text) {
  if (!text) return "";
  if (currentLanguage !== "en") return text;
  return STATUS_TRANSLATIONS_EN[text] || text;
}

async function copyTextToClipboard(text) {
  const value = String(text || "").trim();
  if (!value) return false;
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch (err) {
    // fallback below
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.top = "-1000px";
    textarea.style.left = "-1000px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    return Boolean(ok);
  } catch (err) {
    return false;
  }
}

function setupCopySnippets() {
  document.querySelectorAll("button.copy-snippet[data-copy-target]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const targetId = btn.dataset.copyTarget || "";
      if (!targetId) return;
      const target = document.getElementById(targetId);
      const text = target ? target.textContent || "" : "";
      const ok = await copyTextToClipboard(text);
      if (!ok && target) {
        try {
          const range = document.createRange();
          range.selectNodeContents(target);
          const sel = window.getSelection();
          if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
          }
        } catch (err) {
          // ignore
        }
      }
      const prev = btn.textContent;
      btn.textContent = ok ? t("common.copied") : t("common.copyFail");
      btn.disabled = true;
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = t(btn.dataset.i18n || "") || prev || t("common.copy");
      }, ok ? 900 : 1400);
    });
  });
}

function applyTranslations() {
  const dict = I18N[currentLanguage] || I18N.pt;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    const value = dict[key];
    if (typeof value === "string") {
      el.innerHTML = value;
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (!key) return;
    const value = dict[key];
    if (typeof value === "string") {
      el.setAttribute("placeholder", value);
    }
  });
  document.title = t("app.title");
}

function setLanguage(lang, { persist = true } = {}) {
  currentLanguage = lang === "en" ? "en" : "pt";
  if (persist) {
    localStorage.setItem("language", currentLanguage);
  }
  document.documentElement.lang = currentLanguage === "en" ? "en" : "pt-BR";
  applyTranslations();
  if (languageButtons) {
    languageButtons.forEach((btn) => {
      const active = btn.dataset.lang === currentLanguage;
      btn.setAttribute("aria-pressed", String(active));
      btn.classList.toggle("active", active);
    });
  }
  if (typeof renderCardsPage === "function") {
    renderCardsPage();
  }
  if (typeof renderShareLinks === "function") {
    renderShareLinks(shareLinksCache);
  }
  if (typeof syncOnboarding === "function") {
    syncOnboarding();
  }
  if (toggleCardsBtn) {
    toggleCardsBtn.textContent = cardsEl.classList.contains("blur-answers")
      ? t("cards.showAnswers")
      : t("cards.hideAnswers");
  }
  if (collapseCardsBtn) {
    collapseCardsBtn.textContent = cardsWrapper.classList.contains("hidden")
      ? t("cards.expand")
      : t("cards.collapse");
  }
  if (typeof loadExamSessions === "function") {
    void loadExamSessions({ silent: true });
  }
  if (typeof renderImportPreview === "function") {
    renderImportPreview();
  }
}

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container) {
  if (!container) return [];
  return Array.from(container.querySelectorAll(focusableSelector)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

function trapModalFocus(modal, event) {
  if (event.key !== "Tab") return;
  const focusable = getFocusableElements(modal);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function activateModal(modal, { initialFocus } = {}) {
  if (!modal || modalStack.some((entry) => entry.modal === modal)) return;
  const previousActive =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const handler = (event) => trapModalFocus(modal, event);
  modal.addEventListener("keydown", handler);
  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  modalStack.push({ modal, previousActive, handler });
  requestAnimationFrame(() => {
    const focusTarget = initialFocus || getFocusableElements(modal)[0];
    if (focusTarget && typeof focusTarget.focus === "function") {
      focusTarget.focus();
    }
  });
}

function deactivateModal(modal) {
  const index = modalStack.findIndex((entry) => entry.modal === modal);
  if (index === -1) return;
  const { previousActive, handler } = modalStack[index];
  modalStack.splice(index, 1);
  modal.removeEventListener("keydown", handler);
  modal.classList.add("hidden");
  if (modal === confirmModal) {
    confirmAction = null;
  }
  if (!modalStack.length) {
    document.body.classList.remove("modal-open");
  }
  if (previousActive && typeof previousActive.focus === "function") {
    previousActive.focus();
  }
}

function closeTopModal() {
  const top = modalStack[modalStack.length - 1];
  if (top) {
    deactivateModal(top.modal);
    return true;
  }
  return false;
}

function isSoundEnabled() {
  return localStorage.getItem("sound_enabled") !== "0";
}

function isBackgroundEnabled() {
  return isSoundEnabled() && localStorage.getItem("bg_sound_enabled") !== "0";
}

function scheduleTone({ freq, startTime, duration, volume }) {
  const osc = clickAudioCtx.createOscillator();
  const gain = clickAudioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.connect(gain).connect(clickAudioCtx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
}

function getBackgroundVolume() {
  const stored = Number(localStorage.getItem("bg_sound_volume"));
  const value = Number.isFinite(stored) ? stored : 35;
  return Math.min(100, Math.max(0, value));
}

function applyBackgroundVolume() {
  if (!bgAudioCtx || !bgGain) return;
  const now = bgAudioCtx.currentTime;
  const target = (getBackgroundVolume() / 100) * 0.06;
  bgGain.gain.setTargetAtTime(target, now, 0.2);
}

function startBackgroundAudio() {
  if (!isBackgroundEnabled()) return;
  if (!bgAudioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    bgAudioCtx = new AudioContext();
    bgGain = bgAudioCtx.createGain();
    bgGain.gain.value = 0.0;

    const highpass = bgAudioCtx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 120;
    highpass.Q.value = 0.7;

    bgFilter = bgAudioCtx.createBiquadFilter();
    bgFilter.type = "lowpass";
    bgFilter.frequency.value = 1200;
    bgFilter.Q.value = 0.7;

    bgGain.connect(bgAudioCtx.destination);

    const buffer = bgAudioCtx.createBuffer(1, bgAudioCtx.sampleRate * 2, bgAudioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.35;
    }
    bgNoise = bgAudioCtx.createBufferSource();
    bgNoise.buffer = buffer;
    bgNoise.loop = true;
    bgNoise.connect(highpass);
    highpass.connect(bgFilter).connect(bgGain);
    bgNoise.start();

    bgLfo = bgAudioCtx.createOscillator();
    const lfoGain = bgAudioCtx.createGain();
    bgLfo.frequency.value = 0.03;
    lfoGain.gain.value = 120;
    bgLfo.connect(lfoGain).connect(bgFilter.frequency);
    bgLfo.start();

    const now = bgAudioCtx.currentTime;
    bgGain.gain.setValueAtTime(0.0, now);
    const target = (getBackgroundVolume() / 100) * 0.06;
    bgGain.gain.linearRampToValueAtTime(target, now + 1.2);
  }
  if (bgAudioCtx && bgAudioCtx.state === "suspended") {
    bgAudioCtx.resume();
  }
  applyBackgroundVolume();
}

function stopBackgroundAudio() {
  if (!bgAudioCtx || !bgGain) return;
  const now = bgAudioCtx.currentTime;
  bgGain.gain.cancelScheduledValues(now);
  bgGain.gain.setValueAtTime(bgGain.gain.value, now);
  bgGain.gain.linearRampToValueAtTime(0.0, now + 0.6);
  setTimeout(() => {
    if (bgNoise) {
      try {
        bgNoise.stop();
      } catch (err) {
        // ignore
      }
    }
    if (bgLfo) {
      try {
        bgLfo.stop();
      } catch (err) {
        // ignore
      }
    }
    if (bgAudioCtx) {
      bgAudioCtx.close();
    }
    bgAudioCtx = null;
    bgNoise = null;
    bgFilter = null;
    bgLfo = null;
    bgGain = null;
  }, 700);
}

function syncBackgroundAudio({ immediate = false } = {}) {
  if (!isBackgroundEnabled()) {
    bgStartPending = false;
    stopBackgroundAudio();
    return;
  }
  bgStartPending = true;
  if (immediate) {
    maybeStartBackgroundAudio();
  }
}

function maybeStartBackgroundAudio() {
  if (!bgStartPending) return;
  if (!isBackgroundEnabled()) {
    bgStartPending = false;
    return;
  }
  startBackgroundAudio();
  if (bgAudioCtx) {
    bgStartPending = false;
  }
}

function playClickSound() {
  try {
    if (!isSoundEnabled()) return;
    if (!clickAudioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      clickAudioCtx = new AudioContext();
    }
    if (clickAudioCtx.state === "suspended") {
      clickAudioCtx.resume();
    }
    scheduleTone({
      freq: 520,
      startTime: clickAudioCtx.currentTime,
      duration: 0.09,
      volume: 0.06,
    });
  } catch (err) {
    // Fail silently for older/locked browsers.
  }
}

function playImportantSound() {
  try {
    if (!isSoundEnabled()) return;
    if (!clickAudioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      clickAudioCtx = new AudioContext();
    }
    if (clickAudioCtx.state === "suspended") {
      clickAudioCtx.resume();
    }
    const now = clickAudioCtx.currentTime;
    scheduleTone({ freq: 480, startTime: now, duration: 0.08, volume: 0.07 });
    scheduleTone({ freq: 680, startTime: now + 0.1, duration: 0.1, volume: 0.06 });
  } catch (err) {
    // Fail silently for older/locked browsers.
  }
}

function playDeleteSound() {
  try {
    if (!isSoundEnabled()) return;
    if (!clickAudioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      clickAudioCtx = new AudioContext();
    }
    if (clickAudioCtx.state === "suspended") {
      clickAudioCtx.resume();
    }
    const now = clickAudioCtx.currentTime;
    scheduleTone({ freq: 380, startTime: now, duration: 0.08, volume: 0.055 });
    scheduleTone({ freq: 300, startTime: now + 0.1, duration: 0.1, volume: 0.05 });
  } catch (err) {
    // Fail silently for older/locked browsers.
  }
}

function playCreateSound() {
  try {
    if (!isSoundEnabled()) return;
    if (!clickAudioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      clickAudioCtx = new AudioContext();
    }
    if (clickAudioCtx.state === "suspended") {
      clickAudioCtx.resume();
    }
    const now = clickAudioCtx.currentTime;
    scheduleTone({ freq: 520, startTime: now, duration: 0.06, volume: 0.05 });
    scheduleTone({ freq: 660, startTime: now + 0.07, duration: 0.07, volume: 0.055 });
    scheduleTone({ freq: 880, startTime: now + 0.15, duration: 0.08, volume: 0.05 });
  } catch (err) {
    // Fail silently for older/locked browsers.
  }
}

function playGenerateSound() {
  try {
    if (!isSoundEnabled()) return;
    if (!clickAudioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      clickAudioCtx = new AudioContext();
    }
    if (clickAudioCtx.state === "suspended") {
      clickAudioCtx.resume();
    }
    const now = clickAudioCtx.currentTime;
    scheduleTone({ freq: 620, startTime: now, duration: 0.07, volume: 0.05 });
    scheduleTone({ freq: 740, startTime: now + 0.08, duration: 0.08, volume: 0.045 });
  } catch (err) {
    // Fail silently for older/locked browsers.
  }
}

function playGoalSound() {
  try {
    if (!isSoundEnabled()) return;
    if (!clickAudioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      clickAudioCtx = new AudioContext();
    }
    if (clickAudioCtx.state === "suspended") {
      clickAudioCtx.resume();
    }
    const now = clickAudioCtx.currentTime;
    scheduleTone({ freq: 420, startTime: now, duration: 0.06, volume: 0.045 });
    scheduleTone({ freq: 520, startTime: now + 0.07, duration: 0.06, volume: 0.04 });
  } catch (err) {
    // Fail silently for older/locked browsers.
  }
}

function playNavSound() {
  try {
    if (!isSoundEnabled()) return;
    if (!clickAudioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      clickAudioCtx = new AudioContext();
    }
    if (clickAudioCtx.state === "suspended") {
      clickAudioCtx.resume();
    }
    scheduleTone({
      freq: 560,
      startTime: clickAudioCtx.currentTime,
      duration: 0.08,
      volume: 0.05,
    });
  } catch (err) {
    // Fail silently for older/locked browsers.
  }
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const button = target.closest("button, .cta-link, .ghost-link");
  if (!button) return;
  if (button.hasAttribute("disabled")) return;
  maybeStartBackgroundAudio();
  if (button.dataset.sound === "important") {
    playImportantSound();
    return;
  }
  if (button.dataset.sound === "generate") {
    playGenerateSound();
    return;
  }
  if (button.dataset.sound === "goal") {
    playGoalSound();
    return;
  }
  if (button.dataset.sound === "nav") {
    playNavSound();
    return;
  }
  playClickSound();
});

window.addEventListener("pagehide", () => {
  stopBackgroundAudio();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopBackgroundAudio();
  }
});

function openConfirm({ title, message, okText = "Confirmar", danger = false, onConfirm }) {
  confirmTitle.textContent = title;
  confirmMessage.textContent = message;
  confirmOk.textContent = okText;
  confirmOk.classList.toggle("danger", danger);
  confirmOk.classList.toggle("accent", true);
  confirmAction = onConfirm;
  activateModal(confirmModal, { initialFocus: confirmCancel });
}

function closeConfirm() {
  deactivateModal(confirmModal);
}

function getApiKey() {
  return localStorage.getItem("ai_api_key") || localStorage.getItem("openai_api_key") || "";
}

function getActiveCollection() {
  return localStorage.getItem("active_collection") || "";
}

function setActiveCollection(value) {
  localStorage.setItem("active_collection", value || "");
}

function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  themeButtons.forEach((btn) => {
    const isActive = btn.dataset.theme === theme;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

function setCardActionsEnabled(enabled) {
  collectionWarning.classList.toggle("hidden", enabled);
  if (generateBtn) generateBtn.disabled = !enabled;
  if (saveBtn) saveBtn.disabled = !enabled;
  if (openImportBtn) openImportBtn.disabled = !enabled;
  if (importFileInput) importFileInput.disabled = !enabled;
  if (importCardsBtn) importCardsBtn.disabled = !enabled;
  if (topicInput) topicInput.disabled = !enabled;
  if (countInput) countInput.disabled = !enabled;
  if (questionInput) questionInput.disabled = !enabled;
  if (answerInput) answerInput.disabled = !enabled;
  if (!enabled && importPanel) {
    importPanel.classList.add("hidden");
    if (importBackdrop) importBackdrop.classList.add("hidden");
    if (importBackdrop) importBackdrop.classList.remove("visible");
  }
}

function setShareControlsEnabled(enabled) {
  if (shareTemplateBtn) shareTemplateBtn.disabled = !enabled;
  if (shareChallengeBtn) shareChallengeBtn.disabled = !enabled;
  if (openShareModalBtn) openShareModalBtn.disabled = !enabled;
}

function resetShareLink() {
  if (shareLinkInput) shareLinkInput.value = "";
  if (copyShareLinkBtn) copyShareLinkBtn.disabled = true;
  if (openShareLink) {
    openShareLink.classList.add("disabled");
    openShareLink.setAttribute("aria-disabled", "true");
    openShareLink.removeAttribute("href");
  }
  if (deleteShareLinkBtn) deleteShareLinkBtn.disabled = true;
  if (shareStatus) {
    shareStatus.textContent = "";
  }
}

function updateShareControls() {
  const hasCollection = !!getActiveCollection();
  setShareControlsEnabled(hasCollection);
  if (!hasCollection) {
    resetShareLink();
  }
}

function setShareLinksStatus(text, { loading = false } = {}) {
  if (!shareLinksStatus) return;
  shareLinksStatus.textContent = translateStatus(text || "");
  shareLinksStatus.classList.toggle("loading", loading);
}

function getShareManageToken(token) {
  try {
    return localStorage.getItem(`share_manage_${token}`) || "";
  } catch (err) {
    return "";
  }
}

function buildShareUrl({ token, type }) {
  const base = window.location.origin;
  const path = type === "challenge" ? "challenge" : "share";
  return `${base}/${path}/${token}`;
}

function formatShareDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString();
}

function formatShareUses(link) {
  if (link.max_uses == null) return t("share.list.uses", { used: link.uses });
  return t("share.list.usesOf", { used: link.uses, max: link.max_uses });
}

function getShareStatusText(link) {
  if (link.status === "disabled" || link.disabled) return t("share.status.disabled");
  if (link.status === "expired" || link.expired) return t("share.status.expired");
  if (link.status === "exhausted" || (link.uses_remaining !== null && link.uses_remaining <= 0)) {
    return t("share.status.exhausted");
  }
  return t("share.status.active");
}

function getShareStatusClass(link) {
  if (link.status === "disabled" || link.disabled) return "is-disabled";
  if (link.status === "expired" || link.expired) return "is-expired";
  if (link.status === "exhausted" || (link.uses_remaining !== null && link.uses_remaining <= 0)) {
    return "is-exhausted";
  }
  return "is-active";
}

function renderShareLinks(list) {
  if (!shareLinksList) return;
  shareLinksList.innerHTML = "";
  if (!Array.isArray(list) || list.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = t("share.list.empty");
    shareLinksList.appendChild(empty);
    if (shareLinksRevokeBtn) shareLinksRevokeBtn.disabled = true;
    return;
  }
  const fragment = document.createDocumentFragment();
  let hasManageable = false;
  list.forEach((link) => {
    const item = document.createElement("div");
    item.className = "share-link-item";
    item.dataset.token = link.token;
    item.dataset.type = link.type;

    const info = document.createElement("div");
    info.className = "share-link-info";

    const title = document.createElement("div");
    title.className = "share-link-title";
    const titleStrong = document.createElement("strong");
    titleStrong.textContent =
      link.type === "challenge" ? t("share.type.challenge") : t("share.type.template");
    const titleName = document.createElement("span");
    titleName.className = "share-link-name";
    titleName.textContent = link.name ? `· ${link.name}` : "";
    const tokenEl = document.createElement("span");
    tokenEl.className = "share-link-token";
    tokenEl.textContent = link.token;
    title.appendChild(titleStrong);
    title.appendChild(titleName);
    title.appendChild(tokenEl);

    const meta = document.createElement("div");
    meta.className = "share-link-meta";
    const expiresLabel = link.expires_at
      ? t("share.list.expires", { date: formatShareDate(link.expires_at) })
      : t("share.list.noExpiry");
    meta.textContent = `${expiresLabel} · ${formatShareUses(link)}`;

    const status = document.createElement("span");
    status.className = `status-chip ${getShareStatusClass(link)}`;
    status.textContent = getShareStatusText(link);

    info.appendChild(title);
    info.appendChild(meta);
    info.appendChild(status);

    const actions = document.createElement("div");
    actions.className = "share-link-actions";
    const copyBtn = document.createElement("button");
    copyBtn.className = "ghost small";
    copyBtn.type = "button";
    copyBtn.dataset.action = "copy";
    copyBtn.textContent = t("share.action.copy");
    const openBtn = document.createElement("button");
    openBtn.className = "ghost small";
    openBtn.type = "button";
    openBtn.dataset.action = "open";
    openBtn.textContent = t("share.action.open");
    const expireBtn = document.createElement("button");
    expireBtn.className = "ghost small";
    expireBtn.type = "button";
    expireBtn.dataset.action = "expire";
    expireBtn.textContent = t("share.action.expire");
    const revokeBtn = document.createElement("button");
    revokeBtn.className = "ghost danger small icon-btn";
    revokeBtn.type = "button";
    revokeBtn.dataset.action = "revoke";
    revokeBtn.textContent = "✕";
    revokeBtn.setAttribute("aria-label", t("share.action.delete.ok"));
    revokeBtn.title = t("share.action.delete.ok");

    const isInactive =
      link.disabled || link.expired || (link.uses_remaining !== null && link.uses_remaining <= 0);
    if (isInactive) {
      openBtn.disabled = true;
    }

    const manageToken = getShareManageToken(link.token);
    if (!manageToken) {
      expireBtn.disabled = true;
      revokeBtn.disabled = true;
      expireBtn.title = t("share.action.noPermissionExpire");
      revokeBtn.title = t("share.action.noPermissionDelete");
    } else {
      hasManageable = true;
      if (link.disabled) {
        revokeBtn.disabled = true;
      }
      if (link.expired) {
        expireBtn.disabled = true;
      }
    }

    actions.appendChild(copyBtn);
    actions.appendChild(openBtn);
    actions.appendChild(expireBtn);
    actions.appendChild(revokeBtn);

    item.appendChild(info);
    item.appendChild(actions);
    fragment.appendChild(item);
  });

  shareLinksList.appendChild(fragment);
  if (shareLinksRevokeBtn) shareLinksRevokeBtn.disabled = !hasManageable;
}

async function loadShareLinks({ silent = false } = {}) {
  if (!shareLinksList) return;
  const collectionId = getActiveCollection();
  if (!collectionId) {
    shareLinksCache = [];
    renderShareLinks([]);
    setShareLinksStatus(t("share.list.select"));
    return;
  }
  if (!silent) {
    setShareLinksStatus(t("share.list.loading"), { loading: true });
  }
  try {
    const res = await fetch(`/api/share/list?collection_id=${collectionId}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || t("share.list.error"));
    }
    shareLinksCache = Array.isArray(data) ? data : [];
    renderShareLinks(shareLinksCache);
    setShareLinksStatus(shareLinksCache.length ? "" : t("share.list.empty"));
  } catch (err) {
    shareLinksCache = [];
    renderShareLinks([]);
    setShareLinksStatus(err.message || t("share.list.error"));
  } finally {
    if (shareLinksStatus) shareLinksStatus.classList.remove("loading");
  }
}

function setOnboardingStatus(text) {
  if (!onboardingStatus) return;
  onboardingStatus.textContent = text || "";
}

function syncOnboarding() {
  if (!onboardingSection) return;
  const noCollections = collectionsCache.length === 0;
  const noCards = lastCardsCount === 0;
  const shouldShow = noCollections || noCards;
  onboardingSection.classList.toggle("hidden", !shouldShow);
  const hasActiveCollection = Boolean(getActiveCollection());
  if (onboardingOpenImport) onboardingOpenImport.disabled = noCollections || !hasActiveCollection;
  if (onboardingOpenStudy) onboardingOpenStudy.disabled = noCollections || noCards;
  if (onboardingOpenExam) onboardingOpenExam.disabled = noCollections || noCards;
  if (!shouldShow) {
    setOnboardingStatus("");
    return;
  }
  if (noCollections) {
    setOnboardingStatus(t("onboarding.status.noCollections"));
  } else if (noCards) {
    setOnboardingStatus(t("onboarding.status.noCards"));
  } else {
    setOnboardingStatus("");
  }
}

function formatISODateCompact(value) {
  const iso = String(value || "").trim();
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return iso || "—";
  const [, , month, day] = match;
  if (currentLanguage === "en") {
    return `${month}/${day}`;
  }
  return `${day}/${month}`;
}

function formatPeriodCompact(start, end) {
  const startIso = String(start || "").trim();
  const endIso = String(end || "").trim();
  if (!startIso || !endIso) {
    return `${startIso || "—"} → ${endIso || "—"}`;
  }
  const startShort = formatISODateCompact(startIso);
  const endShort = formatISODateCompact(endIso);
  if (!startShort || !endShort || startShort === "—" || endShort === "—") {
    return `${startIso || "—"} → ${endIso || "—"}`;
  }
  return `${startShort}–${endShort}`;
}

async function loadStudyFocus({ silent = false } = {}) {
  if (!studyFocusEl) return;
  const params = new URLSearchParams();
  const collectionId = getActiveCollection();
  if (collectionId) {
    params.set("collection_id", collectionId);
  }
  try {
    const res = await fetch(`/api/study/summary?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Erro ao carregar foco.");
    }
    const sessionsCount = Number(data.sessions || 0);
    if (focusBreakdownSessions) focusBreakdownSessions.textContent = String(sessionsCount);
    if (focusBreakdownPeriod) {
      const start = data.period_start || "—";
      const end = data.period_end || "—";
      focusBreakdownPeriod.textContent = formatPeriodCompact(start, end);
      focusBreakdownPeriod.title = `${start} → ${end}`;
    }
    if (focusBreakdownScore) {
      const score = typeof data.score === "number" ? data.score : 0;
      focusBreakdownScore.textContent = `${score}%`;
    }
    if (!data.sessions) {
      studyFocusEl.textContent = t("hero.focus.noSessions");
    } else if (typeof data.score === "number" && data.score > 0) {
      studyFocusEl.textContent = `${data.label} · ${data.score}%`;
    } else {
      studyFocusEl.textContent = data.label || t("hero.focus.noData");
    }
    studyFocusEl.title = t("hero.focus.title");
  } catch (err) {
    if (!silent) {
      studyFocusEl.textContent = t("hero.focus.noData");
    }
  }
}

function formatExamDuration(seconds) {
  const total = Math.max(0, Math.floor(Number(seconds || 0)));
  const minutes = Math.floor(total / 60);
  const secs = String(total % 60).padStart(2, "0");
  return `${String(minutes).padStart(2, "0")}:${secs}`;
}

function buildExamSubtitle({ name, topic, createdAt, durationSec, total }) {
  const dateLabel = new Date(createdAt).toLocaleString();
  const subtitleParts = [];
  if (name) subtitleParts.push(escapeHtml(dateLabel));
  if (topic) subtitleParts.push(escapeHtml(topic));
  subtitleParts.push(
    escapeHtml(t("exams.item", { duration: formatExamDuration(durationSec), total }))
  );
  return { dateLabel, subtitleHtml: subtitleParts.join(" · ") };
}

function renderExamSessions(sessions) {
  if (!examsList) return;
  examsList.innerHTML = "";
  const list = Array.isArray(sessions) ? sessions : [];
  if (!list.length) {
    examsList.textContent = t("exams.empty");
    if (clearExamsBtn) clearExamsBtn.disabled = true;
    return;
  }
  if (clearExamsBtn) clearExamsBtn.disabled = false;

  const sessionById = new Map(list.map((session) => [String(session.id), session]));

  function isUnstartedImportedExam(session) {
    if (!session || typeof session !== "object") return false;
    const answered = Number(session.answered || 0);
    const correct = Number(session.correct || 0);
    const incorrect = Number(session.incorrect || 0);
    const durationSec = Number(session.duration_sec || 0);
    const startedAt = String(session.started_at || "").trim();

    if (startedAt) return false;
    if (answered !== 0 || correct !== 0 || incorrect !== 0) return false;
    if (durationSec !== 0) return false;

    const details = session.details && typeof session.details === "object" ? session.details : {};
    const hasQuestions = Array.isArray(details.questions) && details.questions.length > 0;
    const hasAnswers = Array.isArray(details.answers);
    if (!hasQuestions || !hasAnswers) return false;
    if (details.imported === true) return true;
    // Back-compat: imports older than the `imported` flag won't have `timed_out/unanswered`.
    const hasTimedOut = Object.prototype.hasOwnProperty.call(details, "timed_out");
    const hasUnanswered = Object.prototype.hasOwnProperty.call(details, "unanswered");
    return !hasTimedOut && !hasUnanswered;
  }

  function isViewableExamSession(session) {
    if (!session || typeof session !== "object") return false;
    const answered = Number(session.answered || 0);
    const correct = Number(session.correct || 0);
    const incorrect = Number(session.incorrect || 0);
    const durationSec = Number(session.duration_sec || 0);
    if (answered > 0 || correct > 0 || incorrect > 0 || durationSec > 0) return true;

    const details = session.details && typeof session.details === "object" ? session.details : {};
    if (details && details.timed_out === true) return true;
    const ans = Array.isArray(details.answers) ? details.answers : [];
    return ans.some((sel) => Array.isArray(sel) && sel.length > 0);
  }

  function hashDjb2(value) {
    const str = String(value || "");
    let hash = 5381;
    for (let i = 0; i < str.length; i += 1) {
      hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    }
    return (hash >>> 0).toString(16);
  }

  function normalizeGroupText(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ");
  }

  function canonicalizeQuestionText(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ");
  }

  function buildQuestionsHash(session) {
    const details = session && session.details && typeof session.details === "object" ? session.details : {};
    const qs = Array.isArray(details.questions) ? details.questions : [];
    if (!qs.length) return "";
    const parts = [];
    qs.forEach((q) => {
      const question = canonicalizeQuestionText(q && q.question ? q.question : "");
      const options = Array.isArray(q && q.options) ? q.options : [];
      if (!question || options.length !== 4) return;
      parts.push(
        [
          question,
          options.map((opt) => canonicalizeQuestionText(opt)).join("|"),
        ].join("::")
      );
    });
    if (!parts.length) return "";
    // Order-insensitive: retakes shuffle question order, but it's the same exam template.
    parts.sort();
    return hashDjb2(parts.join("\n"));
  }

  function buildExamGroupKey(session) {
    const collection = session && session.collection_id ? String(session.collection_id) : "0";
    const qHash = buildQuestionsHash(session);
    if (qHash) return `${collection}|q:${qHash}`;
    const name = normalizeGroupText(session && session.name);
    if (name) return `${collection}|n:${name}`;
    const topic = normalizeGroupText(session && session.topic);
    if (topic) return `${collection}|t:${topic}`;
    return `id:${String(session && session.id)}`;
  }

  function storeExamViewPayload(session) {
    if (!isViewableExamSession(session)) return { ok: false, error: t("exams.notCompleted") };
    const details = session && session.details && typeof session.details === "object" ? session.details : {};
    const qs = Array.isArray(details.questions) ? details.questions : [];
    const ans = Array.isArray(details.answers) ? details.answers : [];
    if (!qs.length) return { ok: false, error: t("exams.retakeMissing") };
    try {
      const payload = {
        id: session.id,
        name: (session.name || "").trim(),
        topic: (session.topic || "").trim(),
        created_at: session.created_at,
        started_at: session.started_at,
        duration_sec: session.duration_sec,
        total: session.total,
        answered: session.answered,
        correct: session.correct,
        incorrect: session.incorrect,
        collection_id: session.collection_id || null,
        allow_multi: Boolean(session.allow_multi),
        time_limit_sec: session.time_limit_sec || null,
        details: {
          ...details,
          questions: qs,
          answers: ans,
        },
      };
      localStorage.setItem("exam_view_payload", JSON.stringify(payload));
      if (payload.collection_id) {
        localStorage.setItem("active_collection", String(payload.collection_id));
      }
      return { ok: true };
    } catch (err) {
      return { ok: false, error: t("exams.retakeMissing") };
    }
  }

  const groupsMap = new Map();
  list.forEach((session) => {
    const key = buildExamGroupKey(session);
    if (!groupsMap.has(key)) {
      groupsMap.set(key, { key, attempts: [] });
    }
    groupsMap.get(key).attempts.push(session);
  });

  const groups = Array.from(groupsMap.values())
    .map((group) => {
      group.attempts.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
      group.latest = group.attempts.find((attempt) => isViewableExamSession(attempt)) || group.attempts[0];
      return group;
    })
    .sort((a, b) => Number(b.latest.id || 0) - Number(a.latest.id || 0));

  groups.forEach((group, groupIdx) => {
    const session = group.latest;
    const item = document.createElement("div");
    item.className = "session-item exam-session-card";
    const unanswered = Math.max(0, Number(session.total || 0) - Number(session.answered || 0));
    const name = (session.name || "").trim();
    const topic = (session.topic || "").trim();
    const dateLabel = new Date(session.created_at).toLocaleString();
    const subtitleParts = [escapeHtml(dateLabel)];
    if (topic) subtitleParts.push(escapeHtml(topic));
    subtitleParts.push(
      escapeHtml(t("exams.item", { duration: formatExamDuration(session.duration_sec), total: session.total }))
    );
    subtitleParts.push(escapeHtml(t("exams.attemptsCount", { count: group.attempts.length })));
    const subtitlePayload = { dateLabel, subtitleHtml: subtitleParts.join(" · ") };
    const canView = isViewableExamSession(session);
    const attemptsPanelId = `exam-attempts-${groupIdx}`;
    const hasAttemptHistory = group.attempts.length > 1;
    const attemptsRows = group.attempts
      .slice()
      .map((attempt) => {
        const attemptDate = new Date(attempt.created_at).toLocaleString();
        const total = Number(attempt.total || 0);
        const correct = Number(attempt.correct || 0);
        const rate = total ? Math.round((correct / total) * 100) : 0;
        const duration = formatExamDuration(attempt.duration_sec);
        const viewBtn = isViewableExamSession(attempt)
          ? `<button class="ghost small view-exam-attempt" type="button" data-id="${attempt.id}" data-sound="nav">${t(
              "exams.view"
            )}</button>`
          : "";
        return `
          <tr>
            <td>${escapeHtml(attemptDate)}</td>
            <td>${escapeHtml(`${correct}/${total} (${rate}%)`)}</td>
            <td>${escapeHtml(duration)}</td>
            <td>
              <div class="inline">
                ${viewBtn}
                <button class="ghost small danger delete-exam-attempt" type="button" data-id="${attempt.id}" data-sound="delete">${t(
                  "exams.delete"
                )}</button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");

    item.innerHTML = `
      <div class="session-top">
        <div class="session-title-row">
          <strong class="session-title">${escapeHtml(name || topic || subtitlePayload.dateLabel)}</strong>
          <div class="inline">
            ${
              hasAttemptHistory
                ? `<button class="ghost icon-btn tiny open-exam-attempts" type="button" aria-label="${escapeHtml(
                    t("exams.attemptsTitle", { count: group.attempts.length })
                  )}" aria-expanded="false" aria-controls="${attemptsPanelId}">≡</button>`
                : ""
            }
            <button class="ghost icon-btn tiny edit-exam-name" type="button" data-id="${
              session.id
            }" aria-label="${escapeHtml(t("exams.name.edit"))}">✎</button>
          </div>
        </div>
        <div class="muted session-subtitle">${subtitlePayload.subtitleHtml}</div>
        <div id="${attemptsPanelId}" class="help-panel hidden exam-attempts-panel" role="note" aria-live="polite">
          <div class="exam-attempts-header">
            <strong>${escapeHtml(t("exams.attemptsTitle", { count: group.attempts.length }))}</strong>
            <button class="ghost icon-btn tiny close-exam-attempts" type="button" aria-label="${escapeHtml(
              t("exams.attempts.close")
            )}">✕</button>
          </div>
          <div class="preview-table" style="margin-top: 10px">
            <table>
              <thead>
                <tr>
                  <th>${escapeHtml(t("exams.attempts.col.date"))}</th>
                  <th>${escapeHtml(t("exams.attempts.col.score"))}</th>
                  <th>${escapeHtml(t("exams.attempts.col.time"))}</th>
                  <th>${escapeHtml(t("exams.attempts.col.actions"))}</th>
                </tr>
              </thead>
              <tbody>
                ${attemptsRows}
              </tbody>
            </table>
          </div>
        </div>
        <div class="session-edit hidden">
          <input class="session-name-input" type="text" maxlength="120" value="${escapeHtml(
            name
          )}" placeholder="${escapeHtml(t("exams.name.placeholder"))}" />
          <div class="session-edit-actions">
            <button class="ghost small save-exam-name" type="button" data-id="${
              session.id
            }" data-sound="nav">${t("exams.name.save")}</button>
            <button class="ghost small cancel-exam-name" type="button" data-id="${
              session.id
            }">${t("exams.name.cancel")}</button>
          </div>
        </div>
      </div>
      <div class="session-stats" aria-label="Resumo">
        <div class="session-stat">
          <span class="muted">${t("exams.stats.correct")}</span>
          <strong>${session.correct}</strong>
        </div>
        <div class="session-stat">
          <span class="muted">${t("exams.stats.incorrect")}</span>
          <strong>${session.incorrect}</strong>
        </div>
        <div class="session-stat">
          <span class="muted">${t("exams.stats.unanswered")}</span>
          <strong>${unanswered}</strong>
        </div>
      </div>
      <div class="session-actions">
        ${
          canView
            ? `<button class="ghost small view-exam" type="button" data-id="${session.id}" data-sound="nav">${t(
                "exams.view"
              )}</button>`
            : ""
        }
        <button class="ghost small retake-exam" type="button" data-id="${
          session.id
        }" data-sound="nav">${isUnstartedImportedExam(session) ? t("exams.start") : t("exams.retake")}</button>
        <button class="ghost small danger delete-exam" type="button" data-id="${
          session.id
        }" data-sound="delete">${t("exams.delete")}</button>
      </div>
    `;
    examsList.appendChild(item);
  });

  function closeEditing(container) {
    container.classList.remove("is-editing");
    const editor = container.querySelector(".session-edit");
    if (editor) editor.classList.add("hidden");
    const subtitle = container.querySelector(".session-subtitle");
    if (subtitle) subtitle.classList.remove("hidden");
  }

  examsList.querySelectorAll(".edit-exam-name").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".session-item");
      if (!item) return;
      examsList.querySelectorAll(".session-item.is-editing").forEach((open) => {
        if (open !== item) closeEditing(open);
      });
      item.classList.add("is-editing");
      const editor = item.querySelector(".session-edit");
      const subtitle = item.querySelector(".session-subtitle");
      if (subtitle) subtitle.classList.add("hidden");
      if (editor) {
        editor.classList.remove("hidden");
        const input = editor.querySelector(".session-name-input");
        if (input) {
          input.focus();
          input.select();
        }
      }
    });
  });

  examsList.querySelectorAll(".cancel-exam-name").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".session-item");
      if (!item) return;
      const sessionId = btn.dataset.id;
      const session = list.find((s) => String(s.id) === String(sessionId));
      const input = item.querySelector(".session-name-input");
      if (input && session) input.value = (session.name || "").trim();
      closeEditing(item);
    });
  });

  examsList.querySelectorAll(".save-exam-name").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const item = btn.closest(".session-item");
      if (!item) return;
      const sessionId = btn.dataset.id;
      const session = sessionById.get(String(sessionId));
      const input = item.querySelector(".session-name-input");
      if (!input || !session) return;
      const newName = (input.value || "").trim();
      btn.disabled = true;
      try {
        const res = await fetch(`/api/exam/sessions/${sessionId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newName }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Erro ao salvar nome.");
        }
        session.name = String(data.name || "");
        closeEditing(item);
        void loadExamSessions({ silent: true });
      } catch (err) {
        setStatus(examsStatus, err.message);
        setTimeout(() => setStatus(examsStatus, ""), 1800);
      } finally {
        btn.disabled = false;
      }
    });
  });

  examsList.querySelectorAll(".session-name-input").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const item = input.closest(".session-item");
        if (item) closeEditing(item);
        return;
      }
      if (event.key === "Enter") {
        const item = input.closest(".session-item");
        const saveBtn = item && item.querySelector(".save-exam-name");
        if (saveBtn) saveBtn.click();
      }
    });
  });

  function closeAllAttemptPanels(exceptId = "") {
    examsList.querySelectorAll(".exam-attempts-panel").forEach((panel) => {
      if (exceptId && panel.id === exceptId) return;
      panel.classList.add("hidden");
    });
    examsList.querySelectorAll(".open-exam-attempts").forEach((btn) => {
      if (exceptId && btn.getAttribute("aria-controls") === exceptId) return;
      btn.setAttribute("aria-expanded", "false");
    });
  }

  examsList.querySelectorAll(".open-exam-attempts").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const panelId = btn.getAttribute("aria-controls") || "";
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;
      const willOpen = panel.classList.contains("hidden");
      closeAllAttemptPanels(willOpen ? panelId : "");
      panel.classList.toggle("hidden", !willOpen);
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });

  examsList.querySelectorAll(".close-exam-attempts").forEach((btn) => {
    btn.addEventListener("click", () => {
      closeAllAttemptPanels("");
    });
  });

  examsList.querySelectorAll(".view-exam").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sessionId = btn.dataset.id;
      const session = sessionById.get(String(sessionId));
      const result = storeExamViewPayload(session);
      if (!result.ok) {
        setStatus(examsStatus, result.error || t("exams.retakeMissing"));
        setTimeout(() => setStatus(examsStatus, ""), 1800);
        return;
      }
      window.location.href = "/exam";
    });
  });

  examsList.querySelectorAll(".view-exam-attempt").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sessionId = btn.dataset.id;
      const session = sessionById.get(String(sessionId));
      const result = storeExamViewPayload(session);
      if (!result.ok) {
        setStatus(examsStatus, result.error || t("exams.retakeMissing"));
        setTimeout(() => setStatus(examsStatus, ""), 1800);
        return;
      }
      window.location.href = "/exam";
    });
  });

  examsList.querySelectorAll(".retake-exam").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sessionId = btn.dataset.id;
      const session = sessionById.get(String(sessionId));
      const details = session && session.details && typeof session.details === "object" ? session.details : {};
      const qs = Array.isArray(details.questions) ? details.questions : [];
      if (!qs.length) {
        setStatus(examsStatus, t("exams.retakeMissing"));
        setTimeout(() => setStatus(examsStatus, ""), 1800);
        return;
      }
      if (session && isUnstartedImportedExam(session)) {
        try {
          void fetch(`/api/exam/sessions/${sessionId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mark_started: true }),
            keepalive: true,
          });
        } catch (err) {
          // ignore
        }
      }
      try {
        const payload = {
          session_id: session.id,
          name: (session.name || "").trim(),
          topic: (session.topic || "").trim(),
          collection_id: session.collection_id || null,
          allow_multi: Boolean(session.allow_multi),
          time_limit_sec: session.time_limit_sec || null,
          questions: qs,
          usage: details.usage || {},
        };
        localStorage.setItem("exam_retake_payload", JSON.stringify(payload));
        if (payload.collection_id) {
          localStorage.setItem("active_collection", String(payload.collection_id));
        }
      } catch (err) {
        setStatus(examsStatus, t("exams.retakeMissing"));
        setTimeout(() => setStatus(examsStatus, ""), 1800);
        return;
      }
      window.location.href = "/exam";
    });
  });

  examsList.querySelectorAll(".delete-exam").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const item = btn.closest(".session-item");
      if (item) {
        item.classList.add("is-removing");
        btn.disabled = true;
      }
      playDeleteSound();
      await fetch(`/api/exam/sessions/${btn.dataset.id}`, { method: "DELETE" });
      setTimeout(() => {
        void loadExamSessions({ silent: true });
      }, 360);
    });
  });

  examsList.querySelectorAll(".delete-exam-attempt").forEach((btn) => {
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      playDeleteSound();
      await fetch(`/api/exam/sessions/${btn.dataset.id}`, { method: "DELETE" });
      setTimeout(() => {
        void loadExamSessions({ silent: true });
      }, 360);
    });
  });
}

async function loadExamSessions({ silent = false } = {}) {
  if (!examsList || !examsStatus) return;
  const params = new URLSearchParams();
  const collectionId = getActiveCollection();
  if (collectionId) {
    params.set("collection_id", collectionId);
  }
  params.set("limit", "200");
  try {
    const res = await fetch(`/api/exam/sessions?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Erro ao carregar provas.");
    }
    const sessions = Array.isArray(data.sessions) ? data.sessions : [];
    renderExamSessions(sessions);
    const summary = data.summary || {};
    if (summary && (summary.count || 0) > 0) {
      setStatus(examsStatus, t("exams.summary", { count: summary.count, correct: summary.correct, incorrect: summary.incorrect }));
    } else {
      setStatus(examsStatus, t("exams.empty"));
    }
  } catch (err) {
    renderExamSessions([]);
    if (!silent) {
      setStatus(examsStatus, err.message);
    }
  }
}

function clearExamSessions() {
  if (!examsList || !examsStatus) return;
  const collectionId = getActiveCollection();
  openConfirm({
    title: t("exams.action.clear.title"),
    message: collectionId ? t("exams.action.clear.messageCollection") : t("exams.action.clear.messageAll"),
    okText: t("exams.action.clear.ok"),
    danger: true,
    onConfirm: async () => {
      setStatus(examsStatus, t("exams.list.clearing"));
      try {
        const res = await fetch("/api/exam/sessions/clear", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ collection_id: collectionId ? Number(collectionId) : null }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Erro ao limpar provas.");
        }
        renderExamSessions([]);
        setStatus(examsStatus, t("exams.list.cleared"));
        void loadExamSessions({ silent: true });
      } catch (err) {
        setStatus(examsStatus, err.message);
      }
    },
  });
}

function updateCollectionCompletions() {
  if (!collectionCompletions) return;
  const collectionId = collectionSelect.value;
  if (!collectionId) {
    collectionCompletions.textContent = "";
    return;
  }
  const selected = collectionsCache.find((col) => String(col.id) === String(collectionId));
  if (!selected) {
    collectionCompletions.textContent = "";
    return;
  }
  const count = Number(selected.completion_count || 0);
  collectionCompletions.textContent = `Coleção concluída ${count} ${count === 1 ? "vez" : "vezes"}.`;
}

function nudgeToCollectionWarning() {
  collectionWarning.classList.remove("hidden");
  collectionWarning.classList.remove("shake");
  void collectionWarning.offsetWidth;
  collectionWarning.classList.add("shake");
  collectionWarning.scrollIntoView({ behavior: "smooth", block: "start" });
  window.scrollTo({
    top: Math.max(0, collectionWarning.getBoundingClientRect().top + window.scrollY - 20),
    behavior: "smooth",
  });
}

function applySoundSettingsUI() {
  const generalEnabled = soundToggle ? soundToggle.checked : true;
  if (bgSoundToggle) {
    bgSoundToggle.disabled = !generalEnabled;
  }
  if (studySoundToggle) {
    studySoundToggle.disabled = !generalEnabled;
  }
  if (bgSoundVolume) {
    bgSoundVolume.disabled = !generalEnabled || (bgSoundToggle && !bgSoundToggle.checked);
  }
  if (studySoundVolume) {
    studySoundVolume.disabled = !generalEnabled || (studySoundToggle && !studySoundToggle.checked);
  }
}

function setSoundSettingsOpen(open, { persist = true } = {}) {
  if (!soundSettingsToggle || !soundSettingsGroup) return;
  soundSettingsGroup.classList.toggle("hidden", !open);
  soundSettingsToggle.setAttribute("aria-expanded", String(open));
  if (persist) {
    localStorage.setItem("sound_settings_open", open ? "1" : "0");
  }
}

function loadSoundSettingsState() {
  if (!soundSettingsToggle || !soundSettingsGroup) return;
  const stored = localStorage.getItem("sound_settings_open");
  const open = stored === "1";
  setSoundSettingsOpen(open, { persist: false });
}

function loadSettings() {
  setLanguage(detectLanguage(), { persist: false });
  const savedKey = getApiKey();
  if (savedKey) apiKeyInput.value = savedKey;
  if (soundToggle) {
    soundToggle.checked = isSoundEnabled();
  }
  if (bgSoundToggle) {
    bgSoundToggle.checked = localStorage.getItem("bg_sound_enabled") !== "0";
    bgSoundToggle.disabled = !(soundToggle && soundToggle.checked);
  }
  if (studySoundToggle) {
    studySoundToggle.checked = localStorage.getItem("study_sound_enabled") !== "0";
    studySoundToggle.disabled = !(soundToggle && soundToggle.checked);
  }
  if (bgSoundVolume) {
    const stored = Number(localStorage.getItem("bg_sound_volume"));
    bgSoundVolume.value = Number.isFinite(stored) ? String(stored) : "35";
  }
  if (studySoundVolume) {
    const stored = Number(localStorage.getItem("study_sound_volume"));
    studySoundVolume.value = Number.isFinite(stored) ? String(stored) : "40";
  }
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
  applySoundSettingsUI();
  syncBackgroundAudio();
  loadSoundSettingsState();
}

function setStatus(el, text) {
  el.textContent = translateStatus(text || "");
}

function ensureImportOverlay() {
  if (importOverlay) return importOverlay;
  importOverlay = document.createElement("div");
  importOverlay.id = "import-overlay";
  importOverlay.className = "import-overlay";
  importOverlay.setAttribute("role", "status");
  importOverlay.setAttribute("aria-live", "polite");
  const spinner = document.createElement("span");
  spinner.className = "spinner";
  const text = document.createElement("span");
  text.className = "text";
  importOverlay.appendChild(spinner);
  importOverlay.appendChild(text);
  document.body.appendChild(importOverlay);
  return importOverlay;
}

function setImportOverlay({ visible, text }) {
  const overlay = ensureImportOverlay();
  const textEl = overlay.querySelector(".text");
  if (textEl) textEl.textContent = text || "";
  overlay.classList.toggle("visible", visible);
}

function setImportStatus(text, { loading = false } = {}) {
  if (importStatus) {
    importStatus.textContent = translateStatus(text || "");
    importStatus.classList.toggle("loading", loading);
  }
  if (loading) {
    setImportOverlay({ visible: true, text: text || t("import.loading") });
  } else {
    setImportOverlay({ visible: false, text: "" });
  }
}

function setProgress(value) {
  progressBar.style.width = `${value}%`;
}

function startProgress() {
  let value = 8;
  setProgress(value);
  progressInterval = setInterval(() => {
    value = Math.min(90, value + Math.random() * 6);
    setProgress(value);
  }, 400);
}

function stopProgress() {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
  setProgress(100);
  setTimeout(() => setProgress(0), 800);
}

async function fetchCards() {
  const collectionId = getActiveCollection();
  const url = collectionId ? `/api/cards?collection_id=${collectionId}` : "/api/cards";
  const res = await fetch(url);
  const cards = await res.json();
  renderCards(cards);
}

function renderCards(cards) {
  cardsCache = Array.isArray(cards) ? cards : [];
  lastCardsCount = cardsCache.length;
  cardCountEl.textContent = lastCardsCount;
  syncOnboarding();
  const totalPages = Math.max(1, Math.ceil(lastCardsCount / cardsPageSize));
  if (cardsPage > totalPages) {
    cardsPage = totalPages;
  }
  renderCardsPage();
}

function renderCardsPage() {
  cardsEl.innerHTML = "";
  const totalPages = Math.max(1, Math.ceil(cardsCache.length / cardsPageSize));
  const start = (cardsPage - 1) * cardsPageSize;
  const pageCards = cardsCache.slice(start, start + cardsPageSize);
  pageCards.forEach((card, index) => {
    const collectionName = getCollectionName(card.collection_id);
    const item = document.createElement("div");
    item.className = "card";
    item.style.animationDelay = `${index * 40}ms`;
    const date = new Date(card.created_at);
    const dateLabel = date.toLocaleDateString();
    const timeLabel = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    item.innerHTML = `
      <h3>${escapeHtml(card.question)}</h3>
      <p>${escapeHtml(card.answer)}</p>
      <div class="meta">
        <div class="meta-left">
          <span class="card-collection">${escapeHtml(collectionName)}</span>
          <span class="meta-date">
            <time>${dateLabel}</time>
            <time>${timeLabel}</time>
          </span>
        </div>
        <div class="meta-right">
          <button class="delete" data-id="${card.id}">Excluir</button>
        </div>
      </div>
    `;
    cardsEl.appendChild(item);
  });

  cardsEl.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await fetch(`/api/cards/${btn.dataset.id}`, { method: "DELETE" });
      fetchCards();
    });
  });

  if (cardsPagination) {
    if (cardsCache.length > cardsPageSize) {
      cardsPagination.classList.remove("hidden");
    } else {
      cardsPagination.classList.add("hidden");
    }
    if (cardsPageInfo) {
      cardsPageInfo.textContent = t("cards.page", { page: cardsPage, total: totalPages });
    }
    if (cardsPagePrev) {
      cardsPagePrev.disabled = cardsPage <= 1;
    }
    if (cardsPageNext) {
      cardsPageNext.disabled = cardsPage >= totalPages;
    }
  }
}

function getCollectionName(collectionId) {
  if (!collectionId) return "Sem coleção";
  const match = collectionsCache.find((col) => String(col.id) === String(collectionId));
  return match ? match.name : "Coleção";
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

generateBtn.addEventListener("click", async () => {
  const topic = document.getElementById("topic").value.trim();
  const count = Number(document.getElementById("count").value || 5);
  const collectionId = getActiveCollection();
  if (!collectionId) {
    setStatus(generateStatus, t("generate.selectCollection"));
    nudgeToCollectionWarning();
    return;
  }
  setStatus(generateStatus, "Gerando cards...");
  setStatus(usageStatus, "");
  const startedAt = performance.now();
  generateBtn.disabled = true;
  startProgress();
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": getApiKey(),
      },
      body: JSON.stringify({ topic, count, collection_id: collectionId || null }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Erro ao gerar cards");
    }
    setStatus(generateStatus, `Criados ${data.created.length} cards.`);
    playCreateSound();
    const durationSec = (performance.now() - startedAt) / 1000;
    const rate = durationSec ? (data.created.length / durationSec).toFixed(2) : "0";
    const usage = data.usage || {};
    const totalTokens = usage.total_tokens ?? usage.totalTokens ?? usage.totalTokenCount ?? usage.totalToken ?? 0;
    const inputTokens =
      usage.input_tokens ?? usage.inputTokens ?? usage.promptTokenCount ?? usage.promptTokens ?? 0;
    const outputTokens =
      usage.output_tokens ??
      usage.outputTokens ??
      usage.candidatesTokenCount ??
      usage.candidatesTokens ??
      usage.completion_tokens ??
      0;
    if (window.AIUsage && typeof window.AIUsage.recordFromUsage === "function") {
      window.AIUsage.recordFromUsage(usage);
    }
    setStatus(
      usageStatus,
      `Velocidade: ${rate} cards/s. Tokens: ${totalTokens} (entrada ${inputTokens}, saída ${outputTokens}).`
    );
    fetchCards();
  } catch (err) {
    setStatus(generateStatus, err.message);
  } finally {
    generateBtn.disabled = false;
    stopProgress();
  }
});

saveBtn.addEventListener("click", async () => {
  const question = document.getElementById("question").value.trim();
  const answer = document.getElementById("answer").value.trim();
  const collectionId = getActiveCollection();
  if (!collectionId) {
    setStatus(saveStatus, t("manual.selectCollection"));
    nudgeToCollectionWarning();
    return;
  }
  setStatus(saveStatus, "Salvando...");
  saveBtn.disabled = true;
  try {
    const res = await fetch("/api/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer, collection_id: collectionId || null }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Erro ao salvar card");
    }
    setStatus(saveStatus, "Card salvo!");
    playCreateSound();
    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";
    fetchCards();
  } catch (err) {
    setStatus(saveStatus, err.message);
  } finally {
    saveBtn.disabled = false;
  }
});

refreshBtn.addEventListener("click", fetchCards);

downloadBtn.addEventListener("click", () => {
  const collectionId = getActiveCollection();
  const format = downloadFormat.value;
  const url = collectionId
    ? `/api/export/${format}?collection_id=${collectionId}`
    : `/api/export/${format}`;
  window.location.href = url;
});

openSettingsBtn.addEventListener("click", () => {
  settingsPanel.classList.toggle("hidden");
});

closeSettingsBtn.addEventListener("click", () => {
  settingsPanel.classList.add("hidden");
});

if (soundSettingsToggle) {
  soundSettingsToggle.addEventListener("click", () => {
    const expanded = soundSettingsToggle.getAttribute("aria-expanded") === "true";
    setSoundSettingsOpen(!expanded);
  });
}

if (languageButtons && languageButtons.length) {
  languageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang || "pt";
      setLanguage(lang);
    });
  });
}

saveSettingsBtn.addEventListener("click", () => {
  const key = apiKeyInput.value.trim();
  if (key) {
    localStorage.setItem("ai_api_key", key);
    localStorage.removeItem("openai_api_key");
  } else {
    localStorage.removeItem("ai_api_key");
    localStorage.removeItem("openai_api_key");
  }
  if (soundToggle) {
    localStorage.setItem("sound_enabled", soundToggle.checked ? "1" : "0");
  }
  if (bgSoundToggle) {
    localStorage.setItem("bg_sound_enabled", bgSoundToggle.checked ? "1" : "0");
  }
  if (studySoundToggle) {
    localStorage.setItem("study_sound_enabled", studySoundToggle.checked ? "1" : "0");
  }
  if (bgSoundVolume) {
    localStorage.setItem("bg_sound_volume", bgSoundVolume.value || "35");
  }
  if (studySoundVolume) {
    localStorage.setItem("study_sound_volume", studySoundVolume.value || "40");
  }
  applySoundSettingsUI();
  syncBackgroundAudio({ immediate: true });
  setStatus(settingsStatus, t("settings.saved"));
  setTimeout(() => setStatus(settingsStatus, ""), 2000);
});

if (soundToggle) {
  soundToggle.addEventListener("change", () => {
    applySoundSettingsUI();
  });
}

if (bgSoundToggle) {
  bgSoundToggle.addEventListener("change", () => {
    applySoundSettingsUI();
  });
}

if (studySoundToggle) {
  studySoundToggle.addEventListener("change", () => {
    applySoundSettingsUI();
  });
}

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => setTheme(btn.dataset.theme));
});

toggleCardsBtn.addEventListener("click", () => {
  cardsEl.classList.toggle("blur-answers");
  toggleCardsBtn.textContent = cardsEl.classList.contains("blur-answers")
    ? t("cards.showAnswers")
    : t("cards.hideAnswers");
});

collapseCardsBtn.addEventListener("click", () => {
  cardsWrapper.classList.toggle("hidden");
  collapseCardsBtn.textContent = cardsWrapper.classList.contains("hidden")
    ? t("cards.expand")
    : t("cards.collapse");
});

if (cardsPagePrev) {
  cardsPagePrev.addEventListener("click", () => {
    if (cardsPage > 1) {
      cardsPage -= 1;
      renderCardsPage();
      cardsWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

if (cardsPageNext) {
  cardsPageNext.addEventListener("click", () => {
    const totalPages = Math.max(1, Math.ceil(cardsCache.length / cardsPageSize));
    if (cardsPage < totalPages) {
      cardsPage += 1;
      renderCardsPage();
      cardsWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

async function loadCollections() {
  const res = await fetch("/api/collections");
  const collections = await res.json();
  collectionsCache = collections;
  collectionSelect.innerHTML = "";
  const optAll = document.createElement("option");
  optAll.value = "";
  optAll.textContent = t("collections.viewAll");
  collectionSelect.appendChild(optAll);
  collections.forEach((col) => {
    const opt = document.createElement("option");
    opt.value = col.id;
    opt.textContent = col.name;
    collectionSelect.appendChild(opt);
  });
  const saved = getActiveCollection();
  collectionSelect.value = saved;
  deleteCollectionBtn.disabled = !collectionSelect.value;
  setCardActionsEnabled(!!collectionSelect.value);
  openStudyBtn.disabled = collectionsCache.length === 0;
  renderMigrateOptions();
  updateCollectionCompletions();
  updateShareControls();
  resetShareLink();
  syncOnboarding();
  await loadLogs({ silent: true });
  await loadStudyFocus({ silent: true });
}

function renderMigrateOptions() {
  const activeId = getActiveCollection();
  migrateSelect.innerHTML = "";
  const optPlaceholder = document.createElement("option");
  optPlaceholder.value = "";
  optPlaceholder.textContent = t("collections.migrate.placeholder");
  migrateSelect.appendChild(optPlaceholder);
  collectionsCache.forEach((col) => {
    if (String(col.id) === String(activeId)) return;
    const opt = document.createElement("option");
    opt.value = col.id;
    opt.textContent = col.name;
    migrateSelect.appendChild(opt);
  });
  migrateCardsBtn.disabled = !activeId || !migrateSelect.value;
}

createCollectionBtn.addEventListener("click", async () => {
  const name = collectionNameInput.value.trim();
  if (!name) return;
  const res = await fetch("/api/collections", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  const data = await res.json();
  if (!res.ok) {
    setStatus(collectionStatus, data.error || "Erro ao criar coleção.");
    return;
  }
  collectionNameInput.value = "";
  setStatus(collectionStatus, "Coleção criada.");
  setActiveCollection(String(data.id));
  await loadCollections();
  fetchCards();
});

deleteCollectionBtn.addEventListener("click", async () => {
  const id = collectionSelect.value;
  if (!id) {
    setStatus(collectionStatus, t("collections.delete.select"));
    return;
  }
  openConfirm({
    title: "Excluir coleção",
    message:
      "Deseja excluir esta coleção? Todos os cards dentro dela serão apagados. Se preferir, migre antes.",
    okText: "Excluir",
    danger: true,
    onConfirm: async () => {
      await fetch(`/api/collections/${id}`, { method: "DELETE" });
      setActiveCollection("");
      await loadCollections();
      fetchCards();
    },
  });
});

async function goToStudy() {
  try {
    const res = await fetch("/api/collections");
    const collections = await res.json();
    if (!res.ok || !collections.length) {
      nudgeToCollectionWarning();
      return false;
    }
    playNavSound();
    setTimeout(() => {
      window.location.href = "/study";
    }, 140);
    return true;
  } catch (err) {
    nudgeToCollectionWarning();
    return false;
  }
}

openStudyBtn.addEventListener("click", () => {
  void goToStudy();
});

function goToExam() {
  playNavSound();
  setTimeout(() => {
    window.location.href = "/exam";
  }, 140);
}

if (openExamBtn) {
  openExamBtn.addEventListener("click", () => {
    goToExam();
  });
}

if (refreshExamsBtn) {
  refreshExamsBtn.addEventListener("click", () => {
    void loadExamSessions();
  });
}

if (clearExamsBtn) {
  clearExamsBtn.addEventListener("click", () => {
    clearExamSessions();
  });
}

if (collapseExamsBtn && examsWrapper) {
  collapseExamsBtn.addEventListener("click", () => {
    examsWrapper.classList.toggle("hidden");
    collapseExamsBtn.textContent = examsWrapper.classList.contains("hidden")
      ? t("exams.expand")
      : t("exams.collapse");
  });
}

if (downloadExamsBtn && examsDownloadFormat) {
  downloadExamsBtn.addEventListener("click", () => {
    const collectionId = getActiveCollection();
    const format = examsDownloadFormat.value || "csv";
    const url = collectionId
      ? `/api/exam/export/${format}?collection_id=${collectionId}`
      : `/api/exam/export/${format}`;
    window.location.href = url;
  });
}

if (openExamsImportBtn && examsImportPanel) {
  openExamsImportBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (importPanel) importPanel.classList.add("hidden");
    if (importHelpPanel) importHelpPanel.classList.add("hidden");
    examsImportPanel.classList.toggle("hidden");
    if (!examsImportPanel.classList.contains("hidden")) {
      if (importBackdrop) {
        importBackdrop.classList.remove("hidden");
        requestAnimationFrame(() => importBackdrop.classList.add("visible"));
      }
      examsImportPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (importBackdrop) {
      importBackdrop.classList.remove("visible");
      setTimeout(() => importBackdrop.classList.add("hidden"), 180);
    }
  });
}

if (examsImportPanel) {
  examsImportPanel.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

if (examsImportHelpBtn && examsImportHelpPanel) {
  examsImportHelpBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    examsImportHelpPanel.classList.toggle("hidden");
  });
}

if (examsImportHelpPanel) {
  examsImportHelpPanel.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

if (importExamsBtn && examsImportFileInput) {
  importExamsBtn.addEventListener("click", async () => {
    const file = examsImportFileInput.files && examsImportFileInput.files[0];
    if (!file) {
      if (examsImportStatus) setStatus(examsImportStatus, t("exams.import.selectFile"));
      return;
    }
    const form = new FormData();
    form.append("file", file);
    const collectionId = getActiveCollection();
    if (collectionId) {
      form.append("collection_id", String(collectionId));
    }
    if (examsImportStatus) setStatus(examsImportStatus, t("exams.import.loading"));
    importExamsBtn.disabled = true;
    try {
      const res = await fetch("/api/exam/import", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erro ao importar provas.");
      }
      const imported = Number(data.imported || 0);
      const skipped = Number(data.skipped || 0);
      if (examsImportStatus) {
        setStatus(
          examsImportStatus,
          skipped > 0
            ? t("exams.import.importedWithSkipped", { count: imported, skipped })
            : t("exams.import.imported", { count: imported })
        );
      }
      examsImportFileInput.value = "";
      void loadExamSessions({ silent: true });
    } catch (err) {
      if (examsImportStatus) setStatus(examsImportStatus, err.message);
    } finally {
      importExamsBtn.disabled = false;
    }
  });
}

function getSelectedCollectionMeta() {
  const collectionId = getActiveCollection();
  if (!collectionId) return null;
  return collectionsCache.find((col) => String(col.id) === String(collectionId)) || null;
}

async function createShareLink(type) {
  const collectionId = getActiveCollection();
  if (!collectionId) {
    setStatus(shareStatus, t("share.selectCollection"));
    nudgeToCollectionWarning();
    return;
  }
  const selected = getSelectedCollectionMeta();
  if (selected && Number(selected.card_count || 0) === 0) {
    setStatus(shareStatus, "Esta coleção ainda não tem cards.");
    return;
  }
  setStatus(shareStatus, "Gerando link...");
  if (shareTemplateBtn) shareTemplateBtn.disabled = true;
  if (shareChallengeBtn) shareChallengeBtn.disabled = true;
  try {
    const password = sharePasswordInput ? sharePasswordInput.value.trim() : "";
    const maxUsesRaw = shareMaxUsesInput ? shareMaxUsesInput.value.trim() : "";
    const maxUses = maxUsesRaw ? Number(maxUsesRaw) : null;
    const maxUsesValue =
      Number.isFinite(maxUses) && maxUses > 0 ? Math.floor(maxUses) : null;
    const res = await fetch("/api/share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection_id: collectionId,
        type,
        password: password || null,
        max_uses: maxUsesValue,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Erro ao gerar link.");
    }
    if (shareLinkInput) shareLinkInput.value = data.url || "";
    if (copyShareLinkBtn) copyShareLinkBtn.disabled = !data.url;
    if (openShareLink && data.url) {
      openShareLink.classList.remove("disabled");
      openShareLink.setAttribute("aria-disabled", "false");
      openShareLink.setAttribute("href", data.url);
    }
    if (deleteShareLinkBtn) deleteShareLinkBtn.disabled = !data.url;
    if (data.token && data.manage_token) {
      try {
        localStorage.setItem(`share_manage_${data.token}`, data.manage_token);
      } catch (err) {
        // ignore storage failures
      }
    }
    setStatus(
      shareStatus,
      type === "template" ? "Link de template gerado." : "Link de desafio gerado."
    );
    void loadShareLinks({ silent: true });
  } catch (err) {
    setStatus(shareStatus, err.message);
  } finally {
    updateShareControls();
  }
}

if (shareTemplateBtn) {
  shareTemplateBtn.addEventListener("click", () => createShareLink("template"));
}

if (shareChallengeBtn) {
  shareChallengeBtn.addEventListener("click", () => createShareLink("challenge"));
}

if (copyShareLinkBtn) {
  copyShareLinkBtn.addEventListener("click", async () => {
    const link = shareLinkInput ? shareLinkInput.value.trim() : "";
    if (!link) {
      setStatus(shareStatus, "Nenhum link disponível.");
      return;
    }
    try {
      await navigator.clipboard.writeText(link);
      setStatus(shareStatus, "Link copiado.");
    } catch (err) {
      if (shareLinkInput) {
        shareLinkInput.focus();
        shareLinkInput.select();
      }
      setStatus(shareStatus, "Não foi possível copiar automaticamente.");
    }
  });
}

if (openShareLink) {
  openShareLink.addEventListener("click", (event) => {
    const link = shareLinkInput ? shareLinkInput.value.trim() : "";
    if (!link) {
      event.preventDefault();
      setStatus(shareStatus, "Gere um link primeiro.");
    }
  });
}

function getTokenFromShareLink() {
  const link = shareLinkInput ? shareLinkInput.value.trim() : "";
  if (!link) return "";
  try {
    const url = new URL(link);
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || "";
  } catch (err) {
    const parts = link.split("/").filter(Boolean);
    return parts[parts.length - 1] || "";
  }
}

if (deleteShareLinkBtn) {
  deleteShareLinkBtn.addEventListener("click", async () => {
    const token = getTokenFromShareLink();
    if (!token) {
      setStatus(shareStatus, "Nenhum link disponível para excluir.");
      return;
    }
    const manageToken = localStorage.getItem(`share_manage_${token}`) || "";
    if (!manageToken) {
      setStatus(shareStatus, "Não tenho permissão para excluir este link.");
      return;
    }
    openConfirm({
      title: "Excluir link",
      message: "Deseja remover este link compartilhado e apagar do histórico?",
      okText: "Excluir",
      danger: true,
      onConfirm: async () => {
        try {
          await deleteShareLinkPermanent(token, manageToken);
        } catch (err) {
          setStatus(shareStatus, err.message || "Não foi possível excluir.");
          return;
        }
        try {
          localStorage.removeItem(`share_manage_${token}`);
        } catch (err) {
          // ignore storage failures
        }
        resetShareLink();
        setStatus(shareStatus, "Link removido.");
        void loadShareLinks({ silent: true });
      },
    });
  });
}

function openShareModal() {
  if (!shareModal) return;
  activateModal(shareModal, { initialFocus: sharePasswordInput });
  void loadShareLinks({ silent: true });
}

function closeShareModal() {
  if (!shareModal) return;
  deactivateModal(shareModal);
}

async function disableShareLink(token, manageToken) {
  const res = await fetch(`/api/share/${token}/disable`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ manage_token: manageToken }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Não foi possível desativar.");
  }
  return data;
}

async function deleteShareLinkPermanent(token, manageToken) {
  const res = await fetch(`/api/share/${token}/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ manage_token: manageToken }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Não foi possível remover.");
  }
  return data;
}

async function expireShareLink(token, manageToken) {
  const res = await fetch(`/api/share/${token}/expire`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ manage_token: manageToken }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Não foi possível expirar.");
  }
  return data;
}

if (openShareModalBtn) {
  openShareModalBtn.addEventListener("click", () => {
    openShareModal();
  });
}

if (closeShareModalBtn) {
  closeShareModalBtn.addEventListener("click", closeShareModal);
}

if (shareModal) {
  shareModal.addEventListener("click", (event) => {
    if (event.target === shareModal) {
      closeShareModal();
    }
  });
}

if (shareLinksRefreshBtn) {
  shareLinksRefreshBtn.addEventListener("click", () => {
    void loadShareLinks();
  });
}

if (shareLinksRevokeBtn) {
  shareLinksRevokeBtn.addEventListener("click", () => {
    const manageable = (shareLinksCache || []).filter((link) => getShareManageToken(link.token));
    if (!manageable.length) {
      setShareLinksStatus(t("share.list.noneToClear"));
      return;
    }
    openConfirm({
      title: t("share.action.clear.title"),
      message: t("share.action.clear.message", { count: manageable.length }),
      okText: t("share.action.clear.ok"),
      danger: true,
      onConfirm: async () => {
        setShareLinksStatus(t("share.list.clearing"), { loading: true });
        let success = 0;
        let failed = 0;
        for (const link of manageable) {
          const manageToken = getShareManageToken(link.token);
          if (!manageToken) {
            failed += 1;
            continue;
          }
          try {
            await deleteShareLinkPermanent(link.token, manageToken);
            success += 1;
            try {
              localStorage.removeItem(`share_manage_${link.token}`);
            } catch (err) {
              // ignore storage failures
            }
          } catch (err) {
            failed += 1;
          }
        }
        const message = failed
          ? t("share.list.clearedWithFail", { success, failed })
          : t("share.list.cleared", { success });
        setShareLinksStatus(message);
        void loadShareLinks({ silent: true });
      },
    });
  });
}

if (shareLinksList) {
  shareLinksList.addEventListener("click", async (event) => {
    const actionBtn = event.target.closest("button[data-action]");
    if (!actionBtn) return;
    const item = actionBtn.closest(".share-link-item");
    if (!item) return;
    const token = item.dataset.token || "";
    const type = item.dataset.type || "template";
    const link = (shareLinksCache || []).find((entry) => entry.token === token) || {
      token,
      type,
    };
    const url = buildShareUrl(link);
    const action = actionBtn.dataset.action;
    if (action === "copy") {
      try {
        await navigator.clipboard.writeText(url);
        setShareLinksStatus(t("share.action.copied"));
      } catch (err) {
        setShareLinksStatus(t("share.action.copyFail"));
      }
      return;
    }
    if (action === "open") {
      window.open(url, "_blank", "noopener");
      return;
    }
    const manageToken = getShareManageToken(token);
    if (!manageToken) {
      setShareLinksStatus(t("share.action.noPermission"));
      return;
    }
    if (action === "expire") {
      openConfirm({
        title: t("share.action.expire.title"),
        message: t("share.action.expire.message"),
        okText: t("share.action.expire.ok"),
        danger: true,
        onConfirm: async () => {
          try {
            await expireShareLink(token, manageToken);
            setShareLinksStatus(t("share.action.expired"));
            void loadShareLinks({ silent: true });
          } catch (err) {
            setShareLinksStatus(err.message);
          }
        },
      });
      return;
    }
    if (action === "revoke") {
      openConfirm({
        title: t("share.action.delete.title"),
        message: t("share.action.delete.message"),
        okText: t("share.action.delete.ok"),
        danger: true,
        onConfirm: async () => {
          try {
            await disableShareLink(token, manageToken);
            try {
              localStorage.removeItem(`share_manage_${token}`);
            } catch (err) {
              // ignore storage failures
            }
            setShareLinksStatus(t("share.action.disabled"));
            void loadShareLinks({ silent: true });
          } catch (err) {
            setShareLinksStatus(err.message);
          }
        },
      });
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (closeTopModal()) return;
  if (faqPanel) {
    faqPanel.classList.add("hidden");
  }
});

collectionSelect.addEventListener("change", () => {
  setActiveCollection(collectionSelect.value);
  cardsPage = 1;
  deleteCollectionBtn.disabled = !collectionSelect.value;
  setCardActionsEnabled(!!collectionSelect.value);
  renderMigrateOptions();
  updateCollectionCompletions();
  resetShareLink();
  updateShareControls();
  fetchCards();
  loadLogs({ silent: true });
  loadStudyFocus({ silent: true });
  loadExamSessions({ silent: true });
  void loadShareLinks({ silent: true });
});

migrateSelect.addEventListener("change", () => {
  migrateCardsBtn.disabled = !getActiveCollection() || !migrateSelect.value;
});

migrateCardsBtn.addEventListener("click", async () => {
  const sourceId = getActiveCollection();
  const targetId = migrateSelect.value;
  if (!sourceId) {
    setStatus(migrateStatus, t("collections.migrate.source"));
    return;
  }
  if (!targetId) {
    setStatus(migrateStatus, t("collections.migrate.target"));
    return;
  }
  openConfirm({
    title: "Migrar cards",
    message: "Migrar todos os cards desta coleção para a coleção de destino?",
    okText: "Migrar",
    onConfirm: async () => {
      const res = await fetch(`/api/collections/${sourceId}/migrate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_collection_id: targetId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(migrateStatus, data.error || "Erro ao migrar.");
        return;
      }
      setStatus(migrateStatus, `Migrados ${data.moved} cards.`);
      setTimeout(() => setStatus(migrateStatus, ""), 2000);
      await loadCollections();
      fetchCards();
    },
  });
});

const QUESTION_HINTS = ["question", "pergunta", "q", "front", "prompt", "enunciado"];
const ANSWER_HINTS = ["answer", "resposta", "a", "back", "solution", "resolucao", "resp"];

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === "\"") {
      if (inQuotes && line[i + 1] === "\"") {
        current += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  values.push(current);
  return values;
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length);
  if (!lines.length) return { columns: [], rows: [] };
  const headerLine = lines.shift();
  const headers = parseCsvLine(headerLine).map((header) => header.trim());
  if (!headers.length) return { columns: [], rows: [] };
  const rows = lines.map((line) => {
    const cols = parseCsvLine(line);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = cols[index] ? cols[index].trim() : "";
    });
    return row;
  });
  return { columns: headers, rows };
}

function parseJsonImport(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    return { columns: [], rows: [], error: t("import.invalidJson") };
  }
  const rows = Array.isArray(parsed) ? parsed : parsed.cards || [];
  if (!Array.isArray(rows)) {
    return { columns: [], rows: [], error: t("import.invalidJson") };
  }
  const columns = [];
  rows.forEach((row) => {
    if (!row || typeof row !== "object" || Array.isArray(row)) return;
    Object.keys(row).forEach((key) => {
      if (!columns.includes(key)) columns.push(key);
    });
  });
  return { columns, rows };
}

function normalizeKey(value) {
  return String(value || "").trim().toLowerCase();
}

function guessColumn(columns, hints) {
  const normalized = columns.map((col) => normalizeKey(col));
  for (const hint of hints) {
    const index = normalized.indexOf(hint);
    if (index !== -1) return columns[index];
  }
  return "";
}

function buildImportOptions(selectEl, columns) {
  if (!selectEl) return;
  selectEl.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = t("import.map.select");
  selectEl.appendChild(placeholder);
  columns.forEach((column) => {
    const opt = document.createElement("option");
    opt.value = column;
    opt.textContent = column;
    selectEl.appendChild(opt);
  });
}

function resetImportPreview() {
  importParsed = null;
  if (importPreview) importPreview.classList.add("hidden");
  if (importPreviewTable) importPreviewTable.innerHTML = "";
  if (importPreviewCount) importPreviewCount.textContent = "";
  if (importMapQuestion) importMapQuestion.innerHTML = "";
  if (importMapAnswer) importMapAnswer.innerHTML = "";
}

function renderImportPreview() {
  if (!importParsed || !importPreview || !importPreviewTable) return;
  const questionKey = importMapQuestion ? importMapQuestion.value : "";
  const answerKey = importMapAnswer ? importMapAnswer.value : "";
  const rows = importParsed.rows || [];
  if (importPreviewCount) {
    importPreviewCount.textContent = t("import.preview.count", { count: rows.length });
  }
  if (!questionKey || !answerKey) {
    importPreviewTable.textContent = t("import.map.selectPrompt");
    return;
  }
  const previewRows = rows.slice(0, 6).map((row) => ({
    question: row && typeof row === "object" ? row[questionKey] : "",
    answer: row && typeof row === "object" ? row[answerKey] : "",
  }));
  const table = document.createElement("table");
  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  const thQ = document.createElement("th");
  thQ.textContent = t("import.preview.question");
  const thA = document.createElement("th");
  thA.textContent = t("import.preview.answer");
  headRow.appendChild(thQ);
  headRow.appendChild(thA);
  head.appendChild(headRow);
  table.appendChild(head);
  const body = document.createElement("tbody");
  previewRows.forEach((row) => {
    const tr = document.createElement("tr");
    const tdQ = document.createElement("td");
    tdQ.textContent = String(row.question || "").trim();
    const tdA = document.createElement("td");
    tdA.textContent = String(row.answer || "").trim();
    tr.appendChild(tdQ);
    tr.appendChild(tdA);
    body.appendChild(tr);
  });
  table.appendChild(body);
  importPreviewTable.innerHTML = "";
  importPreviewTable.appendChild(table);
}

function buildMappedCards() {
  if (!importParsed) return [];
  const questionKey = importMapQuestion ? importMapQuestion.value : "";
  const answerKey = importMapAnswer ? importMapAnswer.value : "";
  if (!questionKey || !answerKey) return [];
  return (importParsed.rows || [])
    .map((row) => {
      if (!row || typeof row !== "object") return { question: "", answer: "" };
      return {
        question: String(row[questionKey] || "").trim(),
        answer: String(row[answerKey] || "").trim(),
      };
    })
    .filter((card) => card.question && card.answer);
}

importFileInput.addEventListener("change", async () => {
  resetImportPreview();
  const file = importFileInput.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    setImportStatus(t("import.fileTooLarge"));
    return;
  }
  const text = await file.text();
  let parsed = { columns: [], rows: [] };
  if (file.name.toLowerCase().endsWith(".json")) {
    parsed = parseJsonImport(text);
    if (parsed.error) {
      setImportStatus(parsed.error);
      return;
    }
  } else {
    parsed = parseCsv(text);
  }
  if (!parsed.columns.length) {
    setImportStatus(t("import.noColumns"));
    return;
  }
  if (!parsed.rows.length) {
    setImportStatus(t("import.noRows"));
    return;
  }
  importParsed = parsed;
  buildImportOptions(importMapQuestion, parsed.columns);
  buildImportOptions(importMapAnswer, parsed.columns);
  let guessQuestion = guessColumn(parsed.columns, QUESTION_HINTS);
  let guessAnswer = guessColumn(parsed.columns, ANSWER_HINTS);
  if (!guessQuestion && parsed.columns.length) {
    guessQuestion = parsed.columns[0];
  }
  if (!guessAnswer && parsed.columns.length > 1) {
    guessAnswer = parsed.columns[1];
  }
  if (guessQuestion && guessAnswer && guessQuestion === guessAnswer) {
    guessAnswer = parsed.columns.find((col) => col !== guessQuestion) || "";
  }
  if (importMapQuestion) importMapQuestion.value = guessQuestion || "";
  if (importMapAnswer) importMapAnswer.value = guessAnswer || "";
  if (importPreview) importPreview.classList.remove("hidden");
  renderImportPreview();
  setImportStatus(t("import.previewReady"));
});

if (importMapQuestion) {
  importMapQuestion.addEventListener("change", renderImportPreview);
}

if (importMapAnswer) {
  importMapAnswer.addEventListener("change", renderImportPreview);
}

importCardsBtn.addEventListener("click", async () => {
  const file = importFileInput.files[0];
  const collectionId = getActiveCollection();
  if (!collectionId) {
    setImportStatus(t("import.selectCollection"));
    nudgeToCollectionWarning();
    return;
  }
  if (!file || !importParsed) {
    setImportStatus(t("import.selectFile"));
    return;
  }
  const cards = buildMappedCards();
  if (!cards.length) {
    setImportStatus(translateStatus("Nenhum card válido. Confira as colunas selecionadas."));
    return;
  }
  try {
    setImportStatus(t("import.loading"), { loading: true });
    importCardsBtn.disabled = true;
    importCardsBtn.classList.add("loading");
    importCardsBtn.textContent = t("import.loadingShort");
    if (importPanel) {
      importPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const res = await fetch("/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cards, collection_id: collectionId || null }),
    });
    const data = await res.json();
    if (!res.ok) {
      setImportStatus(translateStatus(data.error || "Erro ao importar."));
      return;
    }
    setImportStatus(t("import.imported", { count: data.count }));
    importFileInput.value = "";
    resetImportPreview();
    fetchCards();
  } catch (err) {
    setImportStatus(t("import.networkFail"));
  } finally {
    if (importStatus) importStatus.classList.remove("loading");
    importCardsBtn.disabled = false;
    importCardsBtn.classList.remove("loading");
    importCardsBtn.textContent = t("import.button");
  }
});

importHelpBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  importHelpPanel.classList.toggle("hidden");
});

importHelpPanel.addEventListener("click", (event) => {
  event.stopPropagation();
});

if (focusHelpBtn) {
  focusHelpBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (focusHelpPanel) {
      const wasHidden = focusHelpPanel.classList.contains("hidden");
      focusHelpPanel.classList.toggle("hidden");
      if (wasHidden && focusHelpToggle && focusHelpDetails) {
        focusHelpDetails.classList.add("hidden");
        focusHelpToggle.setAttribute("aria-expanded", "false");
        focusHelpToggle.textContent = t("hero.focusHelp.more");
      }
    }
  });
}

if (focusHelpPanel) {
  focusHelpPanel.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

if (focusHelpToggle && focusHelpDetails) {
  focusHelpToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const nowHidden = focusHelpDetails.classList.toggle("hidden");
    focusHelpToggle.setAttribute("aria-expanded", nowHidden ? "false" : "true");
    focusHelpToggle.textContent = nowHidden ? t("hero.focusHelp.more") : t("hero.focusHelp.less");
  });
}

if (openFaqBtn) {
  openFaqBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (faqPanel) {
      faqPanel.classList.toggle("hidden");
    }
  });
}

if (faqPanel) {
  faqPanel.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

openImportBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  if (examsImportPanel) examsImportPanel.classList.add("hidden");
  if (examsImportHelpPanel) examsImportHelpPanel.classList.add("hidden");
  importPanel.classList.toggle("hidden");
  if (!importPanel.classList.contains("hidden")) {
    if (importBackdrop) {
      importBackdrop.classList.remove("hidden");
      requestAnimationFrame(() => importBackdrop.classList.add("visible"));
    }
    importPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  } else if (importBackdrop) {
    importBackdrop.classList.remove("visible");
    setTimeout(() => importBackdrop.classList.add("hidden"), 180);
  }
});

importPanel.addEventListener("click", (event) => {
  event.stopPropagation();
});

if (importBackdrop) {
  importBackdrop.addEventListener("click", () => {
    importPanel.classList.add("hidden");
    if (examsImportPanel) examsImportPanel.classList.add("hidden");
    if (examsImportHelpPanel) examsImportHelpPanel.classList.add("hidden");
    importBackdrop.classList.remove("visible");
    setTimeout(() => importBackdrop.classList.add("hidden"), 180);
  });
}

openGoalsBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  goalsPanel.classList.toggle("hidden");
  if (!goalsPanel.classList.contains("hidden")) {
    loadLogs({ silent: false });
  }
});

goalsPanel.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener("click", () => {
  importHelpPanel.classList.add("hidden");
  importPanel.classList.add("hidden");
  if (examsImportPanel) {
    examsImportPanel.classList.add("hidden");
  }
  if (examsImportHelpPanel) {
    examsImportHelpPanel.classList.add("hidden");
  }
  goalsPanel.classList.add("hidden");
  if (importBackdrop) {
    importBackdrop.classList.remove("visible");
    setTimeout(() => importBackdrop.classList.add("hidden"), 180);
  }
  if (focusHelpPanel) {
    focusHelpPanel.classList.add("hidden");
  }
  if (faqPanel) {
    faqPanel.classList.add("hidden");
  }
});

confirmCancel.addEventListener("click", closeConfirm);
confirmOk.addEventListener("click", async () => {
  if (typeof confirmAction === "function") {
    await confirmAction();
  }
  closeConfirm();
});

confirmModal.addEventListener("click", (event) => {
  if (event.target === confirmModal) {
    closeConfirm();
  }
});

focusCollectionBtn.addEventListener("click", () => {
  collectionNameInput.focus();
});

if (onboardingFocusCollection) {
  onboardingFocusCollection.addEventListener("click", () => {
    const panel = collectionNameInput.closest(".panel");
    if (panel) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    collectionNameInput.focus();
  });
}

if (onboardingOpenImport) {
  onboardingOpenImport.addEventListener("click", () => {
    importPanel.classList.remove("hidden");
    const panel = importPanel.closest(".panel");
    if (panel) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (importFileInput) {
      importFileInput.focus();
    }
  });
}

if (onboardingOpenStudy) {
  onboardingOpenStudy.addEventListener("click", () => {
    void goToStudy();
  });
}

if (onboardingOpenExam) {
  onboardingOpenExam.addEventListener("click", () => {
    goToExam();
  });
}

function setLogsEnabled(enabled) {
  openGoalsBtn.disabled = !enabled;
}

function formatTotalTime(seconds) {
  const totalMinutes = seconds > 0 ? Math.ceil(seconds / 60) : 0;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function resetLogs() {
  if (goalLogSessions) goalLogSessions.textContent = "0";
  if (goalLogCards) goalLogCards.textContent = "0";
  if (goalLogTime) goalLogTime.textContent = "0m";
  if (goalLogExams) goalLogExams.textContent = "0";
  if (goalLogQuestions) goalLogQuestions.textContent = "0";
  if (goalLogExamTime) goalLogExamTime.textContent = "0m";
}

async function loadLogs({ silent = false } = {}) {
  const collectionId = getActiveCollection();
  if (!collectionId) {
    resetLogs();
    setLogsEnabled(collectionsCache.length > 0);
    if (!silent) {
      setStatus(goalsStatus, t("goals.selectCollection"));
    }
    return;
  }
  setLogsEnabled(true);
  try {
    const res = await fetch(`/api/collections/${collectionId}/logs`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Erro ao carregar logs.");
    }
    if (goalLogSessions) goalLogSessions.textContent = String(data.sessions_complete || 0);
    if (goalLogCards) goalLogCards.textContent = String(data.cards_solved || 0);
    if (goalLogTime) goalLogTime.textContent = formatTotalTime(Number(data.total_seconds || 0));
    if (goalLogExams) goalLogExams.textContent = String(data.exams_count || 0);
    if (goalLogQuestions) goalLogQuestions.textContent = String(data.exam_answered || 0);
    if (goalLogExamTime)
      goalLogExamTime.textContent = formatTotalTime(Number(data.exam_total_seconds || 0));
    if (!silent) {
      setStatus(goalsStatus, t("goals.updated"));
      setTimeout(() => setStatus(goalsStatus, ""), 1500);
    }
  } catch (err) {
    if (!silent) {
      setStatus(goalsStatus, err.message);
    }
  }
}

loadSettings();
setupCopySnippets();
loadCollections().then(() => {
  fetchCards();
  loadExamSessions({ silent: true });
});

collapseCardsBtn.textContent = cardsWrapper.classList.contains("hidden")
  ? t("cards.expand")
  : t("cards.collapse");

if (collapseExamsBtn && examsWrapper) {
  collapseExamsBtn.textContent = examsWrapper.classList.contains("hidden")
    ? t("exams.expand")
    : t("exams.collapse");
}

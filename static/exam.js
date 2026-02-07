const examSetup = document.getElementById("exam-setup");
const examSession = document.getElementById("exam-session");
const examReport = document.getElementById("exam-report");
const examSessionsPanel = document.getElementById("exam-sessions");

const examStartBtn = document.getElementById("exam-start");
const examTopicInput = document.getElementById("exam-topic");
const examNameInput = document.getElementById("exam-name");
const examCountInput = document.getElementById("exam-count");
const examMultiToggle = document.getElementById("exam-multi-toggle");
const examTimeToggle = document.getElementById("exam-time-toggle");
const examTimeInput = document.getElementById("exam-time");
const examCollectionSelect = document.getElementById("exam-collection");
const examCollectionStatus = document.getElementById("exam-collection-status");
const examSetupStatus = document.getElementById("exam-setup-status");
const examUsageStatus = document.getElementById("exam-usage-status");
const examMissingKey = document.getElementById("exam-missing-key");

const examProgressBar = document.getElementById("exam-progress-bar");

const examTimerPill = document.getElementById("exam-timer-pill");
const examTimerEl = document.getElementById("exam-timer");
const examProgressPill = document.getElementById("exam-progress-pill");
const examScorePill = document.getElementById("exam-score-pill");
const examProgressEl = document.getElementById("exam-progress");
const examScoreEl = document.getElementById("exam-score");

const examQuestionEl = document.getElementById("exam-question");
const examHintEl = document.getElementById("exam-hint");
const examOptionsEl = document.getElementById("exam-options");

const examPrevBtn = document.getElementById("exam-prev");
const examNextBtn = document.getElementById("exam-next");
const examFinishBtn = document.getElementById("exam-finish");
const examRestartBtn = document.getElementById("exam-restart");
const examStatusEl = document.getElementById("exam-status");

const examReportCorrectEl = document.getElementById("exam-report-correct");
const examReportIncorrectEl = document.getElementById("exam-report-incorrect");
const examReportRateEl = document.getElementById("exam-report-rate");
const examReportMetaEl = document.getElementById("exam-report-meta");
const examFilterCorrectBtn = document.getElementById("exam-filter-correct");
const examFilterIncorrectBtn = document.getElementById("exam-filter-incorrect");
const examFilterAllBtn = document.getElementById("exam-filter-all");
const examReviewEl = document.getElementById("exam-review");
const examBackSetupBtn = document.getElementById("exam-back-setup");
const examRetakeBtn = document.getElementById("exam-retake");

const examSessionsList = document.getElementById("exam-sessions-list");
const examSessionsStatus = document.getElementById("exam-sessions-status");
const examRefreshSessionsBtn = document.getElementById("exam-refresh-sessions");
const examClearSessionsBtn = document.getElementById("exam-clear-sessions");

const themeButtons = document.querySelectorAll(".theme-btn");

let questions = [];
let answers = [];
let currentIndex = 0;
let currentLanguage = "pt";
let generationUsage = {};

let activeCollectionId = "";
let activeTopic = "";
let activeExamName = "";
let activeAllowMulti = false;
let activeTimeLimitSec = 0;
let sessionStartTime = 0;
let timerInterval = null;
let sessionActive = false;
let sessionSaved = false;
let timedOut = false;
let savedViewMode = false;
let reviewFilter = "all";

let progressInterval = null;
let clickAudioCtx = null;

function shuffleInPlace(list) {
  if (!Array.isArray(list) || list.length < 2) return list;
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = list[i];
    list[i] = list[j];
    list[j] = tmp;
  }
  return list;
}

const I18N = {
  pt: {
    "exam.pageTitle": "Modo Prova",
    "exam.back": "Voltar",
    "exam.header.eyebrow": "Modo prova",
    "exam.header.title": "Treine com múltipla escolha.",
    "exam.header.subtitle":
      "Gere uma prova com IA (4 alternativas). Algumas perguntas podem ter 2 respostas corretas.",
    "exam.timer": "Tempo",
    "exam.progress": "Progresso",
    "exam.score": "Respondidas",
    "exam.setup.title": "Configurar prova",
    "exam.setup.subtitle": "Escolha uma coleção OU um tema/assunto e gere as perguntas.",
    "exam.setup.missingKey":
      "Defina sua API Key na página inicial (Configurações) antes de gerar uma prova.",
    "exam.setup.collection": "Coleção (opcional)",
    "exam.setup.collectionNone": "Sem coleção",
    "exam.setup.collectionEmpty": "Nenhuma coleção encontrada. Você ainda pode gerar por tema.",
    "exam.setup.topic": "Tema / assunto (opcional)",
    "exam.setup.topicPlaceholder": "Ex.: Redes, Direito, História...",
    "exam.setup.topicNote": "Se escolher uma coleção, o conteúdo dela será usado como referência.",
    "exam.setup.name": "Nome da prova (opcional)",
    "exam.setup.namePlaceholder": "Ex.: Simulado 01 · Redes",
    "exam.setup.nameNote": "Ajuda a encontrar a prova depois em “Minhas Provas”.",
    "exam.setup.count": "Quantidade de perguntas",
    "exam.setup.countUnit": "perguntas",
    "exam.setup.allowMulti": "Permitir perguntas com 2 respostas corretas",
    "exam.setup.allowMultiNote": "Quando ativado, parte das questões exigirá marcar 2 alternativas.",
    "exam.setup.timeLabel": "Tempo de prova (minutos)",
    "exam.setup.timeToggle": "Ativar limite de tempo",
    "exam.setup.timeUnit": "minutos por prova",
    "exam.setup.timeNote": "Ative para finalizar automaticamente quando o tempo acabar.",
    "exam.setup.start": "Gerar prova",
    "exam.loading": "Carregando...",
    "exam.prev": "◀ Anterior",
    "exam.next": "Próximo ▶",
    "exam.finish": "Finalizar prova",
    "exam.restart": "Nova prova",
    "exam.status.loadingCollections": "Carregando coleções...",
    "exam.status.generating": "Gerando prova...",
    "exam.status.missingKeyShort": "API Key não configurada.",
    "exam.status.invalidCount": "Quantidade inválida.",
    "exam.status.invalidTime": "Tempo inválido.",
    "exam.status.maxTwo": "Você pode marcar no máximo 2 alternativas.",
    "exam.status.timedOut": "Tempo finalizado. Prova concluída.",
    "exam.status.saved": "Prova salva no histórico.",
    "exam.status.saveFail": "Não foi possível salvar no histórico.",
    "exam.usage.tokens": "Tokens: {total} (entrada {input}, saída {output}).",
    "exam.hint.selectOne": "Selecione 1 alternativa.",
    "exam.hint.selectFlexible": "Selecione 1 alternativa (algumas questões pedem 2).",
    "exam.hint.selectTwo": "Selecione 2 alternativas.",
    "exam.hint.unanswered": "Ainda não respondida.",
    "exam.report.title": "Resultado",
    "exam.report.correct": "Acertos",
    "exam.report.incorrect": "Erros",
    "exam.report.rate": "Taxa",
    "exam.report.reviewTitle": "Revisão",
    "exam.report.retake": "Fazer novamente",
    "exam.report.back": "Gerar outra prova",
    "exam.review.correct": "Correto",
    "exam.review.incorrect": "Errado",
    "exam.review.yourAnswer": "Sua resposta",
    "exam.review.correctAnswer": "Resposta correta",
    "exam.review.explanation": "Explicação",
    "exam.review.unanswered": "Não respondida",
    "exam.review.option.correct": "Correta",
    "exam.review.option.selected": "Selecionada",
    "exam.sessions.title": "Histórico de provas",
    "exam.sessions.refresh": "Atualizar",
    "exam.sessions.clear": "Limpar histórico",
    "exam.sessions.empty": "Nenhuma prova salva ainda.",
    "exam.sessions.item": "Tempo {duration} · {total} questões",
    "exam.sessions.summary": "Provas: {count} · Acertos {correct} · Erros {incorrect}",
    "exam.sessions.stats.correct": "Acertos",
    "exam.sessions.stats.incorrect": "Erros",
    "exam.sessions.stats.unanswered": "Pendentes",
    "exam.sessions.cleared": "Histórico limpo.",
    "exam.sessions.clearConfirm": "Deseja remover este histórico de provas?",
    "exam.sessions.clearConfirmCollection": "Deseja remover o histórico de provas desta coleção?",
    "exam.sessions.view": "Visualizar",
    "exam.sessions.delete": "Excluir",
    "exam.sessions.missingDetails": "Não encontrei as questões desta prova.",
    "exam.sessions.notCompleted": "Visualização disponível após concluir a prova.",
  },
  en: {
    "exam.pageTitle": "Exam Mode",
    "exam.back": "Back",
    "exam.header.eyebrow": "Exam mode",
    "exam.header.title": "Practice with multiple choice.",
    "exam.header.subtitle":
      "Generate an exam with AI (4 options). Some questions may have 2 correct answers.",
    "exam.timer": "Time",
    "exam.progress": "Progress",
    "exam.score": "Answered",
    "exam.setup.title": "Set up exam",
    "exam.setup.subtitle": "Choose a collection OR a topic and generate the questions.",
    "exam.setup.missingKey": "Set your API Key on the home page (Settings) before generating an exam.",
    "exam.setup.collection": "Collection (optional)",
    "exam.setup.collectionNone": "No collection",
    "exam.setup.collectionEmpty": "No collections found. You can still generate by topic.",
    "exam.setup.topic": "Topic (optional)",
    "exam.setup.topicPlaceholder": "e.g. Networks, Law, History...",
    "exam.setup.topicNote": "If you pick a collection, its content will be used as reference.",
    "exam.setup.name": "Exam name (optional)",
    "exam.setup.namePlaceholder": "e.g. Mock 01 · Networks",
    "exam.setup.nameNote": "Helps you find it later under “My Exams”.",
    "exam.setup.count": "Number of questions",
    "exam.setup.countUnit": "questions",
    "exam.setup.allowMulti": "Allow questions with 2 correct answers",
    "exam.setup.allowMultiNote": "When enabled, some questions will require selecting 2 options.",
    "exam.setup.timeLabel": "Exam time (minutes)",
    "exam.setup.timeToggle": "Enable time limit",
    "exam.setup.timeUnit": "minutes per exam",
    "exam.setup.timeNote": "Enable to finish automatically when time runs out.",
    "exam.setup.start": "Generate exam",
    "exam.loading": "Loading...",
    "exam.prev": "◀ Previous",
    "exam.next": "Next ▶",
    "exam.finish": "Finish exam",
    "exam.restart": "New exam",
    "exam.status.loadingCollections": "Loading collections...",
    "exam.status.generating": "Generating exam...",
    "exam.status.missingKeyShort": "API Key not set.",
    "exam.status.invalidCount": "Invalid amount.",
    "exam.status.invalidTime": "Invalid time.",
    "exam.status.maxTwo": "You can select at most 2 options.",
    "exam.status.timedOut": "Time is up. Exam finished.",
    "exam.status.saved": "Exam saved to history.",
    "exam.status.saveFail": "Could not save to history.",
    "exam.usage.tokens": "Tokens: {total} (input {input}, output {output}).",
    "exam.hint.selectOne": "Select 1 option.",
    "exam.hint.selectFlexible": "Select 1 option (some questions require 2).",
    "exam.hint.selectTwo": "Select 2 options.",
    "exam.hint.unanswered": "Not answered yet.",
    "exam.report.title": "Results",
    "exam.report.correct": "Correct",
    "exam.report.incorrect": "Incorrect",
    "exam.report.rate": "Rate",
    "exam.report.reviewTitle": "Review",
    "exam.report.retake": "Retake",
    "exam.report.back": "Generate another exam",
    "exam.review.correct": "Correct",
    "exam.review.incorrect": "Incorrect",
    "exam.review.yourAnswer": "Your answer",
    "exam.review.correctAnswer": "Correct answer",
    "exam.review.explanation": "Explanation",
    "exam.review.unanswered": "Unanswered",
    "exam.review.option.correct": "Correct",
    "exam.review.option.selected": "Selected",
    "exam.sessions.title": "Exam history",
    "exam.sessions.refresh": "Refresh",
    "exam.sessions.clear": "Clear history",
    "exam.sessions.empty": "No exams saved yet.",
    "exam.sessions.item": "Time {duration} · {total} questions",
    "exam.sessions.summary": "Exams: {count} · Correct {correct} · Incorrect {incorrect}",
    "exam.sessions.stats.correct": "Correct",
    "exam.sessions.stats.incorrect": "Incorrect",
    "exam.sessions.stats.unanswered": "Unanswered",
    "exam.sessions.cleared": "History cleared.",
    "exam.sessions.clearConfirm": "Do you want to remove this exam history?",
    "exam.sessions.clearConfirmCollection": "Do you want to remove this collection's exam history?",
    "exam.sessions.view": "View",
    "exam.sessions.delete": "Delete",
    "exam.sessions.missingDetails": "Could not load this exam questions.",
    "exam.sessions.notCompleted": "Viewing is available after finishing the exam.",
  },
};

function detectLanguage() {
  const stored = localStorage.getItem("language");
  if (stored) return stored;
  const browserLang =
    (navigator.languages && navigator.languages[0]) || navigator.language || "pt";
  return browserLang.toLowerCase().startsWith("en") ? "en" : "pt";
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
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

function applyTranslations() {
  const dict = I18N[currentLanguage] || I18N.pt;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    const value = dict[key];
    if (typeof value === "string") {
      el.textContent = value;
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
  document.title = t("exam.pageTitle");
}

function setLanguage(lang) {
  currentLanguage = lang === "en" ? "en" : "pt";
  document.documentElement.lang = currentLanguage === "en" ? "en" : "pt-BR";
  applyTranslations();
}

function loadTheme() {
  const theme = localStorage.getItem("theme") || "light";
  document.body.dataset.theme = theme;
  themeButtons.forEach((btn) => {
    const isActive = btn.dataset.theme === theme;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

function getApiKey() {
  return localStorage.getItem("ai_api_key") || localStorage.getItem("openai_api_key") || "";
}

function setSetupStatus(text) {
  examSetupStatus.textContent = text || "";
}

function setExamStatus(text) {
  examStatusEl.textContent = text || "";
}

function setCollectionsStatus(text) {
  examCollectionStatus.textContent = text || "";
}

function setExamSessionsStatus(text) {
  if (!examSessionsStatus) return;
  examSessionsStatus.textContent = text || "";
}

function setUsageStatus(text) {
  if (!examUsageStatus) return;
  examUsageStatus.textContent = text || "";
}

function setReportMeta(text) {
  if (!examReportMetaEl) return;
  const value = String(text || "").trim();
  examReportMetaEl.textContent = value;
  examReportMetaEl.classList.toggle("hidden", !value);
}

function setProgress(value) {
  if (!examProgressBar) return;
  examProgressBar.style.width = `${value}%`;
}

function startProgress() {
  if (!examProgressBar) return;
  let value = 8;
  setProgress(value);
  progressInterval = setInterval(() => {
    value = Math.min(90, value + Math.random() * 6);
    setProgress(value);
  }, 400);
}

function stopProgress() {
  if (!examProgressBar) return;
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
  setProgress(100);
  setTimeout(() => setProgress(0), 800);
}

function extractTokenUsage(usage) {
  const safe = usage && typeof usage === "object" ? usage : {};
  const total =
    safe.total_tokens ?? safe.totalTokens ?? safe.totalTokenCount ?? safe.totalToken ?? 0;
  const input =
    safe.input_tokens ??
    safe.inputTokens ??
    safe.promptTokenCount ??
    safe.promptTokens ??
    safe.prompt_tokens ??
    0;
  const output =
    safe.output_tokens ??
    safe.outputTokens ??
    safe.candidatesTokenCount ??
    safe.candidatesTokens ??
    safe.completion_tokens ??
    0;
  return {
    total: Number(total) || 0,
    input: Number(input) || 0,
    output: Number(output) || 0,
  };
}

function getTimeLimitSecFromUI() {
  if (!examTimeToggle || !examTimeInput) return 0;
  if (!examTimeToggle.checked) return 0;
  const minutes = Number(examTimeInput.value || 0);
  if (!Number.isFinite(minutes) || minutes < 1 || minutes > 240) return 0;
  return Math.round(minutes * 60);
}

function applyTimeLimitUI() {
  if (!examTimeToggle || !examTimeInput) return;
  const enabled = Boolean(examTimeToggle.checked);
  examTimeInput.disabled = !enabled;
}

function formatClock(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds || 0));
  const minutes = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, "0");
  return `${String(minutes).padStart(2, "0")}:${secs}`;
}

function updateTimer() {
  if (!examTimerEl) return;
  const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
  if (activeTimeLimitSec > 0) {
    const remaining = activeTimeLimitSec - elapsed;
    examTimerEl.textContent = formatClock(remaining);
    if (remaining <= 0 && sessionActive && !timedOut) {
      timedOut = true;
      finishExam({ timedOut: true });
    }
    return;
  }
  examTimerEl.textContent = formatClock(elapsed);
}

function startTimer() {
  stopTimer();
  sessionStartTime = Date.now();
  timedOut = false;
  timerInterval = setInterval(updateTimer, 500);
  updateTimer();
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function isSoundEnabled() {
  return localStorage.getItem("sound_enabled") !== "0";
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

function ensureAudioContext() {
  if (clickAudioCtx) return true;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return false;
  clickAudioCtx = new AudioContext();
  return true;
}

function playClickSound() {
  try {
    if (!isSoundEnabled()) return;
    if (!ensureAudioContext()) return;
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
    // ignore
  }
}

function playImportantSound() {
  try {
    if (!isSoundEnabled()) return;
    if (!ensureAudioContext()) return;
    if (clickAudioCtx.state === "suspended") {
      clickAudioCtx.resume();
    }
    const now = clickAudioCtx.currentTime;
    scheduleTone({ freq: 480, startTime: now, duration: 0.08, volume: 0.07 });
    scheduleTone({ freq: 680, startTime: now + 0.1, duration: 0.1, volume: 0.06 });
  } catch (err) {
    // ignore
  }
}

function playDeleteSound() {
  try {
    if (!isSoundEnabled()) return;
    if (!ensureAudioContext()) return;
    if (clickAudioCtx.state === "suspended") {
      clickAudioCtx.resume();
    }
    const now = clickAudioCtx.currentTime;
    scheduleTone({ freq: 380, startTime: now, duration: 0.08, volume: 0.055 });
    scheduleTone({ freq: 300, startTime: now + 0.1, duration: 0.1, volume: 0.05 });
  } catch (err) {
    // ignore
  }
}

function playGenerateSound() {
  try {
    if (!isSoundEnabled()) return;
    if (!ensureAudioContext()) return;
    if (clickAudioCtx.state === "suspended") {
      clickAudioCtx.resume();
    }
    const now = clickAudioCtx.currentTime;
    scheduleTone({ freq: 620, startTime: now, duration: 0.07, volume: 0.05 });
    scheduleTone({ freq: 740, startTime: now + 0.08, duration: 0.08, volume: 0.045 });
  } catch (err) {
    // ignore
  }
}

function playNavSound() {
  try {
    if (!isSoundEnabled()) return;
    if (!ensureAudioContext()) return;
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
    // ignore
  }
}

document.addEventListener("click", (event) => {
  const target = event.target;
  const button = target && target.closest ? target.closest("button, a") : null;
  if (!button) return;
  const sound = button.dataset.sound || "";
  if (sound === "nav") {
    playNavSound();
    return;
  }
  if (sound === "important") {
    playImportantSound();
    return;
  }
  if (sound === "generate") {
    playGenerateSound();
    return;
  }
  if (sound === "delete") {
    playDeleteSound();
    return;
  }
  playClickSound();
});

function showSessionPills(show) {
  if (examTimerPill) examTimerPill.classList.toggle("hidden", !show);
  if (examProgressPill) examProgressPill.classList.toggle("hidden", !show);
  if (examScorePill) examScorePill.classList.toggle("hidden", !show);
}

function letterForIndex(idx) {
  return String.fromCharCode(65 + Number(idx));
}

function sameSet(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  const setA = new Set(a);
  if (setA.size !== b.length) return false;
  return b.every((x) => setA.has(x));
}

const EXPLANATION_STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "aws",
  "amazon",
  "cloud",
  "da",
  "das",
  "de",
  "do",
  "dos",
  "e",
  "em",
  "na",
  "nas",
  "no",
  "nos",
  "o",
  "os",
  "ou",
  "para",
  "por",
  "service",
  "services",
  "servico",
  "servicos",
  "serviço",
  "serviços",
  "the",
  "um",
  "uma",
]);

function normalizeMatch(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function scoreOptionsFromExplanation(options, explanation) {
  const expNorm = normalizeMatch(explanation);
  const expPad = ` ${expNorm} `;
  return (Array.isArray(options) ? options : []).map((opt) => {
    const optNorm = normalizeMatch(opt);
    let score = 0;
    if (optNorm) {
      if (expPad.includes(` ${optNorm} `)) score += 3;
      else if (expNorm.includes(optNorm)) score += 2;
    }
    const tokens = optNorm
      .split(" ")
      .map((t) => t.trim())
      .filter(Boolean)
      .filter((t) => !EXPLANATION_STOPWORDS.has(t))
      .filter((t) => /\d/.test(t) || t.length >= 5);
    Array.from(new Set(tokens)).forEach((tok) => {
      if (expPad.includes(` ${tok} `)) score += 1;
    });
    return score;
  });
}

function fixQuestionCorrectFromExplanation(question) {
  if (!question || typeof question !== "object") return;
  if (!Array.isArray(question.options) || question.options.length !== 4) return;
  if (!Array.isArray(question.correct) || question.correct.length !== 1) return;
  const explanation = String(question.explanation || "").trim();
  if (!explanation) return;
  const current = Number(question.correct[0]);
  if (!Number.isInteger(current) || current < 0 || current > 3) return;

  const scores = scoreOptionsFromExplanation(question.options, explanation);
  if (!scores.length || scores.length !== 4) return;
  const bestScore = Math.max(...scores);
  if (bestScore < 2) return;
  const bestIndices = scores.map((s, i) => (s === bestScore ? i : -1)).filter((i) => i >= 0);
  if (bestIndices.length !== 1) return;
  const bestIdx = bestIndices[0];
  if (bestIdx === current) return;
  if (scores[current] >= 2) return;
  question.correct = [bestIdx];
}

function computeCorrectCount() {
  let correct = 0;
  questions.forEach((q, idx) => {
    if (sameSet(answers[idx] || [], q.correct || [])) {
      correct += 1;
    }
  });
  return correct;
}

function computeAnsweredCount() {
  return answers.filter((selection) => Array.isArray(selection) && selection.length > 0).length;
}

function updateHeader() {
  if (!questions.length) return;
  examProgressEl.textContent = `${currentIndex + 1}/${questions.length}`;
  examScoreEl.textContent = String(computeAnsweredCount());
}

function requiredSelectionsFor(question) {
  if (!question || !Array.isArray(question.correct)) return 1;
  return question.correct.length >= 2 ? 2 : 1;
}

function updateNavButtons() {
  if (examPrevBtn) examPrevBtn.disabled = currentIndex <= 0;
  if (examNextBtn) examNextBtn.disabled = currentIndex >= questions.length - 1;
}

function updateOptionsActiveState() {
  const selected = new Set(answers[currentIndex] || []);
  examOptionsEl.querySelectorAll("button[data-option-index]").forEach((btn) => {
    const idx = Number(btn.dataset.optionIndex);
    const isActive = selected.has(idx);
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

function renderQuestion() {
  const q = questions[currentIndex];
  if (!q) return;
  examQuestionEl.textContent = q.question || "";
  const required = requiredSelectionsFor(q);
  examHintEl.textContent =
    required === 2
      ? t("exam.hint.selectTwo")
      : activeAllowMulti
        ? t("exam.hint.selectFlexible")
        : t("exam.hint.selectOne");

  examOptionsEl.innerHTML = "";
  (q.options || []).forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ghost exam-option";
    btn.dataset.optionIndex = String(idx);
    btn.textContent = `${letterForIndex(idx)}) ${opt}`;
    btn.addEventListener("click", () => toggleOption(idx));
    examOptionsEl.appendChild(btn);
  });

  updateOptionsActiveState();
  updateHeader();
  updateNavButtons();
}

function toggleOption(idx) {
  const q = questions[currentIndex];
  if (!q) return;
  const required = requiredSelectionsFor(q);
  const maxAllowed = activeAllowMulti ? 2 : required;
  const selected = Array.isArray(answers[currentIndex]) ? [...answers[currentIndex]] : [];
  const already = selected.includes(idx);

  setExamStatus("");
  if (required === 1 && !activeAllowMulti) {
    answers[currentIndex] = already ? [] : [idx];
    updateOptionsActiveState();
    updateHeader();
    return;
  }

  if (already) {
    answers[currentIndex] = selected.filter((x) => x !== idx);
    updateOptionsActiveState();
    updateHeader();
    return;
  }

  if (selected.length >= maxAllowed) {
    setExamStatus(t("exam.status.maxTwo"));
    return;
  }

  selected.push(idx);
  answers[currentIndex] = selected;
  updateOptionsActiveState();
  updateHeader();
}

function resetToSetup() {
  questions = [];
  answers = [];
  currentIndex = 0;
  setSetupStatus("");
  setExamStatus("");
  setUsageStatus("");
  setReportMeta("");
  setSavedViewMode(false);
  showSessionPills(false);
  examSession.classList.add("hidden");
  examReport.classList.add("hidden");
  examSetup.classList.remove("hidden");
  stopTimer();
  sessionActive = false;
  sessionSaved = false;
  timedOut = false;
}

function setSavedViewMode(enabled) {
  savedViewMode = Boolean(enabled);
  if (examRetakeBtn) {
    examRetakeBtn.classList.toggle("hidden", savedViewMode);
    examRetakeBtn.disabled = savedViewMode;
  }
}

function openSession() {
  examSetup.classList.add("hidden");
  examReport.classList.add("hidden");
  examSession.classList.remove("hidden");
  showSessionPills(true);
  sessionActive = true;
  sessionSaved = false;
  setSavedViewMode(false);
  startTimer();
}

function openReport() {
  examSetup.classList.add("hidden");
  examSession.classList.add("hidden");
  examReport.classList.remove("hidden");
  showSessionPills(false);
  stopTimer();
  sessionActive = false;
  setReviewFilter(reviewFilter);
}

function formatSelection(indices, options) {
  if (!indices || !indices.length) return t("exam.review.unanswered");
  return indices
    .slice()
    .sort((a, b) => a - b)
    .map((i) => `${letterForIndex(i)}) ${options[i]}`)
    .join(" · ");
}

function buildReview() {
  examReviewEl.innerHTML = "";
  questions.forEach((q, idx) => {
    const user = answers[idx] || [];
    const hasAnswer = Array.isArray(user) && user.length > 0;
    const ok = hasAnswer && sameSet(user, q.correct || []);
    const status = ok ? "correct" : hasAnswer ? "incorrect" : "unanswered";
    if (reviewFilter === "correct" && status !== "correct") return;
    if (reviewFilter === "incorrect" && status !== "incorrect") return;
    const wrapper = document.createElement("div");
    wrapper.className = `exam-review-item ${status}`;

    const header = document.createElement("div");
    header.className = "exam-review-head";

    const title = document.createElement("strong");
    title.textContent = `${idx + 1}. ${q.question || ""}`;

    const badge = document.createElement("span");
    badge.className = "exam-review-badge";
    badge.textContent = ok ? t("exam.review.correct") : hasAnswer ? t("exam.review.incorrect") : t("exam.review.unanswered");

    header.appendChild(title);
    header.appendChild(badge);

    const body = document.createElement("div");
    body.className = "exam-review-body";

    const yourLine = document.createElement("div");
    yourLine.className = "exam-review-line";
    const yourLabel = document.createElement("span");
    yourLabel.className = "muted";
    yourLabel.textContent = `${t("exam.review.yourAnswer")}: `;
    const yourValue = document.createElement("span");
    yourValue.textContent = formatSelection(user, q.options || []);
    yourLine.appendChild(yourLabel);
    yourLine.appendChild(yourValue);

    const correctLine = document.createElement("div");
    correctLine.className = "exam-review-line";
    const correctLabel = document.createElement("span");
    correctLabel.className = "muted";
    correctLabel.textContent = `${t("exam.review.correctAnswer")}: `;
    const correctValue = document.createElement("span");
    correctValue.textContent = formatSelection(q.correct || [], q.options || []);
    correctLine.appendChild(correctLabel);
    correctLine.appendChild(correctValue);

    body.appendChild(yourLine);
    body.appendChild(correctLine);

    const optionsList = document.createElement("div");
    optionsList.className = "exam-review-options";
    const opts = Array.isArray(q.options) ? q.options : [];
    const correctSet = new Set(Array.isArray(q.correct) ? q.correct : []);
    const userSet = new Set(Array.isArray(user) ? user : []);
    opts.forEach((opt, optIdx) => {
      const row = document.createElement("div");
      row.className = "exam-review-option";
      const isCorrect = correctSet.has(optIdx);
      const isSelected = userSet.has(optIdx);
      row.classList.toggle("is-correct", isCorrect);
      row.classList.toggle("is-selected", isSelected);

      const text = document.createElement("span");
      text.textContent = `${letterForIndex(optIdx)}) ${opt}`;

      const mark = document.createElement("span");
      mark.className = "exam-review-option-mark";
      if (isCorrect && isSelected) mark.textContent = `${t("exam.review.option.correct")} · ${t("exam.review.option.selected")}`;
      else if (isCorrect) mark.textContent = t("exam.review.option.correct");
      else if (isSelected) mark.textContent = t("exam.review.option.selected");
      else mark.textContent = "";

      row.appendChild(text);
      if (mark.textContent) row.appendChild(mark);
      optionsList.appendChild(row);
    });
    if (opts.length) body.appendChild(optionsList);

    const explanation = (q.explanation || "").trim();
    if (explanation) {
      const expLine = document.createElement("div");
      expLine.className = "exam-review-line";
      const expLabel = document.createElement("span");
      expLabel.className = "muted";
      expLabel.textContent = `${t("exam.review.explanation")}: `;
      const expValue = document.createElement("span");
      expValue.textContent = explanation;
      expLine.appendChild(expLabel);
      expLine.appendChild(expValue);
      body.appendChild(expLine);
    }

    wrapper.appendChild(header);
    wrapper.appendChild(body);
    examReviewEl.appendChild(wrapper);
  });
}

function setReviewFilter(next) {
  const normalized = next === "correct" || next === "incorrect" ? next : "all";
  reviewFilter = normalized;
  buildReview();
  const isAll = reviewFilter === "all";
  const isCorrect = reviewFilter === "correct";
  const isIncorrect = reviewFilter === "incorrect";
  if (examFilterAllBtn) {
    examFilterAllBtn.classList.toggle("is-active", isAll);
    examFilterAllBtn.setAttribute("aria-pressed", String(isAll));
  }
  if (examFilterCorrectBtn) {
    examFilterCorrectBtn.classList.toggle("is-active", isCorrect);
    examFilterCorrectBtn.setAttribute("aria-pressed", String(isCorrect));
  }
  if (examFilterIncorrectBtn) {
    examFilterIncorrectBtn.classList.toggle("is-active", isIncorrect);
    examFilterIncorrectBtn.setAttribute("aria-pressed", String(isIncorrect));
  }
}

function buildExamSessionPayload(durationSec) {
  const total = questions.length;
  const answered = computeAnsweredCount();
  const correct = computeCorrectCount();
  const incorrect = Math.max(0, answered - correct);
  const unanswered = Math.max(0, total - answered);
  return {
    collection_id: activeCollectionId ? Number(activeCollectionId) : null,
    topic: activeTopic,
    name: activeExamName,
    allow_multi: activeAllowMulti,
    time_limit_sec: activeTimeLimitSec > 0 ? activeTimeLimitSec : null,
    duration_sec: durationSec,
    total,
    answered,
    correct,
    incorrect,
    details: {
      unanswered,
      timed_out: timedOut,
      questions,
      answers,
      usage: generationUsage || {},
    },
  };
}

async function saveExamSession() {
  if (!questions.length) return;
  if (sessionSaved) return;
  const durationSec = Math.max(0, Math.floor((Date.now() - sessionStartTime) / 1000));
  const payload = buildExamSessionPayload(durationSec);
  sessionSaved = true;
  try {
    const res = await fetch("/api/exam/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    let data = {};
    try {
      data = await res.json();
    } catch (err) {
      data = {};
    }
    if (!res.ok) {
      throw new Error(data.error || "Erro ao salvar prova.");
    }
    setExamSessionsStatus(t("exam.status.saved"));
    setTimeout(() => setExamSessionsStatus(""), 1400);
    void loadExamSessions({ silent: true, collectionId: activeCollectionId });
  } catch (err) {
    sessionSaved = false;
    setExamSessionsStatus(t("exam.status.saveFail"));
    setTimeout(() => setExamSessionsStatus(""), 1800);
  }
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

function setReportMetaFromSession(session) {
  if (!session || typeof session !== "object") {
    setReportMeta("");
    return;
  }
  const name = String(session.name || "").trim();
  const topic = String(session.topic || "").trim();
  const createdAt = session.created_at ? new Date(session.created_at).toLocaleString() : "";
  const duration = formatClock(session.duration_sec);
  const total = Number(session.total || 0);
  const parts = [];
  if (name) parts.push(name);
  if (createdAt) parts.push(createdAt);
  if (topic) parts.push(topic);
  if (total > 0) parts.push(t("exam.sessions.item", { duration, total }));
  setReportMeta(parts.join(" · "));
}

function loadExamFromSession(session, { keepAnswers = true } = {}) {
  const details = session && session.details && typeof session.details === "object" ? session.details : {};
  const qs = Array.isArray(details.questions) ? details.questions : [];
  const ans = Array.isArray(details.answers) ? details.answers : [];
  if (!qs.length) return false;

  questions = qs;
  questions.forEach((item) => fixQuestionCorrectFromExplanation(item));
  answers = keepAnswers ? (ans.length ? ans : questions.map(() => [])) : questions.map(() => []);
  currentIndex = 0;
  generationUsage = details.usage && typeof details.usage === "object" ? details.usage : {};

  activeTopic = String(session.topic || "");
  activeExamName = String(session.name || "");
  activeAllowMulti = Boolean(session.allow_multi);
  activeTimeLimitSec = Number(session.time_limit_sec || 0) || 0;
  activeCollectionId = session.collection_id ? String(session.collection_id) : "";

  if (examTopicInput) examTopicInput.value = activeTopic;
  if (examNameInput) examNameInput.value = activeExamName;
  if (examMultiToggle) examMultiToggle.checked = activeAllowMulti;
  if (examCollectionSelect) examCollectionSelect.value = activeCollectionId;

  if (examTimeToggle && examTimeInput) {
    if (activeTimeLimitSec > 0) {
      examTimeToggle.checked = true;
      examTimeInput.value = String(Math.max(1, Math.round(activeTimeLimitSec / 60)));
    } else {
      examTimeToggle.checked = false;
    }
    applyTimeLimitUI();
  }

  return true;
}

function openSavedExamReport(session) {
  if (!isViewableExamSession(session)) {
    setExamSessionsStatus(t("exam.sessions.notCompleted"));
    setTimeout(() => setExamSessionsStatus(""), 1800);
    return;
  }
  if (!loadExamFromSession(session, { keepAnswers: true })) {
    setExamSessionsStatus(t("exam.sessions.missingDetails"));
    return;
  }
  const total = questions.length;
  const correct = computeCorrectCount();
  const answered = computeAnsweredCount();
  const incorrect = Math.max(0, answered - correct);
  const rate = total ? Math.round((correct / total) * 100) : 0;

  examReportCorrectEl.textContent = String(correct);
  examReportIncorrectEl.textContent = String(incorrect);
  examReportRateEl.textContent = `${rate}%`;
  setReportMetaFromSession(session);
  setSavedViewMode(true);
  setReviewFilter("all");
  buildReview();
  openReport();
}

function renderExamSessions(sessions, summary) {
  if (!examSessionsList) return;
  examSessionsList.innerHTML = "";
  const list = Array.isArray(sessions) ? sessions : [];
  if (!list.length) {
    examSessionsList.textContent = t("exam.sessions.empty");
    return;
  }

  list.forEach((session) => {
    const unanswered = Math.max(0, Number(session.total || 0) - Number(session.answered || 0));
    const item = document.createElement("div");
    item.className = "session-item exam-session-card";
    const name = (session.name || "").trim();
    const topic = (session.topic || "").trim();
  const dateLabel = new Date(session.created_at).toLocaleString();
  const subtitleParts = [];
  if (name) subtitleParts.push(dateLabel);
  if (topic) subtitleParts.push(topic);
  subtitleParts.push(
    t("exam.sessions.item", { duration: formatClock(session.duration_sec), total: session.total })
  );
  const subtitle = subtitleParts.join(" · ");
  const canView = isViewableExamSession(session);
  const viewHtml = canView
    ? `<button class="ghost small view-session" type="button" data-id="${session.id}" data-sound="nav">${t(
        "exam.sessions.view"
      )}</button>`
    : "";
  item.innerHTML = `
      <div class="session-top">
        <div class="session-title-row">
          <strong class="session-title">${escapeHtml(name || dateLabel)}</strong>
        </div>
        <div class="muted session-subtitle">${escapeHtml(subtitle)}</div>
      </div>
      <div class="session-stats" aria-label="Resumo">
        <div class="session-stat">
          <span class="muted">${t("exam.sessions.stats.correct")}</span>
          <strong>${session.correct}</strong>
        </div>
        <div class="session-stat">
          <span class="muted">${t("exam.sessions.stats.incorrect")}</span>
          <strong>${session.incorrect}</strong>
        </div>
        <div class="session-stat">
          <span class="muted">${t("exam.sessions.stats.unanswered")}</span>
          <strong>${unanswered}</strong>
        </div>
      </div>
      <div class="session-actions">
        ${viewHtml}
        <button class="ghost small danger delete-session" type="button" data-id="${session.id}" data-sound="delete">${t(
          "exam.sessions.delete"
        )}</button>
      </div>
    `;
  examSessionsList.appendChild(item);
  });

  if (summary && typeof summary === "object") {
    setExamSessionsStatus(
      t("exam.sessions.summary", {
        count: summary.count ?? 0,
        correct: summary.correct ?? 0,
        incorrect: summary.incorrect ?? 0,
      })
    );
  }

  examSessionsList.querySelectorAll(".view-session").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sessionId = btn.dataset.id;
      const session = list.find((s) => String(s.id) === String(sessionId));
      if (!session) return;
      openSavedExamReport(session);
    });
  });

  examSessionsList.querySelectorAll(".delete-session").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const item = btn.closest(".session-item");
      if (item) {
        item.classList.add("is-removing");
        btn.disabled = true;
      }
      playDeleteSound();
      await fetch(`/api/exam/sessions/${btn.dataset.id}`, { method: "DELETE" });
      setTimeout(() => {
        void loadExamSessions({ silent: true, collectionId: activeCollectionId });
      }, 360);
    });
  });
}

async function loadExamSessions({ silent = false, collectionId = "" } = {}) {
  if (!examSessionsList) return;
  try {
    const url = collectionId ? `/api/exam/sessions?collection_id=${collectionId}` : "/api/exam/sessions";
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Erro ao carregar histórico.");
    }
    const sessions = Array.isArray(data.sessions) ? data.sessions : [];
    renderExamSessions(sessions, data.summary || {});
  } catch (err) {
    if (!silent) {
      setExamSessionsStatus(err.message);
    }
  }
}

async function clearExamHistory() {
  const collectionId = (examCollectionSelect && examCollectionSelect.value ? examCollectionSelect.value : "").trim();
  const message = collectionId ? t("exam.sessions.clearConfirmCollection") : t("exam.sessions.clearConfirm");
  if (!window.confirm(message)) return;
  playDeleteSound();
  try {
    const res = await fetch("/api/exam/sessions/clear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collection_id: collectionId ? Number(collectionId) : null }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Erro ao limpar histórico.");
    }
    setExamSessionsStatus(t("exam.sessions.cleared"));
    renderExamSessions([], { count: 0, correct: 0, incorrect: 0 });
  } catch (err) {
    setExamSessionsStatus(err.message);
  } finally {
    void loadExamSessions({ silent: true, collectionId });
  }
}

function finishExam({ timedOut: timedOutFlag = false } = {}) {
  if (!questions.length) return;
  const correct = computeCorrectCount();
  const answered = computeAnsweredCount();
  const total = questions.length;
  const incorrect = Math.max(0, answered - correct);
  const rate = total ? Math.round((correct / total) * 100) : 0;
  timedOut = Boolean(timedOutFlag);

  const durationSec = Math.max(0, Math.floor((Date.now() - sessionStartTime) / 1000));
  const parts = [];
  if ((activeExamName || "").trim()) parts.push((activeExamName || "").trim());
  parts.push(new Date().toLocaleString());
  if ((activeTopic || "").trim()) parts.push((activeTopic || "").trim());
  parts.push(t("exam.sessions.item", { duration: formatClock(durationSec), total }));
  setReportMeta(parts.join(" · "));
  setSavedViewMode(false);
  setReviewFilter("all");

  examReportCorrectEl.textContent = String(correct);
  examReportIncorrectEl.textContent = String(incorrect);
  examReportRateEl.textContent = `${rate}%`;
  buildReview();
  openReport();
  void saveExamSession();
}

async function loadCollections() {
  setCollectionsStatus(t("exam.status.loadingCollections"));
  examCollectionSelect.innerHTML = "";
  const optNone = document.createElement("option");
  optNone.value = "";
  optNone.textContent = t("exam.setup.collectionNone");
  examCollectionSelect.appendChild(optNone);
  try {
    const res = await fetch("/api/collections");
    const list = await res.json();
    const collections = Array.isArray(list) ? list : [];
    collections.forEach((col) => {
      const opt = document.createElement("option");
      opt.value = col.id;
      const count = Number(col.card_count || 0);
      opt.textContent = `${col.name} (${count})`;
      opt.disabled = count <= 0;
      examCollectionSelect.appendChild(opt);
    });
    const saved = localStorage.getItem("active_collection") || "";
    if (saved) {
      examCollectionSelect.value = saved;
      if (examCollectionSelect.selectedOptions[0] && examCollectionSelect.selectedOptions[0].disabled) {
        examCollectionSelect.value = "";
      }
    }
    if (!collections.length) {
      setCollectionsStatus(t("exam.setup.collectionEmpty"));
    } else {
      setCollectionsStatus("");
    }
  } catch (err) {
    setCollectionsStatus("");
  }
}

async function startExam() {
  const key = getApiKey();
  if (!key) {
    examMissingKey.classList.remove("hidden");
    setSetupStatus(t("exam.status.missingKeyShort"));
    return;
  }
  examMissingKey.classList.add("hidden");
  setSetupStatus("");
  setUsageStatus("");

  const topic = (examTopicInput.value || "").trim();
  const name = (examNameInput && examNameInput.value ? examNameInput.value : "").trim();
  const count = Number(examCountInput.value || 10);
  if (!Number.isFinite(count) || count < 1 || count > 40) {
    setSetupStatus(t("exam.status.invalidCount"));
    return;
  }

  const collectionId = (examCollectionSelect.value || "").trim();
  const allowMulti = Boolean(examMultiToggle.checked);
  const timeLimitSec = getTimeLimitSecFromUI();
  if (examTimeToggle && examTimeToggle.checked && timeLimitSec <= 0) {
    setSetupStatus(t("exam.status.invalidTime"));
    return;
  }
  activeCollectionId = collectionId || "";
  activeTopic = topic;
  activeExamName = name;
  activeAllowMulti = allowMulti;
  activeTimeLimitSec = timeLimitSec;

  examStartBtn.disabled = true;
  examStartBtn.classList.add("loading");
  setSetupStatus(t("exam.status.generating"));
  startProgress();
  playGenerateSound();
  const startedAt = performance.now();
  try {
    const res = await fetch("/api/exam/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": key,
      },
      body: JSON.stringify({
        topic,
        count,
        collection_id: collectionId ? Number(collectionId) : null,
        allow_multi: allowMulti,
      }),
    });
    let data = {};
    try {
      data = await res.json();
    } catch (err) {
      data = {};
    }
    if (!res.ok) {
      throw new Error(data.error || "Erro ao gerar prova");
    }
    const q = Array.isArray(data.questions) ? data.questions : [];
    if (!q.length) {
      throw new Error("Nenhuma pergunta encontrada.");
    }
    questions = q;
    questions.forEach((item) => fixQuestionCorrectFromExplanation(item));
    shuffleInPlace(questions);
    answers = q.map(() => []);
    generationUsage = data.usage || {};
    if (window.AIUsage && typeof window.AIUsage.recordFromUsage === "function") {
      window.AIUsage.recordFromUsage(generationUsage);
    }
    const tokenUsage = extractTokenUsage(generationUsage);
    const usageText = t("exam.usage.tokens", {
      total: tokenUsage.total,
      input: tokenUsage.input,
      output: tokenUsage.output,
    });
    setUsageStatus(usageText);
    currentIndex = 0;
    openSession();
    renderQuestion();
    const durationSec = (performance.now() - startedAt) / 1000;
    const speed = durationSec ? (questions.length / durationSec).toFixed(2) : "0";
    setExamStatus(`${usageText} ${speed ? `· ${speed} q/s` : ""}`.trim());
  } catch (err) {
    setSetupStatus(err.message);
  } finally {
    examStartBtn.disabled = false;
    examStartBtn.classList.remove("loading");
    stopProgress();
  }
}

function readStoredRetake() {
  try {
    const raw = localStorage.getItem("exam_retake_payload");
    if (!raw) return null;
    const payload = JSON.parse(raw);
    return payload && typeof payload === "object" ? payload : null;
  } catch (err) {
    return null;
  }
}

function readStoredView() {
  try {
    const raw = localStorage.getItem("exam_view_payload");
    if (!raw) return null;
    const payload = JSON.parse(raw);
    return payload && typeof payload === "object" ? payload : null;
  } catch (err) {
    return null;
  }
}

function clearStoredRetake() {
  try {
    localStorage.removeItem("exam_retake_payload");
  } catch (err) {
    // ignore
  }
}

function clearStoredView() {
  try {
    localStorage.removeItem("exam_view_payload");
  } catch (err) {
    // ignore
  }
}

function startFromStoredRetake(payload) {
  const qs = Array.isArray(payload && payload.questions) ? payload.questions : [];
  if (!qs.length) return false;

  questions = qs;
  questions.forEach((item) => fixQuestionCorrectFromExplanation(item));
  shuffleInPlace(questions);
  answers = qs.map(() => []);
  currentIndex = 0;
  generationUsage = payload.usage && typeof payload.usage === "object" ? payload.usage : {};

  activeTopic = String(payload.topic || "");
  activeExamName = String(payload.name || "");
  activeAllowMulti = Boolean(payload.allow_multi);
  activeTimeLimitSec = Number(payload.time_limit_sec || 0) || 0;
  activeCollectionId = payload.collection_id ? String(payload.collection_id) : "";

  if (examTopicInput) examTopicInput.value = activeTopic;
  if (examNameInput) examNameInput.value = activeExamName;
  if (examMultiToggle) examMultiToggle.checked = activeAllowMulti;

  if (examTimeToggle && examTimeInput) {
    if (activeTimeLimitSec > 0) {
      examTimeToggle.checked = true;
      examTimeInput.value = String(Math.max(1, Math.round(activeTimeLimitSec / 60)));
    } else {
      examTimeToggle.checked = false;
    }
    applyTimeLimitUI();
  }

  if (examCollectionSelect && activeCollectionId) {
    examCollectionSelect.value = activeCollectionId;
  }

  setSetupStatus("");
  setUsageStatus("");
  const tokenUsage = extractTokenUsage(generationUsage);
  if (tokenUsage.total) {
    setUsageStatus(
      t("exam.usage.tokens", {
        total: tokenUsage.total,
        input: tokenUsage.input,
        output: tokenUsage.output,
      })
    );
  }

  openSession();
  renderQuestion();
  return true;
}

function startFromStoredView(payload) {
  if (!payload || typeof payload !== "object") return false;
  const details = payload.details && typeof payload.details === "object" ? payload.details : payload;
  const qs = Array.isArray(details.questions) ? details.questions : [];
  const ans = Array.isArray(details.answers) ? details.answers : [];
  if (!qs.length) return false;

  const session = {
    id: payload.id || payload.session_id || null,
    collection_id: payload.collection_id || null,
    topic: payload.topic || "",
    name: payload.name || "",
    created_at: payload.created_at || payload.createdAt || "",
    started_at: payload.started_at || "",
    duration_sec: payload.duration_sec || payload.durationSec || 0,
    time_limit_sec: payload.time_limit_sec || payload.timeLimitSec || null,
    allow_multi: payload.allow_multi || false,
    total: payload.total || qs.length,
    answered: payload.answered || 0,
    correct: payload.correct || 0,
    incorrect: payload.incorrect || 0,
    details: {
      ...(payload.details && typeof payload.details === "object" ? payload.details : {}),
      questions: qs,
      answers: ans,
    },
  };

  if (!isViewableExamSession(session)) {
    setSetupStatus(t("exam.sessions.notCompleted"));
    return false;
  }
  openSavedExamReport(session);
  return true;
}

examStartBtn.addEventListener("click", () => {
  void startExam();
});

examPrevBtn.addEventListener("click", () => {
  if (!questions.length) return;
  currentIndex = Math.max(0, currentIndex - 1);
  renderQuestion();
});

examNextBtn.addEventListener("click", () => {
  if (!questions.length) return;
  currentIndex = Math.min(questions.length - 1, currentIndex + 1);
  renderQuestion();
});

examFinishBtn.addEventListener("click", finishExam);
examRestartBtn.addEventListener("click", resetToSetup);
examBackSetupBtn.addEventListener("click", resetToSetup);
if (examRetakeBtn) {
  examRetakeBtn.addEventListener("click", () => {
    if (!questions.length) {
      resetToSetup();
      return;
    }
    shuffleInPlace(questions);
    answers = questions.map(() => []);
    currentIndex = 0;
    openSession();
    renderQuestion();
    const tokenUsage = extractTokenUsage(generationUsage);
    if (tokenUsage.total) {
      setExamStatus(
        t("exam.usage.tokens", {
          total: tokenUsage.total,
          input: tokenUsage.input,
          output: tokenUsage.output,
        })
      );
    } else {
      setExamStatus("");
    }
  });
}

if (examFilterAllBtn) {
  examFilterAllBtn.addEventListener("click", () => setReviewFilter("all"));
}
if (examFilterCorrectBtn) {
  examFilterCorrectBtn.addEventListener("click", () => {
    setReviewFilter(reviewFilter === "correct" ? "all" : "correct");
  });
}
if (examFilterIncorrectBtn) {
  examFilterIncorrectBtn.addEventListener("click", () => {
    setReviewFilter(reviewFilter === "incorrect" ? "all" : "incorrect");
  });
}

if (examRefreshSessionsBtn) {
  examRefreshSessionsBtn.addEventListener("click", () => {
    void loadExamSessions({ silent: true, collectionId: (examCollectionSelect.value || "").trim() });
  });
}

if (examClearSessionsBtn) {
  examClearSessionsBtn.addEventListener("click", () => {
    void clearExamHistory();
  });
}

examCollectionSelect.addEventListener("change", () => {
  try {
    localStorage.setItem("active_collection", examCollectionSelect.value || "");
  } catch (err) {
    // ignore storage failures
  }
  void loadExamSessions({ silent: true, collectionId: (examCollectionSelect.value || "").trim() });
});

if (examTimeToggle) {
  examTimeToggle.addEventListener("change", applyTimeLimitUI);
}

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.dataset.theme;
    localStorage.setItem("theme", theme);
    loadTheme();
  });
});

setLanguage(detectLanguage());
loadTheme();
applyTimeLimitUI();
void loadCollections().then(() => {
  const collectionId = (examCollectionSelect.value || "").trim();
  void loadExamSessions({ silent: true, collectionId });

  const storedView = readStoredView();
  if (storedView) {
    clearStoredView();
    if (startFromStoredView(storedView)) return;
  }

  const stored = readStoredRetake();
  if (stored) {
    clearStoredRetake();
    startFromStoredRetake(stored);
  }
});

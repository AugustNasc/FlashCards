const questionEl = document.getElementById("card-question");
const answerEl = document.getElementById("card-answer");
const toggleAnswerBtn = document.getElementById("toggle-answer");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const finishBtn = document.getElementById("finish");
const continueBtn = document.getElementById("continue");
const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");
const statusEl = document.getElementById("study-status");
const reportEl = document.getElementById("report");
const sessionsList = document.getElementById("sessions-list");
const refreshSessionsBtn = document.getElementById("refresh-sessions");
const reloadCardsBtn = document.getElementById("reload-cards");
const studyCollectionSelect = document.getElementById("study-collection");
const studySetup = document.getElementById("study-setup");
const studySession = document.getElementById("study-session");
const startSessionBtn = document.getElementById("start-session");
const setupStatusEl = document.getElementById("setup-status");
const studyLockedEl = document.getElementById("study-locked");
const collectionStatusEl = document.getElementById("study-collection-status");
const difficultyFilterField = document.getElementById("difficulty-filter-field");
const difficultyFilterSelect = document.getElementById("difficulty-filter");
const sessionTimeInput = document.getElementById("session-time");
const sessionTimeToggle = document.getElementById("session-time-toggle");
const autoAdvanceToggle = document.getElementById("auto-advance-toggle");
const autoAdvanceIntervalInput = document.getElementById("auto-advance-interval");
const studyAlert = document.getElementById("study-alert");
const studyAlertMessage = document.getElementById("study-alert-message");
const studyAlertOk = document.getElementById("study-alert-ok");
const studyAlertClose = document.getElementById("study-alert-close");
const studyBackLink = document.getElementById("study-back");
const sessionPills = document.querySelectorAll(".session-pill");
const studyCard = document.getElementById("study-card");

const themeButtons = document.querySelectorAll(".theme-btn");

const resultButtons = document.querySelectorAll("[data-result]");
const difficultyButtons = document.querySelectorAll("[data-difficulty]");

let cards = [];
let currentIndex = 0;
let showAnswer = false;
let startTime = Date.now();
let timerInterval = null;
let sessionMaxSec = 0;
let activeCollectionId = "";
let difficultyReady = false;
let activeDifficulty = "";
let collectionsData = [];
const ratings = {};
let sessionActive = false;
let autoAdvanceInterval = null;
let clickAudioCtx = null;
let timeUpPlayed = false;
let studyAudioCtx = null;
let studyNoise = null;
let studyFilter = null;
let studyLfo = null;
let studyGain = null;
let studyStartPending = false;
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let touchMoved = false;
let lastStudyFocus = null;
let studyModalHandler = null;

const I18N = {
  pt: {
    "study.pageTitle": "Modo Estudo",
    "study.back": "Voltar",
    "study.header.eyebrow": "Modo estudo",
    "study.header.title": "Foco total nos cards.",
    "study.header.subtitle":
      "Marque acertos/erros e a dificuldade. No fim você recebe um relatório completo.",
    "study.session.time": "Tempo",
    "study.session.progress": "Progresso",
    "study.setup.title": "Configurar sessão",
    "study.setup.subtitle": "Escolha a coleção e inicie a sessão. Configurações extras ficam em “Configurações adicionais”.",
    "study.setup.locked": "Você precisa ter uma coleção criada para acessar o modo estudo.",
    "study.setup.collection": "Coleção",
    "study.setup.difficulty": "Nível de dificuldade",
    "study.setup.difficultyAll": "Todos",
    "study.setup.difficultyEasy": "Fácil",
    "study.setup.difficultyHard": "Difícil",
    "study.setup.difficultyNote": "Disponível após completar todos os cards da coleção.",
    "study.setup.advanced.summary": "Configurações adicionais",
    "study.setup.timeLabel": "Tempo de sessão (minutos)",
    "study.setup.timeToggle": "Ativar limite de tempo",
    "study.setup.timeUnit": "minutos por sessão",
    "study.setup.timeNote": "Ative para encerrar automaticamente quando o tempo acabar.",
    "study.setup.autoAdvance": "Passar cards automaticamente",
    "study.setup.autoAdvanceUnit": "segundos por card",
    "study.setup.autoAdvanceNote": "Ative para avançar sozinho enquanto a sessão estiver rodando.",
    "study.setup.start": "Iniciar sessão",
    "study.session.showAnswer": "Mostrar resposta",
    "study.session.hideAnswer": "Ocultar resposta",
    "study.session.prev": "◀ Anterior",
    "study.session.next": "Próximo ▶",
    "study.session.random": "↻ Aleatório",
    "study.session.result": "Resultado",
    "study.session.correct": "Acertei",
    "study.session.incorrect": "Errei",
    "study.session.difficulty": "Dificuldade",
    "study.session.easy": "Fácil",
    "study.session.hard": "Difícil",
    "study.session.finish": "Finalizar sessão",
    "study.session.restart": "Começar nova Sessão",
    "study.report.title": "Relatório final",
    "study.report.correct": "Acertos",
    "study.report.incorrect": "Erros",
    "study.report.easy": "Fáceis",
    "study.report.hard": "Difíceis",
    "study.report.easyList": "Cards fáceis",
    "study.report.hardList": "Cards difíceis",
    "study.report.wrongList": "Erros",
    "study.report.recommendation": "Recomendação",
    "study.sessions.title": "Sessões salvas",
    "study.sessions.refresh": "Atualizar",
    "study.sessions.item": "Tempo {duration} · {total} cards",
    "study.sessions.delete": "Excluir",
    "study.alert.title": "Atenção",
    "study.alert.ok": "Entendi",
    "study.loading": "Carregando...",
    "study.card.aria": "Card de estudo. Toque para mostrar ou ocultar a resposta.",
    "study.status.noCards": "Nenhum card encontrado.",
    "study.status.noCardsHint": "Crie ou gere cards antes de estudar.",
    "study.status.allAnswered": "Todos os cards já foram respondidos.",
    "study.status.sessionFinished": "Sessão finalizada.",
    "study.status.timeFinished": "Tempo finalizado. Sessão concluída.",
    "study.status.readyNext": "Pronto para nova sessão.",
    "study.status.finishCurrent": "Finalize a sessão atual antes de começar uma nova.",
    "study.status.selectCollection": "Selecione uma coleção para iniciar.",
    "study.status.collectionEmpty": "Esta coleção ainda não possui cards.",
    "study.status.noEasy": "Não há cards fáceis nesta coleção.",
    "study.status.noHard": "Não há cards difíceis nesta coleção.",
    "study.status.noFiltered": "Nenhum card encontrado com esse filtro.",
    "study.status.sessionsEmpty": "Nenhuma sessão salva ainda.",
    "study.reco.keep": "Continue revisando diariamente para consolidar a memória.",
    "study.reco.few": "Você tem poucos cards. Gere novos temas para enriquecer o baralho.",
    "study.reco.errors": "Muitos erros: gere novos cards focados nos temas que você errou.",
    "study.reco.hard": "Muitos cards difíceis: gere versões mais simples ou divida os tópicos.",
    "study.reco.easy": "A maioria está fácil. Gere novos cards para aumentar o desafio.",
  },
  en: {
    "study.pageTitle": "Study Mode",
    "study.back": "Back",
    "study.header.eyebrow": "Study mode",
    "study.header.title": "Total focus on your cards.",
    "study.header.subtitle":
      "Mark correct/incorrect and difficulty. At the end you get a full report.",
    "study.session.time": "Time",
    "study.session.progress": "Progress",
    "study.setup.title": "Set up session",
    "study.setup.subtitle": "Choose a collection and start the session. Extra settings are under “Additional settings”.",
    "study.setup.locked": "You need at least one collection to access study mode.",
    "study.setup.collection": "Collection",
    "study.setup.difficulty": "Difficulty level",
    "study.setup.difficultyAll": "All",
    "study.setup.difficultyEasy": "Easy",
    "study.setup.difficultyHard": "Hard",
    "study.setup.difficultyNote": "Available after completing all cards in the collection.",
    "study.setup.advanced.summary": "Additional settings",
    "study.setup.timeLabel": "Session time (minutes)",
    "study.setup.timeToggle": "Enable time limit",
    "study.setup.timeUnit": "minutes per session",
    "study.setup.timeNote": "Enable to end automatically when time runs out.",
    "study.setup.autoAdvance": "Auto-advance cards",
    "study.setup.autoAdvanceUnit": "seconds per card",
    "study.setup.autoAdvanceNote": "Enable to advance automatically while the session runs.",
    "study.setup.start": "Start session",
    "study.session.showAnswer": "Show answer",
    "study.session.hideAnswer": "Hide answer",
    "study.session.prev": "◀ Previous",
    "study.session.next": "Next ▶",
    "study.session.random": "↻ Random",
    "study.session.result": "Result",
    "study.session.correct": "Correct",
    "study.session.incorrect": "Incorrect",
    "study.session.difficulty": "Difficulty",
    "study.session.easy": "Easy",
    "study.session.hard": "Hard",
    "study.session.finish": "Finish session",
    "study.session.restart": "Start new session",
    "study.report.title": "Final report",
    "study.report.correct": "Correct",
    "study.report.incorrect": "Incorrect",
    "study.report.easy": "Easy",
    "study.report.hard": "Hard",
    "study.report.easyList": "Easy cards",
    "study.report.hardList": "Hard cards",
    "study.report.wrongList": "Incorrect",
    "study.report.recommendation": "Recommendation",
    "study.sessions.title": "Saved sessions",
    "study.sessions.refresh": "Refresh",
    "study.sessions.item": "Time {duration} · {total} cards",
    "study.sessions.delete": "Delete",
    "study.alert.title": "Attention",
    "study.alert.ok": "Got it",
    "study.loading": "Loading...",
    "study.card.aria": "Study card. Tap to show or hide the answer.",
    "study.status.noCards": "No cards found.",
    "study.status.noCardsHint": "Create or generate cards before studying.",
    "study.status.allAnswered": "All cards have been answered.",
    "study.status.sessionFinished": "Session finished.",
    "study.status.timeFinished": "Time is up. Session completed.",
    "study.status.readyNext": "Ready for a new session.",
    "study.status.finishCurrent": "Finish the current session before starting a new one.",
    "study.status.selectCollection": "Select a collection to start.",
    "study.status.collectionEmpty": "This collection has no cards yet.",
    "study.status.noEasy": "There are no easy cards in this collection.",
    "study.status.noHard": "There are no hard cards in this collection.",
    "study.status.noFiltered": "No cards found with this filter.",
    "study.status.sessionsEmpty": "No saved sessions yet.",
    "study.reco.keep": "Keep reviewing daily to consolidate memory.",
    "study.reco.few": "You have few cards. Generate new topics to enrich the deck.",
    "study.reco.errors": "Many errors: generate new cards focused on what you missed.",
    "study.reco.hard": "Many hard cards: create simpler versions or split topics.",
    "study.reco.easy": "Most are easy. Generate new cards to increase the challenge.",
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
  document.title = t("study.pageTitle");
  if (studyCard) {
    studyCard.setAttribute("aria-label", t("study.card.aria"));
  }
}

function setLanguage(lang) {
  currentLanguage = lang === "en" ? "en" : "pt";
  document.documentElement.lang = currentLanguage === "en" ? "en" : "pt-BR";
  applyTranslations();
}

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container) {
  if (!container) return [];
  return Array.from(container.querySelectorAll(focusableSelector)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

function trapStudyModalFocus(event) {
  if (event.key !== "Tab") return;
  const focusable = getFocusableElements(studyAlert);
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

function shouldLockStudyScroll() {
  return window.matchMedia("(max-width: 980px)").matches;
}

function focusStudySession() {
  if (!studySession) return;
  requestAnimationFrame(() => {
    const top = studySession.getBoundingClientRect().top + window.scrollY - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    if (studyCard && typeof studyCard.focus === "function") {
      studyCard.focus();
    }
  });
}

function lockStudyScroll() {
  if (shouldLockStudyScroll()) {
    document.body.classList.add("study-locked");
  }
}

function unlockStudyScroll() {
  document.body.classList.remove("study-locked");
}

function setSessionPillsVisible(visible) {
  sessionPills.forEach((pill) => {
    pill.classList.toggle("hidden", !visible);
  });
}

function stopAutoAdvance() {
  if (autoAdvanceInterval) {
    clearInterval(autoAdvanceInterval);
    autoAdvanceInterval = null;
  }
}

function isSoundEnabled() {
  return localStorage.getItem("sound_enabled") !== "0";
}

function isStudySoundEnabled() {
  return isSoundEnabled() && localStorage.getItem("study_sound_enabled") !== "0";
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

function getStudyVolume() {
  const stored = Number(localStorage.getItem("study_sound_volume"));
  const value = Number.isFinite(stored) ? stored : 40;
  return Math.min(100, Math.max(0, value));
}

function applyStudyVolume() {
  if (!studyAudioCtx || !studyGain) return;
  const now = studyAudioCtx.currentTime;
  const target = (getStudyVolume() / 100) * 0.05;
  studyGain.gain.setTargetAtTime(target, now, 0.2);
}

function startStudyAudio() {
  if (!isStudySoundEnabled()) return;
  if (!studyAudioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    studyAudioCtx = new AudioContext();
    studyGain = studyAudioCtx.createGain();
    studyGain.gain.value = 0.0;

    const highpass = studyAudioCtx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 180;
    highpass.Q.value = 0.7;

    studyFilter = studyAudioCtx.createBiquadFilter();
    studyFilter.type = "lowpass";
    studyFilter.frequency.value = 900;
    studyFilter.Q.value = 0.7;

    studyGain.connect(studyAudioCtx.destination);

    const buffer = studyAudioCtx.createBuffer(1, studyAudioCtx.sampleRate * 2, studyAudioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    studyNoise = studyAudioCtx.createBufferSource();
    studyNoise.buffer = buffer;
    studyNoise.loop = true;
    studyNoise.connect(highpass);
    highpass.connect(studyFilter).connect(studyGain);
    studyNoise.start();

    studyLfo = studyAudioCtx.createOscillator();
    const lfoGain = studyAudioCtx.createGain();
    studyLfo.frequency.value = 0.04;
    lfoGain.gain.value = 100;
    studyLfo.connect(lfoGain).connect(studyFilter.frequency);
    studyLfo.start();

    const now = studyAudioCtx.currentTime;
    studyGain.gain.setValueAtTime(0.0, now);
    const target = (getStudyVolume() / 100) * 0.05;
    studyGain.gain.linearRampToValueAtTime(target, now + 1.2);
  }
  if (studyAudioCtx && studyAudioCtx.state === "suspended") {
    studyAudioCtx.resume();
  }
  applyStudyVolume();
}

function stopStudyAudio() {
  if (!studyAudioCtx || !studyGain) return;
  const now = studyAudioCtx.currentTime;
  studyGain.gain.cancelScheduledValues(now);
  studyGain.gain.setValueAtTime(studyGain.gain.value, now);
  studyGain.gain.linearRampToValueAtTime(0.0, now + 0.6);
  setTimeout(() => {
    if (studyNoise) {
      try {
        studyNoise.stop();
      } catch (err) {
        // ignore
      }
    }
    if (studyLfo) {
      try {
        studyLfo.stop();
      } catch (err) {
        // ignore
      }
    }
    if (studyAudioCtx) {
      studyAudioCtx.close();
    }
    studyAudioCtx = null;
    studyNoise = null;
    studyFilter = null;
    studyLfo = null;
    studyGain = null;
  }, 700);
}

function syncStudyAudio({ immediate = false } = {}) {
  if (!isStudySoundEnabled() || !sessionActive) {
    studyStartPending = false;
    stopStudyAudio();
    return;
  }
  studyStartPending = true;
  if (immediate) {
    maybeStartStudyAudio();
  }
}

function maybeStartStudyAudio() {
  if (!studyStartPending) return;
  if (!isStudySoundEnabled() || !sessionActive) {
    studyStartPending = false;
    return;
  }
  startStudyAudio();
  if (studyAudioCtx) {
    studyStartPending = false;
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

function playRandomSound() {
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
    scheduleTone({ freq: 520, startTime: now, duration: 0.06, volume: 0.045 });
    scheduleTone({ freq: 680, startTime: now + 0.07, duration: 0.08, volume: 0.05 });
    scheduleTone({ freq: 600, startTime: now + 0.16, duration: 0.08, volume: 0.045 });
  } catch (err) {
    // Fail silently for older/locked browsers.
  }
}

function playTimeUpSound() {
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
    scheduleTone({ freq: 740, startTime: now, duration: 0.12, volume: 0.06 });
    scheduleTone({ freq: 560, startTime: now + 0.14, duration: 0.14, volume: 0.05 });
    scheduleTone({ freq: 420, startTime: now + 0.3, duration: 0.16, volume: 0.045 });
  } catch (err) {
    // Fail silently for older/locked browsers.
  }
}

function handleStudySwipe(direction) {
  if (!sessionActive || !cards.length) return;
  if (direction === "left") {
    goTo(currentIndex + 1);
    return;
  }
  if (direction === "right") {
    goTo(currentIndex - 1);
  }
}

function handleStudyTap() {
  if (!sessionActive || !cards.length) return;
  toggleAnswer();
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const button = target.closest("button, .cta-link, .ghost-link");
  if (!button) return;
  if (button.hasAttribute("disabled")) return;
  maybeStartStudyAudio();
  if (button.dataset.sound === "important") {
    playImportantSound();
    return;
  }
  if (button.dataset.sound === "delete") {
    playDeleteSound();
    return;
  }
  if (button.dataset.sound === "nav") {
    playNavSound();
    return;
  }
  if (button.dataset.sound === "random") {
    playRandomSound();
    return;
  }
  playClickSound();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopStudyAudio();
  } else if (sessionActive) {
    syncStudyAudio();
  }
});

function openStudyAlert(message) {
  studyAlertMessage.textContent = message;
  if (!studyAlert.classList.contains("hidden")) return;
  lastStudyFocus =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;
  studyAlert.classList.remove("hidden");
  document.body.classList.add("modal-open");
  studyModalHandler = (event) => trapStudyModalFocus(event);
  studyAlert.addEventListener("keydown", studyModalHandler);
  requestAnimationFrame(() => {
    if (studyAlertOk && typeof studyAlertOk.focus === "function") {
      studyAlertOk.focus();
    }
  });
}

function closeStudyAlert() {
  studyAlert.classList.add("hidden");
  if (studyModalHandler) {
    studyAlert.removeEventListener("keydown", studyModalHandler);
    studyModalHandler = null;
  }
  document.body.classList.remove("modal-open");
  if (lastStudyFocus && typeof lastStudyFocus.focus === "function") {
    lastStudyFocus.focus();
  }
}

function startAutoAdvance() {
  stopAutoAdvance();
  if (!autoAdvanceToggle.checked) return;
  const seconds = Math.max(2, Number(autoAdvanceIntervalInput.value || 0));
  if (!seconds || !Number.isFinite(seconds)) return;
  autoAdvanceInterval = setInterval(() => {
    if (!sessionActive || !cards.length) return;
    if (currentIndex >= cards.length - 1) {
      stopAutoAdvance();
      return;
    }
    goTo(currentIndex + 1);
  }, seconds * 1000);
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

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function updateTimer() {
  const seconds = Math.floor((Date.now() - startTime) / 1000);
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  timerEl.textContent = `${minutes}:${secs}`;
  if (sessionMaxSec > 0 && seconds >= sessionMaxSec) {
    if (!timeUpPlayed) {
      playTimeUpSound();
      timeUpPlayed = true;
    }
    finishSession(true);
  }
}

function setStatus(text) {
  statusEl.textContent = text;
}

function setSetupStatus(text) {
  setupStatusEl.textContent = text;
}

function setCollectionStatus(text) {
  collectionStatusEl.textContent = text;
}

function getCurrentRating() {
  const card = cards[currentIndex];
  return ratings[card.id] || { result: null, difficulty: null };
}

function setActiveButtons() {
  const rating = getCurrentRating();
  resultButtons.forEach((btn) => {
    const isActive = btn.dataset.result === rating.result;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
  difficultyButtons.forEach((btn) => {
    const isActive = btn.dataset.difficulty === rating.difficulty;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

function renderCard() {
  if (!cards.length) {
    questionEl.textContent = t("study.status.noCards");
    answerEl.textContent = t("study.status.noCardsHint");
    answerEl.classList.remove("hidden");
    toggleAnswerBtn.disabled = true;
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    finishBtn.disabled = true;
    continueBtn.disabled = true;
    progressEl.textContent = "0/0";
    stopTimer();
    if (studyCard) {
      studyCard.setAttribute("aria-disabled", "true");
    }
    return;
  }

  const card = cards[currentIndex];
  if (studyCard) {
    studyCard.setAttribute("aria-disabled", "false");
  }
  progressEl.textContent = `${currentIndex + 1}/${cards.length}`;
  questionEl.innerHTML = escapeHtml(card.question);
  answerEl.innerHTML = escapeHtml(card.answer);

  if (showAnswer) {
    answerEl.classList.remove("hidden");
    toggleAnswerBtn.textContent = t("study.session.hideAnswer");
  } else {
    answerEl.classList.add("hidden");
    toggleAnswerBtn.textContent = t("study.session.showAnswer");
  }
  toggleAnswerBtn.setAttribute("aria-expanded", String(showAnswer));
  if (studyCard) {
    studyCard.setAttribute("aria-pressed", String(showAnswer));
  }

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === cards.length - 1;

  setActiveButtons();
}

function toggleAnswer() {
  showAnswer = !showAnswer;
  renderCard();
}

function goTo(index) {
  currentIndex = Math.max(0, Math.min(index, cards.length - 1));
  showAnswer = false;
  renderCard();
}

function goToRandomCard() {
  if (!cards.length) return;
  const availableIndexes = cards
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => !(ratings[card.id] && ratings[card.id].result))
    .map(({ index }) => index);

  if (!availableIndexes.length) {
    setStatus(t("study.status.allAnswered"));
    return;
  }

  const candidates =
    availableIndexes.length > 1
      ? availableIndexes.filter((index) => index !== currentIndex)
      : availableIndexes;
  const nextIndex = candidates[Math.floor(Math.random() * candidates.length)];
  setStatus("");
  goTo(nextIndex);
}

function applyRating(type, value) {
  const card = cards[currentIndex];
  const current = ratings[card.id] || { result: null, difficulty: null };
  ratings[card.id] = { ...current, [type]: value };
  setActiveButtons();
}

function buildReport() {
  const reportCorrect = document.getElementById("report-correct");
  const reportIncorrect = document.getElementById("report-incorrect");
  const reportEasy = document.getElementById("report-easy");
  const reportHard = document.getElementById("report-hard");
  const easyList = document.getElementById("easy-list");
  const hardList = document.getElementById("hard-list");
  const wrongList = document.getElementById("wrong-list");
  const recommendation = document.getElementById("recommendation");

  const { correct, incorrect, easy, hard, easyItems, hardItems, wrongItems } = computeStats();

  reportCorrect.textContent = String(correct);
  reportIncorrect.textContent = String(incorrect);
  reportEasy.textContent = String(easy);
  reportHard.textContent = String(hard);

  fillList(easyList, easyItems);
  fillList(hardList, hardItems);
  fillList(wrongList, wrongItems);

  const totalRated = correct + incorrect;
  const hardRatio = totalRated ? hard / cards.length : 0;
  const incorrectRatio = totalRated ? incorrect / totalRated : 0;

  let text = t("study.reco.keep");
  if (cards.length < 10) {
    text = t("study.reco.few");
  } else if (incorrectRatio >= 0.4) {
    text = t("study.reco.errors");
  } else if (hardRatio >= 0.4) {
    text = t("study.reco.hard");
  } else if (easy >= cards.length * 0.7) {
    text = t("study.reco.easy");
  }

  recommendation.textContent = text;

  return { correct, incorrect, easy, hard };
}

function computeStats() {
  let correct = 0;
  let incorrect = 0;
  let easy = 0;
  let hard = 0;
  const easyItems = [];
  const hardItems = [];
  const wrongItems = [];

  cards.forEach((card) => {
    const rating = ratings[card.id] || {};
    if (rating.result === "correct") correct += 1;
    if (rating.result === "incorrect") {
      incorrect += 1;
      wrongItems.push(card);
    }
    if (rating.difficulty === "easy") {
      easy += 1;
      easyItems.push(card);
    }
    if (rating.difficulty === "hard") {
      hard += 1;
      hardItems.push(card);
    }
  });

  return { correct, incorrect, easy, hard, easyItems, hardItems, wrongItems };
}

function fillList(listEl, items) {
  listEl.innerHTML = "";
  if (!items.length) {
    const li = document.createElement("li");
    li.textContent = "Nenhum.";
    listEl.appendChild(li);
    return;
  }
  items.forEach((card) => {
    const li = document.createElement("li");
    li.textContent = card.question;
    listEl.appendChild(li);
  });
}

function applyDifficultyAvailability() {
  const selectedId = studyCollectionSelect.value;
  const selected = collectionsData.find((col) => String(col.id) === String(selectedId));
  difficultyReady = !!(selected && selected.difficulty_ready);
  if (!selectedId) {
    difficultyFilterSelect.disabled = true;
    setCollectionStatus(t("study.status.selectCollection"));
    return;
  }
  setCollectionStatus("");
  difficultyFilterSelect.disabled = !difficultyReady;
  if (!difficultyReady) {
    difficultyFilterSelect.value = "";
  }
  if (difficultyReady && selected) {
    const easyOpt = difficultyFilterSelect.querySelector('option[value="easy"]');
    const hardOpt = difficultyFilterSelect.querySelector('option[value="hard"]');
    if (easyOpt) easyOpt.disabled = selected.easy_count === 0;
    if (hardOpt) hardOpt.disabled = selected.hard_count === 0;
  }
}

async function loadCards({ collectionId, difficulty = "" }) {
  const params = new URLSearchParams({ collection_id: collectionId });
  if (difficulty) params.set("difficulty", difficulty);
  const res = await fetch(`/api/study/cards?${params.toString()}`);
  const data = await res.json();
  if (!res.ok) {
    setStatus(data.error || "Erro ao carregar cards.");
    cards = [];
  } else {
    cards = data;
  }
  currentIndex = 0;
  showAnswer = false;
  startTime = Date.now();
  Object.keys(ratings).forEach((key) => delete ratings[key]);
  sessionActive = true;
  timeUpPlayed = false;
  continueBtn.disabled = false;
  renderCard();
  if (!cards.length) {
    sessionActive = false;
    stopTimer();
    stopStudyAudio();
  }
  return cards.length > 0;
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function formatDuration(sec) {
  const minutes = String(Math.floor(sec / 60)).padStart(2, "0");
  const secs = String(sec % 60).padStart(2, "0");
  return `${minutes}:${secs}`;
}

async function saveSession(stats, durationSec) {
  const details = {
    easy_cards: cards.filter((c) => (ratings[c.id] || {}).difficulty === "easy").map((c) => c.id),
    hard_cards: cards.filter((c) => (ratings[c.id] || {}).difficulty === "hard").map((c) => c.id),
    wrong_cards: cards.filter((c) => (ratings[c.id] || {}).result === "incorrect").map((c) => c.id),
  };
  await fetch("/api/study/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      collection_id: activeCollectionId,
      duration_sec: durationSec,
      total: cards.length,
      correct: stats.correct,
      incorrect: stats.incorrect,
      easy: stats.easy,
      hard: stats.hard,
      details,
    }),
  });
}

function buildSessionPayload(durationSec) {
  const stats = computeStats();
  const details = {
    easy_cards: cards.filter((c) => (ratings[c.id] || {}).difficulty === "easy").map((c) => c.id),
    hard_cards: cards.filter((c) => (ratings[c.id] || {}).difficulty === "hard").map((c) => c.id),
    wrong_cards: cards.filter((c) => (ratings[c.id] || {}).result === "incorrect").map((c) => c.id),
  };
  return {
    collection_id: activeCollectionId,
    duration_sec: durationSec,
    total: cards.length,
    correct: stats.correct,
    incorrect: stats.incorrect,
    easy: stats.easy,
    hard: stats.hard,
    details,
  };
}

function renderSessions(sessions) {
  sessionsList.innerHTML = "";
  if (!sessions.length) {
    sessionsList.textContent = t("study.status.sessionsEmpty");
    return;
  }
  sessions.forEach((session) => {
    const item = document.createElement("div");
    item.className = "session-item";
    item.innerHTML = `
      <div>
        <strong>${new Date(session.created_at).toLocaleString()}</strong>
        <div class="muted">${t("study.sessions.item", {
          duration: formatDuration(session.duration_sec),
          total: session.total,
        })}</div>
      </div>
      <div class="session-score">
        <span>✅ ${session.correct}</span>
        <span>❌ ${session.incorrect}</span>
        <span>😌 ${session.easy}</span>
        <span>🔥 ${session.hard}</span>
        <button class="ghost small delete-session" data-id="${session.id}" data-sound="delete">${t(
          "study.sessions.delete"
        )}</button>
      </div>
    `;
    sessionsList.appendChild(item);
  });

  sessionsList.querySelectorAll(".delete-session").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const item = btn.closest(".session-item");
      if (item) {
        item.classList.add("is-removing");
        btn.disabled = true;
      }
      playDeleteSound();
      await fetch(`/api/study/sessions/${btn.dataset.id}`, { method: "DELETE" });
      setTimeout(loadSessions, 360);
    });
  });
}

function finishSession(auto = false) {
  if (!sessionActive) return;
  const stats = buildReport();
  reportEl.classList.remove("hidden");
  reportEl.scrollIntoView({ behavior: "smooth" });
  setStatus(auto ? t("study.status.timeFinished") : t("study.status.sessionFinished"));
  stopTimer();
  stopAutoAdvance();
  unlockStudyScroll();
  stopStudyAudio();
  const durationSec = Math.floor((Date.now() - startTime) / 1000);
  saveSession(stats, durationSec).then(() => {
    loadSessions();
    loadCollections();
  });
  sessionActive = false;
  continueBtn.disabled = false;
}

async function loadSessions() {
  const res = await fetch("/api/study/sessions");
  const sessions = await res.json();
  renderSessions(sessions);
}

resultButtons.forEach((btn) => {
  btn.addEventListener("click", () => applyRating("result", btn.dataset.result));
});

difficultyButtons.forEach((btn) => {
  btn.addEventListener("click", () => applyRating("difficulty", btn.dataset.difficulty));
});

toggleAnswerBtn.addEventListener("click", () => {
  toggleAnswer();
});

if (studyCard) {
  studyCard.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartTime = Date.now();
    touchMoved = false;
  });

  studyCard.addEventListener("touchmove", (event) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      touchMoved = true;
    }
  });

  studyCard.addEventListener("touchend", (event) => {
    if (!event.changedTouches.length) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const elapsed = Date.now() - touchStartTime;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    if (absX > 50 && absX > absY * 1.2) {
      handleStudySwipe(deltaX < 0 ? "left" : "right");
      return;
    }
    if (!touchMoved && elapsed < 300) {
      handleStudyTap();
    }
  });

  studyCard.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleStudyTap();
    }
  });
}

prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

document.addEventListener("keydown", (event) => {
  if (!studyAlert.classList.contains("hidden")) {
    if (event.key === "Escape") {
      closeStudyAlert();
    }
    return;
  }
  const target = event.target;
  if (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(target.tagName))
  ) {
    return;
  }
  if (event.key === "ArrowRight") goTo(currentIndex + 1);
  if (event.key === "ArrowLeft") goTo(currentIndex - 1);
  if (event.key === " ") {
    event.preventDefault();
    toggleAnswer();
  }
  if (event.key === "1") applyRating("result", "correct");
  if (event.key === "2") applyRating("result", "incorrect");
  if (event.key === "3") applyRating("difficulty", "easy");
  if (event.key === "4") applyRating("difficulty", "hard");
  if (event.key.toLowerCase() === "r") goToRandomCard();
});

finishBtn.addEventListener("click", () => finishSession(false));

continueBtn.addEventListener("click", () => {
  if (sessionActive) {
    openStudyAlert(t("study.status.finishCurrent"));
    return;
  }
  reportEl.classList.add("hidden");
  setStatus(t("study.status.readyNext"));
  studySession.classList.add("hidden");
  studySetup.classList.remove("hidden");
  sessionActive = false;
  stopTimer();
  stopAutoAdvance();
  unlockStudyScroll();
  setSessionPillsVisible(false);
  stopStudyAudio();
});

if (studyBackLink) {
  studyBackLink.addEventListener("click", (event) => {
    event.preventDefault();
    playNavSound();
    setTimeout(() => {
      window.location.href = studyBackLink.getAttribute("href");
    }, 140);
  });
}

studyAlertOk.addEventListener("click", closeStudyAlert);
studyAlertClose.addEventListener("click", closeStudyAlert);
studyAlert.addEventListener("click", (event) => {
  if (event.target === studyAlert) closeStudyAlert();
});

refreshSessionsBtn.addEventListener("click", loadSessions);
reloadCardsBtn.addEventListener("click", () => {
  if (!activeCollectionId) return;
  if (!cards.length) {
    loadCards({ collectionId: activeCollectionId, difficulty: activeDifficulty });
    return;
  }
  goToRandomCard();
});

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.dataset.theme;
    localStorage.setItem("theme", theme);
    loadTheme();
  });
});

async function loadCollections() {
  const res = await fetch("/api/study/collections");
  const collections = await res.json();
  collectionsData = collections;
  studyCollectionSelect.innerHTML = "";
  const hasCollections = collections.length > 0;
  let hasCards = false;
  const optPlaceholder = document.createElement("option");
  optPlaceholder.value = "";
  optPlaceholder.textContent = t("study.status.selectCollection");
  studyCollectionSelect.appendChild(optPlaceholder);
  collections.forEach((col) => {
    const opt = document.createElement("option");
    opt.value = col.id;
    opt.textContent = `${col.name} (${col.card_count})`;
    if (col.card_count > 0) {
      hasCards = true;
    }
    studyCollectionSelect.appendChild(opt);
  });
  const saved = localStorage.getItem("active_collection") || "";
  studyCollectionSelect.value = saved;
  if (!studyCollectionSelect.value || !studyCollectionSelect.selectedOptions[0] || studyCollectionSelect.selectedOptions[0].disabled) {
    studyCollectionSelect.value = "";
  }
  studyLockedEl.classList.toggle("hidden", hasCollections);
  startSessionBtn.disabled = !hasCollections;
  applyDifficultyAvailability();
  if (!hasCollections) {
    studySession.classList.add("hidden");
    reportEl.classList.add("hidden");
  }
}

studyCollectionSelect.addEventListener("change", () => {
  localStorage.setItem("active_collection", studyCollectionSelect.value);
  applyDifficultyAvailability();
  studySession.classList.add("hidden");
  reportEl.classList.add("hidden");
  studySetup.classList.remove("hidden");
  sessionActive = false;
  stopTimer();
  stopAutoAdvance();
  unlockStudyScroll();
  setSessionPillsVisible(false);
  stopStudyAudio();
  setSetupStatus("");
});

startSessionBtn.addEventListener("click", async () => {
  const collectionId = studyCollectionSelect.value;
  const selected = collectionsData.find((col) => String(col.id) === String(collectionId));
  if (!collectionId || !selected) {
    setSetupStatus(t("study.status.selectCollection"));
    return;
  }
  if (selected.card_count === 0) {
    setSetupStatus(t("study.status.collectionEmpty"));
    return;
  }
  if (difficultyReady) {
    const chosen = difficultyFilterSelect.value;
    if (chosen === "easy" && selected.easy_count === 0) {
      setSetupStatus(t("study.status.noEasy"));
      return;
    }
    if (chosen === "hard" && selected.hard_count === 0) {
      setSetupStatus(t("study.status.noHard"));
      return;
    }
  }
  setSetupStatus("");
  studyLockedEl.classList.add("hidden");
  activeCollectionId = collectionId;
  activeDifficulty = difficultyReady ? difficultyFilterSelect.value : "";
  sessionMaxSec = sessionTimeToggle.checked ? Math.max(1, Number(sessionTimeInput.value || 0)) * 60 : 0;
  reportEl.classList.add("hidden");
  studySetup.classList.add("hidden");
  studySession.classList.remove("hidden");
  studySession.classList.add("session-enter");
  studySession.addEventListener(
    "animationend",
    () => {
      studySession.classList.remove("session-enter");
    },
    { once: true }
  );
  focusStudySession();
  const hasCards = await loadCards({ collectionId: activeCollectionId, difficulty: activeDifficulty });
  if (hasCards) {
    startTimer();
    startAutoAdvance();
    lockStudyScroll();
    setSessionPillsVisible(true);
    syncStudyAudio({ immediate: true });
  } else {
    setSetupStatus(t("study.status.noFiltered"));
    unlockStudyScroll();
    setSessionPillsVisible(false);
    stopStudyAudio();
  }
});

difficultyFilterSelect.addEventListener("change", () => {
  if (!difficultyReady) return;
  activeDifficulty = difficultyFilterSelect.value;
  setSetupStatus("");
  const selected = collectionsData.find((col) => String(col.id) === String(studyCollectionSelect.value));
  if (!selected) return;
  if (activeDifficulty === "easy" && selected.easy_count === 0) {
    setSetupStatus(t("study.status.noEasy"));
  }
  if (activeDifficulty === "hard" && selected.hard_count === 0) {
    setSetupStatus(t("study.status.noHard"));
  }
});

window.addEventListener("pagehide", () => {
  if (!sessionActive || !cards.length) return;
  const durationSec = Math.floor((Date.now() - startTime) / 1000);
  const payload = buildSessionPayload(durationSec);
  navigator.sendBeacon(
    "/api/study/sessions",
    new Blob([JSON.stringify(payload)], { type: "application/json" })
  );
  sessionActive = false;
  stopAutoAdvance();
  stopStudyAudio();
});

autoAdvanceIntervalInput.disabled = !autoAdvanceToggle.checked;
autoAdvanceToggle.addEventListener("change", () => {
  autoAdvanceIntervalInput.disabled = !autoAdvanceToggle.checked;
  if (sessionActive) {
    startAutoAdvance();
  }
});

autoAdvanceIntervalInput.addEventListener("change", () => {
  if (sessionActive && autoAdvanceToggle.checked) {
    startAutoAdvance();
  }
});

sessionTimeInput.disabled = !sessionTimeToggle.checked;
sessionTimeToggle.addEventListener("change", () => {
  sessionTimeInput.disabled = !sessionTimeToggle.checked;
});

window.addEventListener("resize", () => {
  if (!shouldLockStudyScroll()) {
    unlockStudyScroll();
  } else if (sessionActive) {
    lockStudyScroll();
  }
});

setLanguage(detectLanguage());
loadTheme();
syncStudyAudio();
loadCollections();
loadSessions();

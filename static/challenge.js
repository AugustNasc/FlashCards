const questionEl = document.getElementById("challenge-question");
const answerEl = document.getElementById("challenge-answer");
const progressEl = document.getElementById("challenge-progress");
const toggleBtn = document.getElementById("challenge-toggle");
const prevBtn = document.getElementById("challenge-prev");
const nextBtn = document.getElementById("challenge-next");
const finishBtn = document.getElementById("challenge-finish");
const statusEl = document.getElementById("challenge-status");
const reportEl = document.getElementById("challenge-report");
const correctEl = document.getElementById("challenge-correct");
const incorrectEl = document.getElementById("challenge-incorrect");
const rateEl = document.getElementById("challenge-rate");
const restartBtn = document.getElementById("challenge-restart");
const titleEl = document.getElementById("challenge-title");
const resultButtons = document.querySelectorAll("[data-result]");
const lockPanel = document.getElementById("challenge-lock");
const passwordInput = document.getElementById("challenge-password");
const unlockBtn = document.getElementById("challenge-unlock");
const lockStatus = document.getElementById("challenge-lock-status");

let cards = [];
let currentIndex = 0;
let showAnswer = false;
const results = {};
let sessionToken = "";

const I18N = {
  pt: {
    "challenge.pageTitle": "Desafio",
    "challenge.back": "Voltar",
    "challenge.eyebrow": "Desafio",
    "challenge.title": "Teste seus conhecimentos",
    "challenge.titleWithName": "Desafio · {name}",
    "challenge.subtitle": "Use o desafio para praticar com cards compartilhados.",
    "challenge.progress": "Progresso",
    "challenge.loading": "Carregando...",
    "challenge.password.label": "Senha do desafio",
    "challenge.password.placeholder": "Digite a senha",
    "challenge.unlock": "Desbloquear",
    "challenge.showAnswer": "Mostrar resposta",
    "challenge.hideAnswer": "Ocultar resposta",
    "challenge.prev": "◀ Anterior",
    "challenge.next": "Próximo ▶",
    "challenge.result": "Resultado",
    "challenge.correct": "Acertei",
    "challenge.incorrect": "Errei",
    "challenge.finish": "Finalizar desafio",
    "challenge.report.title": "Resultado do desafio",
    "challenge.report.correct": "Acertos",
    "challenge.report.incorrect": "Erros",
    "challenge.report.rate": "Taxa",
    "challenge.report.restart": "Tentar novamente",
    "challenge.status.enterPassword": "Digite a senha para iniciar.",
    "challenge.status.noCards": "Nenhum card disponível.",
    "challenge.status.notChallenge": "Este link não é um desafio.",
    "challenge.status.loadError": "Erro ao carregar desafio.",
    "challenge.status.invalidLink": "Link inválido.",
    "challenge.status.noCardsChallenge": "Nenhum card disponível neste desafio.",
    "challenge.status.locked": "Este desafio está protegido por senha.",
    "challenge.status.lockedTitle": "Desafio protegido por senha.",
  },
  en: {
    "challenge.pageTitle": "Challenge",
    "challenge.back": "Back",
    "challenge.eyebrow": "Challenge",
    "challenge.title": "Test your knowledge",
    "challenge.titleWithName": "Challenge · {name}",
    "challenge.subtitle": "Use the challenge to practice with shared cards.",
    "challenge.progress": "Progress",
    "challenge.loading": "Loading...",
    "challenge.password.label": "Challenge password",
    "challenge.password.placeholder": "Enter the password",
    "challenge.unlock": "Unlock",
    "challenge.showAnswer": "Show answer",
    "challenge.hideAnswer": "Hide answer",
    "challenge.prev": "◀ Previous",
    "challenge.next": "Next ▶",
    "challenge.result": "Result",
    "challenge.correct": "Correct",
    "challenge.incorrect": "Incorrect",
    "challenge.finish": "Finish challenge",
    "challenge.report.title": "Challenge result",
    "challenge.report.correct": "Correct",
    "challenge.report.incorrect": "Incorrect",
    "challenge.report.rate": "Rate",
    "challenge.report.restart": "Try again",
    "challenge.status.enterPassword": "Enter the password to start.",
    "challenge.status.noCards": "No cards available.",
    "challenge.status.notChallenge": "This link is not a challenge.",
    "challenge.status.loadError": "Failed to load challenge.",
    "challenge.status.invalidLink": "Invalid link.",
    "challenge.status.noCardsChallenge": "No cards available in this challenge.",
    "challenge.status.locked": "This challenge is password-protected.",
    "challenge.status.lockedTitle": "Password-protected challenge.",
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

function t(key) {
  const dict = I18N[currentLanguage] || I18N.pt;
  return dict[key] || I18N.pt[key] || "";
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
  document.title = t("challenge.pageTitle");
}

function setLanguage(lang) {
  currentLanguage = lang === "en" ? "en" : "pt";
  document.documentElement.lang = currentLanguage === "en" ? "en" : "pt-BR";
  applyTranslations();
}

function getTokenFromPath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
}

function setStatus(text) {
  statusEl.textContent = text;
}

function setLockedState(message) {
  questionEl.textContent = message || t("challenge.status.enterPassword");
  answerEl.textContent = "";
  toggleBtn.disabled = true;
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  finishBtn.disabled = true;
  resultButtons.forEach((btn) => {
    btn.disabled = true;
    btn.classList.remove("active");
  });
}

function renderCard() {
  if (!cards.length) {
    questionEl.textContent = t("challenge.status.noCards");
    answerEl.textContent = "";
    toggleBtn.disabled = true;
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    finishBtn.disabled = true;
    resultButtons.forEach((btn) => {
      btn.disabled = true;
      btn.classList.remove("active");
    });
    return;
  }
  toggleBtn.disabled = false;
  finishBtn.disabled = false;
  resultButtons.forEach((btn) => {
    btn.disabled = false;
  });
  const card = cards[currentIndex];
  questionEl.textContent = card.question;
  answerEl.textContent = card.answer;
  progressEl.textContent = `${currentIndex + 1}/${cards.length}`;
  if (showAnswer) {
    answerEl.classList.remove("hidden");
    toggleBtn.textContent = t("challenge.hideAnswer");
  } else {
    answerEl.classList.add("hidden");
    toggleBtn.textContent = t("challenge.showAnswer");
  }
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === cards.length - 1;
  const current = results[currentIndex] || "";
  resultButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.result === current);
  });
}

function goTo(index) {
  currentIndex = Math.max(0, Math.min(index, cards.length - 1));
  showAnswer = false;
  renderCard();
}

function computeStats() {
  let correct = 0;
  let incorrect = 0;
  Object.values(results).forEach((value) => {
    if (value === "correct") correct += 1;
    if (value === "incorrect") incorrect += 1;
  });
  return { correct, incorrect };
}

function finishChallenge() {
  const { correct, incorrect } = computeStats();
  const total = correct + incorrect;
  const rate = total ? Math.round((correct / total) * 100) : 0;
  correctEl.textContent = String(correct);
  incorrectEl.textContent = String(incorrect);
  rateEl.textContent = `${rate}%`;
  reportEl.classList.remove("hidden");
  reportEl.scrollIntoView({ behavior: "smooth" });
  if (sessionToken) {
    const token = getTokenFromPath();
    fetch(`/api/share/${token}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_token: sessionToken }),
    }).catch(() => {
      // ignore completion errors
    });
  }
}

function setTitle(meta) {
  if (titleEl) {
    titleEl.textContent = meta?.name
      ? t("challenge.titleWithName").replace("{name}", meta.name)
      : t("challenge.title");
  }
}

async function accessChallenge(password = "") {
  const token = getTokenFromPath();
  try {
    const res = await fetch(`/api/share/${token}/access`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || t("challenge.status.loadError"));
    }
    if (data.type !== "challenge") {
      setStatus(t("challenge.status.notChallenge"));
      return;
    }
    cards = data.cards || [];
    sessionToken = data.session_token || "";
    if (!cards.length) {
      setStatus(t("challenge.status.noCardsChallenge"));
    }
    setTitle(data);
    if (lockPanel) lockPanel.classList.add("hidden");
    renderCard();
  } catch (err) {
    if (lockStatus) {
      lockStatus.textContent = err.message;
    } else {
      setStatus(err.message);
    }
  }
}

async function loadChallenge() {
  const token = getTokenFromPath();
  if (!token) {
    setStatus(t("challenge.status.invalidLink"));
    return;
  }
  try {
    const res = await fetch(`/api/share/${token}`);
    const meta = await res.json();
    if (!res.ok) {
      throw new Error(meta.error || t("challenge.status.loadError"));
    }
    if (meta.type !== "challenge") {
      setStatus(t("challenge.status.notChallenge"));
      return;
    }
    setTitle(meta);
    if (meta.requires_password) {
      if (lockPanel) lockPanel.classList.remove("hidden");
      if (passwordInput) passwordInput.focus();
      if (lockStatus) lockStatus.textContent = t("challenge.status.locked");
      setLockedState(t("challenge.status.lockedTitle"));
      return;
    }
    await accessChallenge();
  } catch (err) {
    setStatus(err.message);
  }
}

toggleBtn.addEventListener("click", () => {
  showAnswer = !showAnswer;
  renderCard();
});

prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

resultButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    results[currentIndex] = btn.dataset.result;
    renderCard();
  });
});

finishBtn.addEventListener("click", finishChallenge);
restartBtn.addEventListener("click", () => {
  Object.keys(results).forEach((key) => delete results[key]);
  reportEl.classList.add("hidden");
  currentIndex = 0;
  showAnswer = false;
  renderCard();
});

if (unlockBtn) {
  unlockBtn.addEventListener("click", () => {
    const pwd = passwordInput ? passwordInput.value.trim() : "";
    accessChallenge(pwd);
  });
}

document.addEventListener("keydown", (event) => {
  if (["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) return;
  if (event.key === "ArrowRight") goTo(currentIndex + 1);
  if (event.key === "ArrowLeft") goTo(currentIndex - 1);
  if (event.key === " ") {
    event.preventDefault();
    showAnswer = !showAnswer;
    renderCard();
  }
  if (event.key === "1") results[currentIndex] = "correct";
  if (event.key === "2") results[currentIndex] = "incorrect";
  renderCard();
});

setLanguage(detectLanguage());
loadChallenge();

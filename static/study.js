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

function loadTheme() {
  const theme = localStorage.getItem("theme") || "light";
  document.body.dataset.theme = theme;
  themeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === theme);
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
    btn.classList.toggle("active", btn.dataset.result === rating.result);
  });
  difficultyButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.difficulty === rating.difficulty);
  });
}

function renderCard() {
  if (!cards.length) {
    questionEl.textContent = "Nenhum card encontrado.";
    answerEl.textContent = "Crie ou gere cards antes de estudar.";
    answerEl.classList.remove("hidden");
    toggleAnswerBtn.disabled = true;
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    finishBtn.disabled = true;
    continueBtn.disabled = true;
    progressEl.textContent = "0/0";
    stopTimer();
    return;
  }

  const card = cards[currentIndex];
  progressEl.textContent = `${currentIndex + 1}/${cards.length}`;
  questionEl.innerHTML = escapeHtml(card.question);
  answerEl.innerHTML = escapeHtml(card.answer);

  if (showAnswer) {
    answerEl.classList.remove("hidden");
    toggleAnswerBtn.textContent = "Ocultar resposta";
  } else {
    answerEl.classList.add("hidden");
    toggleAnswerBtn.textContent = "Mostrar resposta";
  }

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === cards.length - 1;

  setActiveButtons();
}

function goTo(index) {
  currentIndex = Math.max(0, Math.min(index, cards.length - 1));
  showAnswer = false;
  renderCard();
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

  let text = "Continue revisando diariamente para consolidar a memória.";
  if (cards.length < 10) {
    text = "Você tem poucos cards. Gere novos temas para enriquecer o baralho.";
  } else if (incorrectRatio >= 0.4) {
    text = "Muitos erros: gere novos cards focados nos temas que você errou.";
  } else if (hardRatio >= 0.4) {
    text = "Muitos cards difíceis: gere versões mais simples ou divida os tópicos.";
  } else if (easy >= cards.length * 0.7) {
    text = "A maioria está fácil. Gere novos cards para aumentar o desafio.";
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
    setCollectionStatus("Selecione uma coleção para iniciar.");
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
  continueBtn.disabled = true;
  renderCard();
  if (!cards.length) {
    sessionActive = false;
    stopTimer();
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
    sessionsList.textContent = "Nenhuma sessão salva ainda.";
    return;
  }
  sessions.forEach((session) => {
    const item = document.createElement("div");
    item.className = "session-item";
    item.innerHTML = `
      <div>
        <strong>${new Date(session.created_at).toLocaleString()}</strong>
        <div class="muted">Tempo ${formatDuration(session.duration_sec)} · ${session.total} cards</div>
      </div>
      <div class="session-score">
        <span>✅ ${session.correct}</span>
        <span>❌ ${session.incorrect}</span>
        <span>😌 ${session.easy}</span>
        <span>🔥 ${session.hard}</span>
        <button class="ghost small delete-session" data-id="${session.id}">Excluir</button>
      </div>
    `;
    sessionsList.appendChild(item);
  });

  sessionsList.querySelectorAll(".delete-session").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await fetch(`/api/study/sessions/${btn.dataset.id}`, { method: "DELETE" });
      loadSessions();
    });
  });
}

function finishSession(auto = false) {
  if (!sessionActive) return;
  const stats = buildReport();
  reportEl.classList.remove("hidden");
  reportEl.scrollIntoView({ behavior: "smooth" });
  setStatus(auto ? "Tempo finalizado. Sessão concluída." : "Sessão finalizada.");
  stopTimer();
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
  showAnswer = !showAnswer;
  renderCard();
});

prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

document.addEventListener("keydown", (event) => {
  if (["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) return;
  if (event.key === "ArrowRight") goTo(currentIndex + 1);
  if (event.key === "ArrowLeft") goTo(currentIndex - 1);
  if (event.key === " ") {
    event.preventDefault();
    showAnswer = !showAnswer;
    renderCard();
  }
  if (event.key === "1") applyRating("result", "correct");
  if (event.key === "2") applyRating("result", "incorrect");
  if (event.key === "3") applyRating("difficulty", "easy");
  if (event.key === "4") applyRating("difficulty", "hard");
});

finishBtn.addEventListener("click", () => finishSession(false));

continueBtn.addEventListener("click", () => {
  if (sessionActive) return;
  reportEl.classList.add("hidden");
  setStatus("Pronto para nova sessão.");
  studySession.classList.add("hidden");
  studySetup.classList.remove("hidden");
  sessionActive = false;
  stopTimer();
});

refreshSessionsBtn.addEventListener("click", loadSessions);
reloadCardsBtn.addEventListener("click", () => {
  if (!activeCollectionId) return;
  loadCards({ collectionId: activeCollectionId, difficulty: activeDifficulty });
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
  optPlaceholder.textContent = "Selecione uma coleção";
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
  setSetupStatus("");
});

startSessionBtn.addEventListener("click", async () => {
  const collectionId = studyCollectionSelect.value;
  const selected = collectionsData.find((col) => String(col.id) === String(collectionId));
  if (!collectionId || !selected) {
    setSetupStatus("Selecione uma coleção para iniciar.");
    return;
  }
  if (selected.card_count === 0) {
    setSetupStatus("Esta coleção ainda não possui cards.");
    return;
  }
  if (difficultyReady) {
    const chosen = difficultyFilterSelect.value;
    if (chosen === "easy" && selected.easy_count === 0) {
      setSetupStatus("Não há cards fáceis nesta coleção.");
      return;
    }
    if (chosen === "hard" && selected.hard_count === 0) {
      setSetupStatus("Não há cards difíceis nesta coleção.");
      return;
    }
  }
  setSetupStatus("");
  studyLockedEl.classList.add("hidden");
  activeCollectionId = collectionId;
  activeDifficulty = difficultyReady ? difficultyFilterSelect.value : "";
  sessionMaxSec = Math.max(0, Number(sessionTimeInput.value || 0)) * 60;
  reportEl.classList.add("hidden");
  studySetup.classList.add("hidden");
  studySession.classList.remove("hidden");
  const hasCards = await loadCards({ collectionId: activeCollectionId, difficulty: activeDifficulty });
  if (hasCards) {
    startTimer();
  } else {
    setSetupStatus("Nenhum card encontrado com esse filtro.");
  }
});

difficultyFilterSelect.addEventListener("change", () => {
  if (!difficultyReady) return;
  activeDifficulty = difficultyFilterSelect.value;
  setSetupStatus("");
  const selected = collectionsData.find((col) => String(col.id) === String(studyCollectionSelect.value));
  if (!selected) return;
  if (activeDifficulty === "easy" && selected.easy_count === 0) {
    setSetupStatus("Não há cards fáceis nesta coleção.");
  }
  if (activeDifficulty === "hard" && selected.hard_count === 0) {
    setSetupStatus("Não há cards difíceis nesta coleção.");
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
});

loadTheme();
loadCollections();
loadSessions();

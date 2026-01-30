const cardsEl = document.getElementById("cards");
const cardCountEl = document.getElementById("card-count");
const generateBtn = document.getElementById("generate");
const saveBtn = document.getElementById("save");
const refreshBtn = document.getElementById("refresh");
const generateStatus = document.getElementById("generate-status");
const saveStatus = document.getElementById("save-status");
const usageStatus = document.getElementById("usage-status");
const progressBar = document.getElementById("progress-bar");
const downloadBtn = document.getElementById("download");
const downloadFormat = document.getElementById("download-format");
const toggleCardsBtn = document.getElementById("toggle-cards");
const collapseCardsBtn = document.getElementById("collapse-cards");
const cardsWrapper = document.getElementById("cards-wrapper");
const openStudyBtn = document.getElementById("open-study");

const openSettingsBtn = document.getElementById("open-settings");
const closeSettingsBtn = document.getElementById("close-settings");
const settingsPanel = document.getElementById("settings");
const saveSettingsBtn = document.getElementById("save-settings");
const settingsStatus = document.getElementById("settings-status");
const apiKeyInput = document.getElementById("api-key");
const soundToggle = document.getElementById("sound-toggle");
const themeButtons = document.querySelectorAll(".theme-btn");
const collectionSelect = document.getElementById("collection-select");
const collectionNameInput = document.getElementById("collection-name");
const createCollectionBtn = document.getElementById("create-collection");
const collectionStatus = document.getElementById("collection-status");
const deleteCollectionBtn = document.getElementById("delete-collection");
const importFileInput = document.getElementById("import-file");
const importCardsBtn = document.getElementById("import-cards");
const importStatus = document.getElementById("import-status");
const importHelpBtn = document.getElementById("import-help");
const importHelpPanel = document.getElementById("import-help-panel");
const openImportBtn = document.getElementById("open-import");
const importPanel = document.getElementById("import-panel");
const goalButtons = Array.from(document.querySelectorAll(".goal-day"));
const clearGoalsBtn = document.getElementById("clear-goals");
const goalsStatus = document.getElementById("goals-status");
const openGoalsBtn = document.getElementById("open-goals");
const goalsPanel = document.getElementById("goals-panel");
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

let progressInterval = null;
let collectionsCache = [];
let confirmAction = null;
let clickAudioCtx = null;

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

function openConfirm({ title, message, okText = "Confirmar", danger = false, onConfirm }) {
  confirmTitle.textContent = title;
  confirmMessage.textContent = message;
  confirmOk.textContent = okText;
  confirmOk.classList.toggle("danger", danger);
  confirmOk.classList.toggle("accent", true);
  confirmModal.classList.remove("hidden");
  confirmAction = onConfirm;
}

function closeConfirm() {
  confirmModal.classList.add("hidden");
  confirmAction = null;
}

function getApiKey() {
  return localStorage.getItem("openai_api_key") || "";
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
    btn.classList.toggle("active", btn.dataset.theme === theme);
  });
}

function setCardActionsEnabled(enabled) {
  collectionWarning.classList.toggle("hidden", enabled);
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

function loadSettings() {
  const savedKey = getApiKey();
  if (savedKey) apiKeyInput.value = savedKey;
  if (soundToggle) {
    soundToggle.checked = isSoundEnabled();
  }
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
}

function setStatus(el, text) {
  el.textContent = text;
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
  cardsEl.innerHTML = "";
  cardCountEl.textContent = cards.length;
  cards.forEach((card, index) => {
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
    setStatus(generateStatus, "Selecione uma coleção antes de gerar cards.");
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
        "X-OpenAI-Key": getApiKey(),
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
    const totalTokens = usage.total_tokens ?? usage.totalTokens ?? 0;
    const inputTokens = usage.input_tokens ?? usage.inputTokens ?? 0;
    const outputTokens = usage.output_tokens ?? usage.outputTokens ?? 0;
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
    setStatus(saveStatus, "Selecione uma coleção antes de salvar.");
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

saveSettingsBtn.addEventListener("click", () => {
  const key = apiKeyInput.value.trim();
  if (key) {
    localStorage.setItem("openai_api_key", key);
  } else {
    localStorage.removeItem("openai_api_key");
  }
  if (soundToggle) {
    localStorage.setItem("sound_enabled", soundToggle.checked ? "1" : "0");
  }
  setStatus(settingsStatus, "Configurações salvas.");
  setTimeout(() => setStatus(settingsStatus, ""), 2000);
});

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => setTheme(btn.dataset.theme));
});

toggleCardsBtn.addEventListener("click", () => {
  cardsEl.classList.toggle("blur-answers");
  toggleCardsBtn.textContent = cardsEl.classList.contains("blur-answers")
    ? "Mostrar respostas"
    : "Esconder respostas";
});

collapseCardsBtn.addEventListener("click", () => {
  cardsWrapper.classList.toggle("hidden");
  collapseCardsBtn.textContent = cardsWrapper.classList.contains("hidden")
    ? "Expandir"
    : "Recolher";
});

async function loadCollections() {
  const res = await fetch("/api/collections");
  const collections = await res.json();
  collectionsCache = collections;
  collectionSelect.innerHTML = "";
  const optAll = document.createElement("option");
  optAll.value = "";
  optAll.textContent = "Todas";
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
  await loadGoals();
}

function renderMigrateOptions() {
  const activeId = getActiveCollection();
  migrateSelect.innerHTML = "";
  const optPlaceholder = document.createElement("option");
  optPlaceholder.value = "";
  optPlaceholder.textContent = "Selecione destino";
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
    setStatus(collectionStatus, "Selecione uma coleção para excluir.");
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

openStudyBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("/api/collections");
    const collections = await res.json();
    if (!res.ok || !collections.length) {
      nudgeToCollectionWarning();
      return;
    }
    playNavSound();
    setTimeout(() => {
      window.location.href = "/study";
    }, 140);
  } catch (err) {
    nudgeToCollectionWarning();
  }
});

collectionSelect.addEventListener("change", () => {
  setActiveCollection(collectionSelect.value);
  deleteCollectionBtn.disabled = !collectionSelect.value;
  setCardActionsEnabled(!!collectionSelect.value);
  renderMigrateOptions();
  fetchCards();
  loadGoals();
});

migrateSelect.addEventListener("change", () => {
  migrateCardsBtn.disabled = !getActiveCollection() || !migrateSelect.value;
});

migrateCardsBtn.addEventListener("click", async () => {
  const sourceId = getActiveCollection();
  const targetId = migrateSelect.value;
  if (!sourceId) {
    setStatus(migrateStatus, "Selecione uma coleção de origem.");
    return;
  }
  if (!targetId) {
    setStatus(migrateStatus, "Selecione uma coleção de destino.");
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

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length);
  if (!lines.length) return [];
  const headers = lines.shift().split(",").map((h) => h.trim().toLowerCase());
  const qIndex = headers.indexOf("question");
  const aIndex = headers.indexOf("answer");
  if (qIndex === -1 || aIndex === -1) {
    return [];
  }
  return lines.map((line) => {
    const cols = line.split(",");
    return {
      question: cols[qIndex] ? cols[qIndex].trim() : "",
      answer: cols[aIndex] ? cols[aIndex].trim() : "",
    };
  });
}

importCardsBtn.addEventListener("click", async () => {
  const file = importFileInput.files[0];
  const collectionId = getActiveCollection();
  if (!collectionId) {
    setStatus(importStatus, "Selecione uma coleção antes de importar.");
    nudgeToCollectionWarning();
    return;
  }
  if (!file) {
    setStatus(importStatus, "Selecione um arquivo CSV ou JSON.");
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    setStatus(importStatus, "Arquivo muito grande. Tente até 2MB.");
    return;
  }
  const text = await file.text();
  let cards = [];
  if (file.name.toLowerCase().endsWith(".json")) {
    try {
      const parsed = JSON.parse(text);
      cards = Array.isArray(parsed) ? parsed : parsed.cards || [];
    } catch (err) {
      setStatus(importStatus, "JSON inválido.");
      return;
    }
  } else {
    try {
      cards = parseCsv(text);
    } catch (err) {
      setStatus(importStatus, "CSV inválido. Verifique as colunas question/answer.");
      return;
    }
  }
  if (!cards.length) {
    setStatus(
      importStatus,
      "Nenhum card válido encontrado. Confira se existem colunas question/answer e linhas preenchidas."
    );
    return;
  }
  cards = cards
    .map((card) => ({
      question: String(card.question || "").trim(),
      answer: String(card.answer || "").trim(),
    }))
    .filter((card) => card.question && card.answer);
  if (!cards.length) {
    setStatus(importStatus, "Todos os cards estão vazios ou inválidos.");
    return;
  }
  try {
    const res = await fetch("/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cards, collection_id: collectionId || null }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus(importStatus, data.error || "Erro ao importar.");
      return;
    }
    setStatus(importStatus, `Importados ${data.count} cards.`);
    fetchCards();
  } catch (err) {
    setStatus(importStatus, "Falha de rede ao importar. Tente novamente.");
  }
});

importHelpBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  importHelpPanel.classList.toggle("hidden");
});

importHelpPanel.addEventListener("click", (event) => {
  event.stopPropagation();
});

openImportBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  importPanel.classList.toggle("hidden");
});

importPanel.addEventListener("click", (event) => {
  event.stopPropagation();
});

openGoalsBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  goalsPanel.classList.toggle("hidden");
});

goalsPanel.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener("click", () => {
  importHelpPanel.classList.add("hidden");
  importPanel.classList.add("hidden");
  goalsPanel.classList.add("hidden");
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

function setGoalsEnabled(enabled) {
  goalButtons.forEach((btn) => {
    btn.disabled = !enabled;
  });
  clearGoalsBtn.disabled = !enabled;
  openGoalsBtn.disabled = !enabled;
}

function applyGoalDays(days) {
  const set = new Set(days);
  goalButtons.forEach((btn) => {
    btn.classList.toggle("active", set.has(Number(btn.dataset.day)));
  });
}

function getSelectedGoalDays() {
  return goalButtons
    .filter((btn) => btn.classList.contains("active"))
    .map((btn) => Number(btn.dataset.day));
}

async function loadGoals() {
  const collectionId = getActiveCollection();
  if (!collectionId) {
    applyGoalDays([]);
    setGoalsEnabled(false);
    setStatus(goalsStatus, "Selecione uma coleção para definir metas.");
    return;
  }
  setGoalsEnabled(true);
  try {
    const res = await fetch(`/api/goals/${collectionId}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Erro ao carregar metas.");
    }
    applyGoalDays(data.days || []);
    setStatus(goalsStatus, "Metas carregadas.");
    setTimeout(() => setStatus(goalsStatus, ""), 1500);
  } catch (err) {
    setStatus(goalsStatus, err.message);
  }
}

async function saveGoals() {
  const collectionId = getActiveCollection();
  if (!collectionId) return;
  const days = getSelectedGoalDays();
  try {
    const res = await fetch(`/api/goals/${collectionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Erro ao salvar metas.");
    }
    setStatus(goalsStatus, "Metas salvas.");
    setTimeout(() => setStatus(goalsStatus, ""), 1500);
  } catch (err) {
    setStatus(goalsStatus, err.message);
  }
}

goalButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    playGoalSound();
    saveGoals();
  });
});

clearGoalsBtn.addEventListener("click", async () => {
  const collectionId = getActiveCollection();
  if (!collectionId) return;
  applyGoalDays([]);
  try {
    const res = await fetch(`/api/goals/${collectionId}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Erro ao limpar metas.");
    }
    setStatus(goalsStatus, "Metas removidas.");
    setTimeout(() => setStatus(goalsStatus, ""), 1500);
    playGoalSound();
  } catch (err) {
    setStatus(goalsStatus, err.message);
  }
});

loadSettings();
loadCollections().then(fetchCards);

collapseCardsBtn.textContent = cardsWrapper.classList.contains("hidden") ? "Expandir" : "Recolher";

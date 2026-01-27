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

const openSettingsBtn = document.getElementById("open-settings");
const closeSettingsBtn = document.getElementById("close-settings");
const settingsPanel = document.getElementById("settings");
const saveSettingsBtn = document.getElementById("save-settings");
const settingsStatus = document.getElementById("settings-status");
const apiKeyInput = document.getElementById("api-key");
const playlistInput = document.getElementById("playlist");
const playlistEnabledInput = document.getElementById("playlist-enabled");
const playlistFrame = document.getElementById("playlist-frame");
const playlistWrapper = document.getElementById("playlist-wrapper");
const playlistHint = document.getElementById("playlist-hint");
const collapsePlaylistBtn = document.getElementById("collapse-playlist");
const playlistSection = document.getElementById("playlist-section");
const themeButtons = document.querySelectorAll(".theme-btn");
const collectionSelect = document.getElementById("collection-select");
const collectionNameInput = document.getElementById("collection-name");
const createCollectionBtn = document.getElementById("create-collection");
const collectionStatus = document.getElementById("collection-status");
const deleteCollectionBtn = document.getElementById("delete-collection");
const importFileInput = document.getElementById("import-file");
const importCardsBtn = document.getElementById("import-cards");
const importStatus = document.getElementById("import-status");

let progressInterval = null;

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

function loadSettings() {
  const savedKey = getApiKey();
  if (savedKey) apiKeyInput.value = savedKey;
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
  const savedPlaylist = localStorage.getItem("playlist_url") || "";
  const playlistEnabled = localStorage.getItem("playlist_enabled") === "true";
  playlistEnabledInput.checked = playlistEnabled;
  if (savedPlaylist) {
    playlistInput.value = savedPlaylist;
    playlistFrame.src = savedPlaylist;
  }
  updatePlaylistVisibility();
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
    const item = document.createElement("div");
    item.className = "card";
    item.style.animationDelay = `${index * 40}ms`;
    item.innerHTML = `
      <h3>${escapeHtml(card.question)}</h3>
      <p>${escapeHtml(card.answer)}</p>
      <div class="meta">
        <span>${new Date(card.created_at).toLocaleString()}</span>
        <button class="delete" data-id="${card.id}">Excluir</button>
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

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

generateBtn.addEventListener("click", async () => {
  const topic = document.getElementById("topic").value.trim();
  const count = Number(document.getElementById("count").value || 5);
  const collectionId = getActiveCollection();
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

function updatePlaylistVisibility() {
  const enabled = playlistEnabledInput.checked;
  if (!enabled) {
    playlistSection.classList.add("hidden");
    return;
  }
  playlistSection.classList.remove("hidden");
  playlistWrapper.classList.add("hidden");
  const url = playlistInput.value.trim();
  if (url) {
    playlistFrame.src = url;
    playlistFrame.style.display = "block";
    playlistHint.textContent = "";
  } else {
    playlistFrame.style.display = "none";
    playlistHint.textContent = "Configure a playlist no ícone ⚙️.";
  }
}

saveSettingsBtn.addEventListener("click", () => {
  const key = apiKeyInput.value.trim();
  if (key) {
    localStorage.setItem("openai_api_key", key);
  } else {
    localStorage.removeItem("openai_api_key");
  }
  const playlistUrl = playlistInput.value.trim();
  if (playlistUrl) {
    localStorage.setItem("playlist_url", playlistUrl);
    playlistFrame.src = playlistUrl;
  } else {
    localStorage.removeItem("playlist_url");
    playlistFrame.src = "";
  }
  localStorage.setItem("playlist_enabled", playlistEnabledInput.checked ? "true" : "false");
  updatePlaylistVisibility();
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

collapsePlaylistBtn.addEventListener("click", () => {
  playlistWrapper.classList.toggle("hidden");
  collapsePlaylistBtn.textContent = playlistWrapper.classList.contains("hidden")
    ? "Expandir"
    : "Recolher";
});

playlistEnabledInput.addEventListener("change", updatePlaylistVisibility);

async function loadCollections() {
  const res = await fetch("/api/collections");
  const collections = await res.json();
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
  const confirmed = confirm("Deseja excluir esta coleção? Os cards ficarão sem coleção.");
  if (!confirmed) return;
  await fetch(`/api/collections/${id}`, { method: "DELETE" });
  setActiveCollection("");
  await loadCollections();
  fetchCards();
});

collectionSelect.addEventListener("change", () => {
  setActiveCollection(collectionSelect.value);
  deleteCollectionBtn.disabled = !collectionSelect.value;
  fetchCards();
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
  if (!file) {
    setStatus(importStatus, "Selecione um arquivo CSV ou JSON.");
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
    cards = parseCsv(text);
  }
  if (!cards.length) {
    setStatus(importStatus, "Nenhum card válido encontrado.");
    return;
  }
  const collectionId = getActiveCollection();
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
});

loadSettings();
loadCollections();
fetchCards();

collapseCardsBtn.textContent = cardsWrapper.classList.contains("hidden") ? "Expandir" : "Recolher";
collapsePlaylistBtn.textContent = playlistWrapper.classList.contains("hidden") ? "Expandir" : "Recolher";

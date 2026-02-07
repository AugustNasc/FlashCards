const shareMeta = document.getElementById("share-meta");
const sharePreview = document.getElementById("share-preview");
const shareStatus = document.getElementById("share-status");
const shareCopy = document.getElementById("share-copy");
const shareDownload = document.getElementById("share-download");
const shareLock = document.getElementById("share-lock");
const sharePasswordInput = document.getElementById("share-password");
const shareUnlockBtn = document.getElementById("share-unlock");
const shareLockStatus = document.getElementById("share-lock-status");

let currentPayload = null;
let currentName = "template";

const I18N = {
  pt: {
    "share.pageTitle": "Template compartilhado",
    "share.back": "Voltar",
    "share.title": "Template compartilhado",
    "share.loading": "Carregando...",
    "share.password.label": "Senha do link",
    "share.password.placeholder": "Digite a senha",
    "share.unlock": "Desbloquear",
    "share.copy": "Copiar JSON",
    "share.download": "Baixar JSON",
    "share.preview.empty": "Nenhum card disponível.",
    "share.preview.question": "Pergunta",
    "share.preview.answer": "Resposta",
    "share.collection": "Coleção",
    "share.meta.cards": "{count} cards",
    "share.meta.expires": " · expira {date}",
    "share.meta.uses": " · acessos restantes {count}",
    "share.error.load": "Erro ao carregar template.",
    "share.error.invalid": "Link inválido.",
    "share.error.notTemplate": "Este link não é um template.",
    "share.locked": "Este link está protegido por senha.",
    "share.copy.ok": "JSON copiado.",
    "share.copy.fail": "Não foi possível copiar.",
  },
  en: {
    "share.pageTitle": "Shared template",
    "share.back": "Back",
    "share.title": "Shared template",
    "share.loading": "Loading...",
    "share.password.label": "Link password",
    "share.password.placeholder": "Enter the password",
    "share.unlock": "Unlock",
    "share.copy": "Copy JSON",
    "share.download": "Download JSON",
    "share.preview.empty": "No cards available.",
    "share.preview.question": "Question",
    "share.preview.answer": "Answer",
    "share.collection": "Collection",
    "share.meta.cards": "{count} cards",
    "share.meta.expires": " · expires {date}",
    "share.meta.uses": " · remaining uses {count}",
    "share.error.load": "Failed to load template.",
    "share.error.invalid": "Invalid link.",
    "share.error.notTemplate": "This link is not a template.",
    "share.locked": "This link is password-protected.",
    "share.copy.ok": "JSON copied.",
    "share.copy.fail": "Unable to copy.",
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
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (!key) return;
    const value = dict[key];
    if (typeof value === "string") {
      el.setAttribute("placeholder", value);
    }
  });
  document.title = t("share.pageTitle");
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

function renderPreview(cards) {
  if (!cards.length) {
    sharePreview.textContent = t("share.preview.empty");
    return;
  }
  const rows = cards.slice(0, 8);
  const table = document.createElement("table");
  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  const thQ = document.createElement("th");
  thQ.textContent = t("share.preview.question");
  const thA = document.createElement("th");
  thA.textContent = t("share.preview.answer");
  headRow.appendChild(thQ);
  headRow.appendChild(thA);
  head.appendChild(headRow);
  table.appendChild(head);
  const body = document.createElement("tbody");
  rows.forEach((card) => {
    const tr = document.createElement("tr");
    const tdQ = document.createElement("td");
    tdQ.textContent = String(card.question || "").trim();
    const tdA = document.createElement("td");
    tdA.textContent = String(card.answer || "").trim();
    tr.appendChild(tdQ);
    tr.appendChild(tdA);
    body.appendChild(tr);
  });
  table.appendChild(body);
  sharePreview.innerHTML = "";
  sharePreview.appendChild(table);
}

function setMetaText(meta, cardsCount) {
  const name = meta?.name || meta?.collection?.name || t("share.collection");
  currentName = name || "template";
  const count = typeof cardsCount === "number" ? cardsCount : meta?.cards?.length;
  const expiresLabel = meta?.expires_at
    ? t("share.meta.expires", { date: new Date(meta.expires_at).toLocaleString() })
    : "";
  const usesLabel =
    meta?.uses_remaining != null ? t("share.meta.uses", { count: meta.uses_remaining }) : "";
  shareMeta.textContent = `${name}${
    typeof count === "number" ? ` · ${t("share.meta.cards", { count })}` : ""
  }${expiresLabel}${usesLabel}`;
}

async function accessTemplate(password = "") {
  const token = getTokenFromPath();
  try {
    const res = await fetch(`/api/share/${token}/access`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || t("share.error.load"));
    }
    if (data.type !== "template") {
      shareStatus.textContent = t("share.error.notTemplate");
      return;
    }
    const cards = data.cards || [];
    currentPayload = cards;
    setMetaText(data, cards.length);
    renderPreview(cards);
    shareLock?.classList.add("hidden");
    shareCopy.disabled = false;
    shareDownload.disabled = false;
  } catch (err) {
    shareLockStatus.textContent = err.message;
  }
}

async function loadTemplate() {
  const token = getTokenFromPath();
  if (!token) {
    shareStatus.textContent = t("share.error.invalid");
    return;
  }
  try {
    const res = await fetch(`/api/share/${token}`);
    const meta = await res.json();
    if (!res.ok) {
      throw new Error(meta.error || t("share.error.load"));
    }
    if (meta.type !== "template") {
      shareStatus.textContent = t("share.error.notTemplate");
      return;
    }
    setMetaText(meta);
    shareCopy.disabled = true;
    shareDownload.disabled = true;
    if (meta.requires_password) {
      if (shareLock) shareLock.classList.remove("hidden");
      if (sharePasswordInput) sharePasswordInput.focus();
      shareLockStatus.textContent = t("share.locked");
      return;
    }
    await accessTemplate();
  } catch (err) {
    shareStatus.textContent = err.message;
  }
}

if (shareUnlockBtn) {
  shareUnlockBtn.addEventListener("click", () => {
    const pwd = sharePasswordInput ? sharePasswordInput.value.trim() : "";
    accessTemplate(pwd);
  });
}

if (shareCopy) {
  shareCopy.addEventListener("click", async () => {
    if (!currentPayload) return;
    const jsonPayload = JSON.stringify({ cards: currentPayload }, null, 2);
    try {
      await navigator.clipboard.writeText(jsonPayload);
      shareStatus.textContent = t("share.copy.ok");
    } catch (err) {
      shareStatus.textContent = t("share.copy.fail");
    }
  });
}

if (shareDownload) {
  shareDownload.addEventListener("click", () => {
    if (!currentPayload) return;
    const jsonPayload = JSON.stringify({ cards: currentPayload }, null, 2);
    const blob = new Blob([jsonPayload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentName || "template"}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
}

setLanguage(detectLanguage());
loadTemplate();

(function () {
  const USAGE_KEY = "ai_usage_v1";
  const PRICING_KEY = "ai_pricing_v1";

  const DEFAULT_PRICING = {
    openai: { input_per_1m: 5.0, output_per_1m: 15.0 },
    gemini: { input_per_1m: 0.35, output_per_1m: 0.53 },
  };

  const STRINGS = {
    pt: {
      pill: (tokens, cost) => `Tokens: ${tokens} · ≈ $${cost}`,
      title: "Tokens & custo (estimativa)",
      note:
        "Estimativa aproximada com base em preços por 1M tokens. Se você usa modelos/preços diferentes, ajuste abaixo.",
      total: "Total",
      openai: "OpenAI",
      gemini: "Gemini",
      tokens: "tokens",
      input: "entrada",
      output: "saída",
      cost: "custo",
      avg: "média",
      per1k: "por 1k tokens",
      configure: "Configurar preços",
      reset: "Zerar contador",
      saved: "Preços salvos.",
    },
    en: {
      pill: (tokens, cost) => `Tokens: ${tokens} · ≈ $${cost}`,
      title: "Tokens & cost (estimate)",
      note:
        "Approximate estimate based on prices per 1M tokens. If you use different models/prices, adjust below.",
      total: "Total",
      openai: "OpenAI",
      gemini: "Gemini",
      tokens: "tokens",
      input: "input",
      output: "output",
      cost: "cost",
      avg: "avg",
      per1k: "per 1k tokens",
      configure: "Configure pricing",
      reset: "Reset counter",
      saved: "Pricing saved.",
    },
  };

  function detectLanguage() {
    try {
      const stored = localStorage.getItem("language");
      if (stored) return stored === "en" ? "en" : "pt";
    } catch (err) {
      // ignore
    }
    const lang = (document.documentElement.lang || "").toLowerCase();
    return lang.startsWith("en") ? "en" : "pt";
  }

  function safeParseJSON(raw, fallback) {
    if (!raw) return fallback;
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch (err) {
      return fallback;
    }
  }

  function loadUsage() {
    let state = {};
    try {
      state = safeParseJSON(localStorage.getItem(USAGE_KEY), {});
    } catch (err) {
      state = {};
    }
    const openai = state.openai && typeof state.openai === "object" ? state.openai : {};
    const gemini = state.gemini && typeof state.gemini === "object" ? state.gemini : {};
    return {
      openai: {
        input: Number(openai.input || 0) || 0,
        output: Number(openai.output || 0) || 0,
        calls: Number(openai.calls || 0) || 0,
      },
      gemini: {
        input: Number(gemini.input || 0) || 0,
        output: Number(gemini.output || 0) || 0,
        calls: Number(gemini.calls || 0) || 0,
      },
      updated_at: state.updated_at || "",
    };
  }

  function saveUsage(state) {
    const payload = {
      openai: state.openai,
      gemini: state.gemini,
      updated_at: new Date().toISOString(),
    };
    try {
      localStorage.setItem(USAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      // ignore
    }
  }

  function loadPricing() {
    let pricing = {};
    try {
      pricing = safeParseJSON(localStorage.getItem(PRICING_KEY), {});
    } catch (err) {
      pricing = {};
    }
    const openai = pricing.openai && typeof pricing.openai === "object" ? pricing.openai : {};
    const gemini = pricing.gemini && typeof pricing.gemini === "object" ? pricing.gemini : {};
    return {
      openai: {
        input_per_1m:
          Number(openai.input_per_1m ?? openai.input ?? DEFAULT_PRICING.openai.input_per_1m) ||
          0,
        output_per_1m:
          Number(openai.output_per_1m ?? openai.output ?? DEFAULT_PRICING.openai.output_per_1m) ||
          0,
      },
      gemini: {
        input_per_1m:
          Number(gemini.input_per_1m ?? gemini.input ?? DEFAULT_PRICING.gemini.input_per_1m) ||
          0,
        output_per_1m:
          Number(gemini.output_per_1m ?? gemini.output ?? DEFAULT_PRICING.gemini.output_per_1m) ||
          0,
      },
    };
  }

  function savePricing(pricing) {
    try {
      localStorage.setItem(PRICING_KEY, JSON.stringify(pricing));
    } catch (err) {
      // ignore
    }
  }

  function normalizeUsage(usage, providerHint) {
    const safe = usage && typeof usage === "object" ? usage : {};
    const hint = (providerHint || "").trim().toLowerCase();
    const looksGemini =
      hint === "gemini" ||
      "promptTokenCount" in safe ||
      "candidatesTokenCount" in safe ||
      "totalTokenCount" in safe;
    const looksOpenAI =
      hint === "openai" ||
      "total_tokens" in safe ||
      "input_tokens" in safe ||
      "output_tokens" in safe;

    let provider = looksGemini ? "gemini" : looksOpenAI ? "openai" : "";
    if (!provider) {
      provider = "promptTokenCount" in safe || "totalTokenCount" in safe ? "gemini" : "openai";
    }

    const total =
      safe.total_tokens ??
      safe.totalTokens ??
      safe.totalTokenCount ??
      safe.totalToken ??
      safe.total_token_count ??
      0;
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

    const totalNum = Number(total) || 0;
    let inputNum = Number(input) || 0;
    let outputNum = Number(output) || 0;

    if (totalNum > 0 && inputNum + outputNum === 0) {
      inputNum = totalNum;
      outputNum = 0;
    }

    return {
      provider,
      total: totalNum,
      input: inputNum,
      output: outputNum,
    };
  }

  function estimateCostUSD(usage, pricing) {
    const openaiCost =
      (usage.openai.input * (pricing.openai.input_per_1m / 1_000_000)) +
      (usage.openai.output * (pricing.openai.output_per_1m / 1_000_000));
    const geminiCost =
      (usage.gemini.input * (pricing.gemini.input_per_1m / 1_000_000)) +
      (usage.gemini.output * (pricing.gemini.output_per_1m / 1_000_000));
    return {
      openai: openaiCost,
      gemini: geminiCost,
      total: openaiCost + geminiCost,
    };
  }

  function formatTokens(n) {
    const value = Math.max(0, Math.floor(Number(n || 0)));
    return new Intl.NumberFormat(undefined).format(value);
  }

  function formatUSD(n) {
    const value = Number(n || 0);
    return (Math.max(0, value)).toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  }

  function getSummary() {
    const lang = detectLanguage();
    const strings = STRINGS[lang] || STRINGS.pt;
    const usage = loadUsage();
    const pricing = loadPricing();
    const tokensOpenai = usage.openai.input + usage.openai.output;
    const tokensGemini = usage.gemini.input + usage.gemini.output;
    const totalTokens = tokensOpenai + tokensGemini;
    const cost = estimateCostUSD(usage, pricing);
    const avgPer1k = totalTokens > 0 ? (cost.total / totalTokens) * 1000 : 0;
    return {
      lang,
      strings,
      usage,
      pricing,
      cost,
      totalTokens,
      tokensOpenai,
      tokensGemini,
      avgPer1k,
    };
  }

  function buildPanelHTML(summary) {
    const { strings, usage, pricing, cost, totalTokens, avgPer1k } = summary;
    const rows = [
      {
        label: strings.total,
        tokens: totalTokens,
        input: usage.openai.input + usage.gemini.input,
        output: usage.openai.output + usage.gemini.output,
        cost: cost.total,
      },
      {
        label: strings.openai,
        tokens: usage.openai.input + usage.openai.output,
        input: usage.openai.input,
        output: usage.openai.output,
        cost: cost.openai,
      },
      {
        label: strings.gemini,
        tokens: usage.gemini.input + usage.gemini.output,
        input: usage.gemini.input,
        output: usage.gemini.output,
        cost: cost.gemini,
      },
    ];

    const lines = rows
      .map((row) => {
        return `
          <div class="usage-row">
            <span class="label">${row.label}</span>
            <span class="values">
              <strong>${formatTokens(row.tokens)}</strong> ${strings.tokens}
              <span class="muted">(${strings.input} ${formatTokens(row.input)} · ${strings.output} ${formatTokens(
          row.output
        )})</span>
            </span>
            <span class="cost">≈ $${formatUSD(row.cost)}</span>
          </div>
        `;
      })
      .join("");

    const avgLine = `
      <div class="usage-foot">
        <span class="muted">${strings.avg}: ≈ $${formatUSD(avgPer1k)} ${strings.per1k}</span>
      </div>
    `;

    const pricingBlock = `
      <details class="usage-config">
        <summary>${strings.configure}</summary>
        <div class="usage-config-grid">
          <div class="usage-config-card">
            <strong>${strings.openai}</strong>
            <label>$/1M ${strings.input} <input type="number" step="0.01" min="0" id="usage-price-openai-in" value="${Number(
              pricing.openai.input_per_1m || 0
            )}" /></label>
            <label>$/1M ${strings.output} <input type="number" step="0.01" min="0" id="usage-price-openai-out" value="${Number(
              pricing.openai.output_per_1m || 0
            )}" /></label>
          </div>
          <div class="usage-config-card">
            <strong>${strings.gemini}</strong>
            <label>$/1M ${strings.input} <input type="number" step="0.01" min="0" id="usage-price-gemini-in" value="${Number(
              pricing.gemini.input_per_1m || 0
            )}" /></label>
            <label>$/1M ${strings.output} <input type="number" step="0.01" min="0" id="usage-price-gemini-out" value="${Number(
              pricing.gemini.output_per_1m || 0
            )}" /></label>
          </div>
        </div>
        <p class="status" id="usage-pricing-status"></p>
      </details>
    `;

    return `
      <strong class="usage-title">${strings.title}</strong>
      <p class="muted usage-note">${strings.note}</p>
      <div class="usage-grid">${lines}</div>
      ${avgLine}
      ${pricingBlock}
      <div class="usage-actions">
        <button class="ghost danger small" type="button" id="usage-reset">${strings.reset}</button>
      </div>
    `;
  }

  function renderUI() {
    const pill = document.getElementById("usage-pill");
    const panel = document.getElementById("usage-panel");
    const body = document.getElementById("usage-panel-body");
    if (!pill) return;

    const summary = getSummary();
    pill.textContent = summary.strings.pill(formatTokens(summary.totalTokens), formatUSD(summary.cost.total));

    if (!panel || !body) return;
    body.innerHTML = buildPanelHTML(summary);

    const resetBtn = panel.querySelector("#usage-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        resetUsage();
      });
    }

    function readPricingInput(id) {
      const el = panel.querySelector(id);
      if (!el) return 0;
      const val = Number(el.value);
      return Number.isFinite(val) && val >= 0 ? val : 0;
    }

    function attachPricingHandlers() {
      const ids = [
        "#usage-price-openai-in",
        "#usage-price-openai-out",
        "#usage-price-gemini-in",
        "#usage-price-gemini-out",
      ];
      ids.forEach((selector) => {
        const input = panel.querySelector(selector);
        if (!input) return;
        input.addEventListener("change", () => {
          const pricing = loadPricing();
          pricing.openai.input_per_1m = readPricingInput("#usage-price-openai-in");
          pricing.openai.output_per_1m = readPricingInput("#usage-price-openai-out");
          pricing.gemini.input_per_1m = readPricingInput("#usage-price-gemini-in");
          pricing.gemini.output_per_1m = readPricingInput("#usage-price-gemini-out");
          savePricing(pricing);
          const status = panel.querySelector("#usage-pricing-status");
          const lang = detectLanguage();
          const strings = STRINGS[lang] || STRINGS.pt;
          if (status) {
            status.textContent = strings.saved;
            setTimeout(() => {
              status.textContent = "";
            }, 1200);
          }
          renderUI();
        });
      });
    }

    attachPricingHandlers();
  }

  function showPanel(show) {
    const pill = document.getElementById("usage-pill");
    const panel = document.getElementById("usage-panel");
    if (!pill || !panel) return;
    panel.classList.toggle("hidden", !show);
    pill.setAttribute("aria-expanded", show ? "true" : "false");
    if (show) {
      renderUI();
    }
  }

  function togglePanel() {
    const panel = document.getElementById("usage-panel");
    if (!panel) return;
    const willShow = panel.classList.contains("hidden");
    showPanel(willShow);
  }

  function setupUI() {
    const pill = document.getElementById("usage-pill");
    const panel = document.getElementById("usage-panel");
    if (!pill) return;
    renderUI();

    pill.addEventListener("click", (event) => {
      event.stopPropagation();
      togglePanel();
    });

    if (panel) {
      panel.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    }

    document.addEventListener("click", () => {
      showPanel(false);
    });
  }

  function recordFromUsage(usage, providerHint) {
    const normalized = normalizeUsage(usage, providerHint);
    if (!normalized.total && !normalized.input && !normalized.output) return;
    const state = loadUsage();
    const bucket = normalized.provider === "gemini" ? state.gemini : state.openai;
    bucket.input += Math.max(0, normalized.input);
    bucket.output += Math.max(0, normalized.output);
    bucket.calls += 1;
    saveUsage(state);
    renderUI();
  }

  function resetUsage() {
    const empty = {
      openai: { input: 0, output: 0, calls: 0 },
      gemini: { input: 0, output: 0, calls: 0 },
      updated_at: "",
    };
    saveUsage(empty);
    renderUI();
  }

  window.AIUsage = {
    recordFromUsage,
    normalizeUsage,
    getSummary,
    reset: resetUsage,
    render: renderUI,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupUI);
  } else {
    setupUI();
  }
})();


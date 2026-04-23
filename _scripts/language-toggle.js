function setSiteLanguage(lang) {
  const language = lang === "en" ? "en" : "zh";
  document.documentElement.setAttribute("lang", language);
  document.documentElement.setAttribute("data-lang", language);
  const tooltipNodes = document.querySelectorAll("[data-tooltip-zh][data-tooltip-en]");
  tooltipNodes.forEach((node) => {
    const tooltipText = language === "en"
      ? node.getAttribute("data-tooltip-en")
      : node.getAttribute("data-tooltip-zh");
    if (tooltipText) {
      node.setAttribute("data-tooltip", tooltipText);
    }
  });
  const toggleButton = document.getElementById("lang-toggle-btn");
  if (toggleButton) {
    // Button text always shows the target language to switch to.
    toggleButton.textContent = language === "zh" ? "EN" : "中文";
  }
  try {
    localStorage.setItem("site-language", language);
  } catch (error) {
    // Ignore localStorage failures in restricted environments.
  }
}

function toggleSiteLanguage() {
  const current = document.documentElement.getAttribute("data-lang") || "zh";
  setSiteLanguage(current === "zh" ? "en" : "zh");
}

function initSiteLanguage() {
  let storedLanguage = "zh";
  try {
    storedLanguage = localStorage.getItem("site-language") || "zh";
  } catch (error) {
    storedLanguage = "zh";
  }
  setSiteLanguage(storedLanguage);
}

initSiteLanguage();

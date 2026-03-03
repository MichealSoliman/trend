let currentLang = localStorage.getItem("lang") || "ar";

async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);

    if (!response.ok) {
      throw new Error("Language file not found");
    }

    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.getAttribute("data-i18n");
      element.innerHTML  = translations[key] || key;
    });

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;

    localStorage.setItem("lang", lang);
    currentLang = lang;

  } catch (error) {
    console.error("Language load error:", error);
  }
}

function setLanguage(lang) {
  loadLanguage(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  loadLanguage(currentLang);
});
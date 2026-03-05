let currentLang = localStorage.getItem("lang") || "ar";

async function loadLanguage(lang) {
  try {

    // تحديد المسار الصحيح
    let path = "";

    if (window.location.pathname.includes("/projects/") || window.location.pathname.includes("/services/")) {
      path = "../lang/";
    } else {
      path = "lang/";
    }

    const response = await fetch(path + lang + ".json");

    if (!response.ok) {
      throw new Error("Language file not found");
    }

    const translations = await response.json();

    // ترجمة النصوص
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.innerHTML = translations[key] || key;
    });

    // ترجمة placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.placeholder = translations[key] || key;
    });

    // اتجاه الصفحة
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
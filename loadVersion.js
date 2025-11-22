/* --------------------------------------------------------------
   loadVersion.js – ergänzt CSS, JS und HTML‑Links mit einer
   Versions‑Query‑String (v=Jahr‑Monat‑Tag‑Nummer)
   -------------------------------------------------------------- */
(() => {
  // 1️⃣ Versions‑Datei holen (Cache‑bypass, damit wir immer die aktuelle Datei sehen)
  fetch("version.json", { cache: "no-store" })
    .then((r) => r.json())
    .then((data) => {
      const version = data.v; // z. B. "2025-11-22-1"
      if (!version) return;

      // ------------------------------------------------------------
      // 2️⃣ CSS‑Links aktualisieren
      // ------------------------------------------------------------
      document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
        const href = link.getAttribute("href");
        if (href && !href.includes("?v=")) {
          link.setAttribute("href", `${href}?v=${version}`);
        }
      });

      // ------------------------------------------------------------
      // 3️⃣ Script‑Tags aktualisieren (außer diesem Loader selbst)
      // ------------------------------------------------------------
      document.querySelectorAll("script[src]").forEach((script) => {
        if (script.src.includes("loadVersion.js")) return; // nicht sich selbst neu laden
        const src = script.getAttribute("src");
        if (src && !src.includes("?v=")) {
          script.setAttribute("src", `${src}?v=${version}`);
        }
      });

      // ------------------------------------------------------------
      // 4️⃣ HTML‑Links (Navigation) aktualisieren
      // ------------------------------------------------------------
      document.querySelectorAll("a[href]").forEach((a) => {
        const href = a.getAttribute("href");

        // 4.1 Nur interne Links (keine absolute URLs, keine Mailto, etc.)
        const isExternal = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
        if (isExternal) return; // extern → ignorieren

        // 4.2 Endet auf .html oder ist ein reiner Pfad ohne Dateiendung
        const isHtml = href.endsWith(".html") || !href.includes(".");

        if (isHtml && !href.includes("?v=")) {
          // Falls bereits ein Query‑String existiert (z. B. "?foo=bar")
          // hängen wir &v=… an, sonst ?v=…
          const separator = href.includes("?") ? "&" : "?";
          a.setAttribute("href", `${href}${separator}v=${version}`);
        }
      });
    })
    .catch((err) => {
      console.warn("Version‑Datei konnte nicht geladen werden:", err);
    });
})();

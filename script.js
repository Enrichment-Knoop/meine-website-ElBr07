/* script.js – einfache Interaktivität
   Alle Kommentare sind auf Deutsch.
*/

document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const modeChoice = document.getElementById("mode-choice");
  const infoSection = document.getElementById("info");
  const shopLink = document.getElementById("shop-link");
  const pointsSpan = document.getElementById("points");

  // ---- Hilfsfunktionen -------------------------------------------------
  const setMode = (playful) => {
    localStorage.setItem("playfulMode", playful ? "true" : "false");
    // Punkte‑Anzeige initialisieren (falls noch nicht vorhanden)
    if (!localStorage.getItem("points")) localStorage.setItem("points", "0");
    updateUI();
  };

  const getMode = () => localStorage.getItem("playfulMode") === "true";

  const getPoints = () => parseInt(localStorage.getItem("points") || "0", 10);

  const updateUI = () => {
    const playful = getMode();

    // Navigations‑Link „Shop“ nur im spielerischen Modus zeigen
    if (shopLink) shopLink.style.display = playful ? "inline-block" : "none";

    // Punkte‑Anzeige aktualisieren
    if (pointsSpan) pointsSpan.textContent = getPoints();

    // Auswahl‑Bereich ausblenden, Info‑Bereich zeigen
    if (modeChoice) modeChoice.classList.add("hidden");
    if (infoSection) infoSection.classList.remove("hidden");
  };

  // ---- Event‑Handler ----------------------------------------------------
  if (yesBtn) yesBtn.addEventListener("click", () => setMode(true));
  if (noBtn) noBtn.addEventListener("click", () => setMode(false));

  // ---- Beim Laden prüfen, ob bereits ein Modus gewählt wurde ----------
  if (localStorage.getItem("playfulMode") !== null) {
    // Modus ist bereits gespeichert → UI sofort anpassen
    updateUI();
  }
});

/* --------------------------------------------------------------
   Mobile‑Menu‑Toggle (falls du das Hamburger‑Icon nutzt)
   -------------------------------------------------------------- */
const navToggle = document.getElementById("navToggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Schließe das Menü, wenn ein Link geklickt wird
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("is-open")) {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

/* --------------------------------------------------------------
   2️⃣  Aktiven Nav‑Link ermitteln und .active hinzufügen
   -------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  // Aktuelle URL (nur der Pfad, ohne Domain, Query‑String oder Hash)
  const currentPath = window.location.pathname;

  // Alle Links in der Navbar
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    // Der Link‑href kann relativ (z. B. "/pages/skills/") sein.
    // Wir vergleichen nur den Pfadanteil.
    const linkPath = new URL(link.href, window.location.origin).pathname;

    // Wenn Pfade übereinstimmen → aktiv markieren
    if (
      linkPath === currentPath ||
      (linkPath.endsWith("/") && currentPath.startsWith(linkPath))
    ) {
      link.classList.add("active");
    }
  });
});

/* script.js – einfache Interaktivität
   Alle Kommentare sind auf Deutsch.
*/

document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn  = document.getElementById('no-btn');
    const modeChoice = document.getElementById('mode-choice');
    const infoSection = document.getElementById('info');
    const shopLink = document.getElementById('shop-link');
    const pointsSpan = document.getElementById('points');

    // ---- Hilfsfunktionen -------------------------------------------------
    const setMode = (playful) => {
        localStorage.setItem('playfulMode', playful ? 'true' : 'false');
        // Punkte‑Anzeige initialisieren (falls noch nicht vorhanden)
        if (!localStorage.getItempoints')) localStorage.setItem('points', '0');
        updateUI();
    };

    const getMode = () => localStorage.getItem('playfulMode') === 'true';

    const getPoints = () => parseInt(localStorage.getItem('points') || '0', 10);

    const updateUI = () => {
        const playful = getMode();
        // Navigations‑Link „Shop“ nur im spielerischen Modus zeigen
        shopLink.style.display = playful ? 'inline-block' : 'none';

        // Punkte‑Anzeige aktualisieren
        pointsSpan.textContent = getPoints();

        // Auswahl‑Bereich ausblenden, Info‑Bereich zeigen
        modeChoice.classList.add('hidden');
        infoSection.classList.remove('hidden');
    };

    // ---- Event‑Handler ----------------------------------------------------
    yesBtn.addEventListener('click', () => setMode(true));
    noBtn.addEventListener('click', () => setMode(false));

    // ---- Beim Laden prüfen, ob bereits ein Modus gewählt wurde ----------
    if (localStorage.getItem('playfulMode') !== null) {
        // Modus ist bereits gespeichert → UI sofort anpassen
        updateUI();
    }
});

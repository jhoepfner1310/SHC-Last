// Welcome Height Calculator - Adjusts #welcome h1 font size based on quote-box container height

function calculateWelcomeHeight() {
    const quoteBox = document.querySelector('.quote-box');
    const welcomeH1 = document.getElementById('welcome');
    
    if (!quoteBox || !welcomeH1) {
        console.warn('Quote box or welcome element not found');
        return;
    }
    
    // Quote-Box Dimensionen abrufen
    const quoteBoxHeight = quoteBox.offsetHeight;
    const quoteBoxWidth = quoteBox.offsetWidth;
    
    // Verfügbaren Platz für Text berechnen (ignoriere Padding komplett)
    const availableHeight = quoteBoxHeight; // Komplette Container-Höhe nutzen
    const availableWidth = quoteBoxWidth;   // Komplette Container-Breite nutzen
    
    // Text-Content für Messung holen
    const textContent = welcomeH1.textContent || welcomeH1.innerText;
    
    // Startwert für binäre Suche nach optimaler Schriftgröße
    let minFontSize = 10;
    let maxFontSize = Math.max(availableHeight * 2, availableWidth * 1.5);
    let optimalFontSize = minFontSize;
    
    // Temporäres Element für Text-Messung erstellen
    const testElement = document.createElement('div');
    testElement.style.position = 'absolute';
    testElement.style.visibility = 'hidden';
    testElement.style.whiteSpace = 'pre-line';
    testElement.style.fontFamily = window.getComputedStyle(welcomeH1).fontFamily;
    testElement.style.fontWeight = window.getComputedStyle(welcomeH1).fontWeight;
    testElement.style.lineHeight = '1.0';
    testElement.innerHTML = textContent;
    document.body.appendChild(testElement);
    
    // Binäre Suche nach größtmöglicher Schriftgröße
    while (maxFontSize - minFontSize > 1) {
        const midFontSize = (minFontSize + maxFontSize) / 2;
        testElement.style.fontSize = `${midFontSize}px`;
        testElement.style.width = `${availableWidth}px`;
        
        const textHeight = testElement.offsetHeight;
        const textWidth = testElement.offsetWidth;
        
        // Prüfen ob Text in Container passt (praktisch kein Puffer)
        if (textHeight <= availableHeight && textWidth <= availableWidth) {
            optimalFontSize = midFontSize;
            minFontSize = midFontSize;
        } else {
            maxFontSize = midFontSize;
        }
    }
    
    // Test-Element wieder entfernen
    document.body.removeChild(testElement);
    
    let baseFontSize = optimalFontSize;
    
    // Minimale Sicherheit für extreme Größe
    const absoluteMinSize = 10;
    baseFontSize = Math.max(absoluteMinSize, baseFontSize);
    
    // Schriftgröße anwenden
    welcomeH1.style.fontSize = `${baseFontSize}px`;
    
    // Optional: Line-height proportional anpassen
    welcomeH1.style.lineHeight = '1.4';
    
    // Debug-Info (kann entfernt werden)
    console.log(`Quote-Box: ${quoteBoxWidth}x${quoteBoxHeight}px, Font-Size: ${baseFontSize}px`);
}

// Funktion bei verschiedenen Events ausführen
function initializeWelcomeHeight() {
    // Initial berechnen
    calculateWelcomeHeight();
    
    // Bei Resize neu berechnen
    window.addEventListener('resize', debounce(calculateWelcomeHeight, 250));
    
    // Bei Orientation Change (Mobile)
    window.addEventListener('orientationchange', () => {
        setTimeout(calculateWelcomeHeight, 300); // Delay für Orientation-Animation
    });
    
    // Bei Font-Load (falls Web-Fonts verwendet werden)
    if (document.fonts) {
        document.fonts.ready.then(calculateWelcomeHeight);
    }
}

// Debounce-Hilfsfunktion für Performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// DOM Ready Event Listener
document.addEventListener('DOMContentLoaded', initializeWelcomeHeight);

// Fallback für bereits geladene DOMs
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWelcomeHeight);
} else {
    initializeWelcomeHeight();
}

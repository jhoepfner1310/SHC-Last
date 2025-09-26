function calculateTestimonialTextSize() {
    const textContainer = document.getElementById('testimonials-text-container');
    const textElement = document.querySelector('#testimonials-text-container p');
    
    if (!textContainer || !textElement) {
        console.warn('Testimonials text container or paragraph not found');
        return;
    }

    const containerHeight = textContainer.offsetHeight;
    const containerWidth = textContainer.offsetWidth;
    
    // Padding abziehen (2vmax entspricht etwa 2% der Viewport-Breite)
    const paddingValue = window.innerWidth * 0.02 * 2; // 2vmax oben/unten + links/rechts
    const availableHeight = containerHeight - paddingValue;
    const availableWidth = containerWidth - paddingValue;
    
    const textContent = textElement.textContent || textElement.innerText;
    
    if (!textContent.trim()) return;
    
    let minFontSize = 16;
    let maxFontSize = 32;
    let optimalFontSize = minFontSize;
    
    // Test-Element erstellen für Messungen
    const testElement = document.createElement('div');
    testElement.style.position = 'absolute';
    testElement.style.visibility = 'hidden';
    testElement.style.whiteSpace = 'normal';
    testElement.style.wordWrap = 'break-word';
    testElement.style.fontFamily = window.getComputedStyle(textElement).fontFamily;
    testElement.style.fontWeight = window.getComputedStyle(textElement).fontWeight;
    testElement.style.fontStyle = window.getComputedStyle(textElement).fontStyle;
    testElement.style.textAlign = 'center';
    testElement.style.lineHeight = '1.4';
    testElement.innerHTML = textContent;
    document.body.appendChild(testElement);
    
    // Binary search für optimale Schriftgröße
    while (maxFontSize - minFontSize > 0.5) {
        const midFontSize = (minFontSize + maxFontSize) / 2;
        testElement.style.fontSize = `${midFontSize}px`;
        testElement.style.width = `${availableWidth}px`;
        
        const textHeight = testElement.offsetHeight;
        
        if (textHeight <= availableHeight) {
            optimalFontSize = midFontSize;
            minFontSize = midFontSize;
        } else {
            maxFontSize = midFontSize;
        }
    }
    
    document.body.removeChild(testElement);
    
    // Mindestgröße sicherstellen
    const finalFontSize = Math.max(10, optimalFontSize);
    
    // Schriftgröße anwenden
    textElement.style.fontSize = `${finalFontSize}px`;
    textElement.style.lineHeight = '1.4';
    
    console.log(`Testimonials Container: ${containerWidth}x${containerHeight}px, Font-Size: ${finalFontSize}px`);
}

function initializeTestimonialTextSize() {
    // Initial berechnen
    calculateTestimonialTextSize();
    
    // Bei Fenstergrößenänderung neu berechnen (mit Debouncing)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(calculateTestimonialTextSize, 250);
    });
}

// Warten bis DOM geladen und Testimonials initialisiert sind
document.addEventListener('DOMContentLoaded', () => {
    // Kurz warten damit die Testimonials geladen sind
    setTimeout(initializeTestimonialTextSize, 500);
});

// Bei Testimonial-Wechsel neu berechnen
function recalculateOnTextChange() {
    setTimeout(calculateTestimonialTextSize, 100);
} 
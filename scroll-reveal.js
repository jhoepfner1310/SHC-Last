// ===== SCROLL REVEAL EFFEKT =====
// Subtiler Einblende-Effekt für alle Elemente unterhalb des Hero-Bereichs

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer für bessere Performance
    const observerOptions = {
        root: null, // Viewport als Root
        rootMargin: '0px 0px -50px 0px', // Elemente werden 50px vor dem Viewport-Rand getriggert
        threshold: 0.1 // Element wird getriggert, wenn 10% sichtbar sind
    };

    // Callback-Funktion für den Observer
    const observerCallback = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element wird sichtbar - Reveal-Klasse hinzufügen
                entry.target.classList.add('revealed');
                
                // Element aus der Beobachtung entfernen (nur einmal animieren)
                observer.unobserve(entry.target);
            }
        });
    };

    // Observer erstellen
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Alle Elemente mit scroll-reveal Klasse beobachten
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    scrollRevealElements.forEach(element => {
        observer.observe(element);
    });

    // Fallback für ältere Browser (falls Intersection Observer nicht unterstützt wird)
    if (!('IntersectionObserver' in window)) {
        console.log('Intersection Observer nicht unterstützt - Fallback aktiviert');
        
        // Einfacher Scroll-Event als Fallback
        window.addEventListener('scroll', function() {
            const scrollRevealElements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
            
            scrollRevealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150; // Element wird 150px vor dem Viewport-Rand getriggert
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('revealed');
                }
            });
        });
        
        // Initial check für bereits sichtbare Elemente
        setTimeout(function() {
            const scrollRevealElements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
            
            scrollRevealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < window.innerHeight) {
                    element.classList.add('revealed');
                }
            });
        }, 100);
    }
});

// Performance-Optimierung: Throttling für Scroll-Events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Zusätzliche Funktion für manuelle Trigger (falls benötigt)
function revealElement(element) {
    if (element && element.classList.contains('scroll-reveal')) {
        element.classList.add('revealed');
    }
}

// Funktion für alle Elemente auf einmal revealen (z.B. für Tests)
function revealAllElements() {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach(element => {
        element.classList.add('revealed');
    });
} 
document.addEventListener('DOMContentLoaded', function() {
    const themeToggles = document.querySelectorAll('.theme-toggle-input');
    const body = document.body;
    
    // Lade gespeichertes Theme aus localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Setze das gespeicherte Theme oder Light Mode als Standard
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggles.forEach(toggle => { toggle.checked = true; });
    } else {
        body.removeAttribute('data-theme');
        themeToggles.forEach(toggle => { toggle.checked = false; });
    }
    
    // Event Listener für alle Theme Toggles
    themeToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            if (this.checked) {
                // Dark Mode aktivieren
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                
                // Alle anderen Toggles synchronisieren
                themeToggles.forEach(otherToggle => {
                    if (otherToggle !== this) {
                        otherToggle.checked = true;
                    }
                });
            } else {
                // Light Mode aktivieren
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                
                // Alle anderen Toggles synchronisieren
                themeToggles.forEach(otherToggle => {
                    if (otherToggle !== this) {
                        otherToggle.checked = false;
                    }
                });
            }
        });
    });
});

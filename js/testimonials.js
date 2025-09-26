// Testimonials from CMS Collection
let testimonials = [];

// Testimonials Button Constants
const TESTIMONIAL_PREV_BTN = document.getElementById('testimonial-prev-btn');
const TESTIMONIAL_NEXT_BTN = document.getElementById('testimonial-next-btn');
const TESTIMONIAL_PAUSE_BTN = document.getElementById('testimonial-pause-btn');

// Text Container
const TESTIMONIAL_TEXT_CONTAINER = document.querySelector('#testimonials-text-container p');

// Slider Variables
let currentIndex = 0;
let isPlaying = true;
let slideInterval;

// Diese Funktion wird von loadCollection() aufgerufen
function initializeTestimonials(testimonialsData) {
    // Daten in das gewünschte Format umwandeln
    testimonials = testimonialsData.map(testimonial => testimonial.testimonialText);
    
    // Erste Anzeige und Autoplay starten
    if (testimonials.length > 0) {
        updateTestimonialText(false);
        TESTIMONIAL_TEXT_CONTAINER.style.transition = 'opacity 0.6s ease-in-out';
        startAutoPlay();
    }
}

// Function to update testimonial text
function updateTestimonialText(isManual = false) {
    if (testimonials.length === 0) return;
    
    // Fade out
    TESTIMONIAL_TEXT_CONTAINER.style.opacity = '0';
    
    const delay = isManual ? 100 : 1000; // Schnell für Buttons, langsam für Autoplay
    
    setTimeout(() => {
        TESTIMONIAL_TEXT_CONTAINER.textContent = testimonials[currentIndex];
        
        // Schriftgröße neu berechnen nach Textwechsel
        if (typeof recalculateOnTextChange === 'function') {
            recalculateOnTextChange();
        }
        
        // Fade in
        setTimeout(() => {
            TESTIMONIAL_TEXT_CONTAINER.style.opacity = '1';
        }, 50);
    }, delay);
}

// Function to go to next testimonial
function nextTestimonial(isManual = false) {
    if (testimonials.length === 0) return;
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonialText(isManual);
}

// Function to go to previous testimonial
function prevTestimonial() {
    if (testimonials.length === 0) return;
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonialText(true); // Manual = schnell
}

// Function to start auto-play (matching citations.js timing)
function startAutoPlay() {
    slideInterval = setInterval(() => nextTestimonial(false), 8000); // Autoplay = langsam
    isPlaying = true;
}

// Function to stop auto-play
function stopAutoPlay() {
    clearInterval(slideInterval);
    isPlaying = false;
}

// Function to toggle pause/play
function togglePause() {
    if (isPlaying) {
        stopAutoPlay();
        TESTIMONIAL_PAUSE_BTN.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        startAutoPlay();
        TESTIMONIAL_PAUSE_BTN.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

// Event Listeners for Testimonial Buttons
TESTIMONIAL_PREV_BTN.addEventListener('click', () => {
    prevTestimonial();
});

TESTIMONIAL_NEXT_BTN.addEventListener('click', () => {
    nextTestimonial(true); // Manual = schnell
});

TESTIMONIAL_PAUSE_BTN.addEventListener('click', () => {
    togglePause();
});

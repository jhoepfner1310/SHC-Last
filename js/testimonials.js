// Testimonials Data Array
const TESTIMONIALS = [
    "Wir fanden die beiden super lieb, kompetent und empathisch. Die Beratung war genau das, was unser Unternehmen gebraucht hat.",
    "Professionelle Beratung auf höchstem Niveau. SHC Consulting hat uns dabei geholfen, unsere Geschäftsprozesse erheblich zu optimieren.",
    "Sehr empfehlenswert! Das Team von SHC Consulting bringt nicht nur Fachwissen mit, sondern auch die nötige Leidenschaft für den Erfolg ihrer Kunden.",
    "Dank der strategischen Beratung konnten wir unsere Umsätze um 40% steigern. Vielen Dank für die hervorragende Zusammenarbeit!",
    "Kompetent, zuverlässig und immer erreichbar. SHC Consulting ist der ideale Partner für nachhaltige Unternehmensentwicklung."
];

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

// Function to update testimonial text
function updateTestimonialText(isManual = false) {
    // Fade out
    TESTIMONIAL_TEXT_CONTAINER.style.opacity = '0';
    
    const delay = isManual ? 100 : 1000; // Schnell für Buttons, langsam für Autoplay
    
    setTimeout(() => {
        TESTIMONIAL_TEXT_CONTAINER.textContent = TESTIMONIALS[currentIndex];
        
        // Fade in
        setTimeout(() => {
            TESTIMONIAL_TEXT_CONTAINER.style.opacity = '1';
        }, 50);
    }, delay);
}

// Function to go to next testimonial
function nextTestimonial(isManual = false) {
    currentIndex = (currentIndex + 1) % TESTIMONIALS.length;
    updateTestimonialText(isManual);
}

// Function to go to previous testimonial
function prevTestimonial() {
    currentIndex = (currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
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

// Initialize testimonials
function initTestimonials() {
    // Set initial text
    updateTestimonialText(false);
    
    // Add slow and smooth opacity transition (matching citations.js)
    TESTIMONIAL_TEXT_CONTAINER.style.transition = 'opacity 0.6s ease-in-out';
    
    // Start auto-play
    startAutoPlay();
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTestimonials);

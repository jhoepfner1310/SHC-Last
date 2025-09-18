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
function updateTestimonialText() {
    // Fade out slowly
    TESTIMONIAL_TEXT_CONTAINER.style.opacity = '0';
    
    setTimeout(() => {
        TESTIMONIAL_TEXT_CONTAINER.textContent = TESTIMONIALS[currentIndex];
        
        // Fade in slowly
        setTimeout(() => {
            TESTIMONIAL_TEXT_CONTAINER.style.opacity = '1';
        }, 600);
    }, 600);
}

// Function to go to next testimonial
function nextTestimonial() {
    currentIndex = (currentIndex + 1) % TESTIMONIALS.length;
    updateTestimonialText();
}

// Function to go to previous testimonial
function prevTestimonial() {
    currentIndex = (currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    updateTestimonialText();
}

// Function to start auto-play (matching citations.js timing)
function startAutoPlay() {
    slideInterval = setInterval(nextTestimonial, 8000);
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
    updateTestimonialText();
    
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
    nextTestimonial();
});

TESTIMONIAL_PAUSE_BTN.addEventListener('click', () => {
    togglePause();
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTestimonials);

const yUsCards = document.querySelectorAll('.why-us-card');
const headLine = document.querySelectorAll('.why-us-title');
const description = document.querySelectorAll('.why-us-description');

let isClicked = false;



yUsCards.forEach(card => {
    
    card.dataset.clicked = "false";

    card.addEventListener("click", () => {

        const cardHeader = card.querySelector('h3');
        const cardParagraph = card.querySelector('p');

        if(card.dataset.clicked === "false") {

            card.style.transform = 'scale(1.05)';

            // Längere Transition für Einblenden (0 → 1)
            cardHeader.style.transition = 'opacity 0.2s ease-out';
            cardParagraph.style.transition = 'opacity 1.2s ease-in';
            
            cardHeader.style.opacity = '0';
            cardParagraph.style.opacity = '1';

            card.dataset.clicked = "true";

        } else {

            card.style.transform = 'scale(1)';

            // Kürzere Transition für Ausblenden (1 → 0)
            cardHeader.style.transition = 'opacity 1.2s ease-in';
            cardParagraph.style.transition = 'opacity 0.2s ease-out';

            cardHeader.style.opacity = '1';
            cardParagraph.style.opacity = '0';

            card.dataset.clicked = "false";
        }
        
    });
});


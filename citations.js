const quoteElement = document.querySelector('.quote-text');
const authorElement = document.querySelector('.quote-author');

const quotes = [
  {
    text: "„ Ihr Partner für nachhaltige Unternehmensberatung “",
    author: "— SHC Team"
  },
  {
    text: "„ Strategisch. Digital. Nachhaltig “",
    author: "— Beraterteam"
  },
  {
    text: "„ Verantwortungsvoll beraten heißt Zukunft gestalten “",
    author: "— SHC Insights"
  }
];

let index = 0;

function showNextQuote() {
  // Ausblenden
  quoteElement.style.opacity = 0;
  authorElement.style.opacity = 0;

  // Warten, dann Inhalt wechseln und wieder einblenden
  setTimeout(() => {
    index = (index + 1) % quotes.length;
    quoteElement.textContent = quotes[index].text;
    authorElement.textContent = quotes[index].author;

    quoteElement.style.opacity = 1;
    authorElement.style.opacity = 1;
  }, 1500);
}

// Initial
quoteElement.textContent = quotes[0].text;
authorElement.textContent = quotes[0].author;
quoteElement.style.opacity = 1;
authorElement.style.opacity = 1;

// Wechsel alle 5 Sekunden
setInterval(showNextQuote, 6000);




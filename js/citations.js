const quoteElement = document.querySelector('.quote-text');
const authorElement = document.querySelector('.quote-author');
const quoteBox = document.querySelector('.quote-box');
const welcomeText = document.getElementById('welcome');

// Zitate werden über die bestehende loadCollection() Funktion geladen
let quotes = [];
let index = 0;
let firstCycle = true;

// Diese Funktion wird von loadCollection() aufgerufen
function initializeQuotes(quotesData) {

  
  // Daten in das gewünschte Format umwandeln
  quotes = quotesData.map(quote => ({
    text: quote.text,
    author: quote.author
  }));
  
  //quotes anzeigen 
  setTimeout( () => {
    setInterval(showNextQuote, 6000);
  }, 6000);
  
}

function showNextQuote() {

  // Nur weitermachen wenn Zitate vorhanden sind
  if (quotes.length === 0) return;
  
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
    
    if(firstCycle){
      setGap();
      setPadding();
      firstCycle = false;
    }

  }, 1500);
}

function setGap() {
  quoteBox.style.gap = "7vmin";
}

function setPadding(){
  quoteBox.style.padding = "1.5rem";
}





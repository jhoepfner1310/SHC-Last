const aboutButton = document.getElementById("about-us-button");
const aboutContent = document.getElementById("aboutUsContent");
const aboutUsTitle = document.getElementById("aboutUsTitle");

let buttonClicked = true;

function toggleContent() {
    if (!buttonClicked) {
        // Ausblenden mit CSS-Klassen
        aboutContent.classList.remove("show");
        aboutUsTitle.classList.remove("show");
        buttonClicked = true;

        //Klick Animation
        stylesAnimation();

    } else {
        // Einblenden mit CSS-Klassen
        aboutContent.classList.add("show");
        aboutUsTitle.classList.add("show");
        buttonClicked = false;

        //Klick Animation
        stylesAnimation();
    }
}

//Hilfsfunktion für zurücksetzen der Button styles
function resetStyles() {
    aboutButton.style.backgroundColor = "var(--orange)";
    aboutButton.style.transform = "scale(1.0)";
}

// hilsfunktion um Styles zu setzen und danach zuückzusetzen
function stylesAnimation() {
    //Klick Effekt 
    aboutButton.style.backgroundColor = "var(--grün)";
    aboutButton.style.transform = "scale(1.05)";

    setTimeout(resetStyles ,600);
}

aboutButton.addEventListener("click", toggleContent);
const aboutButton = document.getElementById("about-us-button");
const aboutContent = document.getElementById("aboutUsContent");

let buttonClicked = false;

function toggleContent() {
    if (!buttonClicked) {
        aboutContent.style.display = "none";
        buttonClicked = true;

        //Klick Animation
        stylesAnimation();


    } else {
        aboutContent.style.display = "block";
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

    setTimeout(resetStyles ,500);
}

aboutButton.addEventListener("click", toggleContent);
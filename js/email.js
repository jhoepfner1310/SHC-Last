function sendMail(event) {
    event.preventDefault(); // Form-Submit stoppen
    
    // Formular-Referenz holen
    const form = event.target;
    
    // HTML5-Validierung prüfen
    if (!form.checkValidity()) {
        form.reportValidity(); // Zeigt Fehlermeldungen an
        return;
    }
    
    let params = {
        name : document.getElementById("name").value,
        message : document.getElementById("message").value,
        email : document.getElementById("email").value
    }

    if (document.getElementById("privacy").checked){
        emailjs.send("service_4fcvv9o" , "template_non65nr" , params)
            .then(() => {
                alert("Email an Stephan & Tina gesendet :) !");
                form.reset(); // Formular zurücksetzen
            })
            .catch(error => {
                console.error("Fehler beim Senden der Email:", error);
                alert("Fehler beim Senden der Email. Bitte versuchen Sie es später erneut.");
            });
    } else {
        alert("Bitte akzeptieren Sie die Datenschutzerklärung.");
    }
}
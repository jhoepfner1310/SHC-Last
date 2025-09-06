function sendMail() {
    let params = {
        name : document.getElementById("name").value,
        message : document.getElementById("message").value,
        email : document.getElementById("email").value
    }

    if (document.getElementById("privacy").checked){
        emailjs.send("service_4fcvv9o" , "template_non65nr" , params).then(alert("Email an Stephan & Tina gesendet :) !"));
        document.getElementById("name").value = "";
        document.getElementById("message").value = "";
        document.getElementById("email").value = "";
    }

    
}
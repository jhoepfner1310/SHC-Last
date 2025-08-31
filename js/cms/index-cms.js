window.onload = function() {
    readCMS();
};

async function readCMS() {
    const home = await cockpit.getSingleton("home");

    updateText("flip-card-2-name");
    updateText("bb");

    function updateText(key) {
        document.getElementById(key).innerText = home[key];
    }
}


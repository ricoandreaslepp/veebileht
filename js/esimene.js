function injection() {
    document.getElementById("sõnum").innerHTML = "Tere, " + document.getElementById("name").value + "!";
}

function näitaVihjet() {
    var vihje = document.getElementById('vihje');
    var displaySetting = vihje.style.display;

    // also get the clock button, so we can change what it says
    var vihjeNupp = document.getElementById('vihjenupp');

    // now toggle the clock and the button text, depending on current state
    if (displaySetting == 'block') {
        vihje.style.display = 'none';
        vihjeNupp.innerHTML = 'Näita vihjet!';
    }
    else {
        vihje.style.display = 'block';
        vihjeNupp.innerHTML = 'Peida vihje!';
    }
}
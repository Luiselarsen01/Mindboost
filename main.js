/* =========================================
   OPLÆSNING AF ØVELSER ("Lyt"-funktionen)
========================================= */
function readExercise(text) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = "da-DK";   
    msg.rate = 1;        
    msg.pitch = 1;       

    speechSynthesis.cancel(); 
    speechSynthesis.speak(msg);
}









//---Læs op funktion---//
const btn = document.getElementById("readBtn");
 
let utterance;
let isReading = false; // Om oplæsning er igang
let isPaused = false;  // Om oplæsning er pauset
 
btn.addEventListener("click", () => {
    const text = document.body.innerText; // Hele sidens tekst
 
    // Hvis oplæsning IKKE er startet → start
    if (!isReading) {
        window.speechSynthesis.cancel(); // Stop evt. tidligere oplæsning
 
        utterance = new SpeechSynthesisUtterance(text);
 
        // Dansk stemme hvis tilgængelig
        const voices = window.speechSynthesis.getVoices();
        const danishVoice = voices.find(v => v.lang.includes("da"));
        if (danishVoice) utterance.voice = danishVoice;
 
        window.speechSynthesis.speak(utterance);
 
        isReading = true;
        isPaused = false;
        btn.textContent = "Pause oplæsning";
 
        // Når oplæsning slutter naturligt
        utterance.onend = () => {
            isReading = false;
            isPaused = false;
            btn.textContent = "Start oplæsning";
        };
 
        return;
    }
 
    // Hvis oplæsning er igang og ikke pauset → pause
    if (isReading && !isPaused) {
        window.speechSynthesis.pause();
        isPaused = true;
        btn.textContent = "Genoptag oplæsning";
        return;
    }
 
    // Hvis oplæsning er pauset → genoptag
    if (isReading && isPaused) {
        window.speechSynthesis.resume();
        isPaused = false;
        btn.textContent = "Pause oplæsning";
        return;
    }
});

//---burger og nav Mobilmenu---//
const burger = document.querySelector(".burger");
    const nav = document.querySelector(".main-nav");

    burger.addEventListener("click", () => {
        nav.classList.toggle("open");
    });





 
/* --------- DROPDOWN: Sprog --------- */
const langBtn = document.getElementById("lang-btn");
const langMenu = document.getElementById("lang-menu");

langBtn.addEventListener("click", () => {
    langMenu.classList.toggle("show");
});

// Luk dropdown hvis man klikker ude i siden
document.addEventListener("click", function(e) {
    if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.classList.remove("show");
    }
});

/* --------- SPROG-TEKSTER --------- */
const translations = {
    da: {
        nav_home: "Hjem",
        nav_about: "Om os",
        nav_contact: "Kontakt"
    },
    en: {
        nav_home: "Home",
        nav_about: "About Us",
        nav_contact: "Contact"
    },
    de: {
        nav_home: "Startseite",
        nav_about: "Über uns",
        nav_contact: "Kontakt"
    }
};

// Når et sprog vælges
langMenu.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
        const selected = item.dataset.lang;

        langBtn.textContent = item.textContent; // Opdater knappen
        langMenu.classList.remove("show");

        // Opdater alle tekster med data-translate
        document.querySelectorAll("[data-translate]").forEach(el => {
            const key = el.dataset.translate;
            el.textContent = translations[selected][key];
        });
    });
});

// Luk burger-menu
document.querySelector(".close-burger").addEventListener("click", () => {
    mobileNav.classList.remove("open");
});

// Luk sprogvælger
document.querySelector(".close-dropdown").addEventListener("click", () => {
    langMenu.classList.remove("show");
});
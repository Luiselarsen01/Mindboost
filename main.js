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

// ======== Navigation ==============
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

navToggle.addEventListener("click", () => {
  primaryNav.classList.toggle("open");
});

// ======== Language dropdown ==============
const langToggle = document.getElementById("langToggle");
const langMenu = document.getElementById("langMenu");

langToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  langMenu.classList.toggle("show");
});

document.addEventListener("click", () => {
  langMenu.classList.remove("show");
});

langMenu.addEventListener("click", (e) => {
  const btn = e.target.closest(".lang-item");
  if (!btn) return;

  langToggle.querySelector(".flag").textContent = btn.textContent.split(" ")[0];
  langMenu.classList.remove("show");
});


document.addEventListener('click', (e) => {
  if(!menu.contains(e.target) && menu.classList.contains('open')) {
    menu.classList.remove('open');
  }
});
const menu = document.getElementById('primaryNav');

// =========================================



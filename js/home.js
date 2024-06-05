'use strict'

//functie: https://chatgpt.com/c/7ecbfdbe-7cf7-4495-b3b0-af6f4e6b8a3e
let text = "Let the fun begin";
let typeTextArea = document.getElementById('typingText');
let blinkingBar = document.getElementById('blinkingBar');

let typeText = (text, speed = 50, index = 0) => {
    if (index < text.length) {
        typeTextArea.textContent += text.charAt(index);
        setTimeout(function () {
            typeText(text, speed, index + 1);
        }, speed);
    } else {
        // Reset the index and start the blinking bar
        blinkBar();
    }
}

let blinkBar = () => {
    let bar = '|';
    let isVisible = true;

    setInterval(function () {
        if (isVisible) {
            typeTextArea.textContent = text + bar;
        } else {
            typeTextArea.textContent = text;
        }
        isVisible = !isVisible;
    }, 500); // Change the inerval as needed
}

window.onload = () => {
    typeText(text);
}

typeTextArea.addEventListener('click',function(){
    typeTextArea.classList="top"
        window.open('quizForm.html','_self')
})


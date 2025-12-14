// Typing Animation Effect
const textElement = document.querySelector('.typing-text');
const words = ["Senior Aviation Professional", "Customer Service Leader", "Web Developer", "Load Controller"];
let count = 0;
let wordIndex = 0;
let currentText = '';
let letter = '';

(function type() {
    if (count === words.length) {
        count = 0;
    }
    currentText = words[count];
    letter = currentText.slice(0, ++wordIndex);
    
    textElement.textContent = letter;
    
    if (letter.length === currentText.length) {
        count++;
        wordIndex = 0;
        setTimeout(type, 2000); // Wait before erasing/typing next word
    } else {
        setTimeout(type, 100);
    }
}());

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.right = '0';
    navLinks.style.background = '#0b1120';
    navLinks.style.width = '100%';
    navLinks.style.padding = '20px';
});
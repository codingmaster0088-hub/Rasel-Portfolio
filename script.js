// Typing Animation (আগের মতোই থাকবে)
const textSpan = document.querySelector('.typing-text');
const words = ["Aviation Expert", "Web Developer", "Load Controller", "Customer Leader"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        textSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true; setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false; wordIndex = (wordIndex + 1) % words.length; setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 150);
    }
}
document.addEventListener('DOMContentLoaded', type);

// Mobile Menu (আগের মতোই)
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// ==========================================
// DYNAMIC CONTENT LOADER (NEW CODE)
// ==========================================

async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        // 1. Load Journey/Experience
        const journeyContainer = document.getElementById('journey-container');
        let journeyHTML = '';

        data.journey.forEach(job => {
            journeyHTML += `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <span class="date">${job.date}</span>
                        <h3>${job.role}</h3>
                        <h4>${job.company}</h4>
                        <p>${job.desc}</p>
                    </div>
                </div>
            `;
        });
        journeyContainer.innerHTML = journeyHTML;

        // 2. Load Portfolio
        const portfolioContainer = document.getElementById('portfolio-container');
        let portfolioHTML = '';

        data.projects.forEach(project => {
            portfolioHTML += `
                <a href="${project.link}" target="_blank" class="project-card">
                    <div class="card-image">
                        <i class="${project.icon} branch-icon"></i>
                    </div>
                    <div class="card-info">
                        <h3>${project.title}</h3>
                        <p>${project.desc}</p>
                        <span class="tech">${project.tech}</span>
                    </div>
                </a>
            `;
        });
        portfolioContainer.innerHTML = portfolioHTML;

    } catch (error) {
        console.error('Error loading data: - script.js:84', error);
    }
}

// Call the function to load data
loadData();
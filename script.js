// Function to fetch data and render
async function initPortfolio() {
    try {
        const response = await fetch('data.json');
        
        // Check if file exists
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // 1. Load Profile Info
        document.getElementById('p-name').textContent = data.profile.name;
        document.getElementById('p-role').textContent = data.profile.role;
        document.getElementById('p-bio').textContent = data.profile.bio;
        
        // Load Social Links
        const socialContainer = document.getElementById('hero-socials');
        let socialHTML = '';
        data.profile.socials.forEach(social => {
            socialHTML += `<a href="${social.link}" target="_blank"><i class="${social.icon}"></i></a>`;
        });
        socialContainer.innerHTML = socialHTML;

        // 2. Load Timeline (Professional Journey)
        const timelineContainer = document.getElementById('timeline-container');
        let timelineHTML = '';
        
        data.timeline.forEach(item => {
            // Generate Tags
            let tagsHTML = '';
            if(item.tags){
                tagsHTML = item.tags.map(tag => `<span class="tag">#${tag}</span>`).join('');
            }
            
            timelineHTML += `
                <div class="info-card fade-in">
                    <div class="card-date">${item.date}</div>
                    <div class="card-details">
                        <h3>${item.title}</h3>
                        <h4>${item.company}</h4>
                        <!-- innerHTML used for parsing bullets/bold tags -->
                        <div class="desc-text">${item.desc}</div>
                        <div class="tags">${tagsHTML}</div>
                    </div>
                </div>
            `;
        });
        timelineContainer.innerHTML = timelineHTML;

        // 3. Load Education
        const eduContainer = document.getElementById('education-container');
        let eduHTML = '';

        data.education.forEach(edu => {
            eduHTML += `
                <div class="edu-card fade-in">
                    <i class="fas fa-graduation-cap edu-icon"></i>
                    <div class="edu-degree">${edu.degree}</div>
                    <div class="edu-major">${edu.major}</div>
                    <div style="color: #ccc; margin-bottom:10px;">${edu.institute}</div>
                    <div class="edu-meta">
                        <span>${edu.year}</span>
                        <span>${edu.result}</span>
                    </div>
                </div>
            `;
        });
        eduContainer.innerHTML = eduHTML;

        // 4. Load Projects
        const projectContainer = document.getElementById('project-container');
        let projectHTML = '';
        
        data.projects.forEach(proj => {
            projectHTML += `
                <a href="${proj.link}" target="_blank" class="project-card fade-in">
                    <div class="p-icon">
                        <i class="${proj.image}"></i>
                    </div>
                    <div class="p-content">
                        <h3>${proj.title}</h3>
                        <p>${proj.desc}</p>
                        <span class="badge-pill">${proj.tech}</span>
                    </div>
                </a>
            `;
        });
        projectContainer.innerHTML = projectHTML;

        // 5. Load Contact Info
        const contactContainer = document.getElementById('contact-info');
        contactContainer.innerHTML = `
            <div class="contact-item"><i class="fas fa-phone"></i> ${data.profile.phone}</div>
            <div class="contact-item"><i class="fas fa-envelope"></i> ${data.profile.email}</div>
            <div class="contact-item"><i class="fas fa-map-marker-alt"></i> ${data.profile.location}</div>
        `;

        // Initialize Animation
        setupAnimations();

    } catch (error) {
        console.error('Error loading data: - script.js:104', error);
        document.getElementById('p-name').textContent = "Error Loading Data";
    }
}

// Scroll Animation Observer
function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Mobile Menu Toggle
document.querySelector('.menu-btn').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Run function
initPortfolio();
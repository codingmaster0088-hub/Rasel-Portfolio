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
        document.getElementById('p-bio').textContent = data.profile.bio;
        
        // Dynamic Roles Loading (Hero)
        const rolesContainer = document.getElementById('p-roles-container');
        rolesContainer.innerHTML = data.profile.roles.map(role => `
            <span class="role-chip"><i class="fas fa-certificate"></i> ${role}</span>
        `).join('');
        
        // Load Social Links
        const socialContainer = document.getElementById('hero-socials');
        socialContainer.innerHTML = data.profile.socials.map(social => `
            <a href="${social.link}" target="_blank" aria-label="Social link"><i class="${social.icon}"></i></a>
        `).join('');

        // 2. Load Core Competencies (Aviation & Tech)
        const aviationSkillsList = document.getElementById('aviation-skills-list');
        aviationSkillsList.innerHTML = data.skills.aviation.map(skill => `
            <li>${skill}</li>
        `).join('');

        const techSkillsList = document.getElementById('tech-skills-list');
        techSkillsList.innerHTML = data.skills.technology.map(skill => `
            <li>${skill}</li>
        `).join('');

        // 3. Load Professional Experience (Timeline)
        const experienceContainer = document.getElementById('experience-container');
        let expHTML = '';
        
        data.experience.forEach(exp => {
            // Map inner sections
            let sectionsHTML = exp.sections.map(sec => `
                <div class="responsibilities-block">
                    <h5>${sec.title}</h5>
                    <ul class="res-list">
                        ${sec.items.map(bullet => `<li>${bullet}</li>`).join('')}
                    </ul>
                </div>
            `).join('');

            // Map Tags
            let tagsHTML = exp.tags.map(tag => `<span class="tag" style="font-size:0.8rem; background:rgba(0,240,255,0.04); border:1px solid rgba(0,240,255,0.1); padding: 4px 10px; border-radius:4px; margin-right:8px; display:inline-block; margin-top:5px; color:#fff;">#${tag}</span>`).join('');

            expHTML += `
                <div class="timeline-event">
                    <div class="timeline-marker">
                        <i class="fas fa-plane-departure"></i>
                    </div>
                    <div class="timeline-content-box">
                        <div class="timeline-header-block">
                            <div class="timeline-role">
                                <h3>${exp.role}</h3>
                                <h4>${exp.company}</h4>
                            </div>
                            <div class="timeline-date-tag">${exp.period}</div>
                        </div>
                        <div class="timeline-body">
                            ${sectionsHTML}
                        </div>
                        <div style="margin-top:20px;">
                            ${tagsHTML}
                        </div>
                    </div>
                </div>
            `;
        });
        experienceContainer.innerHTML = expHTML;

        // 4. Load Licenses & Certifications
        const licensesContainer = document.getElementById('licenses-container');
        licensesContainer.innerHTML = data.licenses.map(lic => `
            <div class="license-chip-card">
                <div class="lic-icon-wrapper">
                    <i class="fas fa-file-signature"></i>
                </div>
                <div class="lic-title">${lic}</div>
            </div>
        `).join('');

        // 5. Load Education
        const eduContainer = document.getElementById('education-container');
        eduContainer.innerHTML = data.education.map(edu => `
            <div class="edu-card">
                <i class="fas fa-graduation-cap edu-icon"></i>
                <div class="edu-degree">${edu.degree}</div>
                <div class="edu-major">${edu.major}</div>
                <div class="edu-inst">${edu.institute}</div>
                <div class="edu-meta">
                    <span>${edu.year} (${edu.duration})</span>
                    <span style="color: #00f0ff; font-weight:bold;">${edu.result}</span>
                </div>
            </div>
        `).join('');

        // 6. Load Projects
        const projectContainer = document.getElementById('project-container');
        projectContainer.innerHTML = data.projects.map(proj => `
            <a href="${proj.link}" target="_blank" class="project-card">
                <div class="p-icon">
                    <i class="${proj.image}"></i>
                </div>
                <div class="p-content">
                    <h3>${proj.title}</h3>
                    <p>${proj.desc}</p>
                    <span class="badge-pill"><i class="fas fa-code-branch"></i> ${proj.tech}</span>
                </div>
            </a>
        `).join('');

        // 7. Load Contact & Personal Information
        const contactContainer = document.getElementById('contact-info');
        contactContainer.innerHTML = `
            <div class="contact-item"><i class="fas fa-phone-alt"></i> ${data.profile.phone}</div>
            <div class="contact-item"><i class="fas fa-envelope"></i> ${data.profile.email}</div>
            <div class="contact-item"><i class="fas fa-map-marker-alt"></i> ${data.profile.location}</div>
        `;

        // Load Personal Grid
        const personalInfoGrid = document.getElementById('personal-info-grid');
        personalInfoGrid.innerHTML = data.personal.details.map(item => `
            <div class="personal-info-item">
                <span class="lbl">${item.label}</span>
                <span class="val">${item.value}</span>
            </div>
        `).join('');

        // Load Languages
        const languagesContainer = document.getElementById('languages-container');
        languagesContainer.innerHTML = data.personal.languages.map(lang => `
            <div class="lang-badge">
                ${lang.name}: <span>${lang.fluency}</span>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading data: ', error);
        document.getElementById('p-name').textContent = "Connection Error";
    }
}

// Mobile Menu Toggle
document.querySelector('.menu-btn').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Run function
initPortfolio();
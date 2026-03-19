// Initial set of successful life projects (if localStorage is empty)
const defaultProjects = [
    {
        title: "Personal Development Journey",
        description: "A comprehensive plan for daily growth, including meditation, reading, and skill-building exercises that transformed my lifestyle.",
        link: "#",
        category: "Growth"
    },
    {
        title: "Community Outreach Program",
        description: "Successfully organized a local initiative that provided resources and support for over 50 families in the neighborhood.",
        link: "#",
        category: "Social"
    },
    {
        title: "Healthy Lifestyle Transformation",
        description: "Documented journey of achieving peak physical health through a balanced diet and consistent training program.",
        link: "#",
        category: "Health"
    },
    {
        title: "Financial Freedom Milestone",
        description: "Strategies and systems implemented to achieve significant financial goals and long-term stability.",
        link: "#",
        category: "Finance"
    },
    {
        title: "Skill Mastery: Coding",
        description: "Successfully mastered web development and built several applications to solve real-world problems.",
        link: "#",
        category: "Career"
    }
];

// Get projects from localStorage or use defaults
function getProjects() {
    const storedProjects = localStorage.getItem('myProjects');
    if (storedProjects) {
        return JSON.parse(storedProjects);
    } else {
        localStorage.setItem('myProjects', JSON.stringify(defaultProjects));
        return defaultProjects;
    }
}

// Function to render projects to the DOM (for index.html)
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return; // Exit if not on the projects page
    
    const projects = getProjects();
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create and append project cards
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        
        // Get domain for logo - using Clearbit for high-quality brand logos (like YouTube)
        let domain = '';
        let logoUrl = project.logo || 'R.png';
        
        if (!project.logo) {
            try {
                domain = new URL(project.link).hostname;
                // Explicitly handle YouTube for best results
                if (domain.includes('youtube.com')) {
                    logoUrl = 'https://www.youtube.com/favicon.ico';
                } else {
                    logoUrl = `https://logo.clearbit.com/${domain}`;
                }
            } catch (e) {
                domain = '';
            }
        }

        projectCard.innerHTML = `
            <div>
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-color); font-weight: 700;">${project.category}</span>
                    <div class="logo-wrapper">
                        <img src="${logoUrl}" 
                             alt="Logo" 
                             class="project-logo" 
                             onerror="this.onerror=null; this.src='https://unavatar.io/${domain}?fallback=https://www.google.com/s2/favicons?sz=64&domain=${domain}'; this.addEventListener('error', function(){this.src='R.png'}, {once: true});">
                    </div>
                </div>
                <h2>${project.title}</h2>
                <p>${project.description}</p>
            </div>
            <a href="${project.link}" class="project-link" target="_blank">View</a>
        `;
        
        container.appendChild(projectCard);
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    
    // Add interactive glow effect
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.body.style.setProperty('--mouse-x', `${x}%`);
        document.body.style.setProperty('--mouse-y', `${y}%`);
    });
});

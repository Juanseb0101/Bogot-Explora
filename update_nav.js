const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\\\Users\\\\juan\\\\Documents\\\\Unad\\\\Aplicaciones Multimedia\\\\BogotáExploraV2';
const files = ['index.html', 'rutas.html', 'experiencias.html', 'gastronomia.html', 'eventos.html', 'calendario.html', 'mapa.html'];

const navTemplate = `            <nav class="main-nav">
                <ul>
                    <li class="dropdown-parent\${descubre_active}">
                        <button aria-haspopup="true" aria-expanded="false" data-i18n="nav.discover">Descubre Bogotá</button>
                        <ul role="menu" class="dropdown-menu">
                            <li\${rutas_active}><a href="rutas.html" data-i18n="nav.routes">Rutas Turísticas</a></li>
                            <li\${experiencias_active}><a href="experiencias.html" data-i18n="nav.experiences">Experiencias Culturales</a></li>
                        </ul>
                    </li>
                    <li\${gastronomia_active}><a href="gastronomia.html" data-i18n="nav.gastronomy">Gastronomía Bogotana</a></li>
                    <li class="dropdown-parent\${eventos_sec_active}">
                        <button aria-haspopup="true" aria-expanded="false" data-i18n="nav.events_section">Eventos</button>
                        <ul role="menu" class="dropdown-menu">
                            <li\${eventos_active}><a href="eventos.html" data-i18n="nav.events">Eventos y Comunidad</a></li>
                            <li\${calendario_active}><a href="calendario.html" data-i18n="nav.calendar">Calendario</a></li>
                        </ul>
                    </li>
                    <li\${mapa_active}><a href="mapa.html" data-i18n="nav.plan" class="nav-map-btn">Planifica tu visita</a></li>
                </ul>
            </nav>`;

for (const f of files) {
    const p = path.join(baseDir, f);
    let content = fs.readFileSync(p, 'utf8');
    
    const descubre_active = (f === 'rutas.html' || f === 'experiencias.html') ? ' active' : '';
    const rutas_active = f === 'rutas.html' ? ' class="active"' : '';
    const experiencias_active = f === 'experiencias.html' ? ' class="active"' : '';
    
    const gastronomia_active = f === 'gastronomia.html' ? ' class="active"' : '';
    
    const eventos_sec_active = (f === 'eventos.html' || f === 'calendario.html') ? ' active' : '';
    const eventos_active = f === 'eventos.html' ? ' class="active"' : '';
    const calendario_active = f === 'calendario.html' ? ' class="active"' : '';
    
    const mapa_active = f === 'mapa.html' ? ' class="active"' : '';
    
    let newNav = navTemplate.replace('\\${descubre_active}', descubre_active)
        .replace('\\${rutas_active}', rutas_active)
        .replace('\\${experiencias_active}', experiencias_active)
        .replace('\\${gastronomia_active}', gastronomia_active)
        .replace('\\${eventos_sec_active}', eventos_sec_active)
        .replace('\\${eventos_active}', eventos_active)
        .replace('\\${calendario_active}', calendario_active)
        .replace('\\${mapa_active}', mapa_active);
        
    content = content.replace(/<nav class="main-nav">[\s\S]*?<\/nav>/, newNav);
    fs.writeFileSync(p, content, 'utf8');
}

const cssPath = path.join(baseDir, 'css', 'style.css');
fs.appendFileSync(cssPath, `

/* ---- Main Nav Dropdown ---- */
.main-nav .dropdown-parent {
    position: relative;
}

.main-nav .dropdown-parent > button {
    background: none;
    border: none;
    color: inherit;
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0;
    transition: color var(--transition-fast);
}

.main-nav .dropdown-parent > button::after {
    content: '';
    display: inline-block;
    border: solid currentColor;
    border-width: 0 2px 2px 0;
    padding: 2.5px;
    transform: translateY(-2px) rotate(45deg);
    transition: transform var(--transition-fast);
    margin-left: 2px;
}

.main-nav .dropdown-parent.open > button::after,
.main-nav .dropdown-parent:hover > button::after {
    transform: translateY(2px) rotate(-135deg);
}

.main-nav .dropdown-parent > button:hover {
    color: var(--color-accent);
}

.main-nav .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: var(--color-bg);
    min-width: 220px;
    padding: 0.5rem 0;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: opacity var(--transition-fast), transform var(--transition-fast), visibility var(--transition-fast);
    display: flex;
    flex-direction: column;
    gap: 0;
    z-index: 1000;
}

.main-nav .dropdown-parent:hover .dropdown-menu,
.main-nav .dropdown-parent.open .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.main-nav .dropdown-menu li {
    width: 100%;
}

.main-nav .dropdown-menu a {
    display: block;
    padding: 0.75rem 1.5rem;
    color: var(--color-text-dark);
    font-size: 0.9rem;
    font-weight: 400;
    text-align: left;
}

.main-nav .dropdown-menu a:hover {
    background-color: rgba(10, 61, 47, 0.05);
    color: var(--color-primary);
}

/* Active State */
.main-nav li.active > a,
.main-nav li.active > button {
    color: var(--color-accent);
}

.main-nav .dropdown-menu li.active > a {
    background-color: rgba(232, 185, 35, 0.1);
    color: var(--color-primary);
    font-weight: 600;
}

/* Mobile Nav Adjustments */
@media (max-width: 992px) {
    .main-nav .dropdown-menu {
        position: static;
        box-shadow: none;
        opacity: 1;
        visibility: visible;
        transform: none;
        display: none;
        padding-left: 1rem;
        padding-top: 0.5rem;
        background-color: transparent;
        min-width: 100%;
    }
    
    .main-nav .dropdown-parent.open .dropdown-menu {
        display: flex;
    }

    .main-nav .dropdown-parent:hover .dropdown-menu {
        display: none;
    }
    
    .main-nav .dropdown-parent.open:hover .dropdown-menu {
        display: flex;
    }
}
`, 'utf8');

const transPath = path.join(baseDir, 'js', 'translations.js');
let transContent = fs.readFileSync(transPath, 'utf8');
transContent = transContent.replace(
    '"nav.map": "Mapa",',
    '"nav.map": "Mapa",\\n      "nav.discover": "Descubre Bogotá",\\n      "nav.events_section": "Eventos",\\n      "nav.plan": "Planifica tu visita",'
);
transContent = transContent.replace(
    '"nav.map": "Map",',
    '"nav.map": "Map",\\n      "nav.discover": "Discover Bogotá",\\n      "nav.events_section": "Events",\\n      "nav.plan": "Plan your visit",'
);
fs.writeFileSync(transPath, transContent, 'utf8');

const mainPath = path.join(baseDir, 'js', 'main.js');
let mainContent = fs.readFileSync(mainPath, 'utf8');
mainContent = mainContent.replace(
    'initFooter();',
    'initFooter();\\n    initDropdowns();'
);

mainContent += `

// Dropdown interaction logic
function initDropdowns() {
    const dropdownParents = document.querySelectorAll('.main-nav .dropdown-parent');
    
    dropdownParents.forEach(parent => {
        const button = parent.querySelector('button');
        const menu = parent.querySelector('.dropdown-menu');
        const links = menu.querySelectorAll('a');
        
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = parent.classList.contains('open');
            
            dropdownParents.forEach(p => {
                p.classList.remove('open');
                p.querySelector('button').setAttribute('aria-expanded', 'false');
            });
            
            if (!isOpen) {
                parent.classList.add('open');
                button.setAttribute('aria-expanded', 'true');
            }
        });
        
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isOpen = parent.classList.contains('open');
                
                if (!isOpen) {
                    parent.classList.add('open');
                    button.setAttribute('aria-expanded', 'true');
                    if (links.length > 0) links[0].focus();
                } else {
                    parent.classList.remove('open');
                    button.setAttribute('aria-expanded', 'false');
                }
            } else if (e.key === 'Escape') {
                parent.classList.remove('open');
                button.setAttribute('aria-expanded', 'false');
                button.focus();
            }
        });
        
        menu.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                parent.classList.remove('open');
                button.setAttribute('aria-expanded', 'false');
                button.focus();
            }
        });
        
        links.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (index < links.length - 1) links[index + 1].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (index > 0) links[index - 1].focus();
                    else button.focus();
                }
            });
        });
    });
    
    document.addEventListener('click', (e) => {
        dropdownParents.forEach(parent => {
            if (!parent.contains(e.target)) {
                parent.classList.remove('open');
                const btn = parent.querySelector('button');
                if(btn) btn.setAttribute('aria-expanded', 'false');
            }
        });
    });
}
`;

fs.writeFileSync(mainPath, mainContent, 'utf8');

console.log('Done');

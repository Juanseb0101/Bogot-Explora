// main.js

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initWeather();
    initI18n();
    initHeaderScroll();
});

// Update Bogotá Time
function initClock() {
    const timeElement = document.getElementById('current-time');
    if (!timeElement) return;

    function updateTime() {
        const now = new Date();
        const options = {
            timeZone: 'America/Bogota',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        timeElement.textContent = formatter.format(now);
    }
    
    updateTime();
    setInterval(updateTime, 60000);
}

// Mock Weather (18°C)
function initWeather() {
    const tempElement = document.getElementById('current-temp');
    if (tempElement) {
        tempElement.innerHTML = '18&deg;C';
    }
}

// Initialize i18next
function initI18n() {
    const resources = {
        es: {
            translation: {
                "nav.routes": "Rutas Turísticas",
                "nav.experiences": "Experiencias Culturales",
                "nav.gastronomy": "Gastronomía Bogotana",
                "nav.events": "Eventos y Comunidad",
                "nav.calendar": "Calendario",
                "nav.map": "Mapa",
                "hero.subtitle": "EXPLORA, VIVE, REGRESA",
                "hero.title": "Descubriendo Bogotá: experiencias auténticas que transforman viajes",
                "hero.stats": "+1.9 Millones de visitantes internacionales en 2025 • 56% por cultura y gastronomía • Principal destino urbano de Sudamérica",
                "hero.btn": "Comienza tu aventura en Bogotá →"
            }
        },
        en: {
            translation: {
                "nav.routes": "Touristic Routes",
                "nav.experiences": "Cultural Experiences",
                "nav.gastronomy": "Bogotá Gastronomy",
                "nav.events": "Events & Community",
                "nav.calendar": "Calendar",
                "nav.map": "Map",
                "hero.subtitle": "EXPLORE, LIVE, RETURN",
                "hero.title": "Discovering Bogotá: authentic experiences that transform journeys",
                "hero.stats": "+1.9 Million international visitors in 2025 • 56% for culture and gastronomy • Main urban destination in South America",
                "hero.btn": "Start your adventure in Bogotá →"
            }
        }
    };

    i18next.init({
        lng: 'es',
        fallbackLng: 'es',
        resources
    }, function(err, t) {
        if (err) return console.error(err);
        updateContent();
    });

    const langSelector = document.getElementById('lang-selector');
    if (langSelector) {
        langSelector.addEventListener('change', (e) => {
            i18next.changeLanguage(e.target.value, () => {
                updateContent();
            });
        });
    }
}

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18next.t(key);
    });
}

function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// main.js

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initWeather();
    initI18n();
    initHeaderScroll();
    initFooter();
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
    const savedLng = localStorage.getItem('appLang') || 'es';

    i18next.init({
        lng: savedLng,
        fallbackLng: 'es',
        resources: window.i18nResources || {}
    }, function(err, t) {
        if (err) return console.error(err);
        updateContent();
    });

    const langSelectors = document.querySelectorAll('#lang-selector');
    langSelectors.forEach(langSelector => {
        langSelector.value = savedLng;
        langSelector.addEventListener('change', (e) => {
            const newLng = e.target.value;
            localStorage.setItem('appLang', newLng);
            i18next.changeLanguage(newLng, () => {
                updateContent();
                
                // If there's an active modal with specific translation logic, we need to refresh it.
                // Alternatively, we could attach a custom event.
                window.dispatchEvent(new Event('languageChanged'));
            });
        });
    });
}

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18next.t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = i18next.t(key);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        element.title = i18next.t(key);
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

function initFooter() {
    // No inyectar el footer en la página del mapa
    if (window.location.pathname.includes('mapa.html')) return;

    const footerHTML = `
    <footer class="site-footer">
        <div class="container footer-container">
            <div class="footer-top">
                <div class="footer-brand">
                    <a href="index.html">
                        <img src="assets/images/Front/logo.jpg" alt="Bogotá Explora" class="footer-logo">
                    </a>
                </div>
                <div class="footer-links-wrapper">
                    <div class="footer-col">
                        <h4 data-i18n="footer.col1.title">Explora Bogotá</h4>
                        <ul>
                            <li><a href="rutas.html" data-i18n="nav.routes">Rutas Turísticas</a></li>
                            <li><a href="experiencias.html" data-i18n="nav.experiences">Experiencias Culturales</a></li>
                            <li><a href="gastronomia.html" data-i18n="nav.gastronomy">Gastronomía Bogotana</a></li>
                            <li><a href="eventos.html" data-i18n="nav.events">Eventos y Comunidad</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4 data-i18n="footer.col2.title">Planifica tu Viaje</h4>
                        <ul>
                            <li><a href="https://visitbogota.co/es/" target="_blank" rel="noopener" data-i18n="footer.col2.link1">Visita Bogotá</a></li>
                            <li><a href="mapa.html" data-i18n="footer.col2.link2">Mapa Interactivo</a></li>
                            <li><a href="https://visitbogota.co/es/informacion-al-viajero" target="_blank" rel="noopener" data-i18n="footer.col2.link3">Información al viajero</a></li>
                            <li><a href="https://www.capitalgraffititours.com/" target="_blank" rel="noopener" data-i18n="footer.col2.link4">Reservas y Tours</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4 data-i18n="footer.col3.title">Comunidad Local</h4>
                        <ul>
                            <li><a href="https://bogota.gov.co/que-hacer/agenda-cultural" target="_blank" rel="noopener" data-i18n="footer.col3.link1">Agenda Cultural</a></li>
                            <li><a href="https://visitbogota.co/es/experiencias-turisticas/encuentra-tu-plan?categories=246" target="_blank" rel="noopener" data-i18n="footer.col3.link2">Alojamiento</a></li>
                            <li><a href="https://visitbogota.co/es/blog" target="_blank" rel="noopener" data-i18n="footer.col3.link3">Blog y Tips</a></li>
                            <li><a href="https://visitbogota.co/es/explora/teatros/210" target="_blank" rel="noopener" data-i18n="footer.col3.link4">Únete a la Comunidad</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4 data-i18n="footer.col4.title">Soporte y Legal</h4>
                        <ul>
                            <li><a href="#" data-i18n="footer.col4.link1">Contacto</a></li>
                            <li><a href="#" data-i18n="footer.col4.link2">Preguntas Frecuentes</a></li>
                            <li><a href="#" data-i18n="footer.col4.link3">Términos de Uso</a></li>
                            <li><a href="#" data-i18n="footer.col4.link4">Política de Privacidad</a></li>
                            <li><a href="#" data-i18n="footer.col4.link5">Accesibilidad</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="footer-copy">
                    <p data-i18n="footer.copy">© Bogotá Explora 2026. Todos los derechos reservados. Todos los tours y experiencias son promovidos con responsabilidad y sostenibilidad.</p>
                </div>
                <div class="footer-socials">
                    <a href="https://www.facebook.com/visitbogota.co/" target="_blank" rel="noopener" aria-label="Facebook">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="https://www.instagram.com/visitbogota.co" target="_blank" rel="noopener" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="https://x.com/visitbogotaco" target="_blank" rel="noopener" aria-label="X (Twitter)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                    </a>
                    <a href="https://www.youtube.com/channel/UC_qgv3BFpK3EhqBPL0iR2IQ" target="_blank" rel="noopener" aria-label="YouTube">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l6.5 3.27-6.5 3.27z"></path></svg>
                    </a>
                </div>
            </div>
        </div>
    </footer>`;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
    // Refresh i18n translations on the newly injected footer
    if (window.i18next && i18next.isInitialized) {
        updateContent();
    }
}

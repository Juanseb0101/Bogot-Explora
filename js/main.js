// main.js

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initWeather();
    initI18n();
    initHeaderScroll();
    initFooter();
    initDropdowns(); // WCAG - inicializar accesibilidad de dropdowns
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
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4 data-i18n="footer.col4.title">Soporte y Legal</h4>
                        <ul>
                            <li><a href="creditos.html" data-i18n="credits.title">Créditos y fuentes</a></li>
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

// ============================================================
// WCAG - Dropdown Navigation Accesible
// Patrón: WAI-ARIA Disclosure Navigation Menu
// Criterios cubiertos: 2.1.1, 2.1.2, 2.4.3, 2.4.7, 4.1.2
// ============================================================
function initDropdowns() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;

    // WCAG - Referencias únicas a todos los botones padre de dropdown
    const dropdownButtons = Array.from(
        nav.querySelectorAll('.dropdown-parent > button')
    );

    // WCAG - Asegurar tabindex=-1 en todos los ítems hijos al cargar
    nav.querySelectorAll('.dropdown-menu [role="menuitem"]').forEach(item => {
        item.setAttribute('tabindex', '-1');
    });

    // ----------------------------------------------------------
    // WCAG - Helpers: abrir / cerrar un dropdown
    // ----------------------------------------------------------

    /**
     * Abre el dropdown asociado al botón dado.
     * @param {HTMLButtonElement} btn - Botón padre del dropdown
     */
    function openDropdown(btn) {
        const parent = btn.closest('.dropdown-parent');
        if (!parent) return;
        parent.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        // WCAG - Hacer accesibles los ítems hijos vía teclado
        const menuItems = getMenuItems(btn);
        menuItems.forEach(item => item.setAttribute('tabindex', '0'));
    }

    /**
     * Cierra el dropdown asociado al botón dado.
     * @param {HTMLButtonElement} btn - Botón padre del dropdown
     * @param {boolean} [returnFocus=false] - Si true, devuelve el foco al botón
     */
    function closeDropdown(btn, returnFocus = false) {
        const parent = btn.closest('.dropdown-parent');
        if (!parent) return;
        parent.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        // WCAG - Quitar los ítems hijos del flujo de Tab al cerrarse
        const menuItems = getMenuItems(btn);
        menuItems.forEach(item => item.setAttribute('tabindex', '-1'));
        if (returnFocus) btn.focus();
    }

    /**
     * Cierra todos los dropdowns abiertos.
     * @param {boolean} [returnFocus=false]
     */
    function closeAll(returnFocus = false) {
        dropdownButtons.forEach(btn => {
            if (btn.getAttribute('aria-expanded') === 'true') {
                closeDropdown(btn, returnFocus);
            }
        });
    }

    /**
     * Devuelve el NodeList de ítems [role="menuitem"] del dropdown
     * controlado por el botón.
     * @param {HTMLButtonElement} btn
     * @returns {Element[]}
     */
    function getMenuItems(btn) {
        const menuId = btn.getAttribute('aria-controls');
        if (!menuId) return [];
        const menu = document.getElementById(menuId);
        if (!menu) return [];
        return Array.from(menu.querySelectorAll('[role="menuitem"]'));
    }

    // ----------------------------------------------------------
    // WCAG - Event Delegation desde el <nav>
    // Captura clic, keydown en botones padre e ítems hijo
    // ----------------------------------------------------------
    nav.addEventListener('keydown', (e) => {
        const target = e.target;

        // --- Teclas sobre el botón padre del dropdown ---
        if (target.matches('.dropdown-parent > button')) {
            const isExpanded = target.getAttribute('aria-expanded') === 'true';
            const menuItems = getMenuItems(target);

            switch (e.key) {
                case 'Enter':
                case ' ': // WCAG - Enter/Space: abrir y enfocar primer ítem
                    e.preventDefault();
                    if (isExpanded) {
                        closeDropdown(target, true);
                    } else {
                        closeAll();
                        openDropdown(target);
                        if (menuItems.length) menuItems[0].focus();
                    }
                    break;

                case 'ArrowDown': // WCAG - Flecha abajo: abrir y enfocar primer ítem
                    e.preventDefault();
                    closeAll();
                    openDropdown(target);
                    if (menuItems.length) menuItems[0].focus();
                    break;

                case 'ArrowUp': // WCAG - Flecha arriba: abrir y enfocar último ítem
                    e.preventDefault();
                    closeAll();
                    openDropdown(target);
                    if (menuItems.length) menuItems[menuItems.length - 1].focus();
                    break;

                case 'Escape': // WCAG - Escape: cerrar y volver al botón
                    e.preventDefault();
                    closeDropdown(target, true);
                    break;
            }
            return;
        }

        // --- Teclas dentro de un ítem hijo [role="menuitem"] ---
        if (target.matches('.dropdown-menu [role="menuitem"]')) {
            // Encontrar el botón padre del dropdown que contiene este ítem
            const parentDropdown = target.closest('.dropdown-parent');
            if (!parentDropdown) return;
            const parentBtn = parentDropdown.querySelector(':scope > button');
            if (!parentBtn) return;
            const menuItems = getMenuItems(parentBtn);
            const currentIndex = menuItems.indexOf(target);

            switch (e.key) {
                case 'ArrowDown': // WCAG - Flecha abajo: siguiente ítem (cíclico)
                    e.preventDefault();
                    menuItems[(currentIndex + 1) % menuItems.length].focus();
                    break;

                case 'ArrowUp': // WCAG - Flecha arriba: ítem anterior (cíclico)
                    e.preventDefault();
                    menuItems[(currentIndex - 1 + menuItems.length) % menuItems.length].focus();
                    break;

                case 'Home': // WCAG - Home: primer ítem
                    e.preventDefault();
                    menuItems[0].focus();
                    break;

                case 'End': // WCAG - End: último ítem
                    e.preventDefault();
                    menuItems[menuItems.length - 1].focus();
                    break;

                case 'Escape': // WCAG - Escape: cerrar y volver al botón padre
                    e.preventDefault();
                    closeDropdown(parentBtn, true);
                    break;

                case 'Tab': // WCAG - Tab/Shift+Tab: cerrar dropdown al salir
                    closeDropdown(parentBtn, false);
                    break;
            }
            return;
        }
    });

    // WCAG - Clic en el botón padre: abrir/cerrar con teclado+ratón
    nav.addEventListener('click', (e) => {
        const btn = e.target.closest('.dropdown-parent > button');
        if (!btn) return;
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        // Cerrar todos los demás antes de abrir el actual
        dropdownButtons.forEach(b => {
            if (b !== btn) closeDropdown(b);
        });
        if (isExpanded) {
            closeDropdown(btn);
        } else {
            openDropdown(btn);
        }
    });

    // WCAG - Clic fuera del nav: cerrar todos los dropdowns
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            closeAll();
        }
    });

    // WCAG - Foco sale del nav por Tab (focusout en el nav)
    // Cierra el dropdown cuando el foco sale completamente del nav
    nav.addEventListener('focusout', (e) => {
        // relatedTarget es el elemento que RECIBE el foco
        // Si el nuevo foco está fuera del nav, cerramos todos
        if (!nav.contains(e.relatedTarget)) {
            closeAll();
        }
    });
}

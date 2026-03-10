// rutas-modals.js

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the routes page by looking for the route details modal
    const routeDetailsModal = document.getElementById('route-details-modal');
    if (!routeDetailsModal) return;

    const routeMapModal = document.getElementById('route-map-modal');

    // UI Elements for Details Modal
    const rmImg = document.getElementById('rm-img');
    const rmTitle = document.getElementById('rm-title');
    const rmDesc = document.getElementById('rm-desc');
    const rmDuration = document.getElementById('rm-duration');
    const rmPrice = document.getElementById('rm-price');
    const rmHowTo = document.getElementById('rm-howto');
    const rmRecs = document.getElementById('rm-recs');
    const btnMap = document.getElementById('rm-btn-map');

    // UI Elements for Map Modal
    const rmMapTitle = document.getElementById('rm-map-title');
    const btnBack = document.getElementById('rm-btn-back');
    const mapContainerId = 'rm-leaflet-map';

    let activeRouteData = null;
    let modalLeafletMap = null;
    let mapMarker = null;

    // Data for the routes
    const routesData = {
        'monserrate': {
            title: 'Subida a Monserrate',
            desc: 'Sube por el sendero peatonal o utiliza el teleférico/funicular para llegar a la cima del cerro tutelar de Bogotá. Disfruta de la mejor vista panorámica de la ciudad y de la oferta gastronómica del santuario.',
            duration: '3 horas',
            price: 'Aprox. $30.000 COP (transporte)',
            howto: 'Opción fácil (recomendada): Teleférico o funicular (ida y vuelta).Reserva online en monserrate.co (evitas filas de hasta 1 hora).\n Opción gratis y deportiva: Sendero peatonal (subida gratis).Abierto miércoles a lunes de 5:00 a.m. a 1:00 p.m. (martes cerrado por mantenimiento).',
            recs: 'Lleva ropa cómoda, tenis con buen agarre, agua y protector solar.\n Mejor hora: después de las 3 p.m. (menos gente y atardecer espectacular).\nEvita subir caminando si tienes problemas cardíacos o de altura.\nPrecio aproximado: Ida y vuelta $35.000–$38.000 COP (~$8–9 USD).',
            image: 'assets/images/Rutas/Monserrate2.jpg',
            lat: 4.6058,
            lng: -74.0556
        },
        'candelaria': {
            title: 'Caminata por La Candelaria',
            desc: 'Recorre las calles empedradas del centro histórico. Conoce la historia colonial, admira la arquitectura colorida y visita lugares emblemáticos como la Plaza del Chorro de Quevedo y el Teatro Colón.',
            duration: '2.5 horas',
            price: 'Gratis (recorrido libre)',
            howto: 'Free Walking Tour (propina voluntaria): Salen todos los días a las 10 a.m. y 2 p.m. desde Plaza de Bolívar (no necesitas reservar, pero llega 15 min antes).Tour guiado privado o en grupo pequeño: Reserva en GetYourGuide, Civitatis o GuruWalk (2–3 horas).',
            recs: 'Ve siempre con guía (el centro es seguro de día, pero mejor acompañado).Usa zapatos cómodos (calles empedradas).Mejor en la mañana. Evita joyas y lleva solo lo necesario.Precio: Free tour ≈ $20.000–$30.000 COP de propina / Tour guiado $45.000–$70.000 COP.',
            image: 'assets/images/Rutas/LaCandelaria.jpg',
            lat: 4.5977,
            lng: -74.0694
        },
        'dorada': {
            title: 'Museo del Oro',
            desc: 'Un viaje a través de la historia precolombina. Inicia en el Museo del Oro, admirando la colección de orfebrería prehispánica más grande del mundo, y continúa por el Parque Santander y la iglesia de San Francisco.',
            duration: '4 horas',
            price: 'Aprox. $5.000 COP (entrada al museo)',
            howto: 'Compra boleta en taquilla o online (recomendado).Abierto martes a sábado 9 a.m. – 5 p.m., domingos 10 a.m. – 4 p.m. (lunes cerrado).',
            recs: 'Reserva con anticipación los fines de semana.Usa audioguía (incluida en español e inglés).Combínalo con una caminata por La Candelaria el mismo día.Precio: $7.000 COP adultos (~$1.7 USD) / Gratis para menores y domingos.',
            image: 'assets/images/Rutas/MuseodelOro2.jpg',
            lat: 4.6019,
            lng: -74.0719
        },
        'graffiti': {
            title: 'Graffiti Tour Centro',
            desc: 'Descubre por qué Bogotá es considerada una de las capitales mundiales del arte urbano. Recorre los murales de La Candelaria y entiende las historias y contexto social detrás de cada obra.',
            duration: '2 horas',
            price: 'Donación voluntaria (propina recomendada)',
            howto: 'Tours guiados de 2–3 horas (Capital Graffiti Tours, Hansa Tours o Free Tour).Reserva obligatoria por WhatsApp o página web.',
            recs: 'Elige el tour diurno (más seguro y con mejor luz).Lleva cámara o celular con buena batería.Precio: $50.000–$80.000 COP (~$12–19 USD).',
            image: 'assets/images/Rutas/Tour.png',
            lat: 4.6013,
            lng: -74.0688
        },
        'usaquen': {
            title: 'Tarde en Usaquén',
            desc: 'Explora este pintoresco barrio colonial que solía ser un pueblo a las afueras de Bogotá. Si vas en domingo, podrás disfrutar del famoso Mercado de las Pulgas, música en vivo y artesanías locales.',
            duration: '3 horas',
            price: 'Gratis (recorrido libre)',
            howto: 'Solo llegar. No necesita reservación.Mejor día: domingo de 9:30 a.m. a 5:30 p.m.',
            recs: 'Llega temprano para evitar multitudes.Regatea con respeto (es tradición).Prueba arepas, obleas y jugos naturales.Combínalo con un almuerzo en el Parque de Usaquén.',
            imagen: 'assets/images/Rutas/Usaquen.jpg',
            lat: 4.6953,
            lng: -74.0321
        },
        'mercados': {
            title: 'Mercados de Bogotá',
            desc: 'Sumérgete en los colores y sabores de Colombia en la Plaza de Paloquemao. Prueba frutas exóticas, conoce la gran variedad de flores y desayuna un auténtico caldo de costilla bogotano.',
            duration: '3.5 horas',
            price: '$20.000 - $40.000 COP para degustaciones',
            howto: 'Solo llegar. Abierto todos los días desde las 5 a.m.Mejor día: viernes o sábado (más movimiento).',
            recs: 'Llega temprano (6–8 a.m.) para ver la frescura máxima.Prueba frutas que nunca has visto (curuba, lulo, granadilla, pitahaya).Lleva efectivo y bolsa reutilizable.Ve con guía la primera vez (hay tours gastronómicos de 3 horas).',
            image: 'assets/images/Rutas/Mercado.jpg',
            lat: 4.6158,
            lng: -74.0850
        }
    };

    // Card click listeners
    const cards = document.querySelectorAll('.card[data-id]');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const data = routesData[id];
            if (data) {
                openDetailsModal(data);
            }
        });
    });

    function openDetailsModal(data) {
        activeRouteData = data;

        // Populate data
        rmImg.src = data.image;
        rmImg.alt = data.title;
        rmTitle.textContent = data.title;
        rmDesc.textContent = data.desc;
        rmDuration.textContent = data.duration;
        rmPrice.textContent = data.price;
        rmHowTo.textContent = data.howto;
        rmRecs.textContent = data.recs;

        // Show modal
        routeDetailsModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }

    function closeDetailsModal() {
        routeDetailsModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMapModal() {
        if (!activeRouteData) return;

        // Hide details modal, show map modal
        routeDetailsModal.classList.remove('active');
        routeMapModal.classList.add('active');

        rmMapTitle.textContent = `Mapa: ${activeRouteData.title}`;

        // Initialize or update map
        setTimeout(() => {
            const coords = [activeRouteData.lat, activeRouteData.lng];

            if (!modalLeafletMap) {
                modalLeafletMap = L.map(mapContainerId).setView(coords, 15);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; OpenStreetMap contributors'
                }).addTo(modalLeafletMap);

                mapMarker = L.marker(coords).addTo(modalLeafletMap);
            } else {
                modalLeafletMap.setView(coords, 15);
                mapMarker.setLatLng(coords);
            }

            // Required for maps inside modals so they render correctly
            modalLeafletMap.invalidateSize();
            mapMarker.bindPopup(`<b>${activeRouteData.title}</b>`).openPopup();

        }, 300); // 300ms matches the CSS transition time to ensure modal is visible
    }

    function closeMapModalToDetails() {
        routeMapModal.classList.remove('active');
        routeDetailsModal.classList.add('active');
    }

    function closeAllModals() {
        routeDetailsModal.classList.remove('active');
        routeMapModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners for buttons
    btnMap.addEventListener('click', openMapModal);
    btnBack.addEventListener('click', closeMapModalToDetails);

    // Close buttons (X)
    const closeBtns = document.querySelectorAll('.route-modal-close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Close on background click
    [routeDetailsModal, routeMapModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
});

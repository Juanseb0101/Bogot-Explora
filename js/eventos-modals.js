// eventos-modals.js

document.addEventListener('DOMContentLoaded', () => {
    const eventDetailsModal = document.getElementById('event-details-modal');
    if (!eventDetailsModal) return;

    const eventMapModal = document.getElementById('event-map-modal');

    // UI Elements for Details Modal
    const evImg = document.getElementById('ev-img');
    const evTitle = document.getElementById('ev-title');
    const evDesc = document.getElementById('ev-desc');
    const evDuration = document.getElementById('ev-duration');
    const evPrice = document.getElementById('ev-price');
    const evHowTo = document.getElementById('ev-howto');
    const evRecs = document.getElementById('ev-recs');
    const btnMap = document.getElementById('ev-btn-map');

    // UI Elements for Map Modal
    const evMapTitle = document.getElementById('ev-map-title');
    const btnBack = document.getElementById('ev-btn-back');
    const mapContainerId = 'ev-leaflet-map';

    let activeEventData = null;
    let activeEventId = null;
    let modalLeafletMap = null;
    let mapMarker = null;

    // Events Data with Placeholders
    const eventsData = {
        'rock': {
            title: 'Rock al Parque',
            desc: 'En 2026 celebra sus 30 años con bandas locales, nacionales e internacionales en el Parque Simón Bolívar. Tres días de música, energía y fiesta al aire libre.',
            duration: '3 Días (Fin de Semana)',
            price: 'Entrada Gratuita',
            howto: 'Entrada gratuita.No requiere reserva. Solo llegas temprano para conseguir buen puesto.Fechas confirmadas 2026: Octubre (días exactos se anuncian en junio-julio).Horario aproximado: Viernes, sábado y domingo desde las 12:00 m.',
            recs: 'Llega desde las 10 a.m. para buen lugar.Lleva protector solar, agua y ropa cómoda.Usa transporte público o bici (el parque se llena).Precio: Gratis.',
            image: 'assets/images/Eventos/rock2.jpg',
            lat: 4.6582, // Parque Simón Bolívar
            lng: -74.0883
        },
        'picnic': {
            title: 'Festival Estéreo Picnic',
            desc: 'El Festival Estéreo Picnic (FEP) es el evento de música alternativa y cultura pop más grande de Colombia y uno de los más importantes de Latinoamérica. La edición de 2026 marca su 15º aniversario y se llevará a cabo los días 20, 21 y 22 de marzo',
            duration: '4 Días (Marzo/Abril)',
            price: 'Desde $400.000 COP ($100 USD) por día',
            howto: 'Reserva obligatoria (boletas se agotan rápido).Compra en Ticketmaster o sitio oficial.Fechas confirmadas 2026: 20, 21 y 22 de marzo.Entradas generales y VIP disponibles desde septiembre 2025.',
            recs: 'Compra en preventa (más barata).Lleva protector solar, impermeable ligero y calzado cómodo.Usa el transporte oficial del festival.Precio aproximado: General 3 días ~$350.000–$450.000 COP | VIP más alto.',
            image: 'assets/images/Eventos/picnic2.jpg',
            lat: 4.6582, // Simón Bolívar
            lng: -74.0883
        },
        'fiav': {
            title: 'Festival Iberoamericano de Artes Vivas',
            desc: 'El Festival Internacional de Artes Vivas (FIAV) Bogotá 2026 se celebrará del 27 de marzo al 5 de abril de 2026, convirtiendo a la ciudad en un escenario global de teatro, danza, circo y performance. Esta segunda edición destaca por la unión de talento internacional (ej. Tao Dance Theater) y nacional, con funciones en espacios convencionales y públicos. ',
            duration: 'Aprox. 2 Semanas de funciones',
            price: 'Variables. También hay obras de calle gratuitas.',
            howto: 'La mayoría de espectáculos son gratuitos.Algunos requieren boleta (compra en Tuboleta o en taquilla del lugar).Fechas confirmadas 2026: 27 de marzo al 5 de abril.No necesitas reserva para la mayoría de eventos callejeros.',
            recs: 'Revisa la programación oficial en fiavbogota.com.Llega temprano a los espacios cerrados.Usa transporte público (muchos eventos en diferentes localidades).Precio: La mayoría Gratis | Algunos ~$20.000–$40.000 COP.',
            image: 'assets/images/Eventos/fiav2.jpg',
            lat: 4.6010, // Teatro Colón as epicenter
            lng: -74.0754
        },
        'septimazo': {
            title: 'El Septimazo',
            desc: 'Durante el recorrido por la carrera Séptima entre calles 10 y 24, podrás conocer la histórica y colonial localidad de La Candelaria y la localidad de Santa Fe. Este corredor reúne múltiples actividades',
            duration: 'Variable (Normalmente viernes en la tarde/noche)',
            price: 'Gratis. Propinas para artistas callejeros y compras.',
            howto: 'Solo llegar. No requiere reserva.Todos los viernes desde las 6:00 p.m. en adelante (desde Plaza de Bolívar hasta calle 26 aprox.).',
            recs: 'Ve en grupo y con poco dinero en efectivo.Prueba comida callejera mientras caminas.Evita llevar objetos de valor.Precio: Gratis.',
            image: 'assets/images/Eventos/septimazo.png',
            lat: 4.6015, // Carrera Séptima center
            lng: -74.0722
        },
        'ciclovia': {
            title: 'Ciclovía Dominical',
            desc: 'Recuerda que nuestra Ciclovía funciona todos los domingos y festivos, de 7:00 a.m. a 2:00 p.m. ¡Ven y disfruta de la Ciclovía Recreativa más antigua del mundo, con 50 años de historia.!',
            duration: '7:00 a.m. a 2:00 p.m.',
            price: 'Gratis.',
            howto: 'Solo llegar. No requiere reserva.Todos los domingos y festivos de 7:00 a.m. a 2:00 p.m.',
            recs: 'Lleva bicicleta, casco y agua.Usa los puntos de alquiler de bicicletas si no tienes.Participa en las actividades gratuitas (yoga, baile, etc.).Precio: Gratis.',
            image: 'assets/images/Eventos/ciclovia.jpeg',
            lat: 4.6295, // Carrera 7 Parkway as a good reference
            lng: -74.0673
        },
        'arte': {
            title: 'Ferias de Arte Local',
            desc: '«Más Cultura Local» es un programa de Bogotá (2025-2026) que transforma barrios en escenarios culturales con eventos gratuitos como ferias, shows de magia, talleres literarios y recorridos ecológicos. Impulsa la economía cultural mediante estímulos económicos y proyectos artísticos en las 20 localidades, conectando el talento barrial con la comunidad. ',
            duration: '1 a 3 días dependiendo de la feria',
            price: 'Variable. MUCHAS de acceso gratuito.',
            howto: 'Solo llegar a los eventos de tu localidad o consulta la agenda.La mayoría son gratuitos y se anuncian mensualmente.',
            recs: 'Revisa la agenda oficial en bogota.gov.co o “Más Cultura Local”.Ve con familia o amigos.Precio: Gratis en la mayoría.',
            image: 'assets/images/Eventos/cultura2.png',
            lat: 4.6644, // Barrio San Felipe (Distrito del arte)
            lng: -74.0658
        }
    };

    // Add click event to cards
    const cards = document.querySelectorAll('.card[data-id]');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const data = eventsData[id];
            if (data) {
                openModal(id, data);
            }
        });
    });

    function openModal(id, data) {
        activeEventData = data;
        activeEventId = id;

        evImg.src = data.image;
        evImg.alt = i18next.t(`ev.${id}.title`);
        
        evTitle.setAttribute('data-i18n', `ev.${id}.title`);
        evTitle.textContent = i18next.t(`ev.${id}.title`);
        
        evDesc.setAttribute('data-i18n', `ev.${id}.desc`);
        evDesc.textContent = i18next.t(`ev.${id}.desc`);
        
        evDuration.setAttribute('data-i18n', `ev.${id}.duration`);
        evDuration.textContent = i18next.t(`ev.${id}.duration`);
        
        evPrice.setAttribute('data-i18n', `ev.${id}.price`);
        evPrice.textContent = i18next.t(`ev.${id}.price`);
        
        evHowTo.setAttribute('data-i18n', `ev.${id}.howto`);
        evHowTo.textContent = i18next.t(`ev.${id}.howto`);
        
        evRecs.setAttribute('data-i18n', `ev.${id}.recs`);
        evRecs.textContent = i18next.t(`ev.${id}.recs`);



        eventDetailsModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop scrolling
    }

    function closeModal() {
        eventDetailsModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMapModal() {
        if (!activeEventData) return;

        // Hide details modal, show map modal
        eventDetailsModal.classList.remove('active');
        eventMapModal.classList.add('active');

        evMapTitle.textContent = i18next.t('modal.mapTitle') + i18next.t(`ev.${activeEventId}.title`);

        // Initialize or update map
        setTimeout(() => {
            const coords = [activeEventData.lat, activeEventData.lng];

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

            modalLeafletMap.invalidateSize();
            mapMarker.bindPopup(`<b>${i18next.t(`ev.${activeEventId}.title`)}</b>`).openPopup();

        }, 300);
    }

    function closeMapModalToDetails() {
        eventMapModal.classList.remove('active');
        eventDetailsModal.classList.add('active');
    }

    function closeAllModals() {
        eventDetailsModal.classList.remove('active');
        eventMapModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners for map buttons
    btnMap.addEventListener('click', openMapModal);
    btnBack.addEventListener('click', closeMapModalToDetails);

    // Close buttons (X)
    const closeBtns = document.querySelectorAll('.event-modal-close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Close on background click
    [eventDetailsModal, eventMapModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    window.addEventListener('languageChanged', () => {
        if (eventDetailsModal.classList.contains('active') && activeEventId) {
            openModal(activeEventId, activeEventData);
        }
        if (eventMapModal.classList.contains('active') && activeEventId) {
            evMapTitle.textContent = i18next.t('modal.mapTitle') + i18next.t(`ev.${activeEventId}.title`);
            mapMarker.bindPopup(`<b>${i18next.t(`ev.${activeEventId}.title`)}</b>`).openPopup();
        }
    });
});

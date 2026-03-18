// gastronomia-modals.js

document.addEventListener('DOMContentLoaded', () => {
    const gastroDetailsModal = document.getElementById('gastro-details-modal');
    if (!gastroDetailsModal) return;

    const gastroMapModal = document.getElementById('gastro-map-modal');

    // UI Elements for Details Modal
    const gmImg = document.getElementById('gm-img');
    const gmTitle = document.getElementById('gm-title');
    const gmDesc = document.getElementById('gm-desc');
    const gmDuration = document.getElementById('gm-duration');
    const gmPrice = document.getElementById('gm-price');
    const gmHowTo = document.getElementById('gm-howto');
    const gmRecs = document.getElementById('gm-recs');
    const btnMap = document.getElementById('gm-btn-map');

    // UI Elements for Map Modal
    const gmMapTitle = document.getElementById('gm-map-title');
    const btnBack = document.getElementById('gm-btn-back');
    const mapContainerId = 'gm-leaflet-map';

    let activeGastroData = null;
    let activeGastroId = null;
    let modalLeafletMap = null;
    let mapMarker = null;

    // Gastronomy Data with Placeholders
    const gastroData = {
        'ajiaco': {
            title: 'Ajiaco Santafereño',
            desc: 'El plato más representativo de Bogotá. Una sopa espesa y reconfortante hecha con pollo, tres tipos de papa, mazorca, guascas y crema de leche, coronada con alcaparras y aguacate. Es el sabor de la Bogotá tradicional en un solo plato.',
            duration: '1.5 horas',
            price: 'Desde $25.000 COP ($6 USD)',
            howto: 'Solo llegar a restaurantes tradicionales.Mejores lugares: La Puerta Falsa (La Candelaria), Casa Vieja o Restaurante El Chato.También puedes hacerlo en un tour gastronómico (recomendado la primera vez).',
            recs: 'Pídelo con arroz y ají para la experiencia completa.Mejor en días fríos o después de caminar por la ciudad.Combínalo con un tamal o chocolate para un desayuno típico.Precio aproximado: $28.000 – $38.000 COP (~$7–9 USD) por porción generosa.',
            image: 'assets/images/Gastronomia/Ajiaco2.jpg',
            lat: 4.5968, // La Puerta Falsa coords
            lng: -74.0736
        },
        'tamal': {
            title: 'Tamal con Chocolate',
            desc: 'Un tamal grande envuelto en hoja de plátano, relleno de cerdo, pollo, garbanzos, huevo y arroz, acompañado de una taza de chocolate caliente espeso. Es tradición, sabor y calidez en cada bocado.',
            duration: '1 hora',
            price: 'Aprox. $15.000 COP ($4 USD)',
            howto: 'Solo llegar (no requiere reserva).Mejores lugares: La Puerta Falsa, Tamales de La Candelaria, puestos en Paloquemao o Restaurante La Puerta Falsa (el más famoso).Disponible principalmente por la mañana.',
            recs: 'Pídelo con arepa y queso para la versión completa.Ve temprano (antes de las 10 a.m.) porque se acaban rápido.Ideal para empezar el día antes de una caminata por el centro.Precio aproximado: $18.000 – $25.000 COP (~$4.5–6 USD) el combo completo.',
            image: 'assets/images/Gastronomia/Tamal2.jpg',
            lat: 4.5972, // Center coords
            lng: -74.0732
        },
        'arepa': {
            title: 'Arepa de Huevo + Desayuno Callejero',
            desc: 'Descubre los sabores del típico desayuno de las calles bogotanas: arepa de huevo fresca, empanadas recién hechas y jugos naturales. Una experiencia que te conecta con el ritmo de la ciudad por la mañana.',
            duration: '45 mins',
            price: 'Desde $4.000 COP ($1 USD)',
            howto: 'Solo llegar (street food, sin reserva).Mejores lugares 2026:Jacinta Arepas de Huevo (La Candelaria)El Recreo de los TomasinosNiña Fabi (recomendada por locales)Puestos en Paloquemao o Parque de los Periodistas.',
            recs: 'Pídelo recién hecha (la diferencia es enorme).Combínala con chocolate caliente o jugo de lulo para el desayuno completo.Ve temprano (7:00–10:00 a.m.) porque se acaban rápido.Precio aproximado: $8.000 – $12.000 COP (~$2–3 USD) por arepa + bebida.',
            image: 'assets/images/Gastronomia/Arepa2.jpg',
            lat: 4.6133, // Centro Internacional approx
            lng: -74.0690
        },
        'zonag': {
            title: 'Zona G',
            desc: 'Se le llama zona G a la zona gastronómica comprendida entre las carreras cuarta y séptima y las calles 69-72. Es la zona más chic del barrio Chapinero, en la que el diseño, el servicio de excelencia y la alta cocina dominan las casas transformadas en espacios gourmet.',
            duration: '2 horas',
            price: 'Depende del consumo (Aprox. $80.000 COP / $20 USD por persona)',
            howto: 'Reserva recomendada en los restaurantes top (especialmente viernes y sábado).Mejores opciones: Harry Sasson, Andrés Carne de Res (versión gourmet), El Cielo, Salvo Patria.',
            recs: 'Reserva con 48 horas de anticipación en fines de semana.Prueba platos con ingredientes locales (hormigas culonas, ají, café).Ambiente más formal; ve bien vestido.Precio promedio por persona: $120.000 – $220.000 COP (~$30–55 USD).',
            image: 'assets/images/Gastronomia/ZonaG2.jpg',
            lat: 4.6534, // Zona G Chapinero
            lng: -74.0558
        },
        'macarena': {
            title: 'La Macarena',
            desc: 'El barrio bohemio y artístico de Bogotá. Pequeños restaurantes con terrazas, cocina creativa, fusión y platos tradicionales reinventados. Ambiente íntimo, cultural y muy fotogénico.',
            duration: '2.5 horas',
            price: 'Depende del consumo (Aprox. $60.000 COP / $15 USD)',
            howto: 'Ir preferiblemente de noche y en fin de semana. Hay galerías y restaurantes bohemios.',
            recs: 'Ideal para cenas románticas o con amigos.Muchas terrazas con vista al cerro.Combina cena con una obra de teatro cercana.Precio promedio: $70.000 – $130.000 COP por persona (~$17–32 USD).',
            image: 'assets/images/Gastronomia/Macarena2.jpg',
            lat: 4.6144, // La Macarena
            lng: -74.0674
        },
        'plazas': {
            title: 'Plazas de Mercado',
            desc: 'Las Plazas de Mercado son de gran importancia para la ciudad ya que son equipamientos urbanos que han confluido en el desarrollo de actividades comerciales y que son consideradas centros del encuentro cultural, gastronómico, social, comercial, político y religioso.',
            duration: '3 horas',
            price: 'Frutas desde $3.000 COP, platos típicos desde $15.000 COP',
            howto: 'Solo llegar. No necesita reserva.Mejor día: viernes o sábado temprano (5:00 a.m. – 12:00 m.).Recomendado: Paloquemao (el más grande) o La Perseverancia.',
            recs: 'Llega temprano para ver la máxima frescura.Prueba frutas raras (curuba, lulo, granadilla, pitahaya).Lleva efectivo y bolsa reutilizable.Ve con guía la primera vez (hay tours gastronómicos de 2–3 horas).Precio: Entrada gratis (solo pagas lo que consumes).',
            image: 'assets/images/Gastronomia/plaza2.jpg',
            lat: 4.6158, // Paloquemao
            lng: -74.0850
        },
        'taller': {
            title: 'Taller de Cocina Bogotana',
            desc: 'Los talleres de cocina bogotana y colombiana en Bogotá ofrecen experiencias inmersivas, a menudo incluyendo recorridos por plazas de mercado como Paloquemao o La Perseverancia para seleccionar ingredientes frescos. En 2–3 horas cocinas desde cero un ajiaco santafereño, tamales o empanadas, y al final disfrutas el almuerzo que preparaste. Es la forma más divertida de llevarte a casa el sabor real de la ciudad.',
            duration: '3 horas',
            price: 'Aprox. $120.000 COP ($30 USD)',
            howto: 'Reserva obligatoria (grupos pequeños de 4–12 personas).Mejores opciones 2026:El Chef Soy Yo (tour + clase de ajiaco)GetYourGuide / Civitatis – “Clase de cocina colombiana en La Candelaria”Escuela Taller de Bogotá (en La Candelaria, más económica).',
            recs: 'Reserva con 48 horas de anticipación (especialmente fines de semana).Elige el taller que incluya mercado + cocina (más completo).Lleva delantal o ropa cómoda; te dan todo lo necesario.Ideal para grupos, parejas o familias.Precio aproximado: $85.000 – $130.000 COP por persona (~$20–31 USD). Incluye ingredientes, clase, almuerzo y receta para llevar.',
            image: 'assets/images/Gastronomia/taller2.jpg',
            lat: 4.6322, // Teusaquillo approx
            lng: -74.0738
        }
    };

    // Add click event to cards
    const cards = document.querySelectorAll('.card[data-id]');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const data = gastroData[id];
            if (data) {
                openModal(id, data);
            }
        });
    });

    function openModal(id, data) {
        activeGastroData = data;
        activeGastroId = id;

        gmImg.src = data.image;
        gmImg.alt = i18next.t(`gastro.${id}.title`);
        
        gmTitle.setAttribute('data-i18n', `gastro.${id}.title`);
        gmTitle.textContent = i18next.t(`gastro.${id}.title`);
        
        gmDesc.setAttribute('data-i18n', `gastro.${id}.desc`);
        gmDesc.textContent = i18next.t(`gastro.${id}.desc`);
        
        gmDuration.setAttribute('data-i18n', `gastro.${id}.duration`);
        gmDuration.textContent = i18next.t(`gastro.${id}.duration`);
        
        gmPrice.setAttribute('data-i18n', `gastro.${id}.price`);
        gmPrice.textContent = i18next.t(`gastro.${id}.price`);
        
        gmHowTo.setAttribute('data-i18n', `gastro.${id}.howto`);
        gmHowTo.textContent = i18next.t(`gastro.${id}.howto`);
        
        gmRecs.setAttribute('data-i18n', `gastro.${id}.recs`);
        gmRecs.textContent = i18next.t(`gastro.${id}.recs`);



        gastroDetailsModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop scrolling
    }

    function closeModal() {
        gastroDetailsModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMapModal() {
        if (!activeGastroData) return;

        // Hide details modal, show map modal
        gastroDetailsModal.classList.remove('active');
        gastroMapModal.classList.add('active');

        gmMapTitle.textContent = i18next.t('modal.mapTitle') + i18next.t(`gastro.${activeGastroId}.title`);

        // Initialize or update map
        setTimeout(() => {
            const coords = [activeGastroData.lat, activeGastroData.lng];

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
            mapMarker.bindPopup(`<b>${i18next.t(`gastro.${activeGastroId}.title`)}</b>`).openPopup();

        }, 300);
    }

    function closeMapModalToDetails() {
        gastroMapModal.classList.remove('active');
        gastroDetailsModal.classList.add('active');
    }

    function closeAllModals() {
        gastroDetailsModal.classList.remove('active');
        gastroMapModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners for map buttons
    btnMap.addEventListener('click', openMapModal);
    btnBack.addEventListener('click', closeMapModalToDetails);

    // Close buttons (X)
    const closeBtns = document.querySelectorAll('.gastro-modal-close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Close on background click
    [gastroDetailsModal, gastroMapModal].forEach(modal => {
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
        if (gastroDetailsModal.classList.contains('active') && activeGastroId) {
            openModal(activeGastroId, activeGastroData);
        }
        if (gastroMapModal.classList.contains('active') && activeGastroId) {
            gmMapTitle.textContent = i18next.t('modal.mapTitle') + i18next.t(`gastro.${activeGastroId}.title`);
            mapMarker.bindPopup(`<b>${i18next.t(`gastro.${activeGastroId}.title`)}</b>`).openPopup();
        }
    });
});

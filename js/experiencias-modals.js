// experiencias-modals.js

document.addEventListener('DOMContentLoaded', () => {
    const expDetailsModal = document.getElementById('exp-details-modal');
    if (!expDetailsModal) return;

    const expMapModal = document.getElementById('exp-map-modal');

    // UI Elements for Details Modal
    const emImg = document.getElementById('em-img');
    const emTitle = document.getElementById('em-title');
    const emDesc = document.getElementById('em-desc');
    const emDuration = document.getElementById('em-duration');
    const emPrice = document.getElementById('em-price');
    const emHowTo = document.getElementById('em-howto');
    const emRecs = document.getElementById('em-recs');
    const btnMap = document.getElementById('em-btn-map');

    // UI Elements for Map Modal
    const emMapTitle = document.getElementById('em-map-title');
    const btnBack = document.getElementById('em-btn-back');
    const mapContainerId = 'em-leaflet-map';

    let activeExperienceData = null;
    let modalLeafletMap = null;
    let mapMarker = null;

    // Experience Data with Placeholders
    const experiencesData = {
        'botero': {
            title: 'Museo Botero',
            desc: 'El Museo Botero está situado en La Candelaria, el centro histórico y cultural de Bogotá. Alberga una numerosa colección de obras donadas a Colombia por el artista Fernando Botero. ',
            duration: '2 horas',
            price: 'Entrada Gratuita',
            howto: 'No requiere reserva. Solo llegas y entras (recomendado llegar 30 min antes en fines de semana).Horario: Martes a sábado 9:00 a.m. – 7:00 p.m. | Domingos y festivos 10:00 a.m. – 5:00 p.m. | Lunes cerrado.',
            recs: 'Combínalo con una caminata por La Candelaria el mismo día.Usa la audioguía gratuita (disponible en español e inglés).Lleva poco equipaje (no hay lockers grandes).Precio: Gratis.',
            image: 'assets/images/Experiencias/MuseoBotero2.png',
            lat: 4.5967,
            lng: -74.0734
        },
        'nacional': {
            title: 'Museo Nacional',
            desc: 'El Museo Nacional de Colombia, comúnmente abreviado como Museo Nacional o MNC, es el primer museo fundado en Colombia. Cuenta con su sede en la capital, Bogotá.',
            duration: '3 horas',
            price: 'Aprox. $15.000 COP ($4 USD)',
            howto: 'Compra boleta en taquilla o online (recomendado).Horario: Martes a domingo 9:00 a.m. – 5:00 p.m. | Lunes cerrado.Miércoles y domingos: entrada gratuita en ciertos horarios.',
            recs: 'Dedica mínimo 2 horas.Usa audioguía (incluida).Evita lunes y festivos.Precio: Adultos colombianos ~$6.000–$12.000 COP | Extranjeros ~$18.000 COP | Estudiantes y mayores 60 años con descuento.',
            image: 'assets/images/Experiencias/MuseoNacional2.jpg',
            lat: 4.6155,
            lng: -74.0682
        },
        'mambo': {
            title: 'MAMBO',
            desc: 'El Museo de Arte Moderno de Bogotá, también conocido como MAMBO, es una de las principales instituciones culturales y artísticas de Colombia.',
            duration: '1.5 horas',
            price: 'Aprox. $12.000 COP ($3 USD)',
            howto: 'Reserva recomendada (especialmente fines de semana). Compra online o en taquilla.Horario: Martes a sábado 10:00 a.m. – 6:00 p.m. | Domingos y festivos 12:00 m. – 5:00 p.m. | Lunes cerrado.',
            recs: 'Revisa la agenda de exposiciones temporales antes de ir.Lleva cámara (muchas obras permiten foto sin flash).Precio: Público nacional ~$16.000–$21.000 COP | Estudiantes y mayores 60 ~$12.000–$15.000 COP | Extranjeros ~$25.000–$30.000 COP.',
            image: 'assets/images/Experiencias/MAMBO2.jpg',
            lat: 4.6111,
            lng: -74.0689
        },
        'tejo': {
            title: 'Juego de Tejo',
            desc: 'Es el deporte nacional de Colombia, con más de 500 años de tradición, que consiste en lanzar un disco metálico de un extremo a otro de una cancha de arcilla para hacer estallar papeletas de pólvora (mechas) situadas en un círculo metálico (bocín).',
            duration: '2 horas',
            price: 'Depende del consumo (Aprox. $30.000 COP canasta de cerveza)',
            howto: 'Recomendado: Tour guiado con cerveza artesanal (Tejo La Embajada o tours en La Candelaria).Reserva obligatoria por WhatsApp o página web (2–3 horas).También puedes llegar directo a canchas públicas, pero el tour es más seguro y completo.',
            recs: 'Ve con grupo (mínimo 4 personas).Usa ropa cómoda y zapatos cerrados.Incluye cerveza artesanal y comida típica en la mayoría de tours.Precio aproximado: $70.000–$110.000 COP por persona (incluye equipo, guía y bebidas).',
            image: 'assets/images/Experiencias/Tejo2.jpg',
            lat: 4.5985,
            lng: -74.0754 /* Placeholder location since there are many */
        },
        'pulgas': {
            title: 'Experiencia de Cata de Café en Bogotá',
            desc: 'Las experiencias de cata de café en Bogotá, con una duración promedio de 1.5 a 2 horas, ofrecen inmersiones sensoriales en el barrio La Candelaria y otras zonas, donde expertos baristas enseñan sobre la historia, cultivo, tueste y métodos de filtrado (V60, Chemex, Prensa Francesa) de cafés especiales.',
            duration: '3 horas',
            price: 'Entrada Libre. Compras variables.',
            howto: 'Reserva obligatoria (grupos pequeños de 4-10 personas).Las mejores opciones:Café Matuca o Jaguar Coffee House (La Candelaria)Tour privado de cata por GetYourGuide o Viator (incluye transporte si lo deseas).Duración: 1.5 – 2 horas.Horarios disponibles: mañana y tarde todos los días.',
            recs: 'Reserva con 24-48 horas de anticipación (especialmente fines de semana).No necesitas experiencia previa; el barista te guía paso a paso.Ideal después de una caminata por La Candelaria.Precio aproximado 2026: $55.000 – $85.000 COP por persona (~$13–20 USD). Incluye todas las catas y explicación.',
            image: 'assets/images/Experiencias/Cafe2.jpg',
            lat: 4.6953, /* Usaquén coords */
            lng: -74.0321
        },
        'esmeraldas': {
            title: 'Casa Museo de Gabo en Bogotá',
            desc: 'En Bogotá, el principal punto de referencia dedicado a Gabriel García Márquez es el Centro Cultural Gabriel García Márquez, ubicado en el barrio La Candelaria (Calle 11 # 5-60). Es un espacio cultural con librería, exposiciones y biblioteca, diseñado por Rogelio Salmona. Además, la Biblioteca Nacional de Colombia exhibe colecciones sobre su vida. ',
            duration: '1 hora',
            price: 'Recorrido gratis. Compras variables.',
            howto: 'Entrada gratuita (algunas exposiciones temporales tienen costo simbólico).No siempre requiere reserva, pero se recomienda para visitas guiadas.Horario actualizado 2026:Martes a sábado: 9:00 a.m. – 12:00 m. y 2:00 p.m. – 5:00 p.m.Domingos: 8:00 a.m. – 12:00 m. y 1:00 p.m. – 3:00 p.m.Lunes cerrado.',
            recs: 'Combínalo con la caminata por La Candelaria (está a solo 5 minutos de la Plaza de Bolívar).Toma la visita guiada gratuita (pregunta en taquilla).Lleva tu libro favorito de Gabo para la foto en la biblioteca.Precio: Gratis (entrada general). Visitas guiadas sin costo adicional.',
            image: 'assets/images/Experiencias/Gabo2.jpg',
            lat: 4.6015, /* Center coords */
            lng: -74.0722
        }
    };

    // Add click event to cards
    const cards = document.querySelectorAll('.card[data-id]');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const data = experiencesData[id];
            if (data) {
                openModal(data);
            }
        });
    });

    function openModal(data) {
        activeExperienceData = data;

        emImg.src = data.image;
        emImg.alt = data.title;
        emTitle.textContent = data.title;
        emDesc.textContent = data.desc;
        emDuration.textContent = data.duration;
        emPrice.textContent = data.price;
        emHowTo.textContent = data.howto;
        emRecs.textContent = data.recs;

        expDetailsModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop scrolling
    }

    function closeModal() {
        expDetailsModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMapModal() {
        if (!activeExperienceData) return;

        // Hide details modal, show map modal
        expDetailsModal.classList.remove('active');
        expMapModal.classList.add('active');

        emMapTitle.textContent = `Mapa: ${activeExperienceData.title}`;

        // Initialize or update map
        setTimeout(() => {
            const coords = [activeExperienceData.lat, activeExperienceData.lng];

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
            mapMarker.bindPopup(`<b>${activeExperienceData.title}</b>`).openPopup();

        }, 300);
    }

    function closeMapModalToDetails() {
        expMapModal.classList.remove('active');
        expDetailsModal.classList.add('active');
    }

    function closeAllModals() {
        expDetailsModal.classList.remove('active');
        expMapModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners for map buttons
    btnMap.addEventListener('click', openMapModal);
    btnBack.addEventListener('click', closeMapModalToDetails);

    // Close buttons (X)
    const closeBtns = document.querySelectorAll('.exp-modal-close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Close on background click
    [expDetailsModal, expMapModal].forEach(modal => {
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
});

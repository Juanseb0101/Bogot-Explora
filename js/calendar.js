// calendar.js

const mockEvents = [
    { nombre: "Estéreo Picnic", fechaInicio: "2026-03-20", fechaFin: "2026-03-22", lugar: "Parque Simón Bolívar", descripcionCorta: "El festival de música alternativa más importante del país.", tipo: "música", link: "eventos.html" },
    { nombre: "FIAV Bogotá", fechaInicio: "2026-03-27", fechaFin: "2026-04-05", lugar: "Múltiples Teatros", descripcionCorta: "Festival Iberoamericano de Artes Vivas de Bogotá.", tipo: "teatro", link: "eventos.html" },
    { nombre: "Concierto Laura Pausini", fechaInicio: "2026-03-10", fechaFin: "2026-03-10", lugar: "Movistar Arena", descripcionCorta: "Gira mundial de la artista italiana.", tipo: "música", link: "eventos.html" },
    { nombre: "Concierto Iron Maiden", fechaInicio: "2026-04-18", fechaFin: "2026-04-18", lugar: "Estadio El Campín", descripcionCorta: "Leyendas del heavy metal regresan a Colombia.", tipo: "música", link: "eventos.html" },
    { nombre: "Concierto Megadeth", fechaInicio: "2026-04-20", fechaFin: "2026-04-20", lugar: "Movistar Arena", descripcionCorta: "Concierto de la icónica banda de thrash metal.", tipo: "música", link: "eventos.html" },
    { nombre: "FILBo", fechaInicio: "2026-04-16", fechaFin: "2026-05-02", lugar: "Corferias", descripcionCorta: "Feria Internacional del Libro de Bogotá.", tipo: "cultura", link: "experiencias.html" },
    { nombre: "Burger Master", fechaInicio: "2026-04-25", fechaFin: "2026-05-05", lugar: "Múltiples Restaurantes", descripcionCorta: "El evento gastronómico más grande del país en busca de la mejor hamburguesa.", tipo: "gastronomía", link: "gastronomia.html" },
    { nombre: "Concierto Nicky Jam", fechaInicio: "2026-05-15", fechaFin: "2026-05-15", lugar: "Movistar Arena", descripcionCorta: "Presentación del pionero del género urbano.", tipo: "música", link: "eventos.html" },
    { nombre: "Bogotá Fashion Week", fechaInicio: "2026-05-20", fechaFin: "2026-05-22", lugar: "Ágora Bogotá", descripcionCorta: "Plataforma comercial y de promoción de moda.", tipo: "cultura", link: "experiencias.html" },
    { nombre: "Joropo al Parque", fechaInicio: "2026-06-15", fechaFin: "2026-06-16", lugar: "Plaza de Bolívar", descripcionCorta: "Música y danza tradicional de los llanos orientales.", tipo: "música", link: "eventos.html" },
    { nombre: "Comic Con Colombia", fechaInicio: "2026-06-25", fechaFin: "2026-06-28", lugar: "Corferias", descripcionCorta: "El evento más esperado de la cultura pop y el entretenimiento.", tipo: "cultura", link: "experiencias.html" },
    { nombre: "Más Cultura Local - Suba", fechaInicio: "2026-07-10", fechaFin: "2026-07-15", lugar: "Localidad de Suba", descripcionCorta: "Muestras culturales y artísticas de la localidad.", tipo: "comunidad", link: "eventos.html" },
    { nombre: "Festival de Verano", fechaInicio: "2026-08-01", fechaFin: "2026-08-10", lugar: "Parque Simón Bolívar", descripcionCorta: "Celebración del cumpleaños de Bogotá con actividades recreativas.", tipo: "comunidad", link: "eventos.html" },
    { nombre: "Pizza Master", fechaInicio: "2026-08-20", fechaFin: "2026-08-30", lugar: "Múltiples Restaurantes", descripcionCorta: "Competencia para elegir la mejor pizza de la ciudad.", tipo: "gastronomía", link: "gastronomia.html" },
    { nombre: "Jazz al Parque", fechaInicio: "2026-09-10", fechaFin: "2026-09-12", lugar: "Parque El Country", descripcionCorta: "Festival gratuito de jazz en los parques de la ciudad.", tipo: "música", link: "eventos.html" },
    { nombre: "Más Cultura Local - Kennedy", fechaInicio: "2026-09-20", fechaFin: "2026-09-25", lugar: "Localidad de Kennedy", descripcionCorta: "Muestras culturales y de talento local.", tipo: "comunidad", link: "eventos.html" },
    { nombre: "Salsa al Parque", fechaInicio: "2026-10-05", fechaFin: "2026-10-06", lugar: "Plaza de Bolívar", descripcionCorta: "Encuentro de las mejores orquestas de salsa locales e internacionales.", tipo: "música", link: "eventos.html" },
    { nombre: "ARTBO", fechaInicio: "2026-10-22", fechaFin: "2026-10-25", lugar: "Corferias", descripcionCorta: "Feria Internacional de Arte de Bogotá.", tipo: "arte", link: "experiencias.html" },
    { nombre: "Rock al Parque", fechaInicio: "2026-11-09", fechaFin: "2026-11-11", lugar: "Parque Simón Bolívar", descripcionCorta: "El festival gratuito y al aire libre más grande de Latinoamérica.", tipo: "música", link: "eventos.html" },
    { nombre: "Expoartesanías", fechaInicio: "2026-12-05", fechaFin: "2026-12-18", lugar: "Corferias", descripcionCorta: "La principal feria de artesanías de Colombia y América Latina.", tipo: "cultura", link: "experiencias.html" }
];

const fallbackSuggestions = [
    { nombre: "Visitar Monserrate", descripcionCorta: "Descubre Bogotá desde las alturas en cualquier época del año.", link: "rutas.html", tipo: "ruta" },
    { nombre: "Tour por La Candelaria", descripcionCorta: "Recorre el centro histórico y sus museos emblemáticos.", link: "experiencias.html", tipo: "cultura" },
    { nombre: "Cata de Café en Usaquén", descripcionCorta: "Experimenta los sabores del mejor café colombiano.", link: "gastronomia.html", tipo: "gastronomía" }
];

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date-range');
    if (!dateInput) return;

    const fp = flatpickr(dateInput, {
        mode: "range",
        minDate: "today",
        locale: "es",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "F j, Y"
    });

    const btnSuggest = document.getElementById('btn-suggest-events');
    const modal = document.getElementById('suggestions-modal');
    const btnClose = document.getElementById('close-modal');
    const suggestionsList = document.getElementById('suggestions-list');

    btnSuggest.addEventListener('click', () => {
        const selectedDates = fp.selectedDates;
        if (selectedDates.length === 0) {
            alert("Por favor selecciona un rango de fechas.");
            return;
        }

        const checkIn = selectedDates[0];
        const checkOut = selectedDates[1] || selectedDates[0]; // If only one date selected

        // Reset hours for comparison
        checkIn.setHours(0, 0, 0, 0);
        checkOut.setHours(23, 59, 59, 999);

        // Filter events that intersect with [checkIn, checkOut]
        const intersectingEvents = mockEvents.filter(event => {
            const eStart = new Date(event.fechaInicio);
            const eEnd = new Date(event.fechaFin);

            // Intersection logic: checkIn <= eEnd AND eStart <= checkOut
            return (checkIn <= eEnd) && (eStart <= checkOut);
        });

        renderSuggestions(intersectingEvents);
        modal.classList.add('active');
    });

    btnClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    function renderSuggestions(events) {
        suggestionsList.innerHTML = '';

        if (events.length === 0) {
            let html = `
                <div class="event-suggestion">
                    <h4>No hay eventos programados en estas fechas exactas.</h4>
                    <p class="event-desc">Pero siempre hay algo que hacer en Bogotá. Te recomendamos:</p>
                </div>
            `;
            fallbackSuggestions.forEach(sug => {
                html += `
                    <div class="event-suggestion" style="border-left-color: #0A3D2F;">
                        <h4>${sug.nombre}</h4>
                        <p class="event-desc">${sug.descripcionCorta} <a href="${sug.link}" style="color:var(--color-accent); font-weight:600;">Ver más</a></p>
                    </div>
                `;
            });
            suggestionsList.innerHTML = html;
            return;
        }

        events.forEach(event => {
            const html = `
                <div class="event-suggestion">
                    <h4>${event.nombre}</h4>
                    <div class="event-meta">
                        <span>📅 ${event.fechaInicio} a ${event.fechaFin}</span>
                        <span>📍 ${event.lugar}</span>
                        <span style="text-transform: capitalize;">🏷️ ${event.tipo}</span>
                    </div>
                    <p class="event-desc">${event.descripcionCorta} <a href="${event.link}" style="color:var(--color-accent); font-weight:600;">Ver más</a></p>
                </div>
            `;
            suggestionsList.insertAdjacentHTML('beforeend', html);
        });
    }
});

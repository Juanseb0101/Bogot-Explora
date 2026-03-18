// map.js

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are in mapa.html or rutas.html
    const cityMapEl = document.getElementById('city-map');
    const routesMapEl = document.getElementById('routes-map');

    if (cityMapEl) {
        initFullMap('city-map');
    }

    if (routesMapEl) {
        initRoutesMap('routes-map');
    }
});

const pins = [
    { title: "Monserrate", lat: 4.6058, lng: -74.0556, desc: "Santuario en la cima del cerro, vista panorámica." },
    { title: "Museo del Oro", lat: 4.6019, lng: -74.0719, desc: "La colección de orfebrería prehispánica más grande del mundo." },
    { title: "Plaza de Bolívar", lat: 4.5981, lng: -74.0760, desc: "Corazón histórico y político de Colombia." },
    { title: "Paloquemao", lat: 4.6158, lng: -74.0850, desc: "Auténtica plaza de mercado con increíble variedad." },
    { title: "Usaquén", lat: 4.6953, lng: -74.0321, desc: "Zona colonial con excelentes restaurantes y mercado dominical." },
    { title: "Zona G", lat: 4.6543, lng: -74.0560, desc: "Alta gastronomía y restaurantes exclusivos." }
];

const pinsEn = [
    { title: "Monserrate", lat: 4.6058, lng: -74.0556, desc: "Sanctuary at the top of the hill, panoramic view." },
    { title: "Gold Museum", lat: 4.6019, lng: -74.0719, desc: "The largest pre-Hispanic goldsmithing collection in the world." },
    { title: "Bolívar Square", lat: 4.5981, lng: -74.0760, desc: "Historical and political heart of Colombia." },
    { title: "Paloquemao", lat: 4.6158, lng: -74.0850, desc: "Authentic market square with incredible variety." },
    { title: "Usaquén", lat: 4.6953, lng: -74.0321, desc: "Colonial area with excellent restaurants and Sunday market." },
    { title: "Zona G", lat: 4.6543, lng: -74.0560, desc: "High gastronomy and exclusive restaurants." }
];

let mapInstance = null;
let currentMarkers = [];

function initFullMap(containerId) {
    mapInstance = L.map(containerId).setView([4.6097, -74.0817], 12); // Center of Bogotá

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstance);

    renderMarkers('full');
}

function initRoutesMap(containerId) {
    mapInstance = L.map(containerId).setView([4.6019, -74.0719], 14); // Closer to center (La Candelaria focus)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstance);

    renderMarkers('routes');
}

function renderMarkers(type) {
    if (!mapInstance) return;

    // Clear existing markers
    currentMarkers.forEach(m => mapInstance.removeLayer(m));
    currentMarkers = [];

    const activePinsArray = typeof i18next !== 'undefined' && i18next.language === 'en' ? pinsEn : pins;
    
    // Only show center/historic pins for routes overview, else show all
    const pinsToRender = type === 'routes' ? activePinsArray.slice(0, 4) : activePinsArray;
    
    pinsToRender.forEach(pin => {
        const marker = L.marker([pin.lat, pin.lng])
            .addTo(mapInstance)
            .bindPopup(`<b>${pin.title}</b><br>${pin.desc}`);
        currentMarkers.push(marker);
    });
}

// Re-render markers if language changes
if (typeof window !== 'undefined') {
    window.addEventListener('languageChanged', () => {
        const cityMapEl = document.getElementById('city-map');
        if (cityMapEl) {
            renderMarkers('full');
        } else {
            renderMarkers('routes');
        }
    });
}

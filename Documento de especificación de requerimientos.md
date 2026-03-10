**Proyecto: Bogotá Explora**  
**Versión: 1.0**  
**Fecha: 25 de febrero de 2026**

**Elaborado por:** Juan Castillo

---

### **1\. Introducción y Visión del Proyecto**

**Bogotá Explora** es una aplicación web completa (no solo landing page) que permite a turistas nacionales e internacionales descubrir y planificar experiencias auténticas en Bogotá: rutas turísticas, experiencias culturales, gastronomía y eventos comunitarios.

**Visión:** Crear una experiencia inmersiva, moderna y elegante que combine información útil con navegación intuitiva y sugerencias inteligentes, inspirada en el estilo minimalista y sofisticado de Brass Hands (colores verde oscuro elegante, tipografía serif moderna, mucho espacio en blanco y fotografía de alta calidad).

**Objetivo general:** Desarrollar una plataforma bilingüe (español / inglés) responsive que facilite la planificación de viajes y promueva el turismo sostenible y cultural de Bogotá.

---

### **2\. Requisitos Funcionales**

#### **2.1 Estructura de la Web (Multi-página / SPA)**

* **4 secciones principales** (navegación fija en header):  
  * **Rutas Turísticas**  
  * **Experiencias Culturales**  
  * **Gastronomía Bogotana**  
  * **Eventos y Comunidad**  
* Cada sección tendrá **2 subsecciones** (ejemplo):  
  * Rutas Turísticas → Histórica / Naturaleza y Aventura  
  * Experiencias Culturales → Arte y Museos / Tradiciones y Festivales  
  * Gastronomía Bogotana → Platos Tradicionales / Mercados y Experiencias Gastronómicas  
  * Eventos y Comunidad → Agenda Mensual / Experiencias Locales  
* Cada subsección contendrá **mínimo 3 experiencias reales** con:  
  * Foto o ilustración de alta calidad (formato 16:9)  
  * Título  
  * Descripción textual (150-200 palabras) bilingüe  
  * Información práctica (ubicación, precio aproximado, duración, nivel de dificultad)  
  * Botón “Ver en mapa” que abre modal con mapa interactivo

#### **2.2 Calendario Inteligente (nueva funcionalidad)**

* Menú tipo Airbnb en la página principal y en header móvil.  
* Usuario selecciona fechas de estancia (check-in / check-out) usando un calendario bonito (Flatpickr o similar).  
* Botón “Sugerir eventos para mis fechas”.  
* Al hacer clic, se abre un **pop-up** con sugerencias generadas por IA (simulación de Grok):  
  * Lista de 4-6 eventos/recomendaciones que coincidan con las fechas elegidas.  
  * Cada sugerencia incluye: nombre, fecha/hora, lugar, breve descripción y enlace a la sección correspondiente.  
* Si no hay eventos reales, mostrar mensaje amigable \+ sugerencias alternativas.

#### **2.3 Mapa Interactivo**

* Integración con Leaflet.js \+ OpenStreetMap (gratis).  
* Pins personalizados para cada experiencia.  
* Vista de rutas con líneas y capas.  
* Filtro por sección y búsqueda.

#### **2.4 Otras funcionalidades**

* Cambio de idioma (español ↔ inglés) en todo el sitio.  
* Modo oscuro / claro (opcional pero recomendado).  
* Formulario de contacto y suscripción a newsletter.  
* Sección “Mi itinerario” (guardar experiencias favoritas en localStorage).  
* Footer con enlaces, redes sociales y copyright.

---

### **3\. Requisitos No Funcionales**

* **Rendimiento**: Carga \< 2 segundos en 3G.  
* **Accesibilidad**: WCAG 2.1 AA (alt en imágenes, contraste, navegación por teclado).  
* **SEO**: Meta tags, Open Graph, URLs amigables.  
* **Tecnologías base**:  
  * HTML5  
  * CSS3 (Flexbox \+ Grid \+ variables CSS para tema Brass Hands)  
  * Vanilla JavaScript (ES6+)  
* **Librerías recomendadas** (todas gratuitas y livianas):  
  * Leaflet.js → mapas  
  * Flatpickr → calendario  
  * i18next → internacionalización  
  * Swiper.js → sliders de experiencias

**Sugerencia tecnológica**: Mantengamos HTML \+ CSS \+ JS puro para el prototipo (ideal para Antigravity). Si más adelante quieres mayor escalabilidad, podemos migrar a Astro o Next.js sin problema.

---

### **4\. Diseño Visual y Estilo (Brass Hands Inspired)**

* **Paleta principal**:  
  * Verde oscuro elegante (\#0A3D2F o similar)  
  * Crema / off-white (\#F8F1E9)  
  * Negro profundo para textos  
  * Acentos en amarillo mostaza (\#E8B923) para botones CTA  
* **Tipografía**:  
  * Títulos: serif elegante (similar a Playfair Display o Georgia)  
  * Cuerpo: sans-serif limpia (Inter o system-ui)  
* **Estilo general**:  
  * Mucho espacio en blanco (padding generoso)  
  * Imágenes grandes y de alta calidad  
  * Animaciones sutiles al scroll y hover  
  * Header fijo con logo y menú  

---

### **5\. Requisitos de Contenido**

* Todas las experiencias deben ser reales de Bogotá 2025-2026 (Monserrate, Graffiti Tour La Candelaria, Ciclovía, Ajiaco en Paloquemao, Festival Iberoamericano de Teatro, etc.).  
* Textos listos en español e inglés.  
* Fotos: 100% libres de derechos o tomadas por ti (recomiendo Unsplash \+ fotos propias para autenticidad).

---

### **6\. Plan de Entrega (para Antigravity)**

Te entregaré el proyecto completo dividido en carpetas:

text  
bogota-explora/  
├── index.html  
├── rutas.html  
├── experiencias.html  
├── gastronomia.html  
├── eventos.html  
├── assets/  
│   ├── css/style.css  
│   ├── js/main.js  
│   └── images/  
├── components/ (header, footer, modal, etc.)  
└── README.md  

/* data.jsx — content for the RetrocubeX landing page (Spanish, arcade voice) */

const L_PRODUCTS = [
  { id: "rcx-018", name: "Cubo Arcade '88", cat: "Videojuegos", price: "24,90", old: null,
    hue: 0, stock: 3, badge: "new", limited: true, scene: "arcade" },
  { id: "rcx-021", name: "Nave Galáctica", cat: "Películas", price: "32,00", old: null,
    hue: 200, stock: 5, badge: "new", limited: false, scene: "ship" },
  { id: "rcx-007", name: "Portal Esmeralda", cat: "Edición limitada", price: "38,00", old: null,
    hue: 150, stock: 1, badge: null, limited: true, scene: "portal" },
  { id: "rcx-009", name: "Mazmorra 8-bit", cat: "Videojuegos", price: "19,90", old: "26,00",
    hue: 280, stock: 8, badge: "sale", limited: false, scene: "dungeon" },
  { id: "rcx-025", name: "Kart Confeti", cat: "Videojuegos", price: "27,50", old: null,
    hue: 90, stock: 2, badge: "new", limited: true, scene: "kart" },
  { id: "rcx-014", name: "Cabina Roja", cat: "Películas", price: "29,90", old: null,
    hue: 330, stock: 0, badge: null, limited: true, scene: "noir" },
  { id: "rcx-031", name: "Consola de Bolsillo", cat: "Videojuegos", price: "22,00", old: null,
    hue: 40, stock: 6, badge: null, limited: false, scene: "handheld" },
  { id: "rcx-012", name: "Cinta VHS", cat: "Películas", price: "18,50", old: "24,00",
    hue: 250, stock: 4, badge: "sale", limited: false, scene: "vhs" },
];

const L_REVIEWS = [
  { who: "Marcos R.", stars: 5, text: "Brutal. Más detalle del que esperaba y la luz LED queda perfecta de noche en la estantería." },
  { who: "Lucía P.", stars: 5, text: "Llegó en 48h y súper protegido. En cuanto lo enchufé volví directa a los 90. Ya quiero el siguiente drop." },
  { who: "Dani G.", stars: 5, text: "Pedí uno personalizado de mi arcade favorita y clavaron cada píxel. Atención al detalle de otro nivel." },
  { who: "Sara M.", stars: 5, text: "Es el regalo geek perfecto. Mi pareja flipó. La caja ya es una experiencia: insert coin to continue." },
  { who: "Nacho V.", stars: 4, text: "Calidad top y muy bien embalado. Solo le pongo pega a que se agotan demasiado rápido, ¡avisad antes!" },
  { who: "Ainhoa L.", stars: 5, text: "Tengo ya tres cubos haciendo combo en el salón. Adictivo total. La edición limitada vale cada euro." },
];

/* Instagram tiles — placeholder diorama scenes (swap for real photos) */
const L_IG = [
  { hue: 0,   scene: "arcade",   likes: "1.2k", cap: "El Cubo Arcade '88 en su hábitat 🕹️" },
  { hue: 150, scene: "portal",   likes: "980",  cap: "Portal Esmeralda — últimas unidades" },
  { hue: 200, scene: "ship",     likes: "2.1k", cap: "Nave Galáctica al atardecer synthwave" },
  { hue: 280, scene: "dungeon",  likes: "760",  cap: "Mazmorra 8-bit, slime incluido" },
  { hue: 40,  scene: "handheld", likes: "1.5k", cap: "Tu portátil de la infancia, encogida" },
  { hue: 330, scene: "noir",     likes: "640",  cap: "Cabina Roja: cine negro en neón" },
];

/* Custom-cube popular themes for the personalize band */
const L_THEMES = ["Arcade clásico", "Pokémon", "Zelda", "Sci-fi", "RPG / Fantasía", "Cine de culto", "Anime", "Tu propia idea"];

/* Scrolling marquee terms */
const L_MARQUEE = [
  "Arcade '88", "Sci-fi", "RPG", "Nostalgia", "Handheld", "Pixel art",
  "Personalizado", "Edición limitada", "Hecho a mano", "Coleccionable",
];

/* Carousel 3D — fotos reales de los cubos */
const carouselImages = [
  "assets/Images/WhatsApp Image 2026-06-03 at 18.40.08 (1).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.40.08.jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.24 (1).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.24 (2).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.24 (3).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.24 (4).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.24 (5).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.24 (6).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.24 (7).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.24.jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.25 (1).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.25 (2).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.25 (3).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.25 (4).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.25 (5).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.25 (6).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.25 (7).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.25.jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.26 (1).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.26 (10).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.26 (2).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.26 (3).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.26 (4).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.26 (5).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.26 (6).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.26 (7).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.26 (8).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.26 (9).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.26.jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.27 (1).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.27 (2).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.27 (3).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.50.27.jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.51.52.jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.51.53 (1).jpeg",
  "assets/Images/WhatsApp Image 2026-06-03 at 18.51.53.jpeg",
];

Object.assign(window, { L_PRODUCTS, L_REVIEWS, L_IG, L_THEMES, L_MARQUEE, carouselImages });

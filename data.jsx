/* data.jsx — content for the RetrocubeX landing page (Spanish, arcade voice) */

const TYPEFORM_URL = "https://form.typeform.com/to/jfG8fxxO";
const MAILTO       = "mailto:retrocubex@gmail.com";

const L_PRODUCTS = [
  { id: "rcx-001", name: "Zelda: The Minish Cap", cat: "Videojuegos", price: "22,50", old: null,
    img: "assets/Images/zelda-minish-cap-diorama-frontal.jpeg", hue: 150, stock: 1, badge: "new", limited: true, scene: "portal",
    shots: ["assets/Images/zelda-minish-cap-diorama-frontal.jpeg", "assets/Images/zelda-minish-cap-diorama-lateral.jpeg", "assets/Images/zelda-minish-cap-caratula.jpeg"] },
  { id: "rcx-002", name: "Back to the Future", cat: "Películas", price: "22,50", old: null,
    img: "assets/Images/back-to-the-future-diorama-frontal.jpeg", hue: 200, stock: 2, badge: "new", limited: false, scene: "ship",
    shots: ["assets/Images/back-to-the-future-diorama-frontal.jpeg", "assets/Images/back-to-the-future-diorama-lateral.jpeg", "assets/Images/back-to-the-future-caratula.jpeg"] },
  { id: "rcx-003", name: "Street Fighter II", cat: "Videojuegos", price: "22,50", old: null,
    img: "assets/Images/street-fighter-2-diorama-frontal.jpeg", hue: 0, stock: 3, badge: null, limited: false, scene: "arcade",
    shots: ["assets/Images/street-fighter-2-diorama-frontal.jpeg", "assets/Images/street-fighter-2-diorama-lateral.jpeg", "assets/Images/street-fighter-2-diorama-angulo.jpeg", "assets/Images/street-fighter-2-caratula.jpeg"] },
  { id: "rcx-004", name: "Super Mario Bros 3", cat: "Videojuegos", price: "22,50", old: null,
    img: "assets/Images/super-mario-bros-3-diorama.jpeg", hue: 90, stock: 2, badge: "new", limited: false, scene: "kart",
    shots: ["assets/Images/super-mario-bros-3-diorama.jpeg", "assets/Images/super-mario-bros-3-caratula.jpeg"] },
  { id: "rcx-005", name: "Blasphemous", cat: "Videojuegos", price: "22,50", old: null,
    img: "assets/Images/blasphemous-diorama-frontal.jpeg", hue: 280, stock: 2, badge: null, limited: false, scene: "dungeon",
    shots: ["assets/Images/blasphemous-diorama-frontal.jpeg", "assets/Images/blasphemous-diorama-lateral-1.jpeg", "assets/Images/blasphemous-diorama-lateral-2.jpeg", "assets/Images/blasphemous-caratula.jpeg"] },
  { id: "rcx-006", name: "Metal Slug", cat: "Videojuegos", price: "22,50", old: null,
    img: "assets/Images/metal-slug-diorama-frontal.jpeg", hue: 40, stock: 1, badge: "new", limited: true, scene: "handheld",
    shots: ["assets/Images/metal-slug-diorama-frontal.jpeg", "assets/Images/metal-slug-diorama-lateral.jpeg"] },
  { id: "rcx-007", name: "Crazy Taxi", cat: "Videojuegos", price: "22,50", old: null,
    img: "assets/Images/crazy-taxi-diorama-lateral.jpeg", hue: 50, stock: 3, badge: null, limited: false, scene: "kart",
    shots: ["assets/Images/crazy-taxi-diorama-lateral.jpeg", "assets/Images/crazy-taxi-diorama-angulo.jpeg", "assets/Images/crazy-taxi-caratula.jpeg"] },
  { id: "rcx-008", name: "Duck Hunt", cat: "Videojuegos", price: "22,50", old: null,
    img: "assets/Images/duck-hunt-diorama.jpeg", hue: 100, stock: 2, badge: null, limited: false, scene: "arcade",
    shots: ["assets/Images/duck-hunt-diorama.jpeg", "assets/Images/duck-hunt-cartucho.jpeg"] },
  { id: "rcx-009", name: "Kirby: Nightmare in Dream Land", cat: "Videojuegos", price: "22,50", old: null,
    img: "assets/Images/kirby-nightmare-diorama-frontal.jpeg", hue: 330, stock: 1, badge: null, limited: false, scene: "dungeon",
    shots: ["assets/Images/kirby-nightmare-diorama-frontal.jpeg", "assets/Images/kirby-nightmare-diorama-lateral.jpeg", "assets/Images/kirby-nightmare-caratula.jpeg"] },
  { id: "rcx-010", name: "Oddworld: Abe's Oddysee", cat: "Videojuegos", price: "22,50", old: null,
    img: "assets/Images/oddworld-diorama-frontal.jpeg", hue: 90, stock: 1, badge: null, limited: false, scene: "dungeon",
    shots: ["assets/Images/oddworld-diorama-frontal.jpeg", "assets/Images/oddworld-diorama-lateral.jpeg", "assets/Images/oddworld-caratula.jpeg"] },
  { id: "rcx-011", name: "Alien 3", cat: "Películas", price: "22,50", old: null,
    img: "assets/Images/alien3-diorama-frontal.jpeg", hue: 180, stock: 1, badge: null, limited: false, scene: "ship",
    shots: ["assets/Images/alien3-diorama-frontal.jpeg", "assets/Images/alien3-diorama-lateral.jpeg", "assets/Images/alien3-caratula.jpeg"] },
  { id: "rcx-012", name: "Super Mario Galaxy", cat: "Videojuegos", price: "22,50", old: null,
    img: "assets/Images/super-mario-galaxy-diorama-frontal.jpeg", hue: 200, stock: 1, badge: null, limited: false, scene: "portal",
    shots: ["assets/Images/super-mario-galaxy-diorama-frontal.jpeg", "assets/Images/super-mario-galaxy-diorama-lateral.jpeg", "assets/Images/super-mario-galaxy-2-caratula.jpeg"] },
];

const L_REVIEWS = [
  { who: "Raúl F.", stars: 5, text: "El cubo se ve increíble, han sabido reflejar un momento crucial de la película, los detalles son magníficos!, repetiré." },
  { who: "Salva M.", stars: 5, text: "Feliz con mi cubito! Mi juego preferido de la infancia… está tan bien hecho y los detalles tan cuidados que hasta parece que oigo a Abe haciendo la llamada al portal! F A N T A S I A" },
  { who: "Dani G.", stars: 5, text: "Pedí uno personalizado de mi arcade favorita y clavaron cada píxel. Atención al detalle de otro nivel." },
  { who: "Sara M.", stars: 5, text: "Es el regalo geek perfecto. Mi pareja flipó. La caja ya es una experiencia: insert coin to continue." },
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
  "Arcade '88", "Sci-fi", "RPG", "Nostalgia", "Decoración retro", "Pixel art",
  "Personalizado", "Edición limitada", "Hecho a mano", "Coleccionable",
];

/* Carousel 3D — fotos reales de los cubos */
const carouselImages = [
  { src: "assets/Images/zelda-minish-cap-diorama-frontal.jpeg",    title: "Zelda: The Minish Cap" },
  { src: "assets/Images/zelda-minish-cap-diorama-lateral.jpeg",    title: "Zelda: The Minish Cap" },
  { src: "assets/Images/zelda-minish-cap-caratula.jpeg",           title: "Zelda: The Minish Cap" },
  { src: "assets/Images/back-to-the-future-diorama-frontal.jpeg",  title: "Back to the Future" },
  { src: "assets/Images/back-to-the-future-diorama-lateral.jpeg",  title: "Back to the Future" },
  { src: "assets/Images/back-to-the-future-caratula.jpeg",         title: "Back to the Future" },
  { src: "assets/Images/street-fighter-2-diorama-frontal.jpeg",    title: "Street Fighter II" },
  { src: "assets/Images/street-fighter-2-diorama-lateral.jpeg",    title: "Street Fighter II" },
  { src: "assets/Images/street-fighter-2-diorama-angulo.jpeg",     title: "Street Fighter II" },
  { src: "assets/Images/street-fighter-2-caratula.jpeg",           title: "Street Fighter II" },
  { src: "assets/Images/super-mario-bros-3-diorama.jpeg",          title: "Super Mario Bros 3" },
  { src: "assets/Images/super-mario-bros-3-caratula.jpeg",         title: "Super Mario Bros 3" },
  { src: "assets/Images/kirby-nightmare-diorama-frontal.jpeg",     title: "Kirby: Nightmare in Dream Land" },
  { src: "assets/Images/kirby-nightmare-diorama-lateral.jpeg",     title: "Kirby: Nightmare in Dream Land" },
  { src: "assets/Images/kirby-nightmare-caratula.jpeg",            title: "Kirby: Nightmare in Dream Land" },
  { src: "assets/Images/blasphemous-diorama-frontal.jpeg",         title: "Blasphemous" },
  { src: "assets/Images/blasphemous-diorama-lateral-1.jpeg",       title: "Blasphemous" },
  { src: "assets/Images/blasphemous-caratula.jpeg",                title: "Blasphemous" },
  { src: "assets/Images/metal-slug-diorama-frontal.jpeg",          title: "Metal Slug" },
  { src: "assets/Images/metal-slug-diorama-lateral.jpeg",          title: "Metal Slug" },
  { src: "assets/Images/crazy-taxi-diorama-lateral.jpeg",          title: "Crazy Taxi" },
  { src: "assets/Images/crazy-taxi-diorama-angulo.jpeg",           title: "Crazy Taxi" },
  { src: "assets/Images/crazy-taxi-caratula.jpeg",                 title: "Crazy Taxi" },
  { src: "assets/Images/oddworld-diorama-frontal.jpeg",            title: "Oddworld: Abe's Oddysee" },
  { src: "assets/Images/oddworld-diorama-lateral.jpeg",            title: "Oddworld: Abe's Oddysee" },
  { src: "assets/Images/oddworld-caratula.jpeg",                   title: "Oddworld: Abe's Oddysee" },
  { src: "assets/Images/alien3-diorama-frontal.jpeg",              title: "Alien 3" },
  { src: "assets/Images/alien3-diorama-lateral.jpeg",              title: "Alien 3" },
  { src: "assets/Images/alien3-caratula.jpeg",                     title: "Alien 3" },
  { src: "assets/Images/super-mario-galaxy-diorama-frontal.jpeg",  title: "Super Mario Galaxy" },
  { src: "assets/Images/super-mario-galaxy-diorama-lateral.jpeg",  title: "Super Mario Galaxy" },
  { src: "assets/Images/super-mario-galaxy-2-caratula.jpeg",       title: "Super Mario Galaxy 2" },
  { src: "assets/Images/duck-hunt-diorama.jpeg",                   title: "Duck Hunt" },
  { src: "assets/Images/duck-hunt-cartucho.jpeg",                  title: "Duck Hunt" },
  { src: "assets/Images/contra-caratula.jpeg",                     title: "Contra" },
];

Object.assign(window, { L_PRODUCTS, L_REVIEWS, L_IG, L_THEMES, L_MARQUEE, carouselImages });

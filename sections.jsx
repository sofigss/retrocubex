/* sections.jsx — RetrocubeX landing */

const WALLAPOP_URL = "https://es.wallapop.com/app/search?keywords=retrocubex";
const VINTED_URL   = "https://www.vinted.es/";

/* ---------- NAV ---------- */
function Nav() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const links = [["catalogo", "Catálogo"], ["personaliza", "Personaliza"], ["hecho-a-mano", "Cómo se hace"], ["opiniones", "Opiniones"]];
  return (
    <header className="hd" id="site-header">
      <div className="wrap hd-inner hd-v2">
        <nav className="hd-left hd-nav">
          {links.map(([id, label]) => (
            <a key={id} className="hd-link" href={"#" + id}>{label}</a>
          ))}
        </nav>
        <div className="hd-center">
          <a href="#top"><Logo height={32} className="hd-logo" /></a>
        </div>
        <div className="hd-right">
          <button className="hd-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
          <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary hd-cta">
            Pide tu cubo
          </a>
          <a href={WALLAPOP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost hd-cta">
            Nuestra tienda
          </a>
        </div>
      </div>
      {menuOpen && (
        <nav className="hd-mob-menu">
          {links.map(([id, label]) => (
            <a key={id} className="hd-mob-link" href={"#" + id} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ---------- COVERFLOW ARCADE (destacados) ---------- */
const COVERFLOW_CUBES = [
  { name: "Duck Hunt", cat: "Videojuego · 1984",
    cover: "assets/Images/duck-hunt-diorama.jpeg",
    shots: ["assets/Images/duck-hunt-diorama.jpeg", "assets/Images/duck-hunt-cartucho.jpeg"] },
  { name: "Back to the Future", cat: "Película · 1985",
    cover: "assets/Images/back-to-the-future-diorama-frontal.jpeg",
    shots: ["assets/Images/back-to-the-future-diorama-frontal.jpeg", "assets/Images/back-to-the-future-diorama-lateral.jpeg", "assets/Images/back-to-the-future-caratula.jpeg"] },
  { name: "Street Fighter II", cat: "Videojuego · 1991",
    cover: "assets/Images/street-fighter-2-diorama-frontal.jpeg",
    shots: ["assets/Images/street-fighter-2-diorama-frontal.jpeg", "assets/Images/street-fighter-2-diorama-lateral.jpeg", "assets/Images/street-fighter-2-diorama-angulo.jpeg", "assets/Images/street-fighter-2-caratula.jpeg"] },
  { name: "Crazy Taxi", cat: "Videojuego · 1999",
    cover: "assets/Images/crazy-taxi-diorama-angulo.jpeg",
    shots: ["assets/Images/crazy-taxi-diorama-angulo.jpeg", "assets/Images/crazy-taxi-diorama-lateral.jpeg", "assets/Images/crazy-taxi-caratula.jpeg"] },
  { name: "Zelda: The Minish Cap", cat: "Videojuego · 2004",
    cover: "assets/Images/zelda-minish-cap-diorama-frontal.jpeg",
    shots: ["assets/Images/zelda-minish-cap-diorama-frontal.jpeg", "assets/Images/zelda-minish-cap-diorama-lateral.jpeg", "assets/Images/zelda-minish-cap-caratula.jpeg"] },
];

function CoverflowArcade() {
  const [active, setActive] = React.useState(2);
  const [lb, setLb] = React.useState(null);
  const dragRef = React.useRef({ down: false, startX: 0 });
  const total = COVERFLOW_CUBES.length;

  const go = React.useCallback((i) => setActive(((i % total) + total) % total), [total]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (lb) {
        const shots = COVERFLOW_CUBES[lb.cubeIdx].shots;
        if (e.key === "Escape") { setLb(null); return; }
        if (e.key === "ArrowLeft")  setLb(l => ({ ...l, imgIdx: (l.imgIdx - 1 + shots.length) % shots.length }));
        if (e.key === "ArrowRight") setLb(l => ({ ...l, imgIdx: (l.imgIdx + 1) % shots.length }));
      } else {
        if (e.key === "ArrowLeft")  go(active - 1);
        if (e.key === "ArrowRight") go(active + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, lb, go]);

  React.useEffect(() => {
    document.body.style.overflow = lb ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lb]);

  const getCardStyle = (offset) => {
    const abs = Math.abs(offset);
    if (abs === 0) return { transform: "translate(-50%,-50%) translateX(0%) rotateY(0deg) scale(1)", opacity: 1, zIndex: 20 };
    if (abs >= 2)  return { transform: `translate(-50%,-50%) translateX(${(offset > 0 ? 1 : -1) * 76}%) rotateY(${(offset > 0 ? -1 : 1) * 40}deg) scale(0.66)`, opacity: 0, zIndex: 18, pointerEvents: "none" };
    const dir = offset > 0 ? 1 : -1;
    return { transform: `translate(-50%,-50%) translateX(${dir * 46}%) rotateY(${-dir * 40}deg) scale(0.8)`, opacity: 0.7, zIndex: 19, pointerEvents: "auto" };
  };

  const onTouchStart = (e) => { dragRef.current = { down: true, startX: e.touches[0].clientX }; };
  const onTouchEnd   = (e) => {
    if (!dragRef.current.down) return;
    dragRef.current.down = false;
    const dx = e.changedTouches[0].clientX - dragRef.current.startX;
    if (Math.abs(dx) > 45) go(active + (dx < 0 ? 1 : -1));
  };
  const onMouseDown = (e) => { dragRef.current = { down: true, startX: e.clientX }; };
  const onMouseUp   = (e) => {
    if (!dragRef.current.down) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.down = false;
    if (Math.abs(dx) > 45) go(active + (dx < 0 ? 1 : -1));
  };

  const openLb  = (cubeIdx) => setLb({ cubeIdx, imgIdx: 0 });
  const closeLb = () => setLb(null);
  const lbGo    = (d) => setLb(l => {
    const shots = COVERFLOW_CUBES[l.cubeIdx].shots;
    return { ...l, imgIdx: (l.imgIdx + d + shots.length) % shots.length };
  });

  const ChevLeft  = () => React.createElement("svg", { width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("path",{d:"m15 18-6-6 6-6"}));
  const ChevRight = () => React.createElement("svg", { width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("path",{d:"m9 18 6-6-6-6"}));
  const XIcon     = () => React.createElement("svg", { width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round" }, React.createElement("path",{d:"M18 6 6 18M6 6l12 12"}));

  const activeCube = lb ? COVERFLOW_CUBES[lb.cubeIdx] : null;
  const singleShot = activeCube && activeCube.shots.length <= 1;

  return (
    <>
      <section className="rcx-cf">
        <div className="rcx-cf__grid" />
        <div className="rcx-cf__head">
          <div className="rcx-cf__eyebrow">★ Destacados ★</div>
          <h2 className="rcx-cf__title">Selecciona tu cubo</h2>
        </div>
        <div
          className="rcx-cf__stage"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <button className="rcx-cf__nav prev" type="button" onClick={() => go(active - 1)} aria-label="Anterior">
            <ChevLeft />
          </button>
          <div className="rcx-cf__cards">
            {COVERFLOW_CUBES.map((c, i) => {
              let offset = i - active;
              const half = Math.floor(total / 2);
              if (offset > half)  offset -= total;
              if (offset < -half) offset += total;
              return (
                <button
                  key={c.name}
                  className={"rcx-cf-card" + (i === active ? " is-active" : "")}
                  style={getCardStyle(offset)}
                  type="button"
                  aria-label={c.name}
                  onClick={() => { if (i === active) openLb(i); else go(i); }}
                >
                  <div className="rcx-cf-card__inner">
                    <img src={c.cover} alt={"Cubo diorama " + c.name} loading={i > 2 ? "lazy" : undefined} />
                    <span className="rcx-cf-card__dim" />
                    {c.shots.length > 1 && (
                      <span className="rcx-cf-card__shots">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                        </svg>
                        +{c.shots.length - 1}
                      </span>
                    )}
                    <span className="rcx-cf-card__meta">
                      <span className="rcx-cf-card__name">{c.name}</span>
                      <span className="rcx-cf-card__cat">{c.cat}</span>
                    </span>
                  </div>
                  <div className="rcx-cf-card__refl">
                    <img src={c.cover} alt="" aria-hidden="true" />
                  </div>
                </button>
              );
            })}
          </div>
          <button className="rcx-cf__nav next" type="button" onClick={() => go(active + 1)} aria-label="Siguiente">
            <ChevRight />
          </button>
        </div>
        <div className="rcx-cf__start"><span>▶ Press start</span></div>
        <div className="rcx-cf__dots">
          {COVERFLOW_CUBES.map((c, i) => (
            <button key={c.name} className={"rcx-cfdot" + (i === active ? " on" : "")} type="button" onClick={() => go(i)} aria-label={"Ir a " + c.name} />
          ))}
        </div>
      </section>

      {lb && (
        <div className="rcx-lb" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) closeLb(); }}>
          <div className="rcx-lb__bar">
            <div>
              <div className="rcx-lb__title">{activeCube.name}</div>
              <div className="rcx-lb__cat">{activeCube.cat}</div>
            </div>
            <button className="rcx-lb__close" type="button" onClick={closeLb} aria-label="Cerrar"><XIcon /></button>
          </div>
          <div className="rcx-lb__stage" onClick={(e) => { if (e.target === e.currentTarget) closeLb(); }}>
            {!singleShot && <button className="rcx-lb__nav prev" type="button" onClick={() => lbGo(-1)} aria-label="Anterior"><ChevLeft /></button>}
            <img key={lb.cubeIdx + "-" + lb.imgIdx} className="rcx-lb__img" src={activeCube.shots[lb.imgIdx]} alt={activeCube.name} />
            {!singleShot && <button className="rcx-lb__nav next" type="button" onClick={() => lbGo(1)} aria-label="Siguiente"><ChevRight /></button>}
          </div>
          {!singleShot && (
            <div className="rcx-lb__foot">
              <div className="rcx-lb__dots">
                {activeCube.shots.map((_, i) => (
                  <button key={i} type="button" className={"rcx-lb__dot" + (i === lb.imgIdx ? " on" : "")} onClick={() => setLb(l => ({ ...l, imgIdx: i }))} />
                ))}
              </div>
              <div className="rcx-lb__counter">
                <b>{String(lb.imgIdx + 1).padStart(2, "0")}</b> / {String(activeCube.shots.length).padStart(2, "0")}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* ---------- PRODUCT GALLERY LIGHTBOX ---------- */
function ProductGallery({ product, onClose }) {
  const [idx, setIdx] = React.useState(0);
  const shots = product.shots || [product.img];
  const single = shots.length <= 1;

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (!single) {
        if (e.key === "ArrowLeft")  setIdx(i => (i - 1 + shots.length) % shots.length);
        if (e.key === "ArrowRight") setIdx(i => (i + 1) % shots.length);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [single, shots.length, onClose]);

  const ChevLeft  = () => React.createElement("svg", { width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("path",{d:"m15 18-6-6 6-6"}));
  const ChevRight = () => React.createElement("svg", { width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("path",{d:"m9 18 6-6-6-6"}));
  const XIcon     = () => React.createElement("svg", { width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round" }, React.createElement("path",{d:"M18 6 6 18M6 6l12 12"}));

  return ReactDOM.createPortal(
    <div className="rcx-lb" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="rcx-lb__bar">
        <div>
          <div className="rcx-lb__title">{product.name}</div>
          <div className="rcx-lb__cat">{product.cat}</div>
        </div>
        <button className="rcx-lb__close" type="button" onClick={onClose} aria-label="Cerrar"><XIcon /></button>
      </div>
      <div className="rcx-lb__stage" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        {!single && <button className="rcx-lb__nav prev" type="button" onClick={() => setIdx(i => (i - 1 + shots.length) % shots.length)} aria-label="Anterior"><ChevLeft /></button>}
        <img key={idx} className="rcx-lb__img" src={shots[idx]} alt={product.name} />
        {!single && <button className="rcx-lb__nav next" type="button" onClick={() => setIdx(i => (i + 1) % shots.length)} aria-label="Siguiente"><ChevRight /></button>}
      </div>
      {!single && (
        <div className="rcx-lb__foot">
          <div className="rcx-lb__dots">
            {shots.map((_, i) => (
              <button key={i} type="button" className={"rcx-lb__dot" + (i === idx ? " on" : "")} onClick={() => setIdx(i)} />
            ))}
          </div>
          <div className="rcx-lb__counter">
            <b>{String(idx + 1).padStart(2, "0")}</b> / {String(shots.length).padStart(2, "0")}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}

/* ---------- FEATURED ---------- */
const CF_FEATURED_IDS = new Set(["rcx-001", "rcx-002", "rcx-003", "rcx-007", "rcx-008"]);

function LProductCard({ p, onAdd, onGallery }) {
  const out = p.stock === 0;
  return (
    <div className="pcard">
      <div
        className="top"
        onClick={() => onGallery && p.shots && onGallery(p)}
        style={p.shots ? { cursor: "pointer" } : undefined}
        role={p.shots ? "button" : undefined}
        aria-label={p.shots ? "Ver galería de " + p.name : undefined}
      >
        {p.badge && <Badge kind={p.badge}>{p.badge === "sale" ? "-25%" : "Nuevo"}</Badge>}
        {out && <span className="badge badge-out" style={{ position: "absolute", top: 12, left: 12, zIndex: 2 }}>Game Over</span>}
        {p.img
          ? <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          : <CubeScene hue={p.hue} size={104} scene={p.scene} />}
        {p.shots && p.shots.length > 1 && (
          <span className="rcx-cf-card__shots" style={{ opacity: 1, transform: "none" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
            +{p.shots.length - 1}
          </span>
        )}
      </div>
      <div className="body">
        <span className="pcard-cat" style={{ fontSize: 12 }}>{p.cat}{p.limited ? " · Edición limitada" : ""}</span>
        <h3 className="rcx-h4" style={{ fontSize: 20 }}>{p.name}</h3>
        <div className="price-row">
          <span>
            {p.old && <span className="price old">{p.old} €</span>}
            <span className="price" style={{ fontSize: 20 }}>{p.price} €</span>
          </span>
          {out && <span className="stock" style={{ color: "var(--rcx-danger)" }}>Agotado</span>}
        </div>
        <Button variant={out ? "dark" : "ghost"} className="btn-block"
          style={{ marginTop: 14, fontSize: 13, padding: "11px 18px" }}
          onClick={() => {
            const subject = out
              ? `Lista de espera: ${p.name}`
              : `Quiero pedir el cubo de ${p.name}`;
            const body = out
              ? `Hola RetrocubeX, quiero apuntarme a la lista de espera para el cubo de ${p.name}.`
              : `Hola RetrocubeX, quiero un cubo de ${p.name}.`;
            window.location.href = `mailto:retrocubex@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          }}>
          {out ? "Avísame" : "Pedir cubo"}
        </Button>
      </div>
    </div>
  );
}

function Featured({ onAdd }) {
  const [showAll, setShowAll] = React.useState(false);
  const [gallery, setGallery] = React.useState(null);
  const rest = L_PRODUCTS.filter(p => !CF_FEATURED_IDS.has(p.id));
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const MOBILE_LIMIT = 4;
  const limited = !showAll && isMobile;
  const visible = limited ? rest.slice(0, MOBILE_LIMIT) : rest;
  const hasMore = limited && rest.length > MOBILE_LIMIT;

  React.useEffect(() => {
    if (!showAll) return;
    requestAnimationFrame(() => {
      document.querySelectorAll("#catalogo .reveal:not(.in)").forEach(el => el.classList.add("in"));
    });
  }, [showAll]);

  return (
    <section id="catalogo" className="section wrap sec-pad">
      <div className="sec-head reveal">
        <div>
          <span className="rcx-eyebrow">Catálogo</span>
          <h2 className="rcx-h1 sec-title">Todos los cubos</h2>
        </div>
        <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          Pide el tuyo
        </a>
      </div>
      <div className="featured-grid">
        {visible.map((p, i) => (
          <div className={"reveal reveal-d" + ((i % 3) + 1)} key={p.id}>
            <LProductCard p={p} onAdd={onAdd} onGallery={setGallery} />
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="load-more-wrap">
          <button className="btn btn-ghost" onClick={() => setShowAll(true)}>
            Ver todos los cubos
          </button>
        </div>
      )}
      {gallery && <ProductGallery product={gallery} onClose={() => setGallery(null)} />}
    </section>
  );
}

/* ---------- CAROUSEL 3D ---------- */
const C3D_COLORS = [
  "84,238,192",
  "169,139,255",
  "87,216,255",
  "255,111,199",
  "79,168,255",
];

function Carousel3D() {
  const { useState, useEffect, useRef } = React;

  const items = carouselImages;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ startX: 0, moved: false, deltaX: 0 });
  const total = items.length;

  const go = (n) => setActive(i => (i + n + total) % total);

  /* autoplay */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 4000);
    return () => clearInterval(id);
  }, [paused, total]);

  /* drag handlers */
  const onMouseDown = (e) => {
    drag.current = { startX: e.clientX, moved: false, deltaX: 0 };
    setDragging(true);
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    drag.current.deltaX = e.clientX - drag.current.startX;
    if (Math.abs(drag.current.deltaX) > 8) drag.current.moved = true;
  };
  const onMouseUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (drag.current.moved && Math.abs(drag.current.deltaX) > 50)
      go(drag.current.deltaX < 0 ? 1 : -1);
  };

  /* 3D position per offset slot */
  const getStyle = (offset) => {
    const abs = Math.abs(offset);
    if (abs === 0) return { transform: "translateX(0) translateZ(0) rotateY(0deg) scale(1)", opacity: 1, zIndex: 5 };
    if (abs === 1) return { transform: `translateX(${offset * 22}vw) translateZ(-80px) rotateY(${-offset * 15}deg) scale(0.82)`, opacity: 0.85, zIndex: 5 };
    if (abs === 2) return { transform: `translateX(${offset * 38}vw) translateZ(-160px) rotateY(${-offset * 25}deg) scale(0.64)`, opacity: 0.6, zIndex: 4 };
    if (abs === 3) return { transform: `translateX(${offset * 52}vw) translateZ(-220px) rotateY(${-offset * 32}deg) scale(0.48)`, opacity: 0.35, zIndex: 3 };
    if (abs === 4) return { transform: `translateX(${offset * 64}vw) translateZ(-280px) rotateY(${-offset * 38}deg) scale(0.34)`, opacity: 0.15, zIndex: 2 };
    return { transform: `translateX(${offset * 75}vw) translateZ(-320px) scale(0.2)`, opacity: 0, zIndex: 1, pointerEvents: "none" };
  };

  const ci = active % C3D_COLORS.length;
  const ni = (active + 1) % C3D_COLORS.length;
  const bg = `radial-gradient(ellipse 80% 60% at 50% 60%, rgba(${C3D_COLORS[ci]},.18) 0%, rgba(${C3D_COLORS[ni]},.08) 55%, transparent 100%)`;
  const visible = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map(o => ({ offset: o, idx: (active + o + total) % total }));

  return (
    <section id="carousel" className="section sec-pad">
      <div className="sec-head wrap reveal" style={{ marginBottom: 48 }}>
        <div>
          <span className="rcx-eyebrow">Catálogo</span>
          <h2 className="rcx-h1 sec-title">Todos nuestros cubos</h2>
        </div>
        <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          Pide el tuyo
        </a>
      </div>

      <div
        className={"c3d-stage" + (dragging ? " c3d-stage--dragging" : "")}
        style={{ "--c3d-bg": bg }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setDragging(false); }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <div className="c3d-scene">
          {visible.map(({ offset, idx }) => (
            <div
              key={idx}
              className={"c3d-card" + (offset === 0 ? " c3d-card--active" : "")}
              style={getStyle(offset)}
              onClick={() => { if (!drag.current.moved && offset !== 0) go(offset); }}
            >
              <div className="c3d-img-wrap">
                <img src={items[idx].src} alt={items[idx].title} className="c3d-img" draggable="false" />
                {offset === 0 && (
                  <div className="c3d-label">{items[idx].title}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT'S MADE ---------- */
function HowMade() {
  const steps = [
    ["01", "Elige tu escena", "Más de 30 dioramas de juegos y pelis de culto. O cuéntanos tu idea para una pieza única."],
    ["02", "Lo montamos a mano", "Recortamos, pintamos y ensamblamos en un cubo de metacrilato. Sin atajos."],
    ["03", "Control de calidad", "Cada cubo pasa su “test de arranque” antes de salir. Numerado y firmado."],
    ["04", "Encargos personalizados", "¿Tienes un juego en mente? Lo diseñamos a medida, solo para ti."],
  ];
  return (
    <section id="hecho-a-mano" className="section wrap sec-pad">
      <div className="howmade">
        <div className="howmade-visual reveal">
          <img
            src="assets/Images/duck-hunt-making-2.jpeg"
            alt="Montaje a mano de un cubo RetrocubeX"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <span className="tag"><Icon name="Hammer" size={14} color="var(--rcx-mint)" /> Montaje a mano · impresión en papel de primera calidad</span>
        </div>
        <div className="reveal reveal-d1">
          <span className="rcx-eyebrow">Hecho a mano</span>
          <h2 className="rcx-h1 sec-title" style={{ marginBottom: 8 }}>Del píxel a tu estantería</h2>
          <p className="rcx-lead" style={{ maxWidth: 520, marginBottom: 18 }}>
            Nada de impresión en masa. Montamos cada cubo pieza a pieza en nuestro taller, como se hacían las cosas cuando los juegos venían en cartucho.
          </p>
          <div className="steps">
            {steps.map(([n, t, d]) => (
              <div className="step" key={n}>
                <span className="n">{n}</span>
                <span className="label">
                  <b className="rcx-h4">{t}</b>
                  <p className="rcx-small" style={{ marginTop: 6, lineHeight: 1.6 }}>{d}</p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CUSTOM CUBE BAND ---------- */
function CustomBand() {
  return (
    <section id="personaliza" className="customband wrap">
      <div className="customband-inner customband-center reveal">
        <div className="horizon-mini" />
        <span className="rcx-eyebrow">Pide tu cubo</span>
        <h2 className="rcx-h1 sec-title" style={{ marginBottom: 10 }}>¿No ves tu escena?</h2>
        <p className="rcx-lead" style={{ maxWidth: 500, textAlign: "center", margin: "0 auto" }}>
          Pide tu cubo <b style={{ color: "var(--rcx-fg1)" }}>100% personalizado</b>. Tu juego, tu peli, tu momento favorito — lo recreamos en píxel y lo llevamos a la realidad. Una pieza, tuya para siempre.
        </p>
        <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary pulse" style={{ fontSize: 16, padding: "16px 32px", marginTop: 32, justifySelf: "center", width: "fit-content" }}>
          Pide tu cubo personalizado
        </a>
        <p className="alt-contact">
          o escríbenos a <a href={MAILTO} className="alt-contact-link">retrocubex@gmail.com</a>
        </p>
      </div>
    </section>
  );
}

/* ---------- REVIEWS ---------- */
function Stars({ n }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span className="stars">{"★".repeat(n)}<span style={{ color: "var(--rcx-line)" }}>{"★".repeat(5 - n)}</span></span>
      <span style={{ fontFamily: "var(--rcx-font-mono)", fontSize: 11, color: "var(--rcx-fg3)", letterSpacing: ".04em" }}>{n}/5</span>
    </span>
  );
}
function Reviews() {
  return (
    <section id="opiniones" className="section wrap sec-pad">
      <div className="reveal" style={{ marginBottom: 28 }}>
        <span className="rcx-eyebrow">High scores</span>
        <h2 className="rcx-h1 sec-title">Lo que dicen de nosotras</h2>
      </div>
      <div className="score-strip reveal">
        {[["4,9", "sobre 5 estrellas"], ["98%", "lo recomiendan"], ["95%", "clientes satisfechos"], ["100%", "mejora de decoración retro"]].map(([num, lbl]) => (
          <div key={lbl} className="score-item">
            <span className="num">{num}</span>
            <span className="rcx-small score-lbl">{lbl}</span>
          </div>
        ))}
        <span className="stars score-stars" style={{ fontSize: 20 }}>★★★★★</span>
      </div>
      <HScrollWrap>
        <div className="reviews-grid">
        {L_REVIEWS.map((r, i) => (
          <div className={"review-card reveal reveal-d" + ((i % 3) + 1)} key={r.who}>
            <Stars n={r.stars} />
            <p className="review-text">{r.text}</p>
            <div className="review-who">
              <span className="review-avatar">{r.who.charAt(0)}</span>
              <span>
                <b className="rcx-h4" style={{ fontSize: 15 }}>{r.who}</b>
                <span className="rcx-small" style={{ display: "block", fontFamily: "var(--rcx-font-mono)", fontSize: 11 }}>Compra verificada</span>
              </span>
            </div>
          </div>
        ))}
        </div>
      </HScrollWrap>
    </section>
  );
}

/* ---------- INSTAGRAM ---------- */
function Instagram() {
  return (
    <section id="instagram" className="section wrap sec-pad">
      <div className="sec-head reveal" style={{ marginBottom: 32 }}>
        <div>
          <span className="rcx-eyebrow">@retrocubex</span>
          <h2 className="rcx-h1 sec-title">En tu feed</h2>
        </div>
        <a href="https://instagram.com/retrocubex" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          Síguenos
        </a>
      </div>
      <behold-widget feed-id="7WQBzwX9wYfDCE2dflBH"></behold-widget>
    </section>
  );
}

/* ---------- NEWSLETTER ---------- */
function Newsletter({ onCustom }) {
  return (
    <section className="section wrap" style={{ padding: "84px 28px 0" }}>
      <div className="reveal" style={{
        position: "relative", overflow: "hidden", borderRadius: "var(--rcx-radius-lg)",
        border: "1.5px solid var(--rcx-line)", padding: "52px 44px", textAlign: "center",
        background: "radial-gradient(120% 160% at 50% -20%, rgba(84,238,192,.16), transparent 60%), var(--rcx-panel)",
      }}>
        <PixelInvader px={4} color="var(--rcx-violet)" style={{ marginBottom: 26 }} />
        <h2 className="rcx-h1 sec-title" style={{ marginTop: 0 }}>No te pierdas un drop</h2>
        <p className="rcx-lead" style={{ maxWidth: 460, margin: "10px auto 24px" }}>
          Avisamos antes de que se agoten. Sin spam — palabra de gamer.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <input placeholder="tu@email.com" style={{
            background: "var(--rcx-void)", border: "1.5px solid var(--rcx-line)", borderRadius: 999,
            padding: "14px 22px", color: "var(--rcx-fg1)", fontFamily: "var(--rcx-font-body)",
            fontSize: 15, outline: "none", minWidth: 260,
          }} />
          <Button variant="primary" icon="Send" onClick={() => onCustom("newsletter")}>Apúntame</Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function FooterL() {
  return (
    <footer className="ft ft-simple">
      <div className="wrap">
        <div className="ft-simple-grid">
          <div className="ft-social-row">
            <a href="https://instagram.com/retrocubex" target="_blank" rel="noopener noreferrer" className="ft-link">
              <Icon name="Instagram" size={15} />Instagram
            </a>
            <a href={WALLAPOP_URL} target="_blank" rel="noopener noreferrer" className="ft-link">
              <img src="assets/Images/wallapop.png" alt="Wallapop" className="ft-brand-icon" />Wallapop
            </a>
            <a href={VINTED_URL} target="_blank" rel="noopener noreferrer" className="ft-link">
              <img src="assets/Images/vinted.png" alt="Vinted" className="ft-brand-icon ft-brand-icon--vinted" />Vinted
            </a>
          </div>
          <div className="ft-simple-brand">
            <Logo height={48} />
          </div>
          <div className="ft-backtotop-wrap">
            <a href="#top" className="ft-link ft-backtotop">
              <Icon name="ArrowUp" size={14} />Volver arriba
            </a>
          </div>
        </div>
        <div className="ft-simple-bottom">
          <span className="rcx-small">© 2026 RetrocubeX · Hecho con amor y paciencia.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- MOBILE STICKY CTA ---------- */
function MobileStickyFooter() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Cerca del top: siempre oculto. Si no, mostrar al bajar y ocultar
      // al subir, con un umbral para evitar parpadeos al soltar el dedo.
      if (y <= 350) setVisible(false);
      else if (y < lastY - 6) setVisible(false);   // scroll claro hacia arriba
      else if (y > lastY + 6) setVisible(true);     // scroll claro hacia abajo
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return ReactDOM.createPortal(
    <div className={"mobile-sticky-cta" + (visible ? " mobile-sticky-cta--in" : "")}>
      <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary pulse mobile-sticky-btn">
        Pide tu cubo
      </a>
    </div>,
    document.body
  );
}

/* ---------- FAQ ---------- */
const FAQ_ITEMS = [
  {
    q: "¿Qué tamaño tiene el cubo?",
    a: "8,5 × 8,5 cm de metacrilato transparente. Cabe perfectamente en una estantería, escritorio o vitrina — y queda brutal."
  },
  {
    q: "¿Cómo hago un pedido?",
    a: "Escríbenos a retrocubex@gmail.com o por Instagram (@retrocubex). Te respondemos en menos de 48h con todos los detalles."
  },
  {
    q: "¿Hacéis diseños personalizados?",
    a: "Sí, y es lo que más nos gusta. Cuéntanos tu juego, peli o momento favorito y lo recreamos. Cada cubo personalizado es una pieza única, tuya para siempre."
  },
  {
    q: "¿Cuánto tarda en llegar?",
    a: "El envío es de 24-48h una vez listo el montaje. Los pedidos personalizados pueden tardar unos días más según la complejidad del diseño — te avisamos siempre con antelación."
  },
  {
    q: "¿De qué está hecho?",
    a: "El diorama se imprime en papel de primera calidad, se recorta y monta a mano pieza a pieza, y se ensambla dentro de un cubo de metacrilato de 8,5 cm. Sin atajos, sin máquinas."
  },
  {
    q: "¿Envíais fuera de España?",
    a: "De momento trabajamos principalmente en España. Si estás fuera, escríbenos — lo intentamos."
  },
];

function FAQ() {
  const [open, setOpen] = React.useState(null);
  const toggle = (i) => setOpen(o => o === i ? null : i);

  return (
    <section id="faq" className="section wrap sec-pad">
      <div className="reveal" style={{ marginBottom: 40, textAlign: "center" }}>
        <span className="rcx-eyebrow">¿Tienes dudas?</span>
        <h2 className="rcx-h1 sec-title">Preguntas frecuentes</h2>
      </div>
      <div className="faq-list reveal reveal-d1">
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className={"faq-item" + (open === i ? " faq-item--open" : "")}>
            <button className="faq-q" type="button" onClick={() => toggle(i)} aria-expanded={open === i}>
              <span>{item.q}</span>
              <span className="faq-icon" aria-hidden="true">
                {open === i
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12h14"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                }
              </span>
            </button>
            <div className="faq-a">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Featured, LProductCard, Carousel3D, HowMade, CustomBand, Reviews, Instagram, Newsletter, FooterL, Stars, MobileStickyFooter, CoverflowArcade, FAQ });

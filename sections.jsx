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

/* ---------- FEATURED ---------- */
function LProductCard({ p, onAdd }) {
  const out = p.stock === 0;
  return (
    <div className="pcard">
      <div className="top">
        {p.badge && <Badge kind={p.badge}>{p.badge === "sale" ? "-25%" : "Nuevo"}</Badge>}
        {out && <span className="badge badge-out" style={{ position: "absolute", top: 12, left: 12, zIndex: 2 }}>Game Over</span>}
        {p.img
          ? <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          : <CubeScene hue={p.hue} size={104} scene={p.scene} />}
      </div>
      <div className="body">
        <h3 className="rcx-h4" style={{ fontSize: 18 }}>{p.name}</h3>
        <span className="rcx-small">{p.cat}{p.limited ? " · Edición limitada" : ""}</span>
        <div className="price-row">
          <span>
            {p.old && <span className="price old">{p.old} €</span>}
            <span className="price">{p.price} €</span>
          </span>
          {out && <span className="stock" style={{ color: "var(--rcx-danger)" }}>Agotado</span>}
        </div>
        <Button variant={out ? "dark" : "primary"} className="btn-block" disabled={out}
          style={{ marginTop: 14, fontSize: 13, padding: "11px 18px" }} icon={out ? null : "Plus"}
          onClick={() => { if (!out) onAdd(p); }}>
          {out ? "Avísame" : "Lo quiero"}
        </Button>
      </div>
    </div>
  );
}

const FEATURED_INITIAL = 5;

function Featured({ onAdd }) {
  const visible = L_PRODUCTS;

  return (
    <section id="catalogo" className="section wrap sec-pad">
      <div className="sec-head reveal">
        <div>
          <span className="rcx-eyebrow">Galería</span>
          <h2 className="rcx-h1 sec-title">Entra al mundo RetrocubeX</h2>
        </div>
      </div>
      <HScrollWrap>
        <div className="featured-grid">
          {visible.map((p, i) => (
            <div className={"reveal reveal-d" + ((i % 3) + 1)} key={p.id}>
              <LProductCard p={p} onAdd={onAdd} />
            </div>
          ))}
        </div>
      </HScrollWrap>
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
    ["04", "Llega en 24-48h", "Embalaje anti-golpes tipo cartucho."],
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
        <span className="rcx-eyebrow" style={{ color: "var(--rcx-magenta)" }}>Pide tu cubo</span>
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
  return <span className="stars">{"★".repeat(n)}<span style={{ color: "var(--rcx-line)" }}>{"★".repeat(5 - n)}</span></span>;
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
    const onScroll = () => setVisible(window.scrollY > 350);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={"mobile-sticky-cta" + (visible ? " mobile-sticky-cta--in" : "")}>
      <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary pulse mobile-sticky-btn">
        Pide tu cubo
      </a>
    </div>
  );
}

Object.assign(window, { Nav, Featured, LProductCard, Carousel3D, HowMade, CustomBand, Reviews, Instagram, Newsletter, FooterL, Stars, MobileStickyFooter });

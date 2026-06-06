/* heroes.jsx — hero directions + marquee band */

function PressStart({ children = "▸ PRESS START" }) {
  return <span className="press-start">{children}</span>;
}

function TrustBadges() {
  return (
    <div className="hero-trust">
      {[["Package", "Envío 24-48h"], ["Hand", "Hecho a mano"], ["Diamond", "Calidad premium"], ["ShieldCheck", "Edición numerada"]].map(([ic, txt]) => (
        <span key={txt}><Icon name={ic} size={15} color="var(--rcx-mint)" /> {txt}</span>
      ))}
    </div>
  );
}

function HeroCTAs({ t, align }) {
  return (
    <div className="hero-cta-row" style={align === "left" ? { justifyContent: "flex-start" } : null}>
      <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary pulse">
        {t.ctaPrimary}
      </a>
    </div>
  );
}

function Hero({ t }) {
  const layout = t.heroLayout;

  if (layout === "split") {
    return (
      <section className="hero-section hero-split">
        <div className="sun" />
        <div className="horizon" />
        <div className="wrap hero-grid">
          <div className="hero-copy reveal in">
            <span className="rcx-eyebrow">Cubos diorama · hechos a mano</span>
            <PressStart />
            <h1 className="rcx-display hero-h1">
              {t.heroLine1} <span className="holo">{t.heroLine2}</span>
            </h1>
            <p className="rcx-lead" style={{ maxWidth: 480 }} dangerouslySetInnerHTML={{ __html: t.heroSub }} />
            <HeroCTAs t={t} align="left" />
            <TrustBadges />
          </div>
          <div className="hero-stage reveal reveal-d2 in">
            <img className="float-sticker" src="assets/sticker-rcx.png" alt="" />
            <CubeScene hue={150} size={150} scene="portal" />
          </div>
        </div>
      </section>
    );
  }

  if (layout === "marquee") {
    return (
      <section className="hero-section hero-marquee">
        <div className="sun" />
        <div className="horizon" />
        <div className="wrap hero-inner">
          <PressStart />
          <img className="hero-disc reveal in" src="assets/sticker-rcx.png" alt="RetrocubeX — Press Start" />
          <h1 className="rcx-display hero-h1 reveal reveal-d1 in" style={{ fontSize: "clamp(38px,6vw,76px)", maxWidth: "16ch" }}>
            {t.heroLine1} <span className="holo">{t.heroLine2}</span>
          </h1>
          <p className="rcx-lead reveal reveal-d2 in" style={{ maxWidth: 560 }} dangerouslySetInnerHTML={{ __html: t.heroSub }} />
          <div className="reveal reveal-d3 in"><HeroCTAs t={t} /></div>
        </div>
        <div className="marquee big" style={{ marginTop: 44, borderColor: "transparent", background: "transparent" }}>
          <MarqueeTrack items={["Insert coin", "Revive el píxel", "Game over", "1-Up", "High score"]} stroke />
        </div>
      </section>
    );
  }

  // default: CENTRADO
  return (
    <section className="hero-section hero-centered">
      <div className="sun" />
      <div className="horizon" />
      <div className="wrap hero-inner">
        <PressStart />
        <h1 className="rcx-display hero-h1 reveal in">
          {t.heroLine1}<br /><span className="holo">{t.heroLine2}</span>
        </h1>
        <p className="rcx-lead reveal reveal-d1 in" style={{ maxWidth: 580 }} dangerouslySetInnerHTML={{ __html: t.heroSub }} />
        <div className="reveal reveal-d2 in"><HeroCTAs t={t} /></div>
        <div className="reveal reveal-d3 in"><TrustBadges /></div>
      </div>
    </section>
  );
}

function MarqueeTrack({ items, stroke }) {
  const row = (
    <span className="marquee-track" aria-hidden={false}>
      {[...items, ...items].map((it, i) => (
        <span className="item" key={i}>
          {it}{!stroke && <span className="dot">✦</span>}
        </span>
      ))}
    </span>
  );
  return row;
}

function MarqueeBand() {
  return (
    <div className="marquee">
      <MarqueeTrack items={L_MARQUEE} />
    </div>
  );
}

Object.assign(window, { Hero, MarqueeBand, MarqueeTrack, PressStart, TrustBadges, HeroCTAs });

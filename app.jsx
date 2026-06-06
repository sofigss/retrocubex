/* app.jsx — RetrocubeX landing */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "photo",
  "accent": "#54EEC0",
  "bgTexture": "classic",
  "anim": "full",
  "heroLine1": "Revive",
  "heroLine2": "el píxel",
  "heroSub": "Cubos diorama de tus videojuegos y pelis favoritas, montados a mano y hechos con cariño. Edición limitada <b style=\"color:var(--rcx-violet)\">¡Consigue el tuyo!</b>.",
  "ctaPrimary": "Pide tu cubo",
  "showFeatured": true,
  "showCarousel": true,
  "showHowMade": true,
  "showCustom": true,
  "showReviews": true,
  "showInstagram": true,
  "showNewsletter": true
}/*EDITMODE-END*/;

const ACCENTS = {
  "#54EEC0": { deep: "#1F9C7C", glow: "0 0 0 1px rgba(84,238,192,.5), 0 0 24px -2px rgba(84,238,192,.55)" },
  "#57D8FF": { deep: "#2D5FCC", glow: "0 0 0 1px rgba(87,216,255,.5), 0 0 24px -2px rgba(87,216,255,.55)" },
  "#A98BFF": { deep: "#6E4FE0", glow: "0 0 0 1px rgba(169,139,255,.5), 0 0 24px -2px rgba(169,139,255,.55)" },
  "#FF6FC7": { deep: "#C7407F", glow: "0 0 0 1px rgba(255,111,199,.5), 0 0 24px -2px rgba(255,111,199,.55)" },
};
const BG_TEX = {
  minimal: { "--tex-scan": ".1", "--tex-star": ".26" },
  classic: { "--tex-scan": ".35", "--tex-star": ".7" },
  max:     { "--tex-scan": ".58", "--tex-star": "1" },
};

function useReveal(deps) {
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal:not(.in)"));
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, deps);
}

function useHeaderScroll() {
  React.useEffect(() => {
    let lastY = window.scrollY;
    const hd = document.getElementById("site-header");
    if (!hd) return;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 80) hd.classList.add("hd--hidden");
      else hd.classList.remove("hd--hidden");
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [toast, setToast] = React.useState(null);
  const toastTimer = React.useRef(null);

  const fire = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };
  const onAdd    = (p)    => fire(`▸ ${p.name} en tu lista`);
  const onCustom = (pick) => fire(pick === "newsletter"
    ? "▸ ¡Apuntado! Te avisamos del próximo drop"
    : pick ? `▸ Boceto en camino · ${pick}` : "▸ Pide tu cubo · te respondemos en 48h");

  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = t.anim === "off" ? "auto" : "smooth";
  }, [t.anim]);

  useReveal([t.heroLayout, t.showFeatured, t.showGallery, t.showHowMade, t.showCustom, t.showReviews, t.showInstagram, t.showNewsletter, t.anim]);
  useHeaderScroll();

  const acc = ACCENTS[t.accent] || ACCENTS["#54EEC0"];
  const rootStyle = {
    "--rcx-mint": t.accent,
    "--rcx-mint-deep": acc.deep,
    "--rcx-glow-mint": acc.glow,
    ...BG_TEX[t.bgTexture],
  };

  return (
    <div id="top" className={"rcx-page anim-" + t.anim} style={rootStyle}>
      <div className="starfield" />

      <Nav />
      <Hero t={t} />
      {t.anim !== "off" && <MarqueeBand />}
      <CoverflowArcade />

      {t.showFeatured  && <Featured onAdd={onAdd} />}
      {t.showHowMade   && <HowMade />}
      {t.showReviews   && <Reviews />}
      {t.showInstagram && <Instagram />}

      <FAQ />
      {t.showCustom    && <CustomBand />}
      <FooterL />
      <MobileStickyFooter />

      <div className={"toast" + (toast ? " on" : "")}>{toast}</div>

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakRadio label="Diseño del hero" value={t.heroLayout}
          options={[{ value: "photo", label: "Foto" }, { value: "centered", label: "Centrado" }, { value: "split", label: "Cubo" }, { value: "marquee", label: "Disco" }]}
          onChange={(v) => setTweak("heroLayout", v)} />
        <TweakText label="Titular · línea 1" value={t.heroLine1} onChange={(v) => setTweak("heroLine1", v)} />
        <TweakText label="Titular · línea 2" value={t.heroLine2} onChange={(v) => setTweak("heroLine2", v)} />
        <TweakText label="Subtítulo" value={t.heroSub} onChange={(v) => setTweak("heroSub", v)} />
        <TweakText label="CTA principal" value={t.ctaPrimary} onChange={(v) => setTweak("ctaPrimary", v)} />

        <TweakSection label="Estilo" />
        <TweakColor label="Color neón" value={t.accent}
          options={["#54EEC0", "#57D8FF", "#A98BFF", "#FF6FC7"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakRadio label="Textura de fondo" value={t.bgTexture}
          options={[{ value: "minimal", label: "Mínimo" }, { value: "classic", label: "Clásico" }, { value: "max", label: "Máximo" }]}
          onChange={(v) => setTweak("bgTexture", v)} />
        <TweakRadio label="Animación" value={t.anim}
          options={[{ value: "off", label: "Off" }, { value: "subtle", label: "Sutil" }, { value: "full", label: "Full" }]}
          onChange={(v) => setTweak("anim", v)} />

        <TweakSection label="Secciones" />
        <TweakToggle label="Catálogo completo"  value={t.showFeatured}   onChange={(v) => setTweak("showFeatured", v)} />
        <TweakToggle label="Cómo se hace"      value={t.showHowMade}    onChange={(v) => setTweak("showHowMade", v)} />
        <TweakToggle label="Opiniones"         value={t.showReviews}    onChange={(v) => setTweak("showReviews", v)} />
        <TweakToggle label="Instagram"         value={t.showInstagram}  onChange={(v) => setTweak("showInstagram", v)} />
        <TweakToggle label="Edición de uno"    value={t.showCustom}     onChange={(v) => setTweak("showCustom", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

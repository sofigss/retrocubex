/* ui.jsx — RetrocubeX shared primitives (global scope) */

function Icon({ name, size = 20, stroke = 1.75, color = "currentColor", style }) {
  const lib = window.lucide && window.lucide.icons;
  const node = lib && (lib[name] || lib[name?.charAt(0).toUpperCase() + name?.slice(1)]);
  if (!node) return null;
  // lucide IconNode = ["svg", attrs, [ [tag, attrs], ... ]]
  const children = (Array.isArray(node) && Array.isArray(node[2])) ? node[2]
    : (node.iconNode || []);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {children.map((c, i) => React.createElement(c[0], { key: i, ...c[1] }))}
    </svg>
  );
}

function Button({ variant = "primary", children, className = "", icon, ...rest }) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...rest}>
      {icon && <Icon name={icon} size={17} />}
      {children}
    </button>
  );
}

function Badge({ kind = "new", children }) {
  return <span className={`badge badge-${kind}`}>{children}</span>;
}

function Logo({ height = 26, light = true, style }) {
  return <img src={`assets/logo-${light ? "light" : "dark"}.png`} alt="RetrocubeX"
    style={{ height, display: "block", ...style }} />;
}

/* Pixel Space-Invader sprite via box-shadow */
function PixelInvader({ px = 4, color = "var(--rcx-mint)", style }) {
  const grid = [
    "00100000100", "00010001000", "00111111100", "01101110110",
    "11111111111", "10111111101", "10100000101", "00011011000",
  ];
  const shadows = [];
  grid.forEach((row, y) => row.split("").forEach((c, x) => {
    if (c === "1") shadows.push(`${x * px}px ${y * px}px 0 ${color}`);
  }));
  return (
    <span style={{ display: "inline-block", width: px, height: px,
      marginRight: px * 10, marginBottom: px * 7,
      boxShadow: shadows.join(","), ...style }} />
  );
}

/* Stylized diorama-cube scene used as product placeholder imagery.
   (Real product photography would replace these.) */
function CubeScene({ hue = 0, size = 116, scene = "default", style }) {
  const stars = React.useMemo(() =>
    Array.from({ length: 7 }, () => ({
      l: Math.random() * 100, t: Math.random() * 55, o: 0.3 + Math.random() * 0.5,
    })), []);
  return (
    <div className="cube-scene" style={{ width: "100%", height: "100%", filter: `hue-rotate(${hue}deg)`, ...style }}>
      {stars.map((s, i) => (
        <span key={i} className="star" style={{ left: s.l + "%", top: s.t + "%", opacity: s.o }} />
      ))}
      <div className="grid" />
      <div className="cube" style={{ width: size, height: size }} />
    </div>
  );
}

Object.assign(window, { Icon, Button, Badge, Logo, PixelInvader, CubeScene });

import { useState, useEffect, useRef } from 'react';

// ── Previews ──────────────────────────────────────────────────────────────────
const PREVIEW_IMAGES = {
  'happy-campers':        '/previews/Happy_Campers.png',
  'job-search-dashboard': '/previews/Job_Dashboard.png',
};

// ── Pentagon clip-paths ───────────────────────────────────────────────────────
const UP_PENT   = 'polygon(50% 0%, 100% 38%, 80% 100%, 20% 100%, 0% 38%)';
const DOWN_PENT = 'polygon(20% 0%, 80% 0%, 100% 62%, 50% 100%, 0% 62%)';

// ── Zipper layout — upper-edge interlock ─────────────────────────────────────
//
//   Pentagon = triangle (tip) atop a trapezoid (base).
//   UP_PENT: tip at top (y=0), shoulders at y=38%H, flat base at y=100%H.
//   DOWN_PENT: flat top at y=0, shoulders at y=62%H, tip at bottom (y=100%H).
//
//   For ▲'s UPPER right edge and ▽'s LOWER left edge to be GEOMETRICALLY
//   COINCIDENT (same segment, same endpoints):
//
//     ▲ upper-right: (0.5W, 0) → (W, 0.38H)    slope = 0.76 H/W
//     ▽ lower-left:  (0.5W, H) → (0,  0.62H)   slope = 0.76 H/W  ← same!
//
//   Setting ▽ at bx = 0.5W, by = −0.62H (relative to ▲) makes both segments
//   identical.  Equivalently: fix ▽ panels at by = 0 and drop ▲ panels to
//   by = 0.62H, so nothing goes above y = 0.
//
//   Key consequence — ▽'s left shoulder = ▲'s tip, ▽'s tip = ▲'s right shoulder:
//     ▽ left shoulder  (dx,       dy + 0.62H) = (0.5W, 0.62H) = ▲ tip  ✓
//     ▽ tip            (dx + 0.5W, dy + H)    = (W,    0.62H + H − H)
//                                              = (W,    0.38H + 0.62H) …
//   Concretely with W=160, H=152, SH2=94:
//     ▲₀ tip at (80, 94)  =  ▽₀ left shoulder  ✓
//     ▽₀ tip at (160, 152) = ▲₀ right shoulder = ▲₁ left shoulder ✓
//
//   STEP between same-type panels = W (panels butt up; no gap needed because
//   clip-paths guarantee the visual shapes never overlap).
//   ROW_H = H + SH2 = 1.62 · H.

const W     = 160;                       // panel bounding-box width  (px)
const H     = 152;                       // panel bounding-box height (px)
const SH2   = Math.round(0.62 * H);     // ▲ vertical offset in container = 94 px
const G     = 64;                        // air gap between adjacent panels (px)
const STEP  = W + G;                     // same-type step = 224 px
const ROW_H = H + SH2;                  // container height = 246 px

//   With gap G, ▽ is offset from the zero-gap position (0.5W) by G/2 to the
//   right, keeping it centred between its two ▲ neighbours.
//   The perpendicular edge gap ≈ (G/2) · cos(35.8°) ≈ 0.81 · G/2 ≈ 10 px.

function panelPos(i) {
  if (i % 2 === 0) {
    // ▲ panels — at bottom of container, tips pointing UP into ▽ gap
    return { bx: (i / 2) * STEP, by: SH2, isFlipped: false };
  } else {
    // ▽ panels — at top of container, centred between neighbouring ▲ panels
    return { bx: Math.round(STEP / 2) + Math.floor(i / 2) * STEP, by: 0, isFlipped: true };
  }
}

function rowWidth(n) {
  if (n === 0) return 0;
  const last = panelPos(n - 1);
  return last.bx + W;
}

// ── Palette ───────────────────────────────────────────────────────────────────
const GREEN     = '#39FF14';
const GREEN_DIM = '#1CB800';
const GLOW_A    = 'rgba(82, 255, 51, 0.90)';
const GLOW_B    = 'rgba(18, 122, 0, 0.45)';

function neonFilter(strong) {
  return strong
    ? `drop-shadow(0 0 4px rgba(180,255,100,0.95)) drop-shadow(0 0 14px ${GLOW_A}) drop-shadow(0 0 32px ${GLOW_B})`
    : `drop-shadow(0 0 3px ${GLOW_A}) drop-shadow(0 0 9px ${GLOW_B})`;
}

// ── Reverberation ─────────────────────────────────────────────────────────────
const REVERB = [1.18, 0.90, 0.95, 0.98];
function reverbScale(index, hovered) {
  if (hovered === null) return 1;
  return REVERB[Math.min(Math.abs(index - hovered), REVERB.length - 1)];
}

// ── Animation ─────────────────────────────────────────────────────────────────
const STAGGER_MS  = 300;
const ENTRANCE_MS = 950;

// ─────────────────────────────────────────────────────────────────────────────
export default function SkillBars({ skillGroups }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  let globalIdx = 0;

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {skillGroups.map(group => (
        <div key={group.category}>
          <p style={{
            fontSize: '10px', fontWeight: 600, color: '#6B7280',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px',
          }}>
            {group.category}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {group.skills.map(skill => {
              const offset = globalIdx;
              globalIdx += skill.projects.length;
              return <SkillRow key={skill.name} skill={skill} visible={visible} globalOffset={offset} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function SkillRow({ skill, visible, globalOffset }) {
  const [hovered, setHovered] = useState(null);
  const n = skill.projects.length;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      {/* Skill label — vertically centred next to the 210px-tall row */}
      <div style={{ width: '110px', textAlign: 'right', flexShrink: 0 }}>
        <span style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 500 }}>
          {skill.name}
        </span>
      </div>

      {/*
        Pentagon zipper container.
        Children are absolutely positioned; overflow is visible so the
        neon glow and hover-scale don't get clipped.
      */}
      <div style={{
        position: 'relative',
        width:    `${rowWidth(n)}px`,
        height:   `${ROW_H}px`,
        flexShrink: 0,
        overflow: 'visible',
      }}>
        {skill.projects.map((project, i) => {
          const { bx, by, isFlipped } = panelPos(i);
          return (
            <PentagonPanel
              key={project.id}
              project={project}
              index={i}
              bx={bx}
              by={by}
              isFlipped={isFlipped}
              hovered={hovered}
              setHovered={setHovered}
              visible={visible}
              animDelay={(globalOffset + i) * STAGGER_MS}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function PentagonPanel({ project, index, bx, by, isFlipped, hovered, setHovered, visible, animDelay }) {
  const isHov      = hovered === index;
  const previewUrl = PREVIEW_IMAGES[project.id] ?? null;
  const name       = project.projectName || project.title;
  const sc         = visible ? reverbScale(index, hovered) : 0.55;

  // Entrance uses slow spring + per-panel stagger.
  // Hover reverberation uses fast spring with no delay.
  const transition = !visible
    ? `transform ${ENTRANCE_MS}ms cubic-bezier(0.34,1.56,0.64,1) ${animDelay}ms,`
      + ` opacity ${Math.round(ENTRANCE_MS * 0.55)}ms ease ${animDelay}ms`
    : hovered !== null
      ? 'transform 0.20s cubic-bezier(0.34,1.3,0.64,1), filter 0.20s ease'
      : 'transform 0.32s ease, filter 0.32s ease';

  // Tagline = everything after the first ': ' in the blog post title
  const colonIdx = project.title.indexOf(': ');
  const tagline  = colonIdx !== -1 ? project.title.slice(colonIdx + 2) : null;

  // Push text into the wide trapezoid band, away from the pointy apex
  const apexPad = isFlipped
    ? { paddingTop: '10px',  paddingBottom: '30px' }   // ▽ tip is at the bottom
    : { paddingTop: '30px',  paddingBottom: '10px' };  // ▲ tip is at the top

  return (
    <div
      style={{
        position:        'absolute',
        left:            `${bx}px`,
        top:             `${by}px`,
        width:           `${W}px`,
        height:          `${H}px`,
        zIndex:           isHov ? 100 : index,
        opacity:          visible ? 1 : 0,
        transform:       `scale(${sc}) translateY(${visible ? 0 : -26}px)`,
        transformOrigin: 'center center',
        filter:           neonFilter(isHov),
        transition,
        cursor:          'pointer',
      }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
    >
      <a
        href={`/blog/${project.id}`}
        aria-label={name}
        style={{
          display:         'block',
          width:           '100%',
          height:          '100%',
          clipPath:         isFlipped ? DOWN_PENT : UP_PENT,
          backgroundColor:  isHov && !previewUrl ? GREEN_DIM : GREEN,
          transition:      'background-color 0.2s ease',
          position:        'relative',
          overflow:        'hidden',
          textDecoration:  'none',
        }}
      >
        {/* Screenshot — ghosted at rest, full opacity on hover */}
        {previewUrl && (
          <img
            src={previewUrl}
            alt={name}
            style={{
              position:       'absolute',
              inset:           0,
              width:          '100%',
              height:         '100%',
              objectFit:      'cover',
              objectPosition: 'top center',
              opacity:         isHov ? 1 : 0.45,
              transition:     'opacity 0.45s ease',
              pointerEvents:  'none',
              userSelect:     'none',
              display:        'block',
            }}
          />
        )}

        {/* Specular shine on hover */}
        <div style={{
          position:   'absolute',
          inset:       0,
          background: 'linear-gradient(140deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.08) 38%, transparent 65%)',
          opacity:     isHov ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }} />

        {/* Default label — project name at rest */}
        <div style={{
          position:       'absolute',
          inset:           0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          ...apexPad,
          opacity:         isHov ? 0 : 1,
          transition:     'opacity 0.18s ease',
          pointerEvents:  'none',
        }}>
          <span style={{
            fontSize:      '9px',
            fontWeight:     800,
            color:         'rgba(0,30,10,0.75)',
            letterSpacing: '0.04em',
            textAlign:     'center',
            lineHeight:     1.3,
            wordBreak:     'break-word',
            maxWidth:      '72px',
            userSelect:    'none',
            textTransform: 'uppercase',
          }}>
            {name}
          </span>
        </div>

        {/* Hover info card — only for panels without a screenshot */}
        {!previewUrl && (
          <div style={{
            position:       'absolute',
            inset:           0,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            textAlign:      'center',
            paddingLeft:    '18px',
            paddingRight:   '18px',
            ...apexPad,
            opacity:         isHov ? 1 : 0,
            transition:     'opacity 0.25s ease',
            pointerEvents:  'none',
          }}>
            <p style={{
              fontSize:      '11px',
              fontWeight:     800,
              color:         'rgba(255,255,255,0.97)',
              margin:         0,
              lineHeight:     1.2,
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}>
              {name}
            </p>
            {tagline && (
              <p style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.65)', margin: '5px 0 0', lineHeight: 1.4 }}>
                {tagline}
              </p>
            )}
          </div>
        )}
      </a>
    </div>
  );
}

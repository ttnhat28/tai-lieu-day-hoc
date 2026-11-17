/*! Tài liệu dạy học — thư viện vẽ hình (GEO ENGINE) + xuất PDF + tự dựng khung trang v3.5
 *  Nạp: thẻ script với src = https://cdn.jsdelivr.net/gh/ttnhat28/tai-lieu-day-hoc@v3.5/tldh.js
 *  Tự nạp MathJax, html-to-image, jsPDF; tự tạo thanh nút + 2 tab (#tab-exam, #tab-solution).
 *  API: Geo.draw / Geo.bbt / Geo.numline / Geo.chart / Geo.tree; switchTab, downloadPDF, downloadPrintHTML
 */
(function () {
  if (document.getElementById('doc-style')) return;
  const st = document.createElement('style'); st.id = 'doc-style';
  st.textContent = `*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0}
body{background:#eef2f6;color:#000}
body,p,div,span,td,th,h1,h2,h3,li,button{font-family:"Times New Roman",Times,serif}
.toolbar{position:sticky;top:0;z-index:50;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;padding:10px;background:#fff;border-bottom:1px solid #cbd5e1;box-shadow:0 2px 10px rgba(15,23,42,.06)}
.toolbar button{border:1px solid #cbd5e1;background:#fff;color:#1e293b;padding:8px 14px;border-radius:6px;font-size:14.5px;font-weight:bold;cursor:pointer}
.toolbar button.active{background:#1e3a8a;color:#fff;border-color:#1e3a8a}
.toolbar .b-exam{background:#0f766e;color:#fff;border-color:#0f766e}
.toolbar .b-sol{background:#b91c1c;color:#fff;border-color:#b91c1c}
.toolbar .b-html{background:#334155;color:#fff;border-color:#334155}
.toolbar button:disabled{opacity:.7;cursor:wait}
.paper{width:794px;max-width:100%;margin:16px auto 40px;background:#fff;padding:45px 57px;box-shadow:0 8px 28px rgba(15,23,42,.09)}
@media (max-width:820px){.paper{padding:18px 14px}}
.tab-hidden{display:none!important}
.doc{font-size:13pt;line-height:1.6;color:#0f172a;text-align:left;overflow-wrap:break-word}
.doc p{margin:0 0 4px}
.exam-header{text-align:center;border-bottom:1.5px solid #0f172a;padding-bottom:10px;margin-bottom:14px}
.exam-header h1{font-size:15.5pt;font-weight:bold;margin:0 0 4px;text-transform:uppercase;text-align:center}
.exam-header .exam-meta{font-style:italic;margin:0;text-align:center}
.section-title{font-weight:bold;font-size:13.5pt;margin:16px 0 8px;padding-bottom:3px;border-bottom:1px solid #cbd5e1}
.question-block{margin:0 0 12px}
.question-text{margin:0 0 4px}
.options-grid{display:grid;gap:2px 14px;margin:2px 0 2px 16px}
.opts-4{grid-template-columns:repeat(4,minmax(0,1fr))}.opts-2{grid-template-columns:repeat(2,minmax(0,1fr))}.opts-1{grid-template-columns:1fr}
.tf-list{margin:2px 0 2px 16px}.tf-list div{margin:1px 0}
.short-answer-line{margin:4px 0 0 16px;font-weight:bold}
.figure-box{display:flex;justify-content:center;margin:8px 0}
.figure-box svg{max-width:100%;height:auto;overflow:visible}
.summary-box{background:#f8fafc;border:1px solid #94a3b8;border-radius:6px;padding:12px 16px;margin:0 0 16px}
.summary-box h2,.theory-box h2{font-size:13.5pt;font-weight:bold;margin:0 0 8px;text-transform:uppercase}
.summary-box h2{color:#1e3a8a}
.ans-group-title{font-weight:bold;margin:8px 0 4px}
.ans-flex{display:flex;flex-wrap:wrap;gap:6px 10px;margin-bottom:6px}
.ans-item{display:inline-block;background:#fff;border:1px solid #cbd5e1;border-radius:4px;padding:2px 9px;font-weight:bold;white-space:nowrap}
.ans-tf-row{margin:3px 0 3px 12px}
.theory-box{background:#fffbeb;border:1px solid #f59e0b;border-radius:6px;padding:12px 16px;margin:0 0 18px}
.theory-box h2{color:#92400e}
.theory-box ul{margin:0;padding-left:20px}.theory-box li{margin-bottom:4px}
.solution-item{margin:0 0 14px;padding-bottom:10px;border-bottom:1px dashed #cbd5e1}
.solution-header{font-weight:bold;color:#1e3a8a;margin:0 0 3px}
.solution-label{display:block;font-weight:bold;font-style:italic;text-decoration:underline;margin:0 0 4px}
.solution-step{margin:3px 0}
.step-chain{margin:4px 0 4px 22px}
.final-ans{font-weight:bold;color:#b91c1c;margin:8px 0 0}
.bbt{border-collapse:collapse;table-layout:fixed;margin:8px auto;border:1px solid #000}
.bbt td{text-align:center;vertical-align:middle;padding:3px 0;font-size:12.5pt;position:relative}
.bbt tr+tr td{border-top:1px solid #000}
.bbt td.lab{border-right:1px solid #000}
.bbt .yv{display:flex;flex-direction:column;justify-content:center;align-items:center}
.bbt .yv.t{justify-content:flex-start;padding-top:3px}.bbt .yv.b{justify-content:flex-end;padding-bottom:3px}
.bbt .ysplit{display:flex;justify-content:space-between}.bbt .ysplit .yv{width:48%}
.bbt .dbar{position:absolute;left:50%;top:0;bottom:0;width:5px;margin-left:-2.5px;border-left:1px solid #000;border-right:1px solid #000}
mjx-container[display="true"]{margin:4px 0!important;overflow-x:auto;overflow-y:hidden;max-width:100%}
.pdf-host{position:fixed;left:-12000px;top:0;z-index:-1}
.pdf-sheet{position:relative;width:680px;display:flow-root;background:#fff;padding:0;margin:0}
.data-table{border-collapse:collapse;margin:6px auto}.data-table td,.data-table th{border:1px solid #000;padding:3px 10px;text-align:center}.data-table th{background:#f1f5f9}
.doc h2,.doc h3{font-size:13.5pt;margin:12px 0 6px}
.doc table:not(.bbt){border-collapse:collapse;margin:6px auto}.doc table:not(.bbt) td,.doc table:not(.bbt) th{border:1px solid #000;padding:3px 8px}
.doc img{max-width:100%}
.doc h1{font-size:15.5pt;text-align:center;margin:0 0 6px}
.doc .header,.doc header{text-align:center;border-bottom:1.5px solid #0f172a;padding-bottom:8px;margin-bottom:12px}
`;
  (document.head || document.documentElement).appendChild(st);
})();
(function () {
'use strict';
/* ===================== GEO ENGINE v3.5 (SVG) ===================== */
const Geo = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const nrm = a => Math.hypot(a[0], a[1], a[2]), unit = a => mul(a, 1 / (nrm(a) || 1));
  const lerp = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  const d2 = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  const segDist = (p, a, b) => { const vx = b[0] - a[0], vy = b[1] - a[1], L = vx * vx + vy * vy || 1e-12; let t = ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / L; t = Math.max(0, Math.min(1, t)); return Math.hypot(p[0] - a[0] - t * vx, p[1] - a[1] - t * vy); };
  const tok = s => Array.isArray(s) ? s : (String(s).match(/_[A-Za-z][0-9]*'*|[A-Z][0-9]*'*/g) || []); // tên điểm: A, A1, A', _T (ẩn)
  const el = (tag, at, parent) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (parent) parent.appendChild(e); return e; };
  const pathD = pts => 'M' + pts.map(p => (+p[0]).toFixed(2) + ' ' + (+p[1]).toFixed(2)).join(' L');
  const FONT = '"Times New Roman", Times, serif';
  const host$ = t => { let h = typeof t === 'string' ? document.getElementById(t) : t; if (h && (h.tagName === 'CANVAS' || h.tagName === 'svg' || h.tagName === 'IMG')) { const d = document.createElement('div'); d.id = h.id; d.className = 'figure-box'; h.replaceWith(d); h = d; } return h; };
  const fail = (h, e) => { console.error(e); if (h) h.innerHTML = '<div style="color:#b91c1c;font-size:11pt">⚠ Lỗi vẽ hình: ' + String(e && e.message || e).replace(/</g, '&lt;') + '</div>'; };
  // Chữ có chỉ số: R_1, U_{AB}, x^2, F_{ms}
  function rich(t, txt, size) {
    const s = String(txt), parts = []; let i = 0;
    while (i < s.length) {
      const ch = s[i];
      if ((ch === '_' || ch === '^') && i + 1 < s.length) { let seg; if (s[i + 1] === '{') { const k = s.indexOf('}', i + 1); seg = s.slice(i + 2, k < 0 ? s.length : k); i = k < 0 ? s.length : k + 1; } else { seg = s[i + 1]; i += 2; } parts.push({ s: seg, m: ch === '_' ? 1 : 2 }); }
      else { let j = i; while (j < s.length && s[j] !== '_' && s[j] !== '^') j++; if (j === i) j++; parts.push({ s: s.slice(i, j), m: 0 }); i = j; }
    }
    if (parts.every(p => !p.m)) { t.textContent = s; return; }
    let cur = 0; parts.forEach(p => { const ts = el('tspan', {}, t), tg = p.m === 1 ? size * 0.32 : p.m === 2 ? -size * 0.4 : 0; ts.setAttribute('dy', (tg - cur).toFixed(1)); cur = tg; if (p.m) ts.setAttribute('font-size', (size * 0.7).toFixed(1)); ts.textContent = p.s; });
  }

  function hull2(q, e) {
    q = q.slice().sort((a, b) => a.x - b.x || a.y - b.y); if (q.length < 3) return q;
    const cr = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x), lo = [], up = [];
    for (const p of q) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= e) lo.pop(); lo.push(p); }
    for (const p of q.slice().reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= e) up.pop(); up.push(p); }
    return lo.slice(0, -1).concat(up.slice(0, -1));
  }
  // Bao lồi 3D (vét cạn) -> các mặt (đa giác lồi theo thứ tự) và các cạnh
  function hull3(pts) {
    const N = pts.length; let mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9];
    pts.forEach(p => { for (let i = 0; i < 3; i++) { mn[i] = Math.min(mn[i], p[i]); mx[i] = Math.max(mx[i], p[i]); } });
    const size = nrm(sub(mx, mn)) || 1, eps = 1.5e-3 * size, faces = [], seen = new Set();
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) for (let k = j + 1; k < N; k++) {
      let n = crs(sub(pts[j], pts[i]), sub(pts[k], pts[i])); if (nrm(n) < 1e-9 * size * size) continue; n = unit(n);
      const c = dot(n, pts[i]); let pos = 0, neg = 0; const on = [];
      for (let m = 0; m < N; m++) { const s = dot(n, pts[m]) - c; if (s > eps) pos++; else if (s < -eps) neg++; else on.push(m); }
      if (pos && neg) continue; const key = on.join(','); if (seen.has(key)) continue; seen.add(key);
      const e1 = unit(sub(pts[j], pts[i])), e2 = crs(n, e1);
      faces.push(hull2(on.map(m => ({ m, x: dot(sub(pts[m], pts[i]), e1), y: dot(sub(pts[m], pts[i]), e2) })), 1e-9 * size * size).map(o => o.m));
    }
    const ek = new Set(), edges = [];
    faces.forEach(f => f.forEach((a, t) => { const b = f[(t + 1) % f.length], key = a < b ? a + '-' + b : b + '-' + a; if (!ek.has(key)) { ek.add(key); edges.push([a, b]); } }));
    return { faces, edges };
  }
  const newell = Q => { let n = [0, 0, 0]; Q.forEach((a, i) => { const b = Q[(i + 1) % Q.length]; n = add(n, [(a[1] - b[1]) * (a[2] + b[2]), (a[2] - b[2]) * (a[0] + b[0]), (a[0] - b[0]) * (a[1] + b[1])]); }); return unit(n); };
  function inPoly(p, poly, m) {
    let area = 0; poly.forEach((a, i) => { const b = poly[(i + 1) % poly.length]; area += a[0] * b[1] - b[0] * a[1]; });
    if (Math.abs(area) < 1) return false; const sg = Math.sign(area);
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L < 1e-9) continue;
      if (sg * ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / L < m) return false;
    }
    return true;
  }
  const onSeg3 = (p, a, b) => { const ab = sub(b, a), ap = sub(p, a), L = dot(ab, ab); if (L < 1e-12) return false; if (nrm(crs(ab, ap)) > 2e-3 * L) return false; const t = dot(ap, ab) / L; return t > 1e-3 && t < 1 - 1e-3; };
  const collinear3 = (u, v) => nrm(crs(unit(u), unit(v))) < 2e-3;
  const DIRS = { r: 0, br: Math.PI / 4, b: Math.PI / 2, bl: 3 * Math.PI / 4, l: Math.PI, tl: -3 * Math.PI / 4, t: -Math.PI / 2, tr: -Math.PI / 4 };
  const frac = v => { const m = String(v).split('/'); return m.length === 2 ? +m[0] / +m[1] : +v; };
  const perpBasis = n => { n = unit(n); let e1 = crs(n, [0, 0, 1]); if (nrm(e1) < 1e-6) e1 = crs(n, [1, 0, 0]); e1 = unit(e1); return [e1, crs(n, e1)]; };
  // Điểm dựng thêm
  function derive(op, args, P, flat) {
    if (op === 'circ') { const C = P[args[0]]; if (!C) return null; const r = frac(args[1]), a = frac(args[2]) * Math.PI / 180; return flat ? [C[0] + r * Math.cos(a), 0, C[2] + r * Math.sin(a)] : [C[0] + r * Math.cos(a), C[1] + r * Math.sin(a), C[2]]; }
    const names = args.filter(a => /^[A-Z_]/.test(a)).flatMap(tok); if (names.some(n => !P[n])) return null;
    const g = names.map(n => P[n]);
    switch (op) {
      case 'mid': return lerp(g[0], g[1], 0.5);
      case 'g': case 'centroid': return g.reduce((s, p) => add(s, mul(p, 1 / g.length)), [0, 0, 0]);
      case 'at': return lerp(g[0], g[1], frac(args[args.length - 1]));
      case 'foot': { const [X, A, B] = g, ab = sub(B, A); return add(A, mul(ab, dot(sub(X, A), ab) / dot(ab, ab))); }
      case 'proj': { const [X, A, B, C] = g, n = unit(crs(sub(B, A), sub(C, A))); return sub(X, mul(n, dot(sub(X, A), n))); }
      case 'meet': { const [A, B, C, D] = g, u = sub(B, A), v = sub(D, C), w = sub(A, C), a = dot(u, u), b = dot(u, v), c = dot(v, v), d = dot(u, w), e = dot(v, w), den = a * c - b * b || 1e-12, s = (b * e - c * d) / den, t = (a * e - b * d) / den; return lerp(add(A, mul(u, s)), add(C, mul(v, t)), 0.5); }
      case 'circum': { const [A, B, C] = g, ab = sub(B, A), ac = sub(C, A), n = crs(ab, ac), n2 = dot(n, n) || 1e-12; return add(A, mul(add(mul(crs(n, ab), dot(ac, ac)), mul(crs(ac, n), dot(ab, ab))), 1 / (2 * n2))); }
      case 'incenter': { const [A, B, C] = g, a = nrm(sub(B, C)), b = nrm(sub(C, A)), c = nrm(sub(A, B)), s = a + b + c; return [0, 1, 2].map(i => (a * A[i] + b * B[i] + c * C[i]) / s); }
      case 'sym': { const [X, O] = g; return sub(mul(O, 2), X); }
      case 'add': { const [X, A, B] = g; return add(X, mul(sub(B, A), args.length > 2 ? frac(args[args.length - 1]) : 1)); }
    }
    console.warn('Geo: không hiểu phép dựng', op); return null;
  }

  // ---- v3.5: chịu lỗi cú pháp do AI tự chế ----
  const pending = [];
  const pairName = x => Array.isArray(x) ? x.join('') : String(x).replace(/[^A-Za-z0-9_']/g, '');
  function normalize(cfg) {
    cfg = Object.assign({}, cfg || {});
    if (!cfg.P && cfg.points) cfg.P = cfg.points;
    if (!cfg.P && cfg.pts && !Array.isArray(cfg.pts)) cfg.P = cfg.pts;
    const P = {};
    for (const k in (cfg.P || {})) { let v = cfg.P[k]; if (v && !Array.isArray(v) && typeof v === 'object') v = 'z' in v ? [v.x, v.y, v.z] : [v.x, v.y]; P[k] = v; }
    cfg.P = P;
    const vals = Object.values(P).filter(Array.isArray), flat = vals.length && vals.every(v => v.length === 2);
    const solidE = (cfg.solid || cfg.edges || cfg.lines || []).map(pairName), dashE = (cfg.dashed || cfg.hidden || cfg.dash || []).map(pairName);
    if (Array.isArray(cfg.rightAngles)) cfg.right = (cfg.right || []).concat(cfg.rightAngles.map(pairName));
    if (Array.isArray(cfg.angles)) cfg.angles = cfg.angles.map(a => typeof a === 'string' ? a : Object.assign({}, a, { a: a.a || pairName(a.pts || a.points || a.at || '') }));
    if (typeof cfg.solids === 'string') cfg.solids = [cfg.solids];
    if (flat && cfg.mode !== '2d' && (solidE.length || dashE.length) && !cfg.solids) {
      // AI vẽ tay bằng tọa độ pixel 2D: giữ đúng nét liền/nét đứt nó chỉ định
      cfg.mode = '2d'; const Q = {}; for (const k in P) Q[k] = typeof P[k] === 'string' ? P[k] : [P[k][0], -P[k][1]]; cfg.P = Q;
      cfg.segs = (cfg.segs || []).concat(solidE.map(s => ({ s, dash: false })), dashE.map(s => ({ s, dash: true })));
      delete cfg.axes;
    } else if (!flat && !cfg.solids && !cfg.round && cfg.mode !== '2d' && (solidE.length || dashE.length)) {
      // tọa độ 3D nhưng chỉ liệt kê cạnh: lấy bao lồi các đỉnh làm khối để engine tự tính nét khuất
      const names = [...new Set(solidE.concat(dashE).join('').match(/_[A-Za-z][0-9]*'*|[A-Z][0-9]*'*/g) || [])].filter(n => Array.isArray(P[n]) && P[n].length === 3);
      if (names.length >= 4) cfg.solids = [names.join('')];
      cfg.segs = (cfg.segs || []).concat(solidE, dashE);
    }
    if (cfg.labels && !Array.isArray(cfg.labels) && Object.values(cfg.labels).some(v => v && typeof v === 'object')) delete cfg.labels;
    ['points', 'solid', 'dashed', 'hidden', 'edges', 'lines', 'rightAngles'].forEach(k => delete cfg[k]);
    return cfg;
  }
  function hostFor(target) {
    let h = host$(target);
    if (h && h.tagName === 'CANVAS') { const d = document.createElement('div'); d.id = h.id; d.className = 'figure-box'; h.replaceWith(d); h = d; }
    if (h && h.tagName === 'svg') { const d = document.createElement('div'); d.id = h.id; d.className = 'figure-box'; h.replaceWith(d); h = d; }
    return h;
  }
  function draw(target, cfg) {
    const h = hostFor(target);
    if (!h) { pending.push([target, cfg]); return; }
    if (!h.classList.contains('figure-box') && !h.querySelector('svg')) h.classList.add('figure-box');
    h.innerHTML = '';
    try { return draw_(h, normalize(cfg)); } catch (e) { fail(h, e); }
  }
  function _flush() { const q = pending.splice(0); q.forEach(([t, c]) => { if (host$(t)) draw(t, c); else console.warn('Geo: không thấy', t); }); }
  function draw_(host, cfg) {
    const is2d = cfg.mode === '2d'; let SCL = cfg.scale || [1, 1, 1];
    const conv0 = p => is2d ? [p[0], 0, p[1]] : (cfg.oxyz ? [p[1], -p[0], p[2]] : p.slice(0, 3));
    const scl = p => [p[0] * SCL[0], p[1] * SCL[1], p[2] * SCL[2]];
    const P0 = {}, pend = {};
    for (const k in (cfg.P || {})) { const v = cfg.P[k]; if (typeof v === 'string') pend[k] = v; else P0[k] = conv0(v); }
    for (let g = 0; g < 12 && Object.keys(pend).length; g++) for (const k in pend) { const a = pend[k].trim().split(/\s+/), r = derive(a[0].toLowerCase(), a.slice(1), P0, is2d); if (r) { P0[k] = r; delete pend[k]; } }
    Object.keys(pend).forEach(k => console.warn('Geo: không dựng được điểm', k, pend[k]));
    if (!is2d && !cfg.scale && cfg.autoScale !== false && !(cfg.round || []).some(o => o.type === 'sphere')) {
      const v = Object.values(P0); if (v.length > 2) { const ex = [0, 1, 2].map(i => Math.max(...v.map(p => p[i])) - Math.min(...v.map(p => p[i]))), M = Math.max(...ex);
        SCL = ex.map(e => e < 1e-9 ? 1 : Math.min(2, Math.max(1, 0.36 * M / e)));
        // Hình có 1 đỉnh nhọn trên cùng (chóp, tứ diện, nón): kéo cao để chiều cao ≈ bề rộng đáy (kiểu hình SGK)
        const zt = Math.max(...v.map(p => p[2])), tops = v.filter(p => zt - p[2] < 1e-6 * (M || 1)).length, base = Math.max(ex[0], ex[1]);
        if (tops === 1 && ex[2] > 1e-9 && cfg.tall !== false && !(cfg.round || []).some(o => o.type !== 'cone') && (cfg.solids || []).length + (cfg.round || []).length === 1) SCL[2] = Math.max(SCL[2], Math.min(2.2, 0.95 * base / ex[2])); }
    }
    const P = {}; for (const k in P0) P[k] = scl(P0[k]);
    const R0 = p => { if (typeof p === 'string') { if (!P0[p]) throw new Error('thiếu điểm ' + p); return P0[p]; } return conv0(p); };
    const R = p => scl(R0(p));
    const hid = new Set(tok(cfg.hide || []));
    const named = Object.keys(P).filter(n => !n.startsWith('_') && !hid.has(n));
    const bb = Object.values(P).slice();
    const lines = [], faces = [], polys = [], arrows = [], texts = [], polylines = [], hatches = [], rounds = [], spheres = [];
    const addL = (A, B, o = {}, an = null, bn = null) => { if (!A || !B) return; bb.push(A, B); lines.push({ A, B, an, bn, color: o.color || '#111', w: o.w || 1.4, dash: o.dash, curve: !!o.curve, arrow: o.arrow }); };
    const addLine = (a, b, o = {}) => addL(R(a), R(b), o, typeof a === 'string' ? a : null, typeof b === 'string' ? b : null);
    const ptsOf = s => (Array.isArray(s) && Array.isArray(s[0])) ? s : tok(s);
    let W = cfg.w || 340; const HMAX = cfg.hMax || 290, PAD = cfg.pad || 26;

    (cfg.solids || []).forEach(s => {
      const names = tok(s), C = names.map(n => P[n]); if (C.some(c => !c)) throw new Error('solid thiếu điểm ' + s);
      const Hh = hull3(C); Hh.faces.forEach(f => faces.push({ pts: f.map(i => C[i]), occ: true }));
      Hh.edges.forEach(([i, j]) => addLine(names[i], names[j]));
    });
    (cfg.round || []).forEach(o => { // khối tròn xoay: cylinder | cone | frustum | sphere
      if (o.type === 'sphere') { const C0 = R0(o.c), C = scl(C0), r = typeof o.r === 'number' ? o.r : nrm(sub(R0(o.r), C0)); spheres.push({ C, r, o }); [[1, 0, 0], [0, 1, 0], [0, 0, 1]].forEach(e => bb.push(add(C, mul(e, r)), sub(C, mul(e, r)))); return; }
      const B0 = R0(o.c), T0 = R0(o.top || o.apex), ax = sub(T0, B0), [e1, e2] = perpBasis(ax), N = 72;
      const r1 = typeof o.r === 'number' ? o.r : nrm(sub(R0(o.r), B0)), r2 = o.type === 'cone' ? 0 : (o.type === 'cylinder' ? r1 : (typeof o.r2 === 'number' ? o.r2 : nrm(sub(R0(o.r2), T0))));
      const ring = (C, r) => [...Array(N)].map((_, i) => { const t = i / N * 2 * Math.PI; return scl(add(C, add(mul(e1, r * Math.cos(t)), mul(e2, r * Math.sin(t))))); });
      const bot = ring(B0, r1), top = r2 > 0 ? ring(T0, r2) : null, apex = scl(T0);
      faces.push({ pts: bot, occ: true }); if (top) faces.push({ pts: top.slice().reverse(), occ: true });
      const side = []; for (let i = 0; i < N; i++) { const j = (i + 1) % N, f = top ? [bot[i], bot[j], top[j], top[i]] : [bot[i], bot[j], apex]; faces.push({ pts: f, occ: true }); side.push(f); }
      bb.push(...bot, ...(top || [apex]));
      for (let i = 0; i < N; i++) { addL(bot[i], bot[(i + 1) % N], { curve: true, color: o.color, w: 1.4 }); if (top) addL(top[i], top[(i + 1) % N], { curve: true, color: o.color, w: 1.4 }); }
      rounds.push({ bot, top, apex, side, mid: scl(lerp(B0, T0, 0.5)), color: o.color });
    });
    (cfg.planes || []).forEach(pl => {
      const ids = ptsOf(pl.pts), C = ids.map(R); bb.push(...C);
      faces.push({ pts: C, occ: pl.occlude !== false }); polys.push({ pts: C, fill: pl.fill || 'rgba(148,163,184,0.13)' });
      ids.forEach((a, i) => addLine(a, ids[(i + 1) % ids.length], { color: pl.color || '#111', w: pl.w || 1.2 }));
      if (pl.label) { const cen = C.reduce((s, c) => add(s, mul(c, 1 / C.length)), [0, 0, 0]); texts.push({ pos: lerp(C[pl.labelAt || 0], cen, 0.2), t: pl.label, italic: true, size: 14 }); }
    });
    (cfg.fills || []).forEach(f => {
      const ids = ptsOf(f.pts), C = ids.map(R); polys.push({ pts: C, fill: f.fill || 'rgba(37,99,235,0.13)' }); bb.push(...C);
      if (f.edges !== false) ids.forEach((a, i) => addLine(a, ids[(i + 1) % ids.length], { color: f.color || '#1d4ed8', w: f.w || 1.4 }));
    });
    (cfg.segs || []).forEach(s => {
      const o = (typeof s === 'object' && !Array.isArray(s)) ? s : { s };
      const ids = o.p ? o.p : tok(o.s);
      for (let i = 0; i + 1 < ids.length; i++) addLine(ids[i], ids[i + 1], o);
    });
    (cfg.circles || []).forEach(c => {
      const C = R0(c.c), r = typeof c.r === 'number' ? c.r : nrm(sub(R0(c.r), C)), [e1, e2] = perpBasis(is2d ? [0, 1, 0] : conv0(c.n || [0, 0, 1]));
      const pts = []; for (let i = 0; i <= 96; i++) { const t = i / 96 * 2 * Math.PI; pts.push(scl(add(C, add(mul(e1, r * Math.cos(t)), mul(e2, r * Math.sin(t)))))); }
      for (let i = 0; i < 96; i++) addL(pts[i], pts[i + 1], { color: c.color || '#111', w: c.w || 1.3, curve: true, dash: c.dash });
      if (c.fill) polys.push({ pts, fill: c.fill });
    });
    (cfg.arcs || []).forEach(o => { // cung tròn tâm c từ điểm from đến điểm to (cung nhỏ; major:true = cung lớn)
      const C = R0(o.c), A = R0(o.from), B = R0(o.to), r = o.r || nrm(sub(A, C)), e1 = unit(sub(A, C)), v = sub(B, C);
      let e2 = unit(sub(v, mul(e1, dot(v, e1)))), th = Math.acos(Math.max(-1, Math.min(1, dot(e1, unit(v)))));
      if (o.major) { th = 2 * Math.PI - th; e2 = mul(e2, -1); }
      const pts = []; for (let i = 0; i <= 64; i++) { const t = th * i / 64; pts.push(scl(add(C, add(mul(e1, r * Math.cos(t)), mul(e2, r * Math.sin(t)))))); }
      for (let i = 0; i < 64; i++) addL(pts[i], pts[i + 1], { color: o.color || '#111', w: o.w || 1.4, curve: true, dash: o.dash });
    });
    const minus = v => String(v).replace('.', ',').replace(/^-/, '−');
    if (cfg.axes) { // 2D: {x:[a,b], y:[c,d], xt:[..], yt:[..], xl:'t (s)', yl:'v (m/s)'}
      const a = cfg.axes, Q = p => scl(conv0(p));
      arrows.push({ A: Q([a.x[0], 0]), B: Q([a.x[1], 0]), w: 1.1, axis: 'x', label: a.xl || 'x' }, { A: Q([0, a.y[0]]), B: Q([0, a.y[1]]), w: 1.1, axis: 'y', label: a.yl || 'y' });
      bb.push(Q([a.x[0], a.y[0]]), Q([a.x[1], a.y[1]]));
      (a.xt || []).forEach(v => texts.push({ pos: Q([Array.isArray(v) ? v[0] : v, 0]), t: Array.isArray(v) ? v[1] : minus(v), tick: 'x', size: 12.5 }));
      (a.yt || []).forEach(v => texts.push({ pos: Q([0, Array.isArray(v) ? v[0] : v]), t: Array.isArray(v) ? v[1] : minus(v), tick: 'y', size: 12.5 }));
      if (a.O !== false && !P.O) texts.push({ pos: Q([0, 0]), t: 'O', dx: -10, dy: 12, italic: true, size: 14 });
    }
    if (cfg.axes3) { // Oxyz
      const a = cfg.axes3, O = scl(conv0([0, 0, 0]));
      [['x', [a.x || 3, 0, 0]], ['y', [0, a.y || 3, 0]], ['z', [0, 0, a.z || 3]]].forEach(([nm, v]) => { const B = scl(conv0(v)); addL(O, B, { w: 1.1 }); arrows.push({ A: O, B, w: 1.1, label: nm, vec: false, headOnly: true }); });
      if (!P.O) texts.push({ pos: O, t: 'O', dx: -10, dy: 10, italic: true, size: 14 });
    }
    const curve = (o, xs) => { let cur = []; const flush = () => { if (cur.length > 1) polylines.push({ pts: cur, color: o.color || '#111', w: o.w || 1.6, dash: o.dash, arrow: o.arrow }); cur = []; };
      const ylo = cfg.axes ? cfg.axes.y[0] - 0.05 : -1e9, yhi = cfg.axes ? cfg.axes.y[1] + 0.05 : 1e9;
      xs.forEach(([x, y]) => { if (!isFinite(x) || !isFinite(y) || y < ylo || y > yhi) { flush(); return; } const q = scl(conv0([x, y])); cur.push(q); bb.push(q); }); flush(); };
    (cfg.fn || []).forEach(f => { const n = f.n || 400, xs = []; for (let i = 0; i <= n; i++) { const x = f.x[0] + (f.x[1] - f.x[0]) * i / n; xs.push([x, f.f(x)]); } curve(f, xs); });
    (cfg.curves || []).forEach(c => { const n = c.n || 400, xs = []; for (let i = 0; i <= n; i++) { const t = c.t[0] + (c.t[1] - c.t[0]) * i / n; xs.push([c.x(t), c.y(t)]); } curve(c, xs); });
    (cfg.arrows || []).forEach(a => { const A = R(a.from), B = R(a.to); bb.push(A, B); arrows.push({ A, B, color: a.color || '#111', w: a.w || 1.5, label: a.label, vec: a.vec !== false && !!a.label, dx: a.dx, dy: a.dy, dash: a.dash }); });
    (cfg.texts || []).forEach(t => { const o = Object.assign({}, t); if (!o.on) o.pos = R(o.at); texts.push(o); });
    (cfg.hatch || []).forEach(h => hatches.push(h));
    (cfg.parts || []).forEach(p => ['from', 'to', 'at', 'c'].forEach(k => { if (p[k] != null && (typeof p[k] === 'string' || Array.isArray(p[k]))) bb.push(R(p[k])); }));
    (cfg.parts || []).forEach(p => { if (p.box) { bb.push(R([p.box[0], p.box[1]]), R([p.box[2], p.box[3]])); } if (p.c && (p.w || p.r || p.h)) { const c = R0(p.c), e = Math.max(p.w || 0, p.h || 0, 2 * (p.r || 0)); bb.push(scl(add(c, [e * 0.6, 0, e])), scl(sub(c, [e * 0.6, 0, e * 0.15]))); } if (p.at && p.h) { const c = R0(p.at); bb.push(scl(add(c, [0, 0, p.h])), scl(sub(c, [0, 0, p.h]))); } });

    function setup(v) {
      const th = v.angle * Math.PI / 180, ph = (v.rot || 0) * Math.PI / 180, k = v.k, c = Math.cos(ph), s = Math.sin(ph);
      const rot = p => [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]], unrot = q => [q[0] * c + q[1] * s, -q[0] * s + q[1] * c, q[2]];
      const pr = q => [q[0] + k * Math.cos(th) * q[1], q[2] + k * Math.sin(th) * q[1]];
      let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
      bb.forEach(p => { const q = pr(rot(p)); x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]); });
      const rx = Math.max(x1 - x0, 1e-9), ry = Math.max(y1 - y0, 1e-9), sc = Math.min((W - 2 * PAD) / rx, (HMAX - 2 * PAD) / ry), ox = (W - rx * sc) / 2;
      return { rot, unrot, sc, H: Math.round(ry * sc + 2 * PAD), d: [-k * Math.cos(th), 1, -k * Math.sin(th)], px: p => { const q = pr(rot(p)); return [ox + (q[0] - x0) * sc, PAD + (y1 - q[1]) * sc]; }, inv: (X, Y) => [((X - ox) / sc + x0) / SCL[0], (y1 - (Y - PAD) / sc) / SCL[2]] };
    }
    function autoView() { // thử nhiều góc nhìn, chọn góc làm các điểm/đường tách nhau rõ nhất
      const L = lines.filter(l => !l.curve); let best = null;
      for (const angle of [25, 30, 35, 40, 45, 50]) for (const k of [0.4, 0.5, 0.6, 0.7]) for (const rot of [0, -12, 12, -25, 25, -40, 40]) {
        const S = setup({ angle, k, rot }), pp = {}; named.forEach(n => pp[n] = S.px(P[n]));
        let m1 = 1e9, m2 = 1e9, m3 = 90;
        for (let i = 0; i < named.length; i++) for (let j = i + 1; j < named.length; j++) { if (nrm(sub(P[named[i]], P[named[j]])) < 1e-9) continue; m1 = Math.min(m1, d2(pp[named[i]], pp[named[j]])); }
        const Lp = L.map(l => [S.px(l.A), S.px(l.B)]);
        named.forEach(n => L.forEach((l, i) => { if (l.an === n || l.bn === n || nrm(sub(P[n], l.A)) < 1e-9 || nrm(sub(P[n], l.B)) < 1e-9) return; if (nrm(crs(sub(l.B, l.A), sub(P[n], l.A))) < 2e-3 * dot(sub(l.B, l.A), sub(l.B, l.A))) return; m2 = Math.min(m2, segDist(pp[n], Lp[i][0], Lp[i][1])); }));
        named.forEach(n => {
          const ds = []; L.forEach((l, i) => { if (l.an === n) ds.push([sub(l.B, l.A), sub(Lp[i][1], Lp[i][0])]); else if (l.bn === n) ds.push([sub(l.A, l.B), sub(Lp[i][0], Lp[i][1])]); });
          for (let i = 0; i < ds.length; i++) for (let j = i + 1; j < ds.length; j++) { if (collinear3(ds[i][0], ds[j][0])) continue; const a = ds[i][1], b = ds[j][1]; const ang = Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / ((Math.hypot(a[0], a[1]) * Math.hypot(b[0], b[1])) || 1)))) * 180 / Math.PI; m3 = Math.min(m3, ang); }
        });
        // phần "đáy" chiếm bao nhiêu chiều cao hình: >45% là nhìn quá từ trên xuống → phạt
        let ylo = 1e9, yhi = -1e9, zlo = 1e9, zhi = -1e9; bb.forEach(p => { const q = S.rot(p); ylo = Math.min(ylo, q[1]); yhi = Math.max(yhi, q[1]); zlo = Math.min(zlo, q[2]); zhi = Math.max(zhi, q[2]); });
        const dRise = k * Math.sin(angle * Math.PI / 180) * (yhi - ylo), dShare = dRise / (dRise + (zhi - zlo) || 1);
        const sc = Math.min(m1, m2 * 1.4) + Math.min(m3, 15) * 0.7 - Math.abs(angle - 35) * 0.12 - Math.abs(k - 0.5) * 12 - Math.abs(rot) * 0.1 - Math.max(0, Math.abs(rot) - 15) * 0.3 - Math.max(0, dShare - 0.45) * 80;
        if (!best || sc > best.sc) best = { sc, v: { angle, k, rot } };
      }
      return best.v;
    }
    const view = is2d ? { angle: 0, k: 0, rot: 0 } : (cfg.view ? Object.assign({ angle: 40, k: 0.5, rot: 0 }, cfg.view) : autoView());
    if (!cfg.w) { const S0 = setup(view), ar = (W - 2 * PAD) / Math.max(1, S0.H - 2 * PAD); if (ar > 2.2) W = 460; else if (ar > 1.6) W = 400; }
    const S = setup(view), H = S.H;
    let size3 = 0; bb.forEach(p => (size3 = Math.max(size3, nrm(sub(p, bb[0])))));
    const EPS = 2e-3 * (size3 || 1), toV = mul(S.d, -1);
    // Đường sinh biên (silhouette) của khối tròn xoay theo góc nhìn đã chọn
    rounds.forEach(o => { const fr = o.side.map(f => { const Q = f.map(S.rot); let n = newell(Q); if (dot(n, sub(Q[0], S.rot(o.mid))) < 0) n = mul(n, -1); return dot(n, toV) > 0; });
      for (let i = 0; i < fr.length; i++) { const j = (i + fr.length - 1) % fr.length; if (fr[i] !== fr[j]) addL(o.bot[i], o.top ? o.top[i] : o.apex, { color: o.color, w: 1.4 }); } });
    const occ = is2d ? [] : faces.filter(f => f.occ).map(f => { const Q = f.pts.map(S.rot), n = newell(Q); return { n, c: dot(n, Q[0]), poly: f.pts.map(S.px) }; }).filter(o => Math.abs(dot(o.n, S.d)) > 1e-9);
    const sph = spheres.map(s => ({ C: S.rot(s.C), r: s.r }));
    const isHidden = X => {
      if (is2d) return false; const Q = S.rot(X), p = S.px(X);
      for (const s of sph) { const w = sub(Q, s.C), a = dot(S.d, S.d), b = 2 * dot(S.d, w), c = dot(w, w) - s.r * s.r, D = b * b - 4 * a * c; if (D > 0 && (-b - Math.sqrt(D)) / (2 * a) < -EPS * 2) return true; }
      for (const o of occ) { const t = (o.c - dot(o.n, Q)) / dot(o.n, S.d); if (t > -EPS) continue; if (inPoly(p, o.poly, -1e-6)) return true; } return false;
    };

    host.innerHTML = '';
    const svg = el('svg', { xmlns: NS, width: W, height: H, viewBox: `0 0 ${W} ${H}`, class: 'geo' }, host);
    const gF = el('g', {}, svg), gR = el('g', {}, svg), gH = el('g', { fill: 'none', 'stroke-linecap': 'round' }, svg), gV = el('g', { fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg), gP = el('g', { 'stroke-linejoin': 'round' }, svg), gA = el('g', { fill: 'none', 'stroke-linecap': 'round' }, svg), gM = el('g', { fill: 'none' }, svg), gT = el('g', {}, svg);
    polys.forEach(p => el('path', { d: pathD(p.pts.map(S.px)) + 'Z', fill: p.fill, stroke: 'none' }, gF));
    // Miền gạch chéo / tô theo điều kiện (chỉ 2D): regions:[{test:(x,y)=>bool, hatch:true}]
    (cfg.regions || []).forEach(rg => {
      const col = rg.color || (rg.hatch === false ? 'rgba(37,99,235,0.18)' : '#94a3b8'), segs = [], bx = rg.box || (cfg.axes ? [cfg.axes.x[0], cfg.axes.y[0], cfg.axes.x[1], cfg.axes.y[1]] : null);
      const scan = (x0, y0, dx, dy, n) => { let on = null; for (let i = 0; i <= n; i++) { const X = x0 + dx * i, Y = y0 + dy * i, w = S.inv(X, Y), ok = X >= 0 && X <= W && Y >= 0 && Y <= H && (!bx || (w[0] >= bx[0] && w[0] <= bx[2] && w[1] >= bx[1] && w[1] <= bx[3])) && !!rg.test(w[0], w[1]); if (ok && !on) on = [X, Y]; if (!ok && on) { segs.push([on, [X - dx, Y - dy]]); on = null; } } if (on) segs.push([on, [x0 + dx * n, y0 + dy * n]]); };
      if (rg.hatch === false) for (let y = 0; y <= H; y += 1) scan(0, y, 1, 0, W);
      else { const g = rg.gap || 6; for (let c = -H; c <= W; c += g) scan(c, H, 0.7071, -0.7071, Math.ceil((W + H) / 0.7071)); }
      el('path', { d: segs.map(s => pathD(s)).join(' '), stroke: col, 'stroke-width': rg.hatch === false ? 1.1 : 0.75, fill: 'none' }, gR);
    });
    const stroke = (g, a, b, o, dashed) => el('path', { d: pathD([a, b]), stroke: o.color || '#111', 'stroke-width': dashed ? +((o.w || 1.4) * 0.85).toFixed(2) : (o.w || 1.4), 'stroke-dasharray': dashed ? '5 4' : 'none' }, g);
    const head = (g, a, b, color, w) => { const L = d2(a, b) || 1, ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L, hl = 7 + w * 1.5, hw = 2.6 + w; el('path', { d: `M${b[0]} ${b[1]} L${b[0] - ux * hl - uy * hw} ${b[1] - uy * hl + ux * hw} L${b[0] - ux * hl * 0.75} ${b[1] - uy * hl * 0.75} L${b[0] - ux * hl + uy * hw} ${b[1] - uy * hl - ux * hw}Z`, fill: color, stroke: 'none' }, g); };
    const midHead = (a, b, color, w, at = 0.55) => { const L = d2(a, b) || 1, ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L, m = [a[0] + (b[0] - a[0]) * at, a[1] + (b[1] - a[1]) * at]; head(gM, [m[0] - ux * 6, m[1] - uy * 6], [m[0] + ux * 4, m[1] + uy * 4], color || '#111', w || 1.2); };
    const segPx = [];
    lines.forEach(L => {
      const a = S.px(L.A), b = S.px(L.B), lp = d2(a, b); if (lp < 0.3) return; if (!L.curve) segPx.push([a, b]);
      if (L.arrow === 'mid') midHead(a, b, L.color, L.w); if (L.arrow === 'end') head(gM, a, b, L.color, L.w);
      if (is2d || L.dash === true || L.dash === false) { stroke(L.dash === true ? gH : gV, a, b, L, L.dash === true); return; }
      const n = Math.max(L.curve ? 3 : 6, Math.min(300, Math.ceil(lp / 2.5))), st = [];
      for (let i = 0; i <= n; i++) st.push(isHidden(lerp(L.A, L.B, i / n)));
      const cuts = [0], fl = [st[0]];
      for (let i = 0; i < n; i++) if (st[i] !== st[i + 1]) { let lo = i / n, hi = (i + 1) / n; for (let k = 0; k < 9; k++) { const m = (lo + hi) / 2; if (isHidden(lerp(L.A, L.B, m)) === st[i]) lo = m; else hi = m; } cuts.push((lo + hi) / 2); fl.push(st[i + 1]); }
      cuts.push(1);
      const runs = fl.map((h, i) => ({ t0: cuts[i], t1: cuts[i + 1], h }));
      runs.forEach((r, i) => { if ((r.t1 - r.t0) * lp < 2.5 && runs.length > 1) r.h = (runs[i - 1] || runs[i + 1]).h; });
      const mg = []; runs.forEach(r => { const z = mg[mg.length - 1]; if (z && z.h === r.h) z.t1 = r.t1; else mg.push(Object.assign({}, r)); });
      mg.forEach(r => stroke(r.h ? gH : gV, lerp(a, b, r.t0), lerp(a, b, r.t1), L, r.h));
    });
    sph.forEach((s, i) => { // mặt cầu: đường bao + đường xích đạo (nửa sau nét đứt)
      const [e1, e2] = perpBasis(S.d), pts = []; for (let k = 0; k <= 120; k++) { const t = k / 120 * 2 * Math.PI; pts.push(S.px(S.unrot(add(s.C, add(mul(e1, s.r * Math.cos(t)), mul(e2, s.r * Math.sin(t))))))); }
      el('path', { d: pathD(pts), stroke: spheres[i].o.color || '#111', 'stroke-width': 1.4 }, gV);
      if (spheres[i].o.equator !== false) { const C = spheres[i].C, eq = []; for (let k = 0; k <= 96; k++) { const t = k / 96 * 2 * Math.PI; eq.push([C[0] + s.r * Math.cos(t), C[1] + s.r * Math.sin(t), C[2]]); }
        for (let k = 0; k < 96; k++) { const a = eq[k], b = eq[k + 1], hdn = isHidden(lerp(a, b, 0.5)); stroke(hdn ? gH : gV, S.px(a), S.px(b), { color: spheres[i].o.color, w: 1.2 }, hdn); } }
    });
    polylines.forEach(p => { const q = p.pts.map(S.px); el('path', { d: pathD(q), stroke: p.color, 'stroke-width': p.w, 'stroke-dasharray': p.dash ? '5 4' : 'none' }, gV); for (let i = 0; i + 1 < q.length; i += 4) segPx.push([q[i], q[Math.min(i + 4, q.length - 1)]]); if (p.arrow === 'mid') { const m = Math.floor(q.length * 0.55); midHead(q[m - 1], q[m + 1], p.color, p.w, 0.5); } if (p.arrow === 'end') head(gM, q[q.length - 2], q[q.length - 1], p.color, p.w); });
    const placed = [];
    const label = (txt, x, y, o = {}) => {
      const size = o.size || 15, t = el('text', { x: x.toFixed(1), y: y.toFixed(1), 'font-family': FONT, 'font-size': size, 'font-style': o.italic === false ? 'normal' : 'italic', 'font-weight': o.bold ? 'bold' : 'normal', 'text-anchor': o.anchor || 'middle', 'dominant-baseline': 'central', fill: o.color || '#111' }, gT); rich(t, txt, size);
      if (o.vec) { const w = 4 + 3.6 * String(txt).replace(/[_^{}]/g, '').length, yy = y - size * 0.72; el('path', { d: `M${x - w} ${yy} L${x + w} ${yy}`, stroke: o.color || '#111', 'stroke-width': 1 }, gT); head(gT, [x - w, yy], [x + w + 1, yy], o.color || '#111', 0.2); }
    };
    arrows.forEach(a => {
      const p = S.px(a.A), q = S.px(a.B), gg = a.axis || a.headOnly ? gV : gA; if (!a.headOnly) { el('path', { d: pathD([p, q]), stroke: a.color || '#111', 'stroke-width': a.w, 'stroke-dasharray': a.dash ? '5 4' : 'none' }, gg); segPx.push([p, q]); } head(gg, p, q, a.color || '#111', a.w);
      const L = d2(p, q) || 1, ux = (q[0] - p[0]) / L, uy = (q[1] - p[1]) / L;
      if (a.axis === 'x') label(a.label, q[0] - 4 - 2.6 * Math.max(0, String(a.label).length - 1), q[1] + 13, { italic: true, size: 14 }); else if (a.axis === 'y') label(a.label, q[0] - 10 - 3 * Math.max(0, String(a.label).length - 1), q[1] + 4, { italic: true, size: 14, anchor: String(a.label).length > 1 ? 'end' : 'middle' });
      else if (a.label) { const z = [q[0] + ux * 12 - uy * 9 + (a.dx || 0), q[1] + uy * 12 + ux * 9 + (a.dy || 0)]; label(a.label, z[0], z[1], { vec: a.vec, color: a.color }); placed.push(z); }
    });
    hatches.forEach(h => { const ids = ptsOf(h.p), a = S.px(R(ids[0])), b = S.px(R(ids[1])), L = d2(a, b) || 1, ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L, sd = h.side || 1, nx = -uy * sd, ny = ux * sd;
      el('path', { d: pathD([a, b]), stroke: '#111', 'stroke-width': 1.6 }, gV); segPx.push([a, b]); for (let s = 4; s < L - 2; s += 8) { const x = a[0] + ux * s, y = a[1] + uy * s; el('path', { d: `M${x} ${y} L${x + (nx - ux) * 6} ${y + (ny - uy) * 6}`, stroke: '#111', 'stroke-width': 0.9 }, gV); } });
    const sizeFor = (V, us, px) => px / Math.max(...us.map(u => d2(S.px(scl(add(V, u))), S.px(scl(V)))), 1e-9);
    (cfg.right || []).forEach(r => {
      const [p1, v, p2] = tok(r), V = P0[v], A = P0[p1], B = P0[p2]; if (!V || !A || !B) return; const u1 = unit(sub(A, V)), u2 = unit(sub(B, V));
      const s = Math.min(sizeFor(V, [u1, u2], 9), 0.35 * nrm(sub(A, V)), 0.35 * nrm(sub(B, V)));
      const q = [add(V, mul(u1, s)), add(V, add(mul(u1, s), mul(u2, s))), add(V, mul(u2, s))].map(scl);
      el('path', { d: pathD(q.map(S.px)), stroke: '#111', 'stroke-width': 1, 'stroke-dasharray': isHidden(q[1]) ? '2 2' : 'none' }, gM);
    });
    (cfg.angles || []).forEach(a => {
      const o = typeof a === 'string' ? { a } : a, [p1, v, p2] = tok(o.a), V = P0[v], u1 = unit(sub(P0[p1], V)), u2 = unit(sub(P0[p2], V));
      const th = Math.acos(Math.max(-1, Math.min(1, dot(u1, u2)))), e = unit(sub(u2, mul(u1, dot(u1, u2))));
      for (let m = 0; m < (o.n || 1); m++) { const r = sizeFor(V, [u1, u2], (o.r || 16) + m * 4), pts = []; for (let i = 0; i <= 24; i++) { const t = th * i / 24; pts.push(S.px(scl(add(V, mul(add(mul(u1, Math.cos(t)), mul(e, Math.sin(t))), r))))); } el('path', { d: pathD(pts), stroke: o.color || '#111', 'stroke-width': 1 }, gM); }
      if (o.label) { const bis = unit(add(u1, u2)), r = sizeFor(V, [u1, u2], (o.r || 16) + 13), q = S.px(scl(add(V, mul(bis, r)))); label(o.label, q[0], q[1], { italic: false, size: 12.5 }); placed.push(q); }
    });
    (cfg.marks || []).forEach(m => { // dấu bằng nhau (eq) / song song (par) trên đoạn
      const o = typeof m === 'string' ? { s: m } : m, [a, b] = tok(o.s).map(k => S.px(P[k])), L = d2(a, b) || 1, ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L, n = o.n || 1, c = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      for (let i = 0; i < n; i++) { const off = (i - (n - 1) / 2) * 3.5, x = c[0] + ux * off, y = c[1] + uy * off;
        if (o.kind === 'par') el('path', { d: `M${x - ux * 4 - uy * 4} ${y - uy * 4 + ux * 4} L${x} ${y} L${x - ux * 4 + uy * 4} ${y - uy * 4 - ux * 4}`, stroke: o.color || '#111', 'stroke-width': 1.2 }, gM);
        else el('path', { d: `M${x - uy * 5} ${y + ux * 5} L${x + uy * 5} ${y - ux * 5}`, stroke: o.color || '#111', 'stroke-width': 1.2 }, gM); }
    });
    // ===== Ký hiệu Vật lý / sơ đồ (đơn vị px cố định, gắn vào điểm) =====
    const pathEl = (d, o = {}) => el('path', Object.assign({ d, stroke: '#111', 'stroke-width': 1.4, fill: 'none' }, o), gP);
    const circ = (c, r, o = {}) => el('circle', Object.assign({ cx: c[0].toFixed(1), cy: c[1].toFixed(1), r, stroke: '#111', 'stroke-width': 1.4, fill: '#fff' }, o), gP);
    const txt = (s, x, y, o = {}) => { label(s, x, y, o); placed.push([x, y]); };
    const W2 = p => { const q = R0(p); return [q[0], q[2]]; }; // tọa độ thế giới 2D
    const PX2 = (x, y) => S.px(scl(conv0([x, y])));
    function two(p, len, fn) {
      const a = S.px(R(p.from)), b = S.px(R(p.to)), L = d2(a, b) || 1, ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L, nx = -uy, ny = ux, m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], h = Math.min(len / 2, L / 2);
      const at = (s, t) => [m[0] + ux * s + nx * t, m[1] + uy * s + ny * t];
      if (len < L) { pathEl(pathD([a, at(-h, 0)])); pathEl(pathD([at(h, 0), b])); }
      segPx.push([a, b]); fn(at, h, L, ux, uy);
      if (p.label) { let sg = p.side || ((nx * (m[0] - cenAll[0]) + ny * (m[1] - cenAll[1])) >= 0 ? 1 : -1); const z = at(0, sg * (p.off || 19)); txt(p.label, z[0], z[1], { italic: true, size: 14 }); }
    }
    const allPts = []; bb.forEach(p => allPts.push(S.px(p))); const cenAll = allPts.length ? allPts.reduce((s, q) => [s[0] + q[0] / allPts.length, s[1] + q[1] / allPts.length], [0, 0]) : [W / 2, H / 2];
    const meter = (letter) => (at) => { circ(at(0, 0), 11); label(letter, at(0, 0)[0], at(0, 0)[1] + 0.5, { italic: false, size: 13, bold: true }); };
    const PARTS = {
      wire: p => { const ids = ptsOf(p.pts); for (let i = 0; i + 1 < ids.length; i++) { const a = S.px(R(ids[i])), b = S.px(R(ids[i + 1])); pathEl(pathD([a, b])); segPx.push([a, b]); if (p.arrow) midHead(a, b); } },
      resistor: p => two(p, 30, at => pathEl(pathD([at(-15, -6), at(15, -6), at(15, 6), at(-15, 6)]) + 'Z', { fill: '#fff' })),
      rheostat: p => two(p, 30, at => { pathEl(pathD([at(-15, -6), at(15, -6), at(15, 6), at(-15, 6)]) + 'Z', { fill: '#fff' }); pathEl(pathD([at(-13, 11), at(11, -9)]), { 'stroke-width': 1.1 }); head(gP, at(-13, 11), at(15, -12), '#111', 0.6); }),
      battery: p => two(p, 8, at => { pathEl(pathD([at(-4, -13), at(-4, 13)])); pathEl(pathD([at(4, -7), at(4, 7)]), { 'stroke-width': 3.2 }); if (p.sign !== false) { const a = at(-11, -13), b = at(12, -11); label('+', a[0], a[1], { italic: false, size: 11 }); label('−', b[0], b[1], { italic: false, size: 11 }); } }),
      capacitor: p => two(p, 8, at => { pathEl(pathD([at(-4, -12), at(-4, 12)]), { 'stroke-width': 2 }); pathEl(pathD([at(4, -12), at(4, 12)]), { 'stroke-width': 2 }); }),
      bulb: p => two(p, 22, at => { circ(at(0, 0), 11); pathEl(pathD([at(-7.8, -7.8), at(7.8, 7.8)])); pathEl(pathD([at(-7.8, 7.8), at(7.8, -7.8)])); }),
      ammeter: p => two(p, 22, meter('A')), voltmeter: p => two(p, 22, meter('V')), galvanometer: p => two(p, 22, meter('G')), motor: p => two(p, 22, meter('M')),
      ac: p => two(p, 22, at => { circ(at(0, 0), 11); const q = []; for (let i = 0; i <= 16; i++) q.push(at(-7 + 14 * i / 16, -4 * Math.sin(i / 16 * 2 * Math.PI))); pathEl(pathD(q), { 'stroke-width': 1.2 }); }),
      inductor: p => two(p, 34, at => { const q = []; for (let k = 0; k < 4; k++) for (let i = 0; i <= 12; i++) { const t = Math.PI * i / 12; q.push(at(-16 + 8 * k + 4 - 4 * Math.cos(t), -6 * Math.sin(t))); } pathEl(pathD(q)); }),
      switch: p => two(p, 26, at => { circ(at(-12, 0), 2.2, { fill: '#111' }); circ(at(12, 0), 2.2, { fill: '#111' }); pathEl(pathD([at(-12, 0), p.closed ? at(12, 0) : at(10, -11)])); }),
      diode: p => two(p, 16, at => { pathEl(pathD([at(-7, -7), at(-7, 7), at(7, 0)]) + 'Z', { fill: '#111' }); pathEl(pathD([at(7, -7), at(7, 7)]), { 'stroke-width': 1.8 }); }),
      spring: p => two(p, 1e9, (at, h) => { const n = p.n || 10, lead = Math.min(8, h * 0.15), q = [at(-h, 0), at(-h + lead, 0)]; for (let i = 0; i < n; i++) q.push(at(-h + lead + (2 * h - 2 * lead) * (i + 0.5) / n, (i % 2 ? -1 : 1) * (p.amp || 6))); q.push(at(h - lead, 0), at(h, 0)); pathEl(pathD(q), { 'stroke-width': 1.2 }); }),
      solenoid: p => two(p, 1e9, (at, h) => { const n = p.n || 8, a = p.amp || 13; for (let i = 0; i < n; i++) { const s = -h + 2 * h * (i + 0.5) / n, q = [], r = []; for (let k = 0; k <= 16; k++) { const t = Math.PI * k / 16; q.push(at(s + 5 * Math.sin(t), -a * Math.cos(t))); r.push(at(s - 5 * Math.sin(t), -a * Math.cos(t))); } pathEl(pathD(q)); pathEl(pathD(r), { 'stroke-dasharray': '2 2', 'stroke-width': 1 }); } }),
      magnet: p => two(p, 1e9, (at, h) => { pathEl(pathD([at(-h, -8), at(0, -8), at(0, 8), at(-h, 8)]) + 'Z', { fill: '#fecaca' }); pathEl(pathD([at(0, -8), at(h, -8), at(h, 8), at(0, 8)]) + 'Z', { fill: '#bfdbfe' }); const n = at(-h / 2, 0), s = at(h / 2, 0); label('N', n[0], n[1], { italic: false, size: 13, bold: true }); label('S', s[0], s[1], { italic: false, size: 13, bold: true }); }),
      node: p => { const c = S.px(R(p.at)); circ(c, 3, { fill: '#111', stroke: 'none' }); if (p.label) txt(p.label, c[0] + (p.dx || 0), c[1] + (p.dy == null ? -12 : p.dy), { italic: true, size: 14 }); },
      charge: p => { const c = S.px(R(p.at)), r = p.r || 9, pos = p.sign !== '-'; circ(c, r, { fill: pos ? '#fee2e2' : '#dbeafe', stroke: pos ? '#b91c1c' : '#1d4ed8' }); pathEl(`M${c[0] - r * 0.5} ${c[1]} L${c[0] + r * 0.5} ${c[1]}`, { stroke: pos ? '#b91c1c' : '#1d4ed8', 'stroke-width': 1.6 }); if (pos) pathEl(`M${c[0]} ${c[1] - r * 0.5} L${c[0]} ${c[1] + r * 0.5}`, { stroke: '#b91c1c', 'stroke-width': 1.6 }); if (p.label) txt(p.label, c[0] + (p.dx || 0), c[1] + (p.dy == null ? -r - 9 : p.dy), { italic: true, size: 14 }); },
      field: p => { const [x0, y0, x1, y1] = p.box, st = p.step || 1; for (let x = x0; x <= x1 + 1e-9; x += st) for (let y = y0; y <= y1 + 1e-9; y += st) { const c = PX2(x, y); if (p.dir === 'out') { circ(c, 4.5, { 'stroke-width': 1, fill: 'none' }); circ(c, 1.3, { fill: '#111', stroke: 'none' }); } else pathEl(`M${c[0] - 3.5} ${c[1] - 3.5} L${c[0] + 3.5} ${c[1] + 3.5} M${c[0] - 3.5} ${c[1] + 3.5} L${c[0] + 3.5} ${c[1] - 3.5}`, { 'stroke-width': 1.1 }); } if (p.label) { const c = PX2(x1, y1); txt(p.label, c[0] + 14, c[1] - 6, { vec: true }); } },
      block: p => { const [cx, cy] = W2(p.c); let ang = (p.angle || 0) * Math.PI / 180; if (p.on) { const [a, b] = tok(p.on).map(W2); ang = Math.atan2(b[1] - a[1], b[0] - a[0]); } const w = p.w || 1, hh = p.h || 0.6, ca = Math.cos(ang), sa = Math.sin(ang), base = p.on ? hh / 2 : 0;
        const pt = (u, v) => PX2(cx + ca * u - sa * (v + base), cy + sa * u + ca * (v + base)); pathEl(pathD([pt(-w / 2, -hh / 2), pt(w / 2, -hh / 2), pt(w / 2, hh / 2), pt(-w / 2, hh / 2)]) + 'Z', { fill: p.fill || '#e2e8f0' }); if (p.label) { const c = pt(0, 0); label(p.label, c[0], c[1], { size: 14 }); } },
      ball: p => { const c = S.px(R(p.c)), r = (p.r || 0.3) * S.sc * (SCL[0] || 1); circ(c, r.toFixed(1), { fill: p.fill || '#e2e8f0' }); if (p.label) label(p.label, c[0], c[1], { size: 14 }); },
      cart: p => { const [cx, cy] = W2(p.c), w = p.w || 2, hh = p.h || 0.7, r = hh * 0.32; PARTS.block({ c: [cx, cy + r * 2 + hh / 2], w, h: hh, fill: p.fill, label: p.label }); [-w * 0.3, w * 0.3].forEach(dx => { const c = PX2(cx + dx, cy + r); circ(c, (r * S.sc).toFixed(1), { fill: '#64748b' }); }); },
      pulley: p => { const c = S.px(R(p.c)), r = (p.r || 0.4) * S.sc; if (p.hang) { const h2 = S.px(R(p.hang)); pathEl(pathD([c, h2])); } circ(c, r.toFixed(1), { fill: '#f1f5f9' }); circ(c, 2.4, { fill: '#111', stroke: 'none' }); },
      vessel: p => { const [cx, cy] = W2(p.c), w = p.w || 2, hh = p.h || 2, lv = p.level == null ? 0.6 : p.level; const a = PX2(cx - w / 2, cy + hh), b = PX2(cx - w / 2, cy), c = PX2(cx + w / 2, cy), d = PX2(cx + w / 2, cy + hh);
        if (lv > 0) el('path', { d: pathD([PX2(cx - w / 2, cy + hh * lv), b, c, PX2(cx + w / 2, cy + hh * lv)]) + 'Z', fill: p.fill || 'rgba(59,130,246,0.18)', stroke: 'none' }, gP); pathEl(pathD([a, b, c, d]), { 'stroke-width': 1.8 }); if (lv > 0) pathEl(pathD([PX2(cx - w / 2, cy + hh * lv), PX2(cx + w / 2, cy + hh * lv)]), { stroke: '#2563eb', 'stroke-width': 1 }); },
      piston: p => { const [x0, y0, x1, y1] = p.box, f = p.at == null ? 0.6 : p.at, xp = x0 + (x1 - x0) * f, t = (x1 - x0) * 0.03;
        if (p.gas !== false) { let sd = 7; for (let i = 0; i < 26; i++) { sd = (sd * 9301 + 49297) % 233280; const u = sd / 233280; sd = (sd * 9301 + 49297) % 233280; const v = sd / 233280; circ(PX2(x0 + (xp - x0 - t) * (0.06 + 0.88 * u), y0 + (y1 - y0) * (0.1 + 0.8 * v)), 1.3, { fill: '#64748b', stroke: 'none' }); } }
        pathEl(pathD([PX2(x1, y1), PX2(x0, y1), PX2(x0, y0), PX2(x1, y0)]), { 'stroke-width': 2 }); el('path', { d: pathD([PX2(xp - t, y0), PX2(xp + t, y0), PX2(xp + t, y1), PX2(xp - t, y1)]) + 'Z', fill: '#94a3b8', stroke: '#111', 'stroke-width': 1.2 }, gP);
        pathEl(pathD([PX2(xp + t, (y0 + y1) / 2), PX2(x1 + (x1 - x0) * 0.25, (y0 + y1) / 2)]), { 'stroke-width': 2.2 }); },
      lens: p => { const c = W2(p.at), hh = p.h || 2, a = PX2(c[0], c[1] - hh), b = PX2(c[0], c[1] + hh); pathEl(pathD([a, b]), { 'stroke-width': 1.8 }); segPx.push([a, b]);
        const v = (q, up) => { const s = (p.kind === 'div' ? -1 : 1) * (up ? 1 : -1); pathEl(pathD([[q[0] - 7, q[1] + s * 8], q, [q[0] + 7, q[1] + s * 8]]), { 'stroke-width': 1.8 }); }; v(b, true); v(a, false); if (p.label) txt(p.label, b[0] + 12, b[1] - 4, { size: 14 }); },
      mirror: p => { const a = S.px(R(p.from)), b = S.px(R(p.to)), L = d2(a, b) || 1, ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L, sd = p.side || 1, nx = -uy * sd, ny = ux * sd, k = p.kind === 'concave' ? -1 : p.kind === 'convex' ? 1 : 0, q = [];
        for (let i = 0; i <= 32; i++) { const t = i / 32, bul = k * 0.12 * L * Math.sin(Math.PI * t); q.push([a[0] + (b[0] - a[0]) * t + nx * bul, a[1] + (b[1] - a[1]) * t + ny * bul]); } pathEl(pathD(q), { 'stroke-width': 2 }); segPx.push([a, b]);
        for (let i = 1; i < 32; i += 2) { const z = q[i]; pathEl(`M${z[0]} ${z[1]} L${z[0] + (nx - ux) * 6} ${z[1] + (ny - uy) * 6}`, { 'stroke-width': 0.9 }); } }
    };
    (cfg.parts || []).forEach(p => { const f = PARTS[p.type]; if (!f) { console.warn('Geo: không có ký hiệu', p.type); return; } f(p); });
    // Điểm + nhãn tự đặt (tránh đường, tránh nhãn khác)
    const pp = {}; named.forEach(n => pp[n] = S.px(P[n]));
    const cen = named.length ? named.reduce((s, n) => [s[0] + pp[n][0] / named.length, s[1] + pp[n][1] / named.length], [0, 0]) : cenAll;
    const inc = {}; named.forEach(n => inc[n] = []);
    lines.forEach(L => { if (L.curve) return; const a = S.px(L.A), b = S.px(L.B); named.forEach(n => {
      const at = (L.an === n || nrm(sub(P[n], L.A)) < 1e-9), bt = (L.bn === n || nrm(sub(P[n], L.B)) < 1e-9);
      if (at) inc[n].push(Math.atan2(b[1] - a[1], b[0] - a[0])); else if (bt) inc[n].push(Math.atan2(a[1] - b[1], a[0] - b[0]));
      else if (onSeg3(P[n], L.A, L.B)) { inc[n].push(Math.atan2(b[1] - a[1], b[0] - a[0]), Math.atan2(a[1] - b[1], a[0] - b[0])); } }); });
    named.forEach(n => {
      const p = pp[n], ov = (cfg.labels || {})[n]; let c;
      if (Array.isArray(ov)) c = [p[0] + ov[0], p[1] + ov[1]];
      else {
        const cands = ov ? [DIRS[ov]] : [...Array(24)].map((_, i) => i * Math.PI / 12); let best = null; const r = 11 + 3 * (n.length - 1);
        cands.forEach(a => {
          const q = [p[0] + r * Math.cos(a), p[1] + r * Math.sin(a)]; let sc = 0, mA = Math.PI;
          inc[n].forEach(d => { let x = Math.abs(a - d) % (2 * Math.PI); if (x > Math.PI) x = 2 * Math.PI - x; mA = Math.min(mA, x); }); sc += Math.min(mA, Math.PI / 2) * 2;
          const ox = p[0] - cen[0], oy = p[1] - cen[1], ol = Math.hypot(ox, oy); if (ol > 1) sc += 0.7 * (ox * Math.cos(a) + oy * Math.sin(a)) / ol;
          segPx.forEach(s => { const dd = segDist(q, s[0], s[1]); if (dd < 8) sc -= (8 - dd) * 0.35; });
          named.forEach(m => { if (m !== n) { const dd = d2(q, pp[m]); if (dd < 11) sc -= (11 - dd) * 0.4; } });
          placed.forEach(z => { const dd = d2(q, z); if (dd < 17) sc -= (17 - dd) * 0.6; });
          if (q[0] < 8 || q[0] > W - 8 || q[1] < 8 || q[1] > H - 8) sc -= 3;
          if (!best || sc > best.sc) best = { sc, q };
        });
        c = best.q;
      }
      placed.push(c); el('circle', { cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: 2.1, fill: (cfg.colors || {})[n] || '#111' }, gT);
      label(n, c[0], c[1], { color: (cfg.colors || {})[n] });
    });
    const crowd = q => { let c = 0; segPx.forEach(z => { const dd = segDist(q, z[0], z[1]); if (dd < 7) c += (7 - dd) * 0.5; }); named.forEach(m => { const dd = d2(q, pp[m]); if (dd < 11) c += (11 - dd) * 0.5; }); placed.forEach(z => { const dd = d2(q, z); if (dd < 16) c += (16 - dd) * 0.7; }); return c; };
    texts.forEach(t => {
      let x, y;
      if (t.on) {
        const [a, b] = tok(t.on).map(k => S.px(P[k])), m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], L = d2(a, b) || 1; let nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
        if (nx * (m[0] - cen[0]) + ny * (m[1] - cen[1]) < 0) { nx = -nx; ny = -ny; }
        const hw = 3.4 * String(t.t).replace(/[_^{}]/g, '').length * (t.size || 13) / 13, wide = q => crowd(q) + crowd([q[0] - hw, q[1]]) + crowd([q[0] + hw, q[1]]);
        let best = null; [[1, 10], [1, 14], [-1, 10], [-1, 14], [1, 19], [-1, 19], [1, 25], [-1, 25]].forEach(([sd, g], i) => { const gg = t.gap || (g + Math.abs(nx) * hw * 0.8); [0.5, 0.38, 0.62].forEach((f, j) => { const mm = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f], q = [mm[0] + sd * nx * gg, mm[1] + sd * ny * gg], sc = wide(q) + i * 0.3 + j * 0.8; if (!best || sc < best.sc) best = { sc, q }; }); });
        [x, y] = best.q;
      } else {
        const q = S.px(t.pos); x = q[0]; y = q[1];
        if (t.tick) {
          if (t.tick === 'x') el('path', { d: `M${x} ${y - 3} L${x} ${y + 3}`, stroke: '#111' }, gM); else el('path', { d: `M${x - 3} ${y} L${x + 3} ${y}`, stroke: '#111' }, gM);
          const c = t.tick === 'x' ? [[0, 14], [0, -13], [-9, 14], [9, 14]] : [[-14, 0], [14, 0], [-14, -9], [-14, 9]];
          let best = null; c.forEach((o, i) => { const z = [x + o[0], y + o[1]], sc = crowd(z) + i * 0.4; if (!best || sc < best.sc) best = { sc, z }; });
          [x, y] = best.z; t.dx = t.dy = 0;
        }
      }
      x += t.dx || 0; y += t.dy || 0; placed.push([x, y]);
      label(t.t, x, y, { italic: !!t.italic, size: t.size || 13, color: t.color, vec: t.vec });
    });
    return svg;
  }

  // Bảng biến thiên / bảng xét dấu: HTML + MathJax, mũi tên SVG kích thước cố định
  function bbt(target, s) { const h = host$(target); if (!h) return; try { bbt_(h, s); } catch (e) { fail(h, e); } }
  function bbt_(host, s) {
    const n = s.x.length, cols = 2 * n - 1, labW = s.labW || 58, ptW = s.ptW || 66, rowH = s.h || 80;
    const ivW = Math.max(48, Math.min(120, Math.round((640 - labW - n * ptW) / Math.max(1, n - 1))));
    const m = v => (v === '' || v == null) ? '' : '$' + v + '$';
    const ypos = p => p === 't' ? 14 : p === 'b' ? rowH - 14 : rowH / 2;
    let h = `<table class="bbt"><colgroup><col style="width:${labW}px">`;
    for (let c = 0; c < cols; c++) h += `<col style="width:${c % 2 ? ivW : ptW}px">`;
    h += `</colgroup><tr><td class="lab">${m(s.xName || 'x')}</td>`;
    for (let c = 0; c < cols; c++) h += `<td>${c % 2 ? '' : m(s.x[c / 2])}</td>`;
    h += '</tr>';
    const signRow = (name, arr) => { let r = `<tr><td class="lab">${m(name)}</td>`; for (let c = 0; c < cols; c++) { const v = arr[c]; r += v === '||' ? '<td class="has-bar"><div class="dbar"></div></td>' : `<td>${m(v)}</td>`; } return r + '</tr>'; };
    (s.rows || []).forEach(r => h += signRow(r.name, r.v));
    if (s.d) h += signRow(s.dName || "y'", s.d);
    if (s.y) {
      h += `<tr class="r-y"><td class="lab">${m(s.yName || 'y')}</td>`;
      for (let c = 0; c < cols; c++) {
        if (c % 2 === 0) {
          const e = s.y[c / 2];
          if (e.length === 4) h += `<td class="has-bar" style="height:${rowH}px"><div class="dbar"></div><div class="ysplit"><div class="yv ${e[1]}" style="height:${rowH}px">${m(e[0])}</div><div class="yv ${e[3]}" style="height:${rowH}px">${m(e[2])}</div></div></td>`;
          else h += `<td style="height:${rowH}px"><div class="yv ${e[1]}" style="height:${rowH}px">${m(e[0])}</div></td>`;
        } else {
          const L = s.y[(c - 1) / 2], Rr = s.y[(c + 1) / 2], p0 = L.length === 4 ? L[3] : L[1], p1 = Rr[1];
          const x0 = 8, x1 = ivW - 8, y0 = ypos(p0), y1 = ypos(p1), len = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / len, uy = (y1 - y0) / len, hx = x1 - ux * 8, hy = y1 - uy * 8;
          h += `<td style="padding:0"><svg width="${ivW}" height="${rowH}" style="display:block"><path d="M${x0} ${y0} L${hx.toFixed(1)} ${hy.toFixed(1)}" stroke="#000" stroke-width="1.2"/><path d="M${x1} ${y1} L${(hx - uy * 3.5).toFixed(1)} ${(hy + ux * 3.5).toFixed(1)} L${(hx + uy * 3.5).toFixed(1)} ${(hy - ux * 3.5).toFixed(1)}Z" fill="#000"/></svg></td>`;
        }
      }
      h += '</tr>';
    }
    host.innerHTML = h + '</table>';
    if (window.MathJax && MathJax.typesetPromise && MathJax.startup && MathJax.startup.document) MathJax.typesetPromise([host]).catch(() => {});
  }

  // Trục số: phần bị loại gạch chéo (quy ước SGK), điểm tròn rỗng/đặc, ngoặc
  function numline(target, s) { const h = host$(target); if (!h) return; try {
    const W = s.w || 520, H = 64, y = 34, L = 24, Rr = W - 30, X = v => L + (v - s.min) / (s.max - s.min) * (Rr - L);
    let o = `<svg xmlns="${NS}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family='${FONT}'>`;
    (s.cut || []).forEach(([a, b]) => { const xa = X(Math.max(a, s.min)), xb = X(Math.min(b, s.max)); for (let x = xa; x < xb - 2; x += 5) o += `<path d="M${x} ${y + 6} L${Math.min(x + 6, xb)} ${y - 6}" stroke="#111" stroke-width="0.9"/>`; });
    (s.bold || []).forEach(([a, b]) => { o += `<path d="M${X(Math.max(a, s.min))} ${y} L${X(Math.min(b, s.max))} ${y}" stroke="#111" stroke-width="3.5"/>`; });
    o += `<path d="M${L - 10} ${y} L${Rr + 14} ${y}" stroke="#111" stroke-width="1.3"/><path d="M${Rr + 20} ${y} L${Rr + 10} ${y - 4} L${Rr + 12} ${y} L${Rr + 10} ${y + 4}Z" fill="#111"/>`;
    (s.pts || []).forEach(p => { const x = X(p.x), t = p.type || 'tick';
      if (t === 'open') o += `<circle cx="${x}" cy="${y}" r="4" fill="#fff" stroke="#111" stroke-width="1.3"/>`; else if (t === 'closed') o += `<circle cx="${x}" cy="${y}" r="4" fill="#111"/>`;
      else if ('([)]'.includes(t)) o += `<text x="${x}" y="${y}" font-size="22" text-anchor="middle" dominant-baseline="central">${t}</text>`; else o += `<path d="M${x} ${y - 4} L${x} ${y + 4}" stroke="#111"/>`;
      o += `<text x="${x}" y="${y + 21}" font-size="14" text-anchor="middle" dominant-baseline="central">${String(p.label != null ? p.label : p.x).replace(/^-/, '−').replace('.', ',')}</text>`; });
    h.innerHTML = o + '</svg>'; } catch (e) { fail(h, e); } }

  // Biểu đồ thống kê: bar | hist | line | pie
  function chart(target, s) { const h = host$(target); if (!h) return; try {
    const W = s.w || 440, H = s.h || 260, C = s.colors || ['#93c5fd', '#fca5a5', '#86efac', '#fde68a', '#c4b5fd', '#f9a8d4', '#a5f3fc', '#fdba74'], f = v => String(v).replace('.', ',');
    let o = `<svg xmlns="${NS}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family='${FONT}' font-size="13">`;
    if (s.type === 'pie') { const tot = s.values.reduce((a, b) => a + b, 0), cx = 130, cy = H / 2, r = Math.min(110, H / 2 - 16); let a0 = -Math.PI / 2;
      s.values.forEach((v, i) => { const a1 = a0 + v / tot * 2 * Math.PI, lg = a1 - a0 > Math.PI ? 1 : 0, p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)], p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)], am = (a0 + a1) / 2;
        o += `<path d="M${cx} ${cy} L${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A${r} ${r} 0 ${lg} 1 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}Z" fill="${C[i % C.length]}" stroke="#111" stroke-width="1"/>`;
        o += `<text x="${(cx + r * 0.62 * Math.cos(am)).toFixed(1)}" y="${(cy + r * 0.62 * Math.sin(am)).toFixed(1)}" text-anchor="middle" dominant-baseline="central">${s.pct === false ? f(v) : f(Math.round(v / tot * 1000) / 10) + '%'}</text>`;
        o += `<rect x="${cx + r + 30}" y="${24 + i * 22}" width="14" height="14" fill="${C[i % C.length]}" stroke="#111" stroke-width="0.8"/><text x="${cx + r + 52}" y="${31 + i * 22}" dominant-baseline="central">${s.labels[i]}</text>`; a0 = a1; });
      h.innerHTML = o + '</svg>'; return; }
    const ml = 46, mr = 16, mt = s.legend ? 40 : 18, mb = 40, pw = W - ml - mr, ph = H - mt - mb, series = s.series || [s.values], vmax = s.max || Math.max(...series.flat()) * 1.12, Y = v => mt + ph - v / vmax * ph;
    const step = s.tick || (() => { const raw = vmax / 5, p = Math.pow(10, Math.floor(Math.log10(raw))); return [1, 2, 5, 10].map(k => k * p).find(k => k >= raw); })();
    for (let v = 0; v <= vmax + 1e-9; v += step) o += `<path d="M${ml} ${Y(v)} L${ml + pw} ${Y(v)}" stroke="#e5e7eb"/><text x="${ml - 6}" y="${Y(v)}" text-anchor="end" dominant-baseline="central">${f(+v.toFixed(6))}</text>`;
    const n = s.type === 'hist' ? s.edges.length - 1 : s.labels.length, bw = pw / n;
    series.forEach((vals, k) => { if (s.type === 'line') { const pts = vals.map((v, i) => [ml + bw * (i + 0.5), Y(v)]); o += `<path d="${pathD(pts)}" fill="none" stroke="${['#1d4ed8', '#b91c1c', '#15803d'][k % 3]}" stroke-width="1.8"/>` + pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="${['#1d4ed8', '#b91c1c', '#15803d'][k % 3]}"/>`).join(''); }
      else vals.forEach((v, i) => { const gap = s.type === 'hist' ? 0 : bw * 0.22, w = (bw - 2 * gap) / series.length, x = ml + bw * i + gap + k * w; o += `<rect x="${x.toFixed(1)}" y="${Y(v).toFixed(1)}" width="${w.toFixed(1)}" height="${(mt + ph - Y(v)).toFixed(1)}" fill="${C[k % C.length]}" stroke="#111" stroke-width="0.9"/>`; if (s.showValues !== false) o += `<text x="${(x + w / 2).toFixed(1)}" y="${(Y(v) - 8).toFixed(1)}" text-anchor="middle" font-size="12">${f(v)}</text>`; }); });
    if (s.type === 'hist') s.edges.forEach((e, i) => o += `<text x="${ml + bw * i}" y="${mt + ph + 14}" text-anchor="middle">${f(e)}</text>`); else s.labels.forEach((l, i) => o += `<text x="${ml + bw * (i + 0.5)}" y="${mt + ph + 14}" text-anchor="middle">${l}</text>`);
    o += `<path d="M${ml} ${mt - 8} L${ml} ${mt + ph} L${ml + pw + 6} ${mt + ph}" fill="none" stroke="#111" stroke-width="1.3"/>`;
    if (s.xl) o += `<text x="${ml + pw}" y="${H - 6}" text-anchor="end" font-style="italic">${s.xl}</text>`; if (s.yl) o += `<text x="${ml - 4}" y="${mt - 8}" text-anchor="start" font-style="italic" dx="6">${s.yl}</text>`;
    if (s.legend) s.legend.forEach((l, k) => { const x = ml + 70 + k * 110; o += `<rect x="${x}" y="4" width="12" height="12" fill="${s.type === 'line' ? ['#1d4ed8', '#b91c1c', '#15803d'][k % 3] : C[k % C.length]}" stroke="#111" stroke-width="0.6"/><text x="${x + 17}" y="10" dominant-baseline="central" font-size="12.5">${l}</text>`; });
    h.innerHTML = o + '</svg>'; } catch (e) { fail(h, e); } }

  // Sơ đồ cây xác suất: {root:'', kids:[{t:'A', p:'0,4', kids:[...]}]}
  function tree(target, s) { const h = host$(target); if (!h) return; try {
    const leaves = n => (n.kids && n.kids.length) ? n.kids.reduce((a, k) => a + leaves(k), 0) : 1, depth = n => (n.kids && n.kids.length) ? 1 + Math.max(...n.kids.map(depth)) : 0;
    const root = { t: s.root || '', kids: s.kids }, D = depth(root), NL = leaves(root), W = s.w || Math.min(620, 120 + D * 150), dy = s.dy || 34, H = NL * dy + 20, dx = (W - 70) / D;
    let o = `<svg xmlns="${NS}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family='${FONT}' font-size="14">`, row = 0;
    const lay = (n, d) => { n.x = 24 + d * dx; if (n.kids && n.kids.length) { n.kids.forEach(k => lay(k, d + 1)); n.y = (n.kids[0].y + n.kids[n.kids.length - 1].y) / 2; } else n.y = 10 + dy * (row++ + 0.5); };
    lay(root, 0);
    const put = n => { (n.kids || []).forEach(k => { const x0 = n.x + 14, x1 = k.x - 14; o += `<path d="M${x0} ${n.y} L${x1} ${k.y}" stroke="#111" stroke-width="1.1"/>`; if (k.p != null) o += `<text x="${(x0 + x1) / 2}" y="${(n.y + k.y) / 2 + (k.y > n.y + 1 ? 12 : -8)}" text-anchor="middle" font-size="12.5" fill="#1d4ed8">${String(k.p).replace('.', ',')}</text>`; put(k); });
      o += `<text x="${n.x}" y="${n.y}" text-anchor="middle" dominant-baseline="central" font-style="italic">${n.t}</text>`; if (n.end) o += `<text x="${n.x + 22}" y="${n.y}" dominant-baseline="central" font-size="12.5">${n.end}</text>`; };
    put(root); h.innerHTML = o + '</svg>'; } catch (e) { fail(h, e); } }

  return { draw, bbt, numline, chart, tree, _flush, VERSION: '3.5' };
})();
/* ===================== HẾT GEO ENGINE ===================== */

/* ===================== EXPORT v2 (Tab + PDF + bản in) — v3.5 ===================== */
const PAGE = { w: 210, h: 297, mt: 12, mb: 14, ml: 15, mr: 15 }, MM = 96 / 25.4;
const CW = Math.round((PAGE.w - PAGE.ml - PAGE.mr) * MM), CH = Math.floor((PAGE.h - PAGE.mt - PAGE.mb) * MM);

function switchTab(t) {
  t = /^(sol|solution|giai|loi-?giai|dap-?an|answer|2)$/i.test(String(t)) ? 'solution' : 'exam';
  const ex = document.getElementById('tab-exam'), so = document.getElementById('tab-solution');
  if (ex) ex.classList.toggle('tab-hidden', t !== 'exam' && !!so);
  if (so) so.classList.toggle('tab-hidden', t !== 'solution');
  const be = document.getElementById('btn-exam'), bs = document.getElementById('btn-solution');
  if (be) be.classList.toggle('active', t === 'exam'); if (bs) bs.classList.toggle('active', t === 'solution');
}
const activeTab = () => { const so = document.getElementById('tab-solution'); return so && !so.classList.contains('tab-hidden') ? 'solution' : 'exam'; };
const pageTitle = () => { try { if (typeof EXAM_TITLE === 'string' && EXAM_TITLE.trim()) return EXAM_TITLE; } catch (e) {} const h = document.querySelector('#tab-exam h1'); return (h && h.textContent.trim()) || document.title || 'De thi'; };
const fileTitle = t => (t === 'exam' ? pageTitle() : pageTitle() + ' - Đáp án và lời giải chi tiết').replace(/[\\/:*?"<>|]/g, ' ').trim();

async function prepareExport() {
  try { if (window.MathJax && MathJax.startup && MathJax.startup.promise) { await MathJax.startup.promise; await MathJax.typesetPromise(); } } catch (e) { console.warn(e); }
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) {}
}

// Chia trang theo khối: không bao giờ cắt ngang một câu/hình; khối quá cao mới tách theo con
function paginate(target) {
  const src = document.querySelector('#tab-' + target + ' .doc');
  const host = document.createElement('div'); host.className = 'pdf-host'; document.body.appendChild(host);
  const meas = document.createElement('div'); meas.className = 'doc pdf-sheet'; host.appendChild(meas);
  [...src.children].forEach(n => meas.appendChild(n.cloneNode(true)));
  for (let g = 0; g < 80; g++) {
    const big = [...meas.children].find(b => b.offsetHeight > CH && b.children.length > 1 && !b.matches('.figure-box'));
    if (!big) break; [...big.children].forEach(k => meas.insertBefore(k, big)); big.remove();
  }
  const items = [...meas.children].map(el => ({ el, top: el.offsetTop, h: el.offsetHeight }));
  const pages = []; let cur = [], used = 0, prevBottom = 0;
  items.forEach((it, i) => {
    const gap = cur.length ? Math.max(0, it.top - prevBottom) : 0, nx = items[i + 1];
    let need = gap + it.h;
    if (nx && it.el.matches('.section-title,.keep-next')) need += Math.max(0, nx.top - (it.top + it.h)) + Math.min(nx.h, 150);
    if (cur.length && used + need > CH) { pages.push(cur); cur = []; used = 0; }
    used += (cur.length ? gap : 0) + it.h; cur.push(it.el); prevBottom = it.top + it.h;
  });
  if (cur.length) pages.push(cur);
  const sheets = pages.map(list => { const sh = document.createElement('div'); sh.className = 'doc pdf-sheet'; list.forEach((el, j) => { if (j === 0) el.style.marginTop = '0'; sh.appendChild(el); }); host.appendChild(sh); return sh; });
  meas.remove();
  return { host, sheets };
}

async function downloadPDF(target, btn) {
  target = /^(sol|solution|giai|loi-?giai|dap-?an|answer|2)$/i.test(String(target)) ? 'solution' : 'exam';
  const old = btn ? btn.innerHTML : '', say = t => { if (btn) btn.innerHTML = t; };
  if (btn) btn.disabled = true; say('⏳ Đang chuẩn bị...');
  let host = null;
  try {
    switchTab(target); await prepareExport(); await ensurePdfLibs();
    if (!window.htmlToImage || !window.jspdf) throw new Error('Chưa tải được thư viện xuất PDF');
    const pg = paginate(target); host = pg.host;
    const pdf = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
    const wmm = PAGE.w - PAGE.ml - PAGE.mr, hmax = PAGE.h - PAGE.mt - PAGE.mb, N = pg.sheets.length;
    for (let i = 0; i < N; i++) {
      say(`⏳ Trang ${i + 1}/${N}...`);
      const cv = await htmlToImage.toCanvas(pg.sheets[i], { pixelRatio: 2.5, backgroundColor: '#ffffff', skipFonts: true, cacheBust: false });
      let w = wmm, h = cv.height * wmm / cv.width; if (h > hmax) { w = w * hmax / h; h = hmax; }
      if (i) pdf.addPage();
      pdf.addImage(cv.toDataURL('image/jpeg', 0.93), 'JPEG', PAGE.ml + (wmm - w) / 2, PAGE.mt, w, h);
      pdf.setFontSize(9); pdf.setTextColor(110); pdf.text(`Trang ${i + 1}/${N}`, PAGE.w / 2, PAGE.h - 6, { align: 'center' });
    }
    pdf.save(fileTitle(target) + '.pdf'); say('✅ Đã tải PDF');
  } catch (err) {
    console.error(err); say('⚠ Lỗi PDF → tải bản in HTML'); await downloadPrintHTML(target);
  } finally {
    if (host) host.remove();
    setTimeout(() => { if (btn) { btn.disabled = false; btn.innerHTML = old; } }, 2000);
  }
}

// Dự phòng: file HTML đã chia trang sẵn, mở bằng Chrome/Edge → Ctrl+P → Lưu PDF (chữ & hình vector)
async function downloadPrintHTML(target) {
  target = target ? (/^(sol|solution|giai|loi-?giai|dap-?an|answer|2)$/i.test(String(target)) ? 'solution' : 'exam') : activeTab(); await prepareExport();
  const pg = paginate(target); pg.host.querySelectorAll('mjx-assistive-mml').forEach(x => x.remove());
  const body = pg.sheets.map(s => s.outerHTML).join('\n'); pg.host.remove();
  const mj = document.getElementById('MJX-SVG-styles'), css = document.getElementById('doc-style').textContent + (mj ? mj.textContent : ''), title = fileTitle(target);
  const html = `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>${title}</title><style>${css}
@page{size:A4 portrait;margin:${PAGE.mt}mm ${PAGE.mr}mm ${PAGE.mb}mm ${PAGE.ml}mm}
body{background:#e5e7eb;margin:0}.pdf-sheet{margin:16px auto;box-shadow:0 2px 10px rgba(0,0,0,.15);outline:${PAGE.mt * MM}px solid #fff}
.bar{position:sticky;top:0;z-index:9;background:#1e3a8a;color:#fff;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;font:15px Arial,sans-serif}
.bar button{background:#16a34a;color:#fff;border:0;padding:8px 14px;font-weight:bold;border-radius:5px;cursor:pointer}
@media print{.bar{display:none}body{background:#fff}.pdf-sheet{margin:0;box-shadow:none;outline:none;break-after:page}.pdf-sheet:last-child{break-after:auto}}
</style></head><body><div class="bar"><span>Ctrl + P → Đích: <b>Lưu dưới dạng PDF</b> → Lề: <b>Mặc định</b> → Lưu</span><button onclick="print()">In / Lưu PDF</button></div>
${body}<script>addEventListener('load',()=>setTimeout(()=>print(),700))<\/script></body></html>`;
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
  a.download = title + '.html'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 3000);
}
/* ===================== HẾT EXPORT ===================== */

/* ===================== TỰ DỰNG KHUNG + CHỊU LỖI (v3.5) ===================== */
const TL = { switchTab, downloadPDF, downloadPrintHTML };
const CDN = {
  mj: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js',
  h2i: 'https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.js',
  pdf: 'https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js'
};
const loaded = {};
function loadScript(url, test) {
  if (test()) return Promise.resolve();
  if (loaded[url]) return loaded[url];
  return (loaded[url] = new Promise(res => {
    const s = document.createElement('script'); s.src = url; s.async = true;
    s.onload = () => res(); s.onerror = () => res();
    document.head.appendChild(s);
  }));
}
const hasScript = re => [...document.scripts].some(s => re.test(s.src || ''));
const ensurePdfLibs = () => Promise.all([
  loadScript(CDN.h2i, () => !!window.htmlToImage || hasScript(/html-to-image/i) && !!window.htmlToImage),
  loadScript(CDN.pdf, () => !!window.jspdf)
]);
function ensureMathJax() {
  if (window.MathJax && window.MathJax.typesetPromise) return;
  if (hasScript(/mathjax/i)) return;
  if (!window.MathJax || typeof window.MathJax !== 'object' || !window.MathJax.tex) {
    window.MathJax = { tex: { inlineMath: [['$', '$'], ['\\(', '\\)']], displayMath: [['$$', '$$'], ['\\[', '\\]']] }, svg: { fontCache: 'none' } };
  } else { window.MathJax.svg = Object.assign({}, window.MathJax.svg, { fontCache: 'none' }); }
  loadScript(CDN.mj, () => false);
}

// ---- Tìm 2 phần Đề / Lời giải dù Gemini đặt tên khác ----
const EXAM_IDS = ['tab-exam', 'exam', 'tab-de', 'de-thi', 'dethi', 'de', 'de-bai', 'debai', 'tab-1', 'tab1', 'exam-tab', 'tab-de-thi'];
const SOL_IDS = ['tab-solution', 'tab-sol', 'solution', 'sol', 'tab-loi-giai', 'loi-giai', 'loigiai', 'giai', 'dap-an', 'dapan', 'tab-dap-an', 'tab-2', 'tab2', 'solution-tab', 'answer', 'answers'];
const byIds = ids => { for (const id of ids) { const e = document.getElementById(id); if (e) return e; } return null; };
function findParts() {
  let ex = byIds(EXAM_IDS), so = byIds(SOL_IDS);
  if (!ex) ex = document.querySelector('[data-tab="exam"],[data-tab="de"]');
  if (!so) so = document.querySelector('[data-tab="solution"],[data-tab="sol"],[data-tab="giai"]');
  if (ex && so && (ex.contains(so) || so.contains(ex))) so = null;
  return { ex, so };
}
const isOurBar = b => b && b.id === 'tldh-toolbar';
function stripForeignUI() {
  // gỡ <style> tự chế (giữ CSS của thư viện và của MathJax)
  document.querySelectorAll('style').forEach(s => { if (s.id !== 'doc-style' && !/^MJX/i.test(s.id || '')) s.remove(); });
  document.querySelectorAll('link[rel="stylesheet"]').forEach(l => { if (!/mathjax/i.test(l.href)) l.remove(); });
  // gỡ thanh nút tự chế (nút gọi switchTab / print / tải PDF)
  const re = /switchTab|showTab|openTab|print\s*\(|downloadPDF|downloadPrintHTML|exportPDF|html2pdf/i;
  [...document.querySelectorAll('button,a,[onclick]')].forEach(b => {
    if (b.closest('#tldh-toolbar')) return;
    const oc = (b.getAttribute('onclick') || '') + ' ' + (b.id || '') + ' ' + (b.className || '');
    if (re.test(oc) || /^(btn|tab)-(exam|sol|solution|de|giai)/i.test(b.id || '') || /tab-btn|tabs?-button|print-btn/i.test(b.className || '')) {
      const p = b.parentElement; b.remove();
      if (p && p !== document.body && !p.querySelector('*:not(br)') && !p.textContent.trim()) p.remove();
    }
  });
  document.querySelectorAll('.toolbar,.tabs,.tab-bar,.tab-buttons,.nav-tabs').forEach(t => { if (!isOurBar(t) && !t.textContent.trim()) t.remove(); });
}
function asSection(el, id) {
  if (!el) return null;
  let sec;
  if (el.tagName === 'SECTION' && el.id === id && el.children.length === 1 && el.firstElementChild.classList.contains('doc')) sec = el;
  else {
    sec = document.createElement('section');
    const doc = el.classList.contains('doc') ? el : (el.querySelector(':scope > .doc') && el.children.length === 1 ? el.firstElementChild : null);
    const inner = document.createElement('div'); inner.className = 'doc';
    const src = doc || el;
    while (src.firstChild) inner.appendChild(src.firstChild);
    sec.appendChild(inner);
    el.parentNode.insertBefore(sec, el); el.remove();
    sec.id = id;
  }
  sec.className = 'paper'; sec.removeAttribute('style'); sec.hidden = false;
  return sec;
}
function buildToolbar(hasSol) {
  document.querySelectorAll('#tldh-toolbar').forEach(x => x.remove());
  const bar = document.createElement('div'); bar.className = 'toolbar'; bar.id = 'tldh-toolbar';
  const mk = (txt, cls, id, fn) => { const b = document.createElement('button'); b.type = 'button'; b.innerHTML = txt; if (cls) b.className = cls; if (id) b.id = id; b.addEventListener('click', e => { e.preventDefault(); fn(b); }); bar.appendChild(b); return b; };
  mk('1. Đề thi [TTN]', 'active', 'btn-exam', () => TL.switchTab('exam'));
  if (hasSol) mk('2. Đáp án &amp; Lời giải chi tiết', '', 'btn-solution', () => TL.switchTab('solution'));
  mk('⬇ Tải PDF Đề thi', 'b-exam', '', b => TL.downloadPDF('exam', b));
  if (hasSol) mk('⬇ Tải PDF Đáp án &amp; Giải chi tiết', 'b-sol', '', b => TL.downloadPDF('solution', b));
  mk('📄 Tải bản in HTML (Dự phòng)', 'b-html', '', () => TL.downloadPrintHTML());
  document.body.insertBefore(bar, document.body.firstChild);
}
function callPageDrawers() {
  // Gemini đôi khi chỉ vẽ hình trong hàm riêng (drawFigures…) được gọi lúc chuyển tab
  const done = new Set();
  Object.keys(window).forEach(k => {
    if (!/^(draw|render|init|ve)/i.test(k) || done.has(k)) return;
    const f = window[k]; if (typeof f !== 'function' || f.length) return;
    let src = ''; try { src = Function.prototype.toString.call(f); } catch (e) { return; }
    if (!/Geo\.(draw|bbt|numline|chart|tree)/.test(src) || /\[native code\]/.test(src)) return;
    done.add(k); try { f(); } catch (e) { console.warn('tldh:', k, e); }
  });
}
function boot() {
  if (window.__tldhBooted) return; window.__tldhBooted = true;
  ensureMathJax(); ensurePdfLibs();
  stripForeignUI();
  let { ex, so } = findParts();
  if (!ex) {
    // không có khung: toàn bộ nội dung trang là phần Đề
    ex = document.createElement('div');
    [...document.body.childNodes].forEach(n => { if (!(n.nodeType === 1 && (n.tagName === 'SCRIPT' || n.id === 'tldh-toolbar'))) ex.appendChild(n); });
    document.body.insertBefore(ex, document.body.firstChild);
  }
  // gỡ các vỏ bọc ngoài (container, wrapper…) để 2 tờ giấy nằm ngay trong body
  const exS = asSection(ex, 'tab-exam'), soS = asSection(so, 'tab-solution');
  [exS, soS].forEach(s => { if (s && s.parentElement !== document.body) document.body.appendChild(s); });
  const lead = [];
  [...document.body.children].forEach(c => {
    if (c === exS || c === soS || c.tagName === 'SCRIPT' || c.id === 'tldh-toolbar' || /^MJX|^MathJax/i.test(c.id || '')) return;
    if (!c.textContent.trim() && !c.querySelector('svg,img,canvas,table')) c.remove(); else lead.push(c);
  });
  if (exS) { const d = exS.firstElementChild, f = d.firstChild; lead.forEach(c => d.insertBefore(c, f)); }
  if (soS) soS.classList.add('tab-hidden');
  buildToolbar(!!soS);
  window.switchTab = TL.switchTab; window.downloadPDF = TL.downloadPDF; window.downloadPrintHTML = TL.downloadPrintHTML;
  callPageDrawers();
  Geo._flush();
  if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise().catch(() => {});
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else setTimeout(boot, 0);
window.addEventListener('load', () => { window.switchTab = TL.switchTab; window.downloadPDF = TL.downloadPDF; window.downloadPrintHTML = TL.downloadPrintHTML; });
/* ===================== HẾT PHẦN TỰ DỰNG ===================== */

window.Geo = Geo; window.TLDH = TL;
window.switchTab = TL.switchTab; window.downloadPDF = TL.downloadPDF; window.downloadPrintHTML = TL.downloadPrintHTML;
})();

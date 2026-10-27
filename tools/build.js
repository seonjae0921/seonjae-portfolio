#!/usr/bin/env node
/* tools/content.js → index.html, projects/<slug>/index.html 생성
   사용법: node tools/build.js   (Node.js 18 이상) */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
delete require.cache[require.resolve('./content.js')];
const C = require('./content.js');
const { site } = C;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const isExt = (u) => /^https?:\/\//.test(u);
const extA = (label, url, cls = '') => `<a class="${('ext ' + cls).trim()}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}<span class="sr"> (새 창)</span></a>`;
const fieldLabel = (k) => (C.fields.find((f) => f.key === k) || {}).label || '';
const mailto = `mailto:${site.email}?subject=${encodeURIComponent(C.contact.mailSubject)}`;
const hasFile = (rel) => fs.existsSync(path.join(ROOT, rel));
const badgeCls = (type) => (type.startsWith('실무') ? 'badge' : 'badge personal');

// 중복 slug 검사
const slugs = C.projects.map((p) => p.slug);
if (new Set(slugs).size !== slugs.length) throw new Error('중복된 slug가 있습니다.');
C.intro.stats.concat(C.approach).forEach((x) => { if (!slugs.includes(x.slug)) throw new Error('없는 slug: ' + x.slug); });

const FONT = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css';

function head({ title, desc, url, prefix }) {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#0a0e16">
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(site.baseUrl + site.photo)}">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="${FONT}">
<link rel="stylesheet" href="${prefix}assets/style.css">
<script>document.documentElement.classList.add('js')</script>
</head>`;
}

function nav(prefix, isHome) {
  const items = [['home', '홈', 'home-link'], ['portfolio', '포트폴리오'], ['about', '자기소개'], ['contact', '연락처']];
  return `<a class="skip" href="#main">본문으로 건너뛰기</a>
<header class="nav"><div class="wrap">
<a class="logo" href="${prefix}index.html#home">${esc(site.nameEn)}<span>.</span></a>
<nav aria-label="주요 메뉴"><ul>${items.map(([id, label, cls]) =>
    `<li${cls ? ` class="${cls}"` : ''}><a class="link" ${isHome ? `data-nav="${id}" ` : ''}href="${prefix}index.html#${id}">${label}</a></li>`).join('')}</ul></nav>
</div></header>`;
}

const footer = (prefix) => `<footer class="footer"><div class="wrap">
<span>© 2026 ${esc(site.name)}</span>
<span>기준 데이터 ${extA('노션 커리어 허브', site.notion)} · Built with HTML / CSS / JS</span>
</div></footer>
<script src="${prefix}assets/main.js" defer></script>
</body>
</html>
`;

/* ---------------- 메인 ---------------- */
function card(p) {
  const img = hasFile(`images/${p.slug}.jpg`) ? `<img src="images/${p.slug}.jpg" alt="" loading="lazy">` : '';
  return `<a class="project${p.wide ? ' wide' : ''}" data-field="${p.field}" data-reveal href="projects/${p.slug}/">
<div class="thumb">${img}<span class="field">${esc(fieldLabel(p.field))}</span><div class="kpi"><strong>${esc(p.kpi)}</strong><span>${esc(p.kpiSub)}</span></div></div>
<div class="pbody"><div class="meta-line"><span class="${badgeCls(p.type)}">${esc(p.type)}</span><span>${esc(p.period)}</span></div>
<h3>${esc(p.cardTitle)}</h3><p class="result">${esc(p.cardResult)}</p><span class="more arrow">자세히 보기 </span></div>
</a>`;
}

function home() {
  const I = C.intro, A = C.about;
  const h1 = I.headline.map(([t, hl]) => (hl ? `<span class="hl">${esc(t)}</span>` : esc(t))).join('<br>');
  const stats = I.stats.map((s, i) => `<div class="slide${i === 0 ? ' on' : ''}" id="stat-${i + 1}" role="group" aria-roledescription="지표" aria-label="${i + 1} / ${I.stats.length}">
<p class="stat-label">${esc(s.label)}</p><p class="stat-from">${esc(s.from)}</p>
<p class="stat-value"><strong>${esc(s.value)}</strong><span>${esc(s.unit)}</span></p>
<p class="stat-desc">${esc(s.desc)}</p><a class="stat-more arrow" href="projects/${s.slug}/">자세히 보기 </a></div>`).join('\n');
  const dots = I.stats.map((s, i) => `<button class="dot" type="button" aria-controls="stat-${i + 1}" aria-label="${esc(s.label)} 보기"></button>`).join('');

  return `${head({ title: `${site.name} | ${site.role} 포트폴리오`, desc: site.description, url: site.baseUrl, prefix: '' })}
<body>
${nav('', true)}
<main id="main">
<section class="hero" id="home" aria-labelledby="hero-title">
<div class="glow a" aria-hidden="true"></div><div class="glow b" aria-hidden="true"></div>
<div class="wrap hero-grid">
<div>
<div class="who"><img src="${site.photo}" alt="${esc(site.name)} 프로필 사진" width="56" height="56"><p class="eyebrow">${esc(I.eyebrow)}</p></div>
<h1 id="hero-title">${h1}</h1>
<p class="lead">${esc(I.lead)}</p>
<ul class="chips" aria-label="핵심 역량">${I.keywords.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>
<div class="actions"><a class="btn primary" href="#portfolio"><span class="arrow">포트폴리오 보기 </span></a><a class="btn" href="${site.resume}" download>이력서 PDF 받기 ↓</a></div>
</div>
<aside class="stat-card" aria-label="핵심 지표">
<div class="slides">
${stats}
</div>
<div class="stat-controls">${dots}<button class="pause" type="button" aria-pressed="false">일시정지</button></div>
</aside>
</div>
</section>

<section class="section" id="portfolio" aria-labelledby="portfolio-title">
<div class="bigword" aria-hidden="true">WORK</div>
<div class="wrap">
<div class="sec-head"><p class="eyebrow">Work</p><h2 id="portfolio-title">Portfolio</h2><p>카드를 누르면 배경 · 전략 · 실행 · 성과를 담은 상세 페이지로 이동합니다.</p></div>
<div class="filters" role="group" aria-label="분야 필터"><button class="filter" type="button" data-filter="all" aria-pressed="true">전체</button>${C.fields.map((f) => `<button class="filter" type="button" data-filter="${f.key}" aria-pressed="false">${esc(f.label)}</button>`).join('')}</div>
<p class="filter-status" id="filter-status" aria-live="polite"></p>
<div class="grid">
${C.projects.map(card).join('\n')}
</div>
</div>
</section>

<section class="section" id="about" aria-labelledby="about-title">
<div class="bigword" aria-hidden="true">ABOUT</div>
<div class="wrap">
<div class="sec-head"><p class="eyebrow">About</p><h2 id="about-title">About</h2><p>${esc(A.lead)}</p></div>
<div class="about-grid">
<div class="panel" data-reveal><h3>경력</h3><ul class="timeline">${A.career.map((c) => `<li><p class="when">${esc(c.period)}</p><p class="what">${esc(c.name)} · ${esc(c.role)}</p><p class="note">${esc(c.note)}</p></li>`).join('')}</ul></div>
<div class="panel" data-reveal><h3>일하는 방식</h3><ul class="ways">${C.approach.map((w) => `<li><strong>${esc(w.t)}</strong><a class="arrow" href="projects/${w.slug}/">${esc(w.proof)} </a></li>`).join('')}</ul></div>
<div class="panel" data-reveal><h3>교육 · 학력 · 선정</h3><ul class="timeline">${A.education.map((e) => `<li><p class="when">${esc(e.period)}</p><p class="what">${esc(e.name)}${e.badge ? `<span class="tag">${esc(e.badge)}</span>` : ''}</p><p class="note">${esc(e.note)}</p></li>`).join('')}</ul></div>
<div class="panel" data-reveal><h3>스킬 · 자격</h3><ul class="skills">${A.skills.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
<ul class="certs">${A.certificates.map(([n, d]) => `<li><span>${esc(n)}</span><span>${esc(d)}</span></li>`).join('')}</ul></div>
</div>
</div>
</section>

<section class="section contact" id="contact" aria-labelledby="contact-title">
<div class="bigword" aria-hidden="true">HELLO</div>
<div class="wrap">
<div class="sec-head"><p class="eyebrow">Hello</p><h2 id="contact-title">Contact</h2><p>${esc(C.contact.lead)}</p></div>
<div class="contact-grid">
<a class="c-card" href="${esc(mailto)}"><span class="ico" aria-hidden="true">✉</span><strong>이메일 보내기</strong><span>${esc(site.email)}</span></a>
<button class="c-card" type="button" id="copy-email" data-email="${esc(site.email)}"><span class="ico" aria-hidden="true">⧉</span><strong>이메일 복사</strong><span>클립보드에 주소 복사</span></button>
<a class="c-card" href="${site.resume}" download><span class="ico" aria-hidden="true">↓</span><strong>이력서 · 자기소개서</strong><span>PDF 내려받기</span></a>
<a class="c-card" href="${esc(site.notion)}" target="_blank" rel="noopener noreferrer"><span class="ico" aria-hidden="true">↗</span><strong>노션 커리어 허브</strong><span>경력 · 프로젝트 · 근거 문서<span class="sr"> (새 창)</span></span></a>
</div>
<p class="copy-status" id="copy-status" role="status"></p>
</div>
</section>
</main>
${footer('')}`;
}

/* ---------------- 상세 ---------------- */
function section(s) {
  let body = '';
  if (s.type === 'text') body = s.items.map((t) => `<p>${esc(t)}</p>`).join('');
  else if (s.type === 'list') body = `<ul>${s.items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
  else if (s.type === 'lead') body = `<ul class="lead-list">${s.items.map(([b, t]) => `<li><strong>${esc(b)}:</strong> ${esc(t)}</li>`).join('')}</ul>`;
  else if (s.type === 'results') body = `<ul class="results">${s.items.map(([b, t]) => `<li><strong>${esc(b)}</strong>${t ? `<span>${esc(t)}</span>` : ''}</li>`).join('')}</ul>`;
  else if (s.type === 'parts') body = `<div class="parts">${s.items.map((x) => `<article class="part"><h3>${esc(x.t)}</h3>${x.meta ? `<p class="pmeta">${esc(x.meta)}</p>` : ''}${x.p.map((t) => `<p>${esc(t)}</p>`).join('')}${x.r ? `<p class="pres">결과 · ${esc(x.r)}</p>` : ''}${x.link ? extA(x.link[0], x.link[1], 'plink') : ''}</article>`).join('')}</div>`;
  else if (s.type === 'links') body = `<p class="links">${s.items.map(([l, u]) => (isExt(u) ? extA(l, u) : `<a href="${esc(u)}">${esc(l)}</a>`)).join('')}</p>`;
  else throw new Error('알 수 없는 섹션 타입: ' + s.type);
  return `<section class="case-sec"><h2>${esc(s.h)}</h2>${body}</section>`;
}

function detail(p, i) {
  const next = C.projects[(i + 1) % C.projects.length];
  const prefix = '../../';
  const img = hasFile(`images/${p.slug}.jpg`) ? `<img class="case-img" src="${prefix}images/${p.slug}.jpg" alt="" loading="lazy">` : '';
  return `${head({ title: `${p.cardTitle} | ${site.name} 포트폴리오`, desc: `${p.title} — ${p.keyResult}`, url: `${site.baseUrl}projects/${p.slug}/`, prefix })}
<body>
${nav(prefix, false)}
<main id="main">
<div class="wrap">
<header class="case-top">
<p class="meta-line"><a href="${prefix}index.html#portfolio">← 프로젝트 목록</a></p>
<p class="meta-line" style="margin-top:18px"><span class="${badgeCls(p.type)}">${esc(p.type)}</span><span>${esc(fieldLabel(p.field))}</span><span>·</span><span>${esc(p.period)}</span></p>
<h1>${esc(p.title)}</h1>
<dl class="case-meta">
<div><dt>기간</dt><dd>${esc(p.period)}</dd></div>
<div><dt>분야</dt><dd>${esc(fieldLabel(p.field))}</dd></div>
<div><dt>역할</dt><dd>${esc(p.role)}</dd></div>
<div class="key"><dt>핵심 결과</dt><dd>${esc(p.keyResult)}</dd></div>
</dl>
${img}
</header>
<div class="case-body"><div class="col">
${p.sections.map(section).join('\n')}
</div>
<nav class="case-nav" aria-label="프로젝트 이동">
<a class="btn" href="${prefix}index.html#portfolio">← 프로젝트 목록</a>
<a class="btn next" href="${prefix}projects/${next.slug}/"><span><small>다음 프로젝트</small><span class="arrow">${esc(next.cardTitle)} </span></span></a>
<a class="btn primary" href="${esc(mailto)}">이메일로 연락하기</a>
</nav>
</div>
</div>
</main>
${footer(prefix)}`;
}

/* ---------------- 쓰기 ---------------- */
fs.writeFileSync(path.join(ROOT, 'index.html'), home());
const pdir = path.join(ROOT, 'projects');
for (const d of fs.existsSync(pdir) ? fs.readdirSync(pdir) : []) {
  if (!slugs.includes(d)) fs.rmSync(path.join(pdir, d), { recursive: true, force: true }); // 지운 프로젝트 정리
}
C.projects.forEach((p, i) => {
  const dir = path.join(pdir, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), detail(p, i));
});
console.log(`index.html + 프로젝트 상세 ${C.projects.length}개를 만들었습니다.`);

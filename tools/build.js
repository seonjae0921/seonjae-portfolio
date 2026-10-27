#!/usr/bin/env node
/* tools/content.js → index.html 생성
   사용법: node tools/build.js   (Node.js 18 이상) */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const C = require('./content.js');
const { site, intro, about, contact } = C;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ext = (label, url, cls) => `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗<span class="sr"> (새 창)</span></a>`;
const mailto = `mailto:${site.email}?subject=${encodeURIComponent(contact.mailSubject)}`;
const FONT = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css';
const title = `${site.name} | ${site.role} 포트폴리오`;

const h1 = intro.headline.map(([t, hl]) => (hl ? `<span class="hl">${esc(t)}</span>` : esc(t))).join('<br>');

const highlights = C.highlights.map((h) => `<li class="hl-item" data-reveal>
<strong>${esc(h.value)}</strong><span class="hl-label">${esc(h.label)}</span><span class="hl-detail">${esc(h.detail)}</span><em class="scope${h.scope === '기여' ? ' team' : ''}">${esc(h.scope)}</em>
</li>`).join('\n');

const works = C.works.map((w) => `<article class="work" data-reveal>
<div class="work-kpi"><strong>${esc(w.kpi)}</strong><span>${esc(w.kpiSub)}</span></div>
<div class="work-body">
<p class="meta"><span class="tag">${esc(w.tag)}</span>${esc(w.period)}</p>
<h3>${esc(w.title)}</h3>
<p class="summary">${esc(w.summary)}</p>
<ul class="points">${w.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
<div class="links">${w.links.map(([l, u]) => ext(l, u, 'chip-link')).join('')}</div>
</div>
</article>`).join('\n');

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(site.description)}">
<meta name="theme-color" content="#0a0e16">
<link rel="canonical" href="${esc(site.baseUrl)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(site.description)}">
<meta property="og:url" content="${esc(site.baseUrl)}">
<meta property="og:image" content="${esc(site.baseUrl + site.photo)}">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="${FONT}">
<link rel="stylesheet" href="assets/style.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a class="skip" href="#main">본문으로 건너뛰기</a>
<header class="nav"><div class="wrap">
<a class="logo" href="#home">${esc(site.nameEn)}<span>.</span></a>
<nav aria-label="주요 메뉴"><ul>
<li><a class="link" data-nav="work" href="#work">작업물</a></li>
<li><a class="link" data-nav="about" href="#about">소개</a></li>
<li><a class="link" data-nav="contact" href="#contact">연락처</a></li>
</ul></nav>
</div></header>

<main id="main">
<section class="hero" id="home" aria-labelledby="hero-title">
<div class="glow a" aria-hidden="true"></div><div class="glow b" aria-hidden="true"></div>
<div class="wrap">
<div class="who"><img src="${site.photo}" alt="${esc(site.name)} 프로필 사진" width="56" height="56"><p class="eyebrow">${esc(intro.eyebrow)}</p></div>
<h1 id="hero-title">${h1}</h1>
<p class="lead">${esc(intro.lead)}</p>
<div class="actions"><a class="btn primary" href="#work">작업물 보기 →</a><a class="btn" href="${site.resume}" download>이력서 PDF ↓</a></div>
<h2 class="sr">핵심 성과</h2>
<ul class="highlights">
${highlights}
</ul>
</div>
</section>

<section class="section" id="work" aria-labelledby="work-title">
<div class="bigword" aria-hidden="true">WORK</div>
<div class="wrap">
<div class="sec-head"><p class="eyebrow">Work</p><h2 id="work-title">작업물</h2><p>직접 열어볼 수 있는 결과물이 있는 작업만 모았습니다.</p></div>
<div class="works">
${works}
</div>
</div>
</section>

<section class="section" id="about" aria-labelledby="about-title">
<div class="wrap">
<div class="sec-head"><p class="eyebrow">About</p><h2 id="about-title">소개</h2></div>
<div class="about">
<div class="col" data-reveal><h3>경력</h3><ul class="rows">${about.career.map(([d, n, r]) => `<li><span class="when">${esc(d)}</span><span><b>${esc(n)}</b> ${esc(r)}</span></li>`).join('')}</ul></div>
<div class="col" data-reveal><h3>교육 · 자격</h3><ul class="rows">${about.education.map(([d, n]) => `<li><span class="when">${esc(d)}</span><span>${esc(n)}</span></li>`).join('')}<li><span class="when">자격</span><span>${esc(about.certificates)}</span></li></ul>
<ul class="skills" aria-label="사용 도구">${about.skills.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
</div>
</div>
</section>

<section class="section contact" id="contact" aria-labelledby="contact-title">
<div class="wrap">
<div class="sec-head"><p class="eyebrow">Contact</p><h2 id="contact-title">연락처</h2><p>${esc(contact.lead)}</p></div>
<div class="contact-links">
<a class="btn primary" href="${esc(mailto)}">이메일 보내기 · ${esc(site.email)}</a>
<a class="btn" href="${site.resume}" download>이력서 · 자기소개서 PDF ↓</a>
<a class="btn" href="${esc(site.notion)}" target="_blank" rel="noopener noreferrer">노션 커리어 허브 ↗<span class="sr"> (새 창)</span></a>
</div>
<p class="note">${esc(contact.notionNote)}는 노션 커리어 허브에 정리해 두었습니다.</p>
</div>
</section>
</main>

<footer class="footer"><div class="wrap"><span>© 2026 ${esc(site.name)}</span><span>Built with HTML / CSS / JS</span></div></footer>
<script src="assets/main.js" defer></script>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, 'index.html'), html);
// 예전 상세 페이지 폴더가 남아 있으면 정리
fs.rmSync(path.join(ROOT, 'projects'), { recursive: true, force: true });
console.log('index.html 을 만들었습니다.');

/* 이선재 포트폴리오 — 공통 스크립트
   JS가 꺼져 있어도 본문 · 링크는 모두 동작합니다. 여기서는 보조 기능만 다룹니다. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1) 현재 섹션을 메뉴에 표시 */
  var links = [].slice.call(document.querySelectorAll('.nav a.link[data-nav]'));
  if (links.length && 'IntersectionObserver' in window) {
    var sections = links.map(function (a) { return document.getElementById(a.getAttribute('data-nav')); }).filter(Boolean);
    var seen = {};
    var setCurrent = function (id) {
      links.forEach(function (a) {
        if (a.getAttribute('data-nav') === id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
      var best = null, max = 0;
      sections.forEach(function (s) { if ((seen[s.id] || 0) > max) { max = seen[s.id]; best = s.id; } });
      if (best) setCurrent(best);
    }, { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.1, 0.5, 1] });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* 2) 핵심 지표 카드 회전 — 6초마다, 마우스 · 포커스가 있으면 멈춤, 모션 감소 설정 시 자동 회전 없음 */
  var card = document.querySelector('.stat-card');
  if (card) {
    var slides = [].slice.call(card.querySelectorAll('.slide'));
    var dots = [].slice.call(card.querySelectorAll('.dot'));
    var pauseBtn = card.querySelector('.pause');
    var idx = 0, timer = null, hover = false, stopped = reduce;
    var show = function (n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        var on = i === idx;
        s.classList.toggle('on', on);
        s.setAttribute('aria-hidden', on ? 'false' : 'true');
        s.querySelectorAll('a').forEach(function (a) { a.tabIndex = on ? 0 : -1; });
      });
      dots.forEach(function (d, i) { d.setAttribute('aria-current', i === idx ? 'true' : 'false'); });
    };
    var tick = function () { if (!hover && !stopped && !document.hidden) show(idx + 1); };
    var setStopped = function (v) {
      stopped = v;
      if (pauseBtn) { pauseBtn.textContent = v ? '재생' : '일시정지'; pauseBtn.setAttribute('aria-pressed', v ? 'true' : 'false'); }
    };
    dots.forEach(function (d, i) { d.addEventListener('click', function () { show(i); setStopped(true); }); });
    if (pauseBtn) pauseBtn.addEventListener('click', function () { setStopped(!stopped); });
    card.addEventListener('mouseenter', function () { hover = true; });
    card.addEventListener('mouseleave', function () { hover = false; });
    card.addEventListener('focusin', function () { hover = true; });
    card.addEventListener('focusout', function () { hover = false; });
    show(0); setStopped(stopped);
    timer = setInterval(tick, 6000);
  }

  /* 3) 프로젝트 분야 필터 */
  var grid = document.querySelector('.grid');
  var filters = [].slice.call(document.querySelectorAll('.filter'));
  var status = document.getElementById('filter-status');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter'), count = 0;
      filters.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      [].forEach.call(document.querySelectorAll('.project'), function (p) {
        var on = f === 'all' || p.getAttribute('data-field') === f;
        p.classList.toggle('hide', !on);
        if (on) { count++; p.classList.add('in'); }
      });
      if (grid) grid.classList.toggle('filtered', f !== 'all');
      if (status) status.textContent = f === 'all' ? '전체 ' + count + '건' : btn.textContent.trim() + ' ' + count + '건';
    });
  });

  /* 4) 등장 모션 — 화면 아래 요소만 최초 1회 */
  if (!reduce && 'IntersectionObserver' in window) {
    var pending = [].slice.call(document.querySelectorAll('[data-reveal]')).filter(function (el) {
      return el.getBoundingClientRect().top > window.innerHeight;
    });
    pending.forEach(function (el) { el.classList.add('reveal'); });
    var rio = new IntersectionObserver(function (entries) {
      entries.filter(function (e) { return e.isIntersecting; }).forEach(function (e, i) {
        rio.unobserve(e.target);
        setTimeout(function () { e.target.classList.add('in'); }, Math.min(i, 5) * 70);
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    pending.forEach(function (el) { rio.observe(el); });
    setTimeout(function () { pending.forEach(function (el) { el.classList.add('in'); }); }, 4000);
  }

  /* 5) 이메일 복사 */
  var copyBtn = document.getElementById('copy-email');
  var copyStatus = document.getElementById('copy-status');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var addr = copyBtn.getAttribute('data-email');
      var done = function (ok) { if (copyStatus) copyStatus.textContent = ok ? '이메일 주소를 복사했습니다: ' + addr : '복사하지 못했습니다. ' + addr + ' 를 직접 선택해 주세요.'; };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(addr).then(function () { done(true); }, function () { done(false); });
      } else {
        try {
          var t = document.createElement('textarea'); t.value = addr; t.setAttribute('readonly', '');
          t.style.position = 'absolute'; t.style.left = '-9999px'; document.body.appendChild(t); t.select();
          done(document.execCommand('copy')); document.body.removeChild(t);
        } catch (e) { done(false); }
      }
    });
  }
})();

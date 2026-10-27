/* 이선재 포트폴리오 — 보조 스크립트 (JS가 꺼져 있어도 모든 내용 · 링크는 동작합니다) */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1) 현재 섹션을 메뉴에 표시 */
  var links = [].slice.call(document.querySelectorAll('.nav a.link[data-nav]'));
  if (links.length && 'IntersectionObserver' in window) {
    var ratio = {};
    var sections = links.map(function (a) { return document.getElementById(a.getAttribute('data-nav')); }).filter(Boolean);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { ratio[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
      var best = null, max = 0;
      sections.forEach(function (s) { if ((ratio[s.id] || 0) > max) { max = ratio[s.id]; best = s.id; } });
      links.forEach(function (a) {
        if (best && a.getAttribute('data-nav') === best) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.1, 0.5, 1] });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* 2) 등장 모션 — 화면 아래 요소만 최초 1회 */
  if (!reduce && 'IntersectionObserver' in window) {
    var pending = [].slice.call(document.querySelectorAll('[data-reveal]')).filter(function (el) {
      return el.getBoundingClientRect().top > window.innerHeight;
    });
    pending.forEach(function (el) { el.classList.add('reveal'); });
    var rio = new IntersectionObserver(function (entries) {
      entries.filter(function (e) { return e.isIntersecting; }).forEach(function (e, i) {
        rio.unobserve(e.target);
        setTimeout(function () { e.target.classList.add('in'); }, Math.min(i, 4) * 80);
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    pending.forEach(function (el) { rio.observe(el); });
    setTimeout(function () { pending.forEach(function (el) { el.classList.add('in'); }); }, 4000);
  }
  /* 3) 이메일 주소 복사 */
  var copyBtn = document.getElementById('copy-email');
  var copyStatus = document.getElementById('copy-status');
  if (copyBtn) {
    var original = copyStatus ? copyStatus.textContent : '';
    var done = function (ok) {
      if (!copyStatus) return;
      copyStatus.textContent = ok ? '복사했습니다 ✓' : '복사하지 못했어요. 주소를 직접 선택해 주세요.';
      copyBtn.classList.toggle('copied', ok);
      setTimeout(function () { copyStatus.textContent = original; copyBtn.classList.remove('copied'); }, 2500);
    };
    copyBtn.addEventListener('click', function () {
      var addr = copyBtn.getAttribute('data-email');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(addr).then(function () { done(true); }, function () { done(false); });
      } else {
        try {
          var t = document.createElement('textarea'); t.value = addr; t.setAttribute('readonly', '');
          t.style.position = 'absolute'; t.style.left = '-9999px'; document.body.appendChild(t); t.select();
          var ok = document.execCommand('copy'); document.body.removeChild(t); done(ok);
        } catch (e) { done(false); }
      }
    });
  }
})();

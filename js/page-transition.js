// 페이지 전환 fade in/out
(function () {
  // fade in
  document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = '1';
  });

  // fade out → navigate
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    // 앵커(#), 외부 링크, target=_blank 는 그대로 통과
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || link.target === '_blank') return;
    e.preventDefault();
    document.body.style.opacity = '0';
    setTimeout(function () { window.location.href = href; }, 220);
  });
})();

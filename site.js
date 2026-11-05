/* Zaga Travel Lab — общий код сайта zagatravellab.com (Тильда).
   Подключается одной строкой из «Шапки сайта» (Тильда, страница Header 88839936):
   <script src="https://cdn.jsdelivr.net/gh/zagaguide/zagatravellab-site@main/site.js" defer></script>
   Правка этого файла не требует публикации страниц: push в репозиторий + сброс кэша jsDelivr
   (https://purge.jsdelivr.net/gh/zagaguide/zagatravellab-site@main/site.js).
   Исходник — website/site-js/site.js в репозитории harness. */
(function () {
  'use strict';

  function css(text) {
    var s = document.createElement('style');
    s.setAttribute('data-zt', 'site');
    s.textContent = text;
    (document.head || document.documentElement).appendChild(s);
  }

  /* 1. Закреплённая шапка (русская rec2603105501, английская rec2621510601).
        У .t-records стоит overflow:hidden, поэтому sticky не работает — fixed + отступ сверху. */
  css('#rec2603105501,#rec2621510601{position:fixed!important;top:0;left:0;right:0;z-index:990;background:rgba(255,255,255,.94)!important}' +
      'html{scroll-padding-top:var(--zt-hh,100px)}');

  function header() {
    return document.getElementById('rec2603105501') || document.getElementById('rec2621510601');
  }
  function fit() {
    var h = header(), a = document.getElementById('allrecords');
    if (!h || !a) return;
    var box = a.querySelector('.t-records') || a, hh = h.offsetHeight;
    if (hh) {
      box.style.paddingTop = hh + 'px';
      document.documentElement.style.setProperty('--zt-hh', (hh + 12) + 'px');
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fit); else fit();
  window.addEventListener('load', fit);
  window.addEventListener('resize', fit);
  setTimeout(fit, 1200);
})();

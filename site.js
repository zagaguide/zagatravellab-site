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

  /* 2. Оформление страниц краёв и «Направлений» (07.11.2026, замечания Артура). */
  css(
    /* «Направления»: абзац справа — по центру заголовка, а не выше него */
    '@media (min-width:960px){.zd-hero__grid{align-items:center!important}}' +
    /* окно «О крае»: заголовки «Когда ехать», «Сколько дней»… — жирные, фирменный синий */
    '.zk-about h3{margin:12px 0 0!important;font-size:19px!important;font-weight:800!important;line-height:1.3!important;color:#0b75a0!important}'
  );
  /* плашки «Когда ехать / Сколько дней / Как добраться»: подпись, значение и пояснение — на одной высоте во всех трёх.
     Значение прижато к низу плашки (margin-top:auto), поэтому значениям и пояснениям ставим высоту самого высокого в ряду. */
  function facts() {
    document.querySelectorAll('.zk-facts').forEach(function (g) {
      ['.zk-fact__val', '.zk-fact__note'].forEach(function (q) {
        var list = [].slice.call(g.querySelectorAll(q)), m = 0;
        list.forEach(function (e) { e.style.minHeight = ''; });
        if (window.innerWidth < 640) return;   /* на телефоне плашки идут строками — выравнивать нечего */
        list.forEach(function (e) { m = Math.max(m, Math.ceil(e.getBoundingClientRect().height)); });
        list.forEach(function (e) { e.style.minHeight = m + 'px'; });
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', facts); else facts();
  window.addEventListener('load', facts);
  window.addEventListener('resize', facts);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(facts);

  /* 3. «Мой маршрут» — на всех русских страницах (было только на краях и «Направлениях», zt-route.html).
        Пока в блоке страницы стоит старая копия zt-route.html, она уже создала кнопки — тогда здесь ничего не делаем.
        На странице без корзины Тильды кнопка ведёт на /destinations#route, там окно открывается само. */
  if (!document.querySelector('.zt-broute') && !/^\/en(\/|$)/.test(location.pathname)) (function () {
  css(".t706__carticon{display:none!important}\n.zt-hroute,.zt-broute{font-family:'NunitoSans','Nunito Sans',Arial,sans-serif;font-weight:700;color:#fff;background:#141414;border:0;cursor:pointer;text-decoration:none}\n.zt-hroute{position:absolute;z-index:5;display:none;align-items:center;gap:8px;height:44px;padding:0 8px 0 16px;border-radius:22px;font-size:15px;white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,.18)}\n.zt-hroute svg,.zt-broute svg{width:18px;height:18px;fill:none;stroke:#fff;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:0 0 auto}\n.zt-hroute b,.zt-broute b{display:inline-flex;align-items:center;justify-content:center;min-width:26px;height:26px;padding:0 7px;box-sizing:border-box;border-radius:13px;background:#f0e3d2;color:#141414;font-size:14px}\n.zt-hroute:focus-visible,.zt-broute:focus-visible{outline:2px solid #0b75a0;outline-offset:2px}\n.zt-broute{position:fixed;z-index:980;left:12px;right:76px;bottom:calc(12px + env(safe-area-inset-bottom,0px));display:none;align-items:center;justify-content:space-between;gap:10px;height:56px;padding:0 8px 0 18px;border-radius:28px;font-size:16px;box-shadow:0 8px 22px rgba(0,0,0,.25)}\n.zt-broute span{display:flex;align-items:center;gap:10px}\n.zt-broute i{font-style:normal;display:inline-flex;align-items:center;height:40px;padding:0 14px;border-radius:20px;background:#f0e3d2;color:#141414;font-size:14px}\n.t706__cartwin{background:rgba(20,20,20,.62)!important}\n.t706__cartwin-content{max-width:760px!important;width:calc(100% - 32px)!important;margin:40px auto!important;padding:32px 36px 36px!important;border-radius:28px!important;box-sizing:border-box;background:#fff!important;font-family:'NunitoSans','Nunito Sans',Arial,sans-serif}\n.t706__cartwin-top{padding:0 56px 0 0!important;border:0!important;margin:0 0 6px!important}\n.t706__cartwin-heading{font-family:'Unbounded',Arial,sans-serif!important;font-weight:600!important;font-size:26px!important;line-height:1.2!important;text-transform:uppercase;color:#0b75a0!important}\n.t706__close{top:20px!important;right:20px!important;left:auto!important;width:auto!important;height:auto!important;background:transparent!important}\n.t706__close-button{width:44px!important;height:44px!important;border-radius:22px!important;background:#f3f3f1!important;display:flex!important;align-items:center;justify-content:center}\n.t706__close-button svg path,.t706__close-button svg rect{fill:#141414!important;stroke:#141414!important}\n.zt-rt-sub{margin:0 0 18px;font-size:16px;line-height:1.5;color:#141414}\n.t706__cartwin-products{border:0!important;padding:0!important;margin:0!important}\n.t706__cartwin-products .t706__product{display:none!important}\n.zt-rt{display:flex;flex-direction:column;gap:16px;margin:0 0 8px}\n.zt-rt__group{display:flex;flex-direction:column;gap:8px}\n.zt-rt__group h3{margin:0;font-size:13px;font-weight:700;color:#5a5a5a;text-transform:uppercase;letter-spacing:.05em}\n.zt-rt__item{display:flex;align-items:center;gap:14px;padding:10px;border-radius:18px;background:#f8f8f8}\n.zt-rt__ph{width:64px;height:48px;border-radius:10px;flex:0 0 auto;background:#e3eef3 center/cover no-repeat}\n.zt-rt__txt{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px}\n.zt-rt__txt strong{font-size:16px;line-height:1.3}\n.zt-rt__txt span{font-size:13px;color:#5a5a5a}\n.zt-rt__del{width:40px;height:40px;border-radius:20px;border:0;background:#fff;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;cursor:pointer}\n.zt-rt__del svg{width:16px;height:16px;fill:none;stroke:#5a5a5a;stroke-width:2;stroke-linecap:round}\n.zt-rt__more{align-self:flex-start;font-size:15px;font-weight:700;color:#0b75a0!important;text-decoration:none}\n.t706__cartwin-bottom{display:none!important}\n.t706__orderform{margin-top:20px!important;padding-top:20px!important;border-top:1px solid #ededed}\n.t706__orderform .t-input-title{font-family:'NunitoSans','Nunito Sans',Arial,sans-serif!important;font-size:14px!important;font-weight:700!important;color:#141414!important;padding-bottom:6px!important}\n.t706__orderform .t-input,.t706__orderform .t-select{height:50px!important;border-radius:25px!important;border:1px solid #d0d0d0!important;padding:0 18px!important;font-size:16px!important;background-color:#fff!important}\n.t706__orderform textarea.t-input{height:96px!important;padding:12px 18px!important;border-radius:22px!important}\n.t706__orderform .t-submit{width:100%!important;height:auto!important;min-height:56px!important;line-height:24px!important;padding:16px 20px!important;border-radius:28px!important;background:#0b75a0!important;color:#fff!important;font-family:'NunitoSans','Nunito Sans',Arial,sans-serif!important;font-weight:700!important;font-size:17px!important}\n.t706__orderform .t-submit *{color:#fff!important}\n.zt-rt-note{margin:12px 0 0;font-size:14px;line-height:1.5;color:#5a5a5a}\n@media (max-width:639px){\n  .t706__cartwin-content{width:100%!important;margin:0!important;border-radius:0!important;min-height:100%;padding:20px 16px 32px!important}\n  .t706__cartwin-heading{font-size:21px!important}\n  .t706__close{top:12px!important;right:12px!important}\n  .zt-rt__ph{display:none}\n}");

  var NAV = ['Туры', 'Направления', 'Маршруты', 'О нас', 'Отзывы', 'Контакты', 'Частые вопросы', 'Блог'];
  var ICON = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 16c3-1 3-5 6-6s3-5 6-6"></path><circle cx="4" cy="16" r="1.6"></circle><circle cx="16" cy="4" r="1.6"></circle></svg>';
  function items() {
    try { return (JSON.parse(localStorage.getItem('tcart') || '{}').products || []).filter(function (p) { return !p.deleted; }); } catch (e) { return []; }
  }
  function metaStore() { try { return JSON.parse(localStorage.getItem('zt-route-meta') || '{}'); } catch (e) { return {}; } }
  /* время и нагрузка мест этой страницы — в localStorage, чтобы окно маршрута знало их на любой странице */
  function rememberCards() {
    var store = metaStore(), changed = false;
    document.querySelectorAll('.t1301 .t-catalog__card[data-zt-meta]').forEach(function (c) {
      var n = c.querySelector('.js-product-name'); if (!n) return;
      var name = n.textContent.trim(), d = document.createElement('div');
      d.innerHTML = c.getAttribute('data-zt-meta');
      var lines = d.innerHTML.split(/<br\s*\/?>/i).map(function (h) { var x = document.createElement('div'); x.innerHTML = h; return x.textContent.trim(); });
      var first = (lines[0] || '').replace(/^Эль /, ''), load = /Нагрузка:\s*([^·]+)/.exec(lines[1] || '');
      var m = first + (load ? ' · ' + load[1].trim() : '');
      var v = { m: m, p: c.getAttribute('data-zt-photo') || '' };
      if (!store[name] || store[name].m !== v.m || store[name].p !== v.p) { store[name] = v; changed = true; }
    });
    if (changed) try { localStorage.setItem('zt-route-meta', JSON.stringify(store)); } catch (e) {}
  }
  function openRoute() { var i = document.querySelector('.t706__carticon'); if (i) i.click(); else location.href = '/destinations#route'; }
  /* кнопка в шапке */
  var hb = document.createElement('button'); hb.type = 'button'; hb.className = 'zt-hroute';
  hb.innerHTML = ICON + 'Маршрут<b>0</b>'; hb.addEventListener('click', openRoute);
  var bb = document.createElement('button'); bb.type = 'button'; bb.className = 'zt-broute';
  bb.innerHTML = '<span>' + ICON + '<span>Мой маршрут · <em style="font-style:normal">0</em></span></span><i>Открыть</i>'; bb.addEventListener('click', openRoute);
  document.body.appendChild(bb);
  /* кнопка в шапке: в меню 7 пунктов, места после «Блог» не хватает — пункты сдвигаются плотнее, кнопка встаёт перед «En».
     Если и так тесно (промежуток меньше 16 px) — кнопки в шапке нет, работает полоса внизу. */
  var hdrOk = false;
  function placeHeader(n) {
    hdrOk = false;
    var h = document.getElementById('rec2603105501'); if (!h) return;
    var ab = h.querySelector('.t396__artboard'); if (!ab) return;
    if (hb.parentNode !== ab) ab.appendChild(hb);
    var els = [].slice.call(ab.querySelectorAll('.tn-elem')).filter(function (e) { return e.offsetWidth > 0; });
    var nav = els.filter(function (e) { return NAV.indexOf((e.textContent || '').trim()) !== -1; });
    var lang = ab.querySelector('.lang-switch');
    nav.forEach(function (e) { e.style.transform = ''; });
    if (!n || window.innerWidth < 1200 || !nav.length || !lang) { hb.style.display = 'none'; return; }
    hb.style.display = 'inline-flex';
    var abr = ab.getBoundingClientRect(), R = nav.map(function (e) { return e.getBoundingClientRect(); });
    var order = nav.map(function (e, i) { return i; }).sort(function (x, y) { return R[x].left - R[y].left; });
    var firstR = R[order[0]], lastR = R[order[order.length - 1]], lr = lang.getBoundingClientRect(), bw = hb.offsetWidth;
    var logo = els.filter(function (e) { return e.getAttribute('data-elem-type') === 'vector'; })[0];
    var start = logo ? logo.getBoundingClientRect().right + 24 : firstR.left, end = lr.left - 16;
    var sumW = R.reduce(function (t, r) { return t + r.width; }, 0);
    var origGap = (lastR.right - firstR.left - sumW) / Math.max(1, nav.length - 1);
    if (lr.left - lastR.right >= bw + 32) {
      hb.style.left = (lastR.right - abr.left + 16) + 'px';
    } else {
      var gap = Math.min(origGap, (end - start - sumW - bw) / nav.length);
      if (gap < 16) { hb.style.display = 'none'; return; }
      var cur = end - bw; hb.style.left = (cur - abr.left) + 'px'; cur -= gap;
      for (var k = order.length - 1; k >= 0; k--) {
        var i = order[k], nl = cur - R[i].width;
        /* на широких экранах Тильда масштабирует элементы Zero (≈1,6 на 1920) — сдвиг translateX тоже масштабируется, поэтому делим на масштаб */
        var sc = nav[i].offsetWidth ? R[i].width / nav[i].offsetWidth : 1;
        nav[i].style.transform = 'translateX(' + (nl - R[i].left) / (sc || 1) + 'px)'; cur = nl - gap;
      }
    }
    hb.style.top = (lastR.top + lastR.height / 2 - abr.top - 22) + 'px';
    hdrOk = true;
  }
  function spacer() {
    var h = document.getElementById('rec2603105501'), a = document.getElementById('allrecords');
    var t = a && a.querySelector('.t-records'); var box = t || a;
    if (h && box) box.style.paddingTop = h.offsetHeight + 'px';
  }
  /* окно «Мой маршрут» */
  function renderRoute() {
    var w = document.querySelector('.t706__cartwin'); if (!w) return;
    var head = w.querySelector('.t706__cartwin-heading'); if (head) head.textContent = 'Мой маршрут';
    var list = items(), store = metaStore(), groups = {}, order = [];
    list.forEach(function (p) {
      var name = (p.name || '').trim(), i = name.indexOf(': '), g = i > 0 ? name.slice(0, i) : 'Другие места', t = i > 0 ? name.slice(i + 2) : name;
      if (!groups[g]) { groups[g] = []; order.push(g); }
      groups[g].push({ full: name, title: t, meta: store[name] || {} });
    });
    var top = w.querySelector('.t706__cartwin-top'), sub = w.querySelector('.zt-rt-sub');
    if (!sub && top) { sub = document.createElement('p'); sub.className = 'zt-rt-sub'; top.parentNode.insertBefore(sub, top.nextSibling); }
    function plural(n, a, b, c) { var m = n % 10, h = n % 100; return n + ' ' + (m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 12 || h > 14) ? b : c); }
    if (sub) sub.textContent = list.length ? plural(list.length, 'место', 'места', 'мест') + (order.length > 1 ? ' в ' + plural(order.length, 'крае', 'краях', 'краях') : '') + '. Отправьте список — мы предложим, как уложить всё по дням.' : 'Маршрут пока пуст. Отмечайте места кнопкой «В маршрут» на страницах краёв.';
    var prods = w.querySelector('.t706__cartwin-products'); if (!prods) return;
    var box = prods.querySelector('.zt-rt');
    if (!box) { box = document.createElement('div'); box.className = 'zt-rt'; prods.insertBefore(box, prods.firstChild); }
    box.innerHTML = '';
    order.forEach(function (g) {
      var sec = document.createElement('div'); sec.className = 'zt-rt__group';
      var h = document.createElement('h3'); h.textContent = g + ' · ' + groups[g].length; sec.appendChild(h);
      groups[g].forEach(function (it) {
        var row = document.createElement('div'); row.className = 'zt-rt__item';
        var ph = document.createElement('div'); ph.className = 'zt-rt__ph'; if (it.meta.p) ph.style.backgroundImage = 'url("' + it.meta.p + '")';
        var tx = document.createElement('div'); tx.className = 'zt-rt__txt';
        var s = document.createElement('strong'); s.textContent = it.title; tx.appendChild(s);
        if (it.meta.m) { var sp = document.createElement('span'); sp.textContent = it.meta.m; tx.appendChild(sp); }
        var del = document.createElement('button'); del.type = 'button'; del.className = 'zt-rt__del'; del.setAttribute('aria-label', 'Убрать из маршрута: ' + it.title);
        del.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5 5 15"></path></svg>';
        del.addEventListener('click', function () {
          var rows = [].slice.call(w.querySelectorAll('.t706__product'));
          var r = rows.filter(function (x) { var t = x.querySelector('.t706__product-title'); return t && t.textContent.trim() === it.full; })[0];
          var b = r && r.querySelector('.t706__product-del'); if (b) b.click();
        });
        row.appendChild(ph); row.appendChild(tx); row.appendChild(del); sec.appendChild(row);
      });
      box.appendChild(sec);
    });
    var more = document.createElement('a'); more.className = 'zt-rt__more'; more.href = '/destinations'; more.textContent = '+ Добавить места из других краёв';
    box.appendChild(more);
    var form = w.querySelector('.t706__orderform form');
    if (form && !form.querySelector('.zt-rt-note')) {
      var note = document.createElement('p'); note.className = 'zt-rt-note';
      note.textContent = 'Это не бронь и не оплата. Мы посмотрим ваш список и напишем, чтобы договориться о коротком созвоне.';
      var sb = form.querySelector('.t-form__submit') || form.querySelector('.t-submit');
      (sb && sb.parentNode ? sb.parentNode : form).appendChild(note);
    }
  }
  function update() {
    var n = items().length;
    hb.querySelector('b').textContent = n; bb.querySelector('em').textContent = n;
    hb.setAttribute('aria-label', 'Мой маршрут: ' + n);
    placeHeader(n);
    bb.style.display = n && !hdrOk ? 'flex' : 'none';
    var w = document.querySelector('.t706__cartwin');
    if (w && w.classList.contains('t706__cartwin_showed')) renderRoute();
  }
  var last = null;
  function tick() { var v = null; try { v = localStorage.getItem('tcart'); } catch (e) {} if (v !== last) { last = v; update(); } }
  function start() {
    rememberCards(); spacer(); update();
    setInterval(tick, 600);
    setTimeout(function () { rememberCards(); spacer(); update(); }, 1500);
    /* Тильда перестраивает шапку (Zero) уже после события resize — сразу считать по старым позициям:
       пункты меню наезжают друг на друга и на кнопку (10.11.2026). Поэтому пересчёт ещё два раза. */
    var rz1, rz2;
    window.addEventListener('resize', function () {
      spacer(); update();
      clearTimeout(rz1); clearTimeout(rz2);
      rz1 = setTimeout(function () { spacer(); update(); }, 300);
      rz2 = setTimeout(function () { spacer(); update(); }, 1000);
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { spacer(); update(); });
    new MutationObserver(function (ms) {
      ms.forEach(function (m) { if (m.target.classList && m.target.classList.contains('t706__cartwin') && m.target.classList.contains('t706__cartwin_showed')) renderRoute(); });
    }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });
  }
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);

  })();

  /* 4. Ссылка /destinations#route (кнопка «Маршрут» со страниц без корзины) — открыть окно маршрута. */
  if (location.hash === '#route') window.addEventListener('load', function () {
    setTimeout(function () { var i = document.querySelector('.t706__carticon'); if (i) i.click(); }, 900);
  });
})();

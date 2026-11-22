/* Global Pulse News — client-side catalog + filters. All content in data/articles.json. */
(function () {
  'use strict';
  var grid = document.getElementById('article-grid');
  var state = { category: 'All', country: 'All Countries', articles: [] };

  var saved = null;
  try { saved = localStorage.getItem('gpn-theme'); } catch (e) {}
  if (saved) document.documentElement.dataset.theme = saved;
  var toggle = document.getElementById('theme-toggle');
  if (toggle) toggle.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('gpn-theme', next); } catch (e) {}
  });

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function card(a) {
    var url = 'articles/' + encodeURIComponent(a.slug) + '.html';
    return '<a class="card" href="' + url + '">' +
      '<div class="card-top"><span class="badge">' + escapeHtml(a.category) + '</span>' +
      '<span class="badge country">' + escapeHtml(a.country) + '</span></div>' +
      '<h3>' + escapeHtml(a.title) + '</h3>' +
      '<p>' + escapeHtml(a.summary || a.tldr || '') + '</p>' +
      '<div class="card-meta"><span>' + escapeHtml(a.author || 'Global Pulse Desk') + '</span>' +
      '<time datetime="' + escapeHtml(a.date) + '">' + escapeHtml(a.date) + '</time></div></a>';
  }

  function render() {
    var shown = state.articles.filter(function (a) {
      return (state.category === 'All' || a.category === state.category) &&
             (state.country === 'All Countries' || a.country === state.country);
    });
    if (!shown.length) {
      var pending = siteData.pendingCount || 0;
      grid.innerHTML = '<div class="empty-state"><strong>No stories here yet.</strong>' +
        'Fresh stories appear here as soon as a topic clears our demand check. ' +
        (pending ? pending + ' article draft' + (pending === 1 ? ' is' : 's are') + ' awaiting verification. ' : '') +
        'Check back after the next research cycle.</div>';
      return;
    }
    grid.innerHTML = shown.map(card).join('');
  }

  var siteData = { pendingCount: 0 };
  fetch('data/articles.json', { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (data) {
      siteData = data;
      state.articles = (data.articles || []).filter(function (a) { return a.status === 'published'; });
      render();
    })
    .catch(function () {
      grid.innerHTML = '<div class="empty-state"><strong>Catalog unavailable.</strong>Please refresh; the article index could not be loaded.</div>';
    });

  document.querySelectorAll('[data-filter-category]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.category = btn.dataset.filterCategory;
      document.querySelectorAll('[data-filter-category]').forEach(function (b) {
        var on = b === btn; b.classList.toggle('active', on); b.setAttribute('aria-selected', String(on));
      });
      render();
    });
  });
  document.querySelectorAll('[data-filter-country]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.country = btn.dataset.filterCountry;
      document.querySelectorAll('[data-filter-country]').forEach(function (b) { b.classList.toggle('active', b === btn); });
      render();
    });
  });
})();

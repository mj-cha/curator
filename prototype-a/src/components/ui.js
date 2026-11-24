(function (app) {
  const paths = {
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    back: '<path d="M19 12H5m6 6-6-6 6-6"/>',
    book: '<path d="M6 4h12v16l-6-4-6 4z"/>',
    check: '<path d="m5 12 4 4 10-10"/>',
    spark: '<path d="M12 2v5m0 10v5M2 12h5m10 0h5M5 5l3 3m8 8 3 3m0-14-3 3m-8 8-3 3"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'
  };

  function icon(name, size = 20) {
    return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
  }

  function header(page, count) {
    return `<div class="wrap topbar">
      <a class="brand" href="#discover"><span class="brand-mark">${icon('spark', 18)}</span><span>고수템</span></a>
      <nav aria-label="주 메뉴"><a href="#discover" ${page !== 'activity' ? 'aria-current="page"' : ''}>발견</a>
      <a href="#activity" ${page === 'activity' ? 'aria-current="page"' : ''}>${icon('book', 17)} 내 활동${count ? `<span class="nav-count">${count}</span>` : ''}</a></nav>
    </div>`;
  }

  function photo(story, className = '') {
    return `<img class="${className}" src="${story.photo}" alt="${story.alt}" ${story.id === 'swim' ? 'fetchpriority="high"' : ''}>`;
  }

  function caption(story) {
    return `<figcaption>참고 사진 <a href="${story.photoUrl}" target="_blank" rel="noopener noreferrer">${story.credit} / Unsplash</a></figcaption>`;
  }

  app.ui = { icon, header, photo, caption };
}(window.Gosutem));

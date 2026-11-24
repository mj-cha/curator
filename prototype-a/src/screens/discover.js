(function (app) {
  app.discoverScreen = function () {
    const [featured, garden] = app.stories;
    const { icon, photo } = app.ui;
    return `<div class="wrap discover">
      <section class="intro" aria-labelledby="page-title">
        <h1 id="page-title" tabindex="-1">나도 해보고 싶은 일</h1>
        <p>먼저 해본 사람들의 이야기에서 찾아보세요.</p>
      </section>
      <article class="cover" aria-labelledby="featured-title">
        ${photo(featured, 'cover-photo')}
        <div class="cover-shade"></div>
        <div class="cover-copy">
          <p class="cover-category">${featured.category}</p>
          <h2 id="featured-title">${featured.titleLines.join('<br>')}</h2>
          <p class="cover-intro">${featured.intro}</p>
          <a class="button button-lime" href="#story/${featured.id}">이야기 읽기 ${icon('arrow')}</a>
        </div>
        <span class="cover-credit">참고 사진 · Unsplash</span>
      </article>
      <section class="more" aria-labelledby="more-title">
        <h2 id="more-title">다른 하루, 다른 시작</h2>
        <a class="more-story" href="#story/${garden.id}">
          <div class="more-image">${photo(garden)}</div>
          <div class="more-copy"><span class="category">${garden.category}</span><h3>${garden.title}</h3><p>${garden.intro}</p></div>
          <span class="more-arrow">${icon('arrow')}</span>
        </a>
      </section>
    </div>`;
  };
}(window.Gosutem));

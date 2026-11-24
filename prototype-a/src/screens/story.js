(function (app) {
  app.storyScreen = function (story, savedAction) {
    const { icon, photo, caption } = app.ui;
    return `<div class="wrap story">
      <a class="back-link" href="#discover">${icon('back', 18)} 발견으로</a>
      <header class="story-header reading">
        <div class="category">${story.category}</div>
        <h1 id="page-title" tabindex="-1">${story.title}</h1>
        <p>${story.person}</p>
      </header>
      <figure class="story-figure">${photo(story)}${caption(story)}</figure>
      <div class="reading story-body">
        ${story.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
        <p class="source-note">${story.source}</p>
        <a class="button button-primary" href="#story/${story.id}/start">나도 해보기 ${icon('arrow')}</a>
      </div>
      <section class="first-step reading" aria-labelledby="start-title">
        <p class="category">${story.invitation}</p>
        <h2 id="start-title" tabindex="-1">물건 안 사고, 첫발 떼기</h2>
        <p>${story.prompt}</p>
        <form id="action-form">
          <fieldset><legend>해볼 행동 하나 고르기</legend>
            ${story.actions.map((action) => `<label class="choice">
              <input type="radio" name="action" value="${action.id}" ${savedAction === action.id ? 'checked' : ''} required>
              <span class="choice-copy"><strong>${action.title}</strong><span>${action.description}</span></span>
              <span class="choice-time">${icon('clock', 15)} ${action.time}</span>
            </label>`).join('')}
          </fieldset>
          <p class="caveat">${story.caveat}</p>
          <div class="action-buttons"><button class="button button-primary" type="submit">${icon('book', 18)} 내 활동에 담기</button></div>
          <p id="save-message" class="save-message" role="status" hidden></p>
          <a id="open-activity" class="inline-link" href="#activity" hidden>내 활동 보기 ${icon('arrow', 16)}</a>
        </form>
        <p class="source-note">첫 행동은 고수템이 제안합니다.</p>
      </section>
    </div>`;
  };
}(window.Gosutem));

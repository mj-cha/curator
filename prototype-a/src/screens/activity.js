(function (app) {
  app.activityScreen = function (entries) {
    const { icon } = app.ui;
    return `<div class="wrap activity">
      <div class="intro"><h1 id="page-title" tabindex="-1">내 활동</h1><p>해보고 싶어진 일과 내가 고른 첫 행동을 모아두는 곳.</p></div>
      ${entries.length ? `<ul class="saved-list">${entries.map(({ story, action }) => `<li class="saved-item">
        <span class="category">${story.category}</span><h2>${action.title}</h2><p>${action.description}</p>
        <div class="saved-links"><a class="inline-link" href="#story/${story.id}">이야기 다시 보기 ${icon('arrow', 16)}</a><button type="button" class="remove-button" data-remove="${story.id}" aria-label="${action.title} 삭제">삭제</button></div>
      </li>`).join('')}</ul><p class="source-note">담은 활동은 지금 쓰는 브라우저에 저장됩니다.</p>` : `<div class="empty">
        <span class="empty-icon">${icon('book', 26)}</span><h2>아직 담은 활동이 없어요</h2><p>이야기를 읽고 마음이 가는 첫 행동을 담아보세요.</p>
        <a class="button button-primary" href="#discover">이야기 발견하기 ${icon('arrow')}</a></div>`}
    </div>`;
  };
}(window.Gosutem));

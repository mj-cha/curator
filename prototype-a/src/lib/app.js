(function (app) {
  const header = document.getElementById('header');
  const main = document.getElementById('content');
  const status = document.getElementById('status');
  let current = null;

  function entries() {
    return app.saved.read().flatMap(({ storyId, actionId }) => {
      const story = app.stories.find((item) => item.id === storyId);
      const action = story?.actions.find((item) => item.id === actionId);
      return action ? [{ story, action }] : [];
    });
  }

  function route() {
    const [page, id, section] = window.location.hash.slice(1).split('/');
    const story = page === 'story' && app.stories.find((item) => item.id === id);
    if (story) return { page, story, start: section === 'start' };
    return { page: page === 'activity' ? 'activity' : 'discover' };
  }

  function updateHeader(page) {
    header.innerHTML = app.ui.header(page, entries().length);
  }

  function render({ focus = true, keepScroll = false } = {}) {
    if (window.location.hash === '#content') return;
    status.textContent = '';
    const next = route();
    const saved = entries();
    const changed = !current || next.page !== current.page || next.story !== current.story;
    current = next;
    if (changed || keepScroll) {
      updateHeader(next.page);
      if (next.story) {
        const actionId = saved.find(({ story }) => story === next.story)?.action.id;
        main.innerHTML = app.storyScreen(next.story, actionId);
      } else {
        main.innerHTML = next.page === 'activity' ? app.activityScreen(saved) : app.discoverScreen();
      }
      document.title = `${next.story?.title || (next.page === 'activity' ? '내 활동' : '해보고 싶은 일을 만나는 곳')} — 고수템`;
    }
    if (next.start) {
      const start = document.getElementById('start-title');
      start.focus({ preventScroll: true });
      start.closest('section').scrollIntoView({ block: 'start' });
    } else if (!keepScroll) {
      if (focus) document.getElementById('page-title').focus({ preventScroll: true });
      window.scrollTo(0, 0);
    }
  }

  main.addEventListener('submit', (event) => {
    if (event.target.id !== 'action-form' || !current?.story) return;
    event.preventDefault();
    const actionId = new FormData(event.target).get('action');
    if (!current.story.actions.some((action) => action.id === actionId)) return;
    const next = app.saved.read().filter((item) => item.storyId !== current.story.id);
    const ok = app.saved.write([{ storyId: current.story.id, actionId }, ...next]);
    const message = document.getElementById('save-message');
    message.hidden = false;
    message.textContent = ok ? '내 활동에 담았어요.' : '이 브라우저에서 활동을 저장할 수 없어요. 브라우저 저장 설정을 확인하고 다시 시도해 주세요.';
    const activity = document.getElementById('open-activity');
    activity.hidden = !ok;
    if (ok) updateHeader('story');
  });

  main.addEventListener('change', (event) => {
    if (!event.target.matches('#action-form input')) return;
    document.getElementById('save-message').hidden = true;
    document.getElementById('open-activity').hidden = true;
  });

  main.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-remove]');
    if (!button) return;
    const next = app.saved.read().filter((item) => item.storyId !== button.dataset.remove);
    if (!app.saved.write(next)) {
      status.textContent = '이 브라우저에서 활동을 삭제할 수 없어요. 저장 설정을 확인해 주세요.';
      return;
    }
    render({ keepScroll: true });
    (main.querySelector('button[data-remove]') || document.getElementById('page-title')).focus({ preventScroll: true });
    status.textContent = '내 활동 목록에서 지웠어요.';
  });

  window.addEventListener('hashchange', () => render());
  window.addEventListener('storage', () => render({ keepScroll: true }));
  document.querySelector('.skip-link').addEventListener('click', (event) => {
    event.preventDefault();
    main.focus();
  });
  render({ focus: false });
}(window.Gosutem));

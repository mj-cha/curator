(function (app) {
  const key = 'gosutem.prototype-a.actions.v1';
  let memory = [];

  function read() {
    try {
      const value = JSON.parse(window.localStorage.getItem(key) || '[]');
      if (Array.isArray(value)) memory = value.filter((item) => item && typeof item.storyId === 'string' && typeof item.actionId === 'string');
    } catch {
      // Keep the current screen usable if access to browser storage is blocked.
    }
    return memory;
  }

  function write(next) {
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      return false;
    }
    memory = next;
    return true;
  }

  app.saved = { read, write };
}(window.Gosutem));

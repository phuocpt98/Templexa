(() => {
  const audio = document.querySelector('#invitationMusic');
  const openInvitation = document.querySelector('#openInvitation');
  const status = document.querySelector('#musicStatus');
  const triggers = [...document.querySelectorAll('[data-music-trigger]')];
  if (!audio || !openInvitation || !triggers.length) return;
  let wanted = false, request = 0;
  audio.loop = true;
  audio.volume = .35;

  const render = playing => {
    triggers.forEach(button => {
      button.setAttribute('aria-pressed', String(playing));
      button.setAttribute('aria-label', playing ? 'Tắt nhạc' : 'Bật nhạc');
      button.querySelector('[data-music-label]').textContent = playing ? 'Tắt nhạc' : 'Bật nhạc';
    });
  };
  const pause = () => {
    wanted = false; request++;
    audio.pause(); render(false);
    if (status) status.textContent = 'Đã tắt nhạc.';
  };
  const play = () => {
    wanted = true;
    const current = ++request;
    if (audio.error) audio.load();
    // Play inside the opening click so mobile browsers retain user activation.
    try {
      const promise = audio.play();
      if (promise?.catch) promise.catch(() => {
        if (current !== request) return;
        wanted = false; render(false);
        if (status) status.textContent = 'Chạm Bật nhạc để bắt đầu phát.';
      });
    } catch {
      wanted = false; render(false);
      if (status) status.textContent = 'Chạm Bật nhạc để bắt đầu phát.';
    }
  };
  audio.addEventListener('playing', () => {
    if (!wanted) { audio.pause(); return; }
    render(true);
    if (status) status.textContent = 'Nhạc đang phát và sẽ tự động lặp lại.';
  });
  audio.addEventListener('pause', () => {
    if (!audio.paused) return;
    wanted = false; request++; render(false);
  });
  audio.addEventListener('error', () => {
    wanted = false; request++; render(false);
    if (status) status.textContent = 'Chưa tải được nhạc. Chạm Bật nhạc để thử lại.';
  });
  triggers.forEach(button => button.addEventListener('click', () => wanted ? pause() : play()));
  openInvitation.addEventListener('click', play, { once: true });
  window.addEventListener('pagehide', pause);
  render(false);
})();

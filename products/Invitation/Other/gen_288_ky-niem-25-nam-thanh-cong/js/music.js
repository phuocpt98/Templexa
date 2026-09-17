// Nhạc nền: bấm "Mở thiệp mời" là phát, nút Nhạc bật/tắt.
(() => {
  const audio = document.querySelector('#bgMusic');
  const triggers = [...document.querySelectorAll('[data-music-trigger]')];
  const openButton = document.querySelector('#openInvitation');
  if (!audio) return;
  audio.volume = 0.45;

  const sync = () => {
    const playing = !audio.paused;
    triggers.forEach(button => {
      button.classList.toggle('is-playing', playing);
      button.setAttribute('aria-pressed', String(playing));
      button.setAttribute('aria-label', playing ? 'Tắt nhạc' : 'Bật nhạc');
      const label = button.querySelector('span');
      if (label) label.textContent = playing ? 'Tắt nhạc' : (button.classList.contains('cover-music') ? 'Nghe nhạc' : 'Nhạc');
    });
  };
  const play = () => audio.play().catch(() => {}).finally(sync);

  openButton?.addEventListener('click', play);
  triggers.forEach(button => button.addEventListener('click', () => {
    if (audio.paused) play(); else { audio.pause(); sync(); }
  }));
  audio.addEventListener('play', sync);
  audio.addEventListener('pause', sync);
})();

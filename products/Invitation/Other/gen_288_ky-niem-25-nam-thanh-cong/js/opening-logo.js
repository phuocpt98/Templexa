(() => {
  const root = document.querySelector('#logoAssembly');
  const original = document.querySelector('#openingLogo');
  const replay = document.querySelector('#replayOpening');
  const partner = document.querySelector('#partnerLogo');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!root || !original || !replay) return;
  let prepared = false;
  let playing = false;
  let timer;
  let spinTimer;

  const settle = (disableReplay = false) => {
    clearTimeout(timer); clearTimeout(spinTimer);
    root.classList.add('is-settled');
    root.classList.remove('is-playing', 'is-spinning');
    partner?.classList.remove('is-arriving');
    playing = false;
    replay.disabled = disableReplay || reduced.matches;
    replay.hidden = reduced.matches || !prepared;
  };

  const play = () => {
    if (!prepared || playing || reduced.matches) return;
    playing = true;
    replay.disabled = true;
    root.classList.remove('is-settled', 'is-playing', 'is-spinning');
    partner?.classList.remove('is-arriving');
    void root.offsetWidth;
    if (partner) void partner.offsetWidth;
    root.classList.add('is-ready', 'is-playing');
    partner?.classList.add('is-arriving');
    clearTimeout(timer); clearTimeout(spinTimer);
    timer = setTimeout(() => {
      root.classList.remove('is-playing');
      root.classList.add('is-spinning');
      // One full turn after assembly, then rest in the original position.
      // Only the three color layers orbit; the wordmark remains stationary.
      spinTimer = setTimeout(() => settle(), 2500);
    }, 2950);
  };

  const prepare = () => {
    if (prepared || !original.naturalWidth) return;
    if (reduced.matches) { replay.hidden = true; return; }
    try {
      const w = original.naturalWidth, h = original.naturalHeight;
      const source = document.createElement('canvas');
      source.width = w; source.height = h;
      const ctx = source.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(original, 0, 0);
      const rgba = ctx.getImageData(0, 0, w, h);
      const names = ['red', 'gold', 'green', 'wordmark'];
      const layers = names.map(() => new ImageData(w, h));
      let minX = w, maxX = 0, minY = h, maxY = 0;
      // Classify the ORIGINAL pixels. Each pixel goes into exactly one layer;
      // no recoloring, vector tracing, replacement lettering or regeneration.
      for (let i = 0; i < rgba.data.length; i += 4) {
        if (!rgba.data[i + 3]) continue;
        const y = Math.floor(i / 4 / w);
        const [r, g, b] = rgba.data.subarray(i, i + 3);
        const layer = y >= h * .75 ? 3 : g > r * 1.1 ? 2 : r > g * 1.45 ? 0 : 1;
        layers[layer].data.set(rgba.data.subarray(i, i + 4), i);
        if (layer !== 3) {
          const x = i / 4 % w;
          minX = Math.min(minX, x); maxX = Math.max(maxX, x);
          minY = Math.min(minY, y); maxY = Math.max(maxY, y);
        }
      }
      root.style.setProperty('--logo-pivot-x', `${(minX + maxX) / 2 / w * 100}%`);
      root.style.setProperty('--logo-pivot-y', `${(minY + maxY) / 2 / h * 100}%`);
      const host = root.querySelector('.logo-layers');
      names.forEach((name, i) => {
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.className = `logo-piece-${name}`;
        canvas.getContext('2d').putImageData(layers[i], 0, 0);
        host.append(canvas);
      });
      prepared = true;
      requestAnimationFrame(play);
    } catch {
      // CORS/file URL or unsupported canvas: the original logo stays visible.
      replay.hidden = true;
    }
  };
  replay.addEventListener('click', play);
  document.querySelector('#openInvitation')?.addEventListener('click', () => settle(true));
  original.addEventListener('load', prepare, { once: true });
  original.addEventListener('error', () => { replay.hidden = true; }, { once: true });
  if (original.complete) prepare();
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      settle();
    } else { replay.hidden = false; replay.disabled = false; if (prepared) play(); else prepare(); }
  });
})();

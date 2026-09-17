(() => {
  const root = document.querySelector('#logoAssembly');
  const original = document.querySelector('#openingLogo');
  const replay = document.querySelector('#replayOpening');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!root || !original || !replay) return;
  let prepared = false;
  let playing = false;
  let timer;

  const play = () => {
    if (!prepared || playing || reduced.matches) return;
    playing = true;
    replay.disabled = true;
    root.classList.remove('is-settled', 'is-playing');
    void root.offsetWidth;
    root.classList.add('is-ready', 'is-playing');
    clearTimeout(timer);
    timer = setTimeout(() => {
      // End on the untouched source image, never a reconstructed approximation.
      root.classList.add('is-settled');
      root.classList.remove('is-playing');
      replay.disabled = false;
      playing = false;
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
      // Classify the ORIGINAL pixels. Each pixel goes into exactly one layer;
      // no recoloring, vector tracing, replacement lettering or regeneration.
      for (let i = 0; i < rgba.data.length; i += 4) {
        if (!rgba.data[i + 3]) continue;
        const y = Math.floor(i / 4 / w);
        const [r, g, b] = rgba.data.subarray(i, i + 3);
        const layer = y >= h * .75 ? 3 : g > r * 1.1 ? 2 : r > g * 1.45 ? 0 : 1;
        layers[layer].data.set(rgba.data.subarray(i, i + 4), i);
      }
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
  original.addEventListener('load', prepare, { once: true });
  original.addEventListener('error', () => { replay.hidden = true; }, { once: true });
  if (original.complete) prepare();
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      clearTimeout(timer); root.classList.add('is-settled');
      root.classList.remove('is-playing'); playing = false; replay.hidden = true;
    } else { replay.hidden = false; replay.disabled = false; prepare(); }
  });
})();

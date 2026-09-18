(() => {
  const pages = [...document.querySelectorAll('main > section.panel')];
  const header = document.querySelector('#nav');
  const targets = {
    invitation: '.hero-intro, .invitation-copy, .meeting-note, .scroll-cue',
    golf: '.section-inner, blockquote',
    celebration: '.ceremony-layout',
    thanks: '.section-inner, .closing-footer'
  };
  let frame = 0;

  // Read layout coordinates, ignoring temporary reveal/tilt animation transforms.
  const bounds = (element, page) => {
    let top = 0, node = element;
    while (node && node !== page) { top += node.offsetTop; node = node.offsetParent; }
    return { top, bottom: top + element.offsetHeight };
  };
  const overflows = page => {
    const topLimit = header.offsetHeight;
    return [...page.querySelectorAll(targets[page.id])].some(element => {
      if (!element.getClientRects().length) return false;
      const box = bounds(element, page);
      let bottomLimit = page.clientHeight;
      if (element.matches('.hero-intro, .invitation-copy')) {
        bottomLimit = bounds(page.querySelector('.hero-content'), page).bottom;
      } else if (element.matches('.meeting-note')) {
        bottomLimit = bounds(page.querySelector('.scroll-cue'), page).top - 8;
      } else if (page.id === 'golf' && element.matches('.section-inner')) {
        bottomLimit = bounds(page.querySelector('blockquote'), page).top - 8;
      } else if (page.id === 'thanks' && element.matches('.section-inner')) {
        const footer = page.querySelector('.closing-footer');
        if (footer.getClientRects().length) bottomLimit = bounds(footer, page).top - 8;
      }
      return box.top < topLimit - 2 || box.bottom > bottomLimit + 2;
    });
  };
  const fit = () => {
    frame = 0;
    // Do not relayout the background while the RSVP keyboard is open.
    if (document.querySelector('#rsvpDialog[open]')) return;
    pages.forEach(page => page.classList.remove('page-compact', 'page-overflow'));
    const crowded = pages.filter(overflows);
    crowded.forEach(page => page.classList.add('page-compact'));
    // Never crop invitation text or shrink the entire page to fit a tiny window.
    const remaining = crowded.filter(overflows);
    remaining.forEach(page => page.classList.add('page-overflow'));
  };
  const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(fit); };
  window.addEventListener('resize', schedule, { passive: true });
  document.querySelector('#rsvpDialog')?.addEventListener('close', schedule);
  document.fonts?.ready.then(schedule);
  window.addEventListener('load', schedule, { once: true });
  schedule();
})();

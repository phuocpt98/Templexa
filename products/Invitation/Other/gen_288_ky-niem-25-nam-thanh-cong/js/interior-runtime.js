(() => {
  const $ = (query, root = document) => root.querySelector(query);
  const opening = $('#opening'), openButton = $('#openInvitation');
  const nav = $('#nav'), main = $('main'), form = $('#rsvpForm');
  const cursor = $('#golfCursor'), progress = $('#scrollProgress');
  const motionToggle = $('#motionToggle');
  const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const fineQuery = matchMedia('(hover: hover) and (pointer: fine)');
  const sections = [...main.querySelectorAll('.panel')];
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const celebration = $('#celebration');
  let isOpening = false, opened = false, userPaused = false;
  let cursorFrame = 0, scrollFrame = 0, pointerSeen = false;
  let x = 0, y = 0, haloX = 0, haloY = 0;
  const motionOff = () => reduceQuery.matches || userPaused;
  const clamp = value => Math.max(0, Math.min(1, value));

  // Abstract gold trajectories stay inside a non-interactive, paint-contained layer.
  // No wheel/touch handlers: scrolling belongs to the document, never the decoration.
  main.querySelectorAll('[data-ambient]').forEach((section, index) => {
    const field = document.createElement('div');
    field.className = 'ambient-field';
    field.setAttribute('aria-hidden', 'true');
    const paths = [
      'M -180 770 Q 410 -110 1620 410',
      'M -180 1020 Q 670 340 1550 -130',
      'M 1120 1080 Q 1480 470 940 -170'
    ];
    field.innerHTML = `<svg viewBox="0 0 1440 900" preserveAspectRatio="none" focusable="false"><defs>${paths.map((d, i) => `<path id="ambient-${section.id}-${i}" d="${d}" pathLength="1000"/>`).join('')}</defs>${paths.map((_, i) => {
      const href = `#ambient-${section.id}-${i}`;
      return `<g class="ambient-orbit orbit-${i}" style="--orbit-delay:${-7 - i * 8 - index * 3}s"><use class="ambient-trace" href="${href}"/><use class="ambient-trail trail-soft" href="${href}"/><use class="ambient-trail trail-mid" href="${href}"/><use class="ambient-trail trail-tip" href="${href}"/><use class="ambient-trail trail-head" href="${href}"/></g>`;
    }).join('')}</svg>`;
    section.prepend(field);
  });

  const hideCursor = () => {
    cursor.classList.remove('visible', 'pressed');
    document.body.classList.remove('cursor-enabled');
    cancelAnimationFrame(cursorFrame); cursorFrame = 0;
    pointerSeen = false;
  };
  const updateScene = () => {
    scrollFrame = 0;
    const height = innerHeight;
    const max = document.documentElement.scrollHeight - height;
    progress.style.height = `${max > 0 ? clamp(scrollY / max) * 100 : 0}%`;
    nav.classList.toggle('scrolled', scrollY > 35);
    if (!opened) return;
    const nightRect = celebration.getBoundingClientRect();
    const night = motionOff() ? 1 : clamp((height * .95 - nightRect.top) / (height * .7));
    celebration.style.setProperty('--night', night.toFixed(3));
    const active = sections.find(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= height * .45 && rect.bottom > height * .45;
    });
    links.forEach(link => {
      if (active && link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const scheduleScene = () => {
    if (!scrollFrame && !document.hidden) scrollFrame = requestAnimationFrame(updateScene);
  };
  const applyMotion = () => {
    const paused = motionOff();
    document.body.classList.toggle('motion-paused', paused);
    document.documentElement.classList.toggle('interior-static', paused);
    motionToggle.setAttribute('aria-pressed', String(paused));
    const label = reduceQuery.matches ? 'Chuyển động đã giảm theo cài đặt thiết bị' : paused ? 'Bật chuyển động' : 'Tạm dừng chuyển động';
    motionToggle.setAttribute('aria-label', label); motionToggle.title = label;
    motionToggle.disabled = reduceQuery.matches;
    if (paused) hideCursor();
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg');
    });
    scheduleScene();
  };
  motionToggle.addEventListener('click', () => { userPaused = !userPaused; applyMotion(); });
  reduceQuery.addEventListener('change', applyMotion);
  fineQuery.addEventListener('change', hideCursor);

  // Preserve the approved opening timing, logo animation and keyboard behavior.
  openButton.addEventListener('click', () => {
    if (isOpening) return;
    isOpening = true; openButton.disabled = true; $('#replayOpening').disabled = true;
    opening.classList.add('opened');
    setTimeout(() => {
      opening.classList.add('gone'); document.body.classList.remove('locked');
      opening.inert = true;
      main.inert = false; nav.inert = false; opened = true; nav.classList.add('visible');
      const heading = $('.hero h1'); heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true });
      scheduleScene();
    }, reduceQuery.matches ? 50 : 2400);
    setTimeout(() => $('.hero .reveal')?.classList.add('in'), reduceQuery.matches ? 80 : 1250);
  });
  opening.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    if (document.querySelector('#musicPanel')?.hidden === false) return;
    const controls = [...opening.querySelectorAll('button:not(:disabled):not([hidden])')];
    if (!controls.length) { event.preventDefault(); return; }
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && (document.activeElement === first || !opening.contains(document.activeElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  if ('IntersectionObserver' in window) {
    main.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    }), { threshold: 0, rootMargin: '-30px 0px -30px 0px' });
    main.querySelectorAll('.reveal').forEach(el => { if (!el.closest('.hero')) revealObserver.observe(el); });
    const sceneObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('scene-active', entry.isIntersecting);
        if (!entry.isIntersecting && entry.target.id !== 'invitation') {
          entry.target.querySelectorAll('.reveal').forEach(el => el.classList.remove('in'));
        }
      });
      scheduleScene();
    }, { threshold: 0, rootMargin: '80px 0px 80px 0px' });
    sections.forEach(section => sceneObserver.observe(section));
  } else sections.forEach(section => section.classList.add('scene-active'));

  const followHalo = () => {
    cursorFrame = 0;
    if (!pointerSeen || document.hidden || motionOff()) return;
    haloX += (x - haloX) * .3; haloY += (y - haloY) * .3;
    cursor.style.transform = `translate3d(${haloX}px,${haloY}px,0)`;
    if (Math.abs(x - haloX) + Math.abs(y - haloY) > .2) cursorFrame = requestAnimationFrame(followHalo);
  };
  document.addEventListener('pointermove', event => {
    if (!opened || !fineQuery.matches || motionOff() || event.pointerType !== 'mouse') { hideCursor(); return; }
    if (event.target.closest('input:not([type="radio"]),textarea,[contenteditable="true"],select')) { hideCursor(); return; }
    x = event.clientX; y = event.clientY;
    if (!pointerSeen) { haloX = x; haloY = y; }
    pointerSeen = true; document.body.classList.add('cursor-enabled'); cursor.classList.add('visible');
    cursor.classList.toggle('over-control', Boolean(event.target.closest('a,button,label,input[type="radio"]')));
    cursor.classList.toggle('on-paper', Boolean(event.target.closest('.rsvp-dialog')));
    if (!cursorFrame) cursorFrame = requestAnimationFrame(followHalo);
  }, { passive: true });
  document.addEventListener('pointerdown', event => {
    if (pointerSeen && event.target.closest('a,button,label')) cursor.classList.add('pressed');
  }, { passive: true });
  document.addEventListener('pointerup', () => cursor.classList.remove('pressed'), { passive: true });
  document.addEventListener('pointerout', event => { if (!event.relatedTarget) hideCursor(); }, { passive: true });
  document.addEventListener('keydown', event => { if (event.key === 'Tab') hideCursor(); });
  window.addEventListener('blur', hideCursor);
  document.addEventListener('visibilitychange', () => {
    document.body.classList.toggle('page-hidden', document.hidden);
    if (document.hidden) { hideCursor(); cancelAnimationFrame(scrollFrame); scrollFrame = 0; }
    else scheduleScene();
  });
  main.querySelectorAll('[data-tilt]').forEach(card => {
    let frame = 0, pointerX = 0, pointerY = 0;
    card.addEventListener('pointermove', event => {
      if (!opened || motionOff() || !fineQuery.matches || event.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      pointerX = clamp((event.clientX - rect.left) / rect.width); pointerY = clamp((event.clientY - rect.top) / rect.height);
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0; if (motionOff()) return;
        card.style.setProperty('--tilt-x', `${(pointerY - .5) * -2.4}deg`);
        card.style.setProperty('--tilt-y', `${(pointerX - .5) * 3}deg`);
        card.style.setProperty('--light-x', `${pointerX * 100}%`); card.style.setProperty('--light-y', `${pointerY * 100}%`);
      });
    }, { passive: true });
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame); frame = 0;
      card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--light-x', '50%'); card.style.setProperty('--light-y', '35%');
    });
  });
  const success = $('.form-success', form), submitLabel = $('button[type="submit"] span', form);
  const guestSelect = $('select[name="guests"]', form);
  const updateAttendance = () => {
    const declining = $('input[name="attendance"]:checked', form)?.value === 'no';
    guestSelect.disabled = declining; $('.guests-field', form).classList.toggle('field-disabled', declining);
  };
  // Google Sheets id cho RSVP — để trống thì form chỉ hiện xác nhận, không gửi đi.
  const SHEET_ID = '';
  const submitButton = $('button[type="submit"]', form), note = $('#rsvpNote');
  const showNote = text => { note.textContent = text; note.hidden = !text; };
  form.addEventListener('input', () => { success.classList.remove('show'); submitLabel.textContent = 'Gửi xác nhận'; showNote(''); updateAttendance(); });
  form.addEventListener('change', updateAttendance);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const declining = data.get('attendance') === 'no';
    const done = () => {
      success.classList.add('show'); submitLabel.textContent = 'Đã gửi';
      submitButton.disabled = false; form.reset(); updateAttendance();
    };
    if (!SHEET_ID || typeof sheetsAPI === 'undefined') { done(); return; }
    submitButton.disabled = true; submitLabel.textContent = 'Đang gửi...'; showNote('');
    sheetsAPI.post(SHEET_ID, {
      A: data.get('name').trim(),
      B: data.get('phone').trim(),
      C: declining ? 'Không tham dự' : 'Tham dự',
      D: declining ? '' : data.get('guests'),
      E: (data.get('message') || '').trim(),
      F: new Date().toLocaleString('vi-VN')
    }).then(done).catch(() => {
      submitButton.disabled = false; submitLabel.textContent = 'Gửi xác nhận';
      showNote('Gửi chưa thành công, Quý Anh/Chị vui lòng thử lại.');
    });
  });

  // Tên khách mời theo ?id=
  const guestId = parseInt(new URLSearchParams(location.search).get('id'), 10);
  const guest = typeof GUEST_LIST !== 'undefined' && GUEST_LIST.find(item => item.id === guestId);
  const guestLine = $('.hero .guest-line');
  if (guest && guestLine) {
    guestLine.textContent = guest.name; guestLine.classList.add('has-name');
    guestLine.removeAttribute('aria-label');
    const nameInput = $('input[name="name"]', form); if (nameInput) nameInput.value = guest.name;
  }
  const rsvpDialog = $('#rsvpDialog');
  $('#openRsvp').addEventListener('click', () => {
    if (rsvpDialog.open) return;
    rsvpDialog.showModal();
    document.body.classList.add('rsvp-modal-open');
    hideCursor();
  });
  $('#closeRsvp').addEventListener('click', () => rsvpDialog.close());
  rsvpDialog.addEventListener('close', () => {
    document.body.classList.remove('rsvp-modal-open');
    scheduleScene();
  });
  rsvpDialog.addEventListener('click', event => {
    if (event.target !== rsvpDialog) return;
    const rect = rsvpDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) rsvpDialog.close();
  });
  window.addEventListener('scroll', scheduleScene, { passive: true });
  window.addEventListener('resize', scheduleScene, { passive: true });
  applyMotion(); updateAttendance(); scheduleScene();
})();

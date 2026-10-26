'use strict';
(() => {
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion-ready');
}

// Gli appunti restano utilizzabili anche aprendo il sito direttamente da disco.
window.rudeCopyText = async function (text) {
  try {
    if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
    await navigator.clipboard.writeText(text);
    return;
  } catch (_) {
    const previous = document.activeElement;
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('aria-label', 'Testo da copiare');
    field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.append(field);
    field.select();
    let copied = false;
    try { copied = document.execCommand('copy'); }
    finally { field.remove(); previous?.focus({preventScroll:true}); }
    if (!copied) throw new Error('Copy unavailable');
  }
};

const modal = document.getElementById('lightboxModal');
if (modal) {
  document.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || !modal.classList.contains('active')) return;
    const focusable = [...modal.querySelectorAll('button, a[href]')];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
}

const riderTitle = document.querySelector('.rider-title-giant');
if (riderTitle) {
  const nav = document.createElement('nav');
  nav.className = 'rider-section-nav';
  nav.setAttribute('aria-label', 'Sezioni scheda tecnica');
  [['sec-lineup','Formazione'], ['sec-backline','Backline'], ['sec-inputlist','Input list'], ['sec-stageplot','Stage plot']].forEach(([id,label]) => {
    const a = document.createElement('a'); a.href = '#' + id; a.textContent = label; nav.append(a);
  });
  document.querySelector('.rider-header-section .container').append(nav);
}

// Titoli in sequenza, come righe di una locandina che prendono posto.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  const titles = document.querySelectorAll('.bio-headline, .release-title-giant');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in-view');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.2 });
  titles.forEach(title => {
    const lines = title.innerHTML.split(/<br\s*\/?\s*>/i);
    title.replaceChildren();
    lines.forEach((line, index) => {
      const outer = document.createElement('span');
      const inner = document.createElement('span');
      outer.className = 'title-line';
      inner.className = 'title-line-inner';
      inner.textContent = line.replace(/<[^>]*>/g, '').trim();
      inner.style.setProperty('--line-delay', `${index * 90}ms`);
      outer.append(inner);
      title.append(outer);
      if (index < lines.length - 1) title.append(document.createTextNode(' '));
    });
    title.classList.add('type-reveal');
    observer.observe(title);
  });
}

// Movimento fisico delle copertine, limitato al mouse e disattivato a richiesta.
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const sleeves = document.querySelectorAll('.vinyl-sleeve-card');
const resetSleeve = sleeve => {
  sleeve.classList.remove('is-tilting');
  sleeve.style.removeProperty('--tilt-x');
  sleeve.style.removeProperty('--tilt-y');
};
sleeves.forEach(sleeve => {
  let frame = 0;
  sleeve.addEventListener('pointermove', event => {
    if (motionPreference.matches || !finePointer.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const box = sleeve.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width - .5) * 2));
      const y = Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height - .5) * 2));
      sleeve.style.setProperty('--tilt-x', `${-y * 3}deg`);
      sleeve.style.setProperty('--tilt-y', `${x * 3}deg`);
      sleeve.classList.add('is-tilting');
    });
  });
  sleeve.addEventListener('pointerleave', () => { cancelAnimationFrame(frame); resetSleeve(sleeve); });
});
motionPreference.addEventListener('change', () => {
  sleeves.forEach(resetSleeve);
  if (motionPreference.matches) document.querySelectorAll('.type-reveal').forEach(t => t.classList.add('is-in-view'));
});

})();

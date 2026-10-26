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
})();

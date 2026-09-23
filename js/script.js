// ============================================================
// PORTADA — entrada al backstage + música
// ============================================================
const cover = document.getElementById('cover');
const openBtn = document.getElementById('openBtn');
const bgMusic = document.getElementById('bgMusic');

// iOS-safe scroll locking (direct style.overflow breaks on iOS Safari)
function lockScroll() {
  document.body.classList.add('scroll-locked');
  document.documentElement.classList.add('scroll-locked');
}
function unlockScroll() {
  document.body.classList.remove('scroll-locked');
  document.documentElement.classList.remove('scroll-locked');
}

if (openBtn && cover) {
  openBtn.addEventListener('click', () => {
    cover.classList.add('is-hidden');
    unlockScroll();
    if (bgMusic) {
      bgMusic.volume = 0.5;
      bgMusic.play().catch(() => { /* el navegador puede bloquear autoplay sin gesto previo */ });
    }
    setTimeout(() => {
      cover.style.display = 'none';
    }, 1000);
  });
  lockScroll();
}

// ============================================================
// MOBILE PERFORMANCE — reducir partículas en dispositivos móviles
// ============================================================
const isMobile = window.matchMedia('(max-width: 768px)').matches;

// ============================================================
// TIMECODE DE CÁMARA (HUD del hero)
// ============================================================
const timecodeEl = document.getElementById('timecode');
if (timecodeEl) {
  const start = Date.now();
  function pad2(n) { return String(n).padStart(2, '0'); }
  setInterval(() => {
    const elapsed = Date.now() - start;
    const totalSecs = Math.floor(elapsed / 1000);
    const h = pad2(Math.floor(totalSecs / 3600) % 24);
    const m = pad2(Math.floor(totalSecs / 60) % 60);
    const s = pad2(totalSecs % 60);
    const f = pad2(Math.floor((elapsed % 1000) / 40));
    timecodeEl.textContent = `${h}:${m}:${s}:${f}`;
  }, 40);
}

// ============================================================
// CUENTA REGRESIVA — hasta la ceremonia, 31/10/2026 21:30 (UTC-3)
// ============================================================
const targetDate = new Date('2026-10-31T21:30:00-03:00').getTime();

const elDays = document.getElementById('cd-days');
const elHours = document.getElementById('cd-hours');
const elMins = document.getElementById('cd-mins');
const elSecs = document.getElementById('cd-secs');

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const diff = Math.max(targetDate - Date.now(), 0);
  if (elDays) elDays.textContent = pad(Math.floor(diff / 86400000));
  if (elHours) elHours.textContent = pad(Math.floor((diff / 3600000) % 24));
  if (elMins) elMins.textContent = pad(Math.floor((diff / 60000) % 60));
  if (elSecs) elSecs.textContent = pad(Math.floor((diff / 1000) % 60));
}
if (elDays || elHours || elMins || elSecs) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ============================================================
// COPIAR ALIAS
// ============================================================
const copyBtn = document.getElementById('copyAlias');
const aliasText = document.getElementById('aliasText');

if (copyBtn && aliasText) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(aliasText.textContent.trim()).then(() => {
      const original = copyBtn.textContent;
      copyBtn.textContent = 'Alias copiado';
      copyBtn.classList.add('is-copied');
      setTimeout(() => {
        copyBtn.textContent = original;
        copyBtn.classList.remove('is-copied');
      }, 1800);
    }).catch(() => { });
  });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
document.querySelectorAll('.section, .hero, .note, .footer').forEach(el => {
  el.classList.add('reveal');
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============================================================
// FLASHES DE PAPARAZZI
// ============================================================
const flashField = document.getElementById('flashField');
if (flashField) {
  const FLASH_COUNT = isMobile ? 6 : 12;
  for (let i = 0; i < FLASH_COUNT; i++) {
    const span = document.createElement('span');
    span.style.left = (Math.random() * 100) + '%';
    span.style.top = (Math.random() * 100) + '%';
    span.style.animationDelay = (Math.random() * 6) + 's';
    span.style.animationDuration = (3.5 + Math.random() * 3) + 's';
    flashField.appendChild(span);
  }
}

// ============================================================
// DESTELLOS IRIDISCENTES — partículas flotantes
// ============================================================
const iridescentField = document.getElementById('iridescentField');
if (iridescentField) {
  const SPARKLE_COUNT = isMobile ? 14 : 30;
  const sparkleColors = ['lavender', 'rose', 'ice', 'mint', 'silver', 'gold'];

  for (let i = 0; i < SPARKLE_COUNT; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    sparkle.classList.add(`sparkle--${color}`);

    sparkle.style.left = (Math.random() * 100) + '%';
    sparkle.style.top = (Math.random() * 100) + '%';

    const size = (2 + Math.random() * 4).toFixed(1);
    sparkle.style.setProperty('--sz', size + 'px');

    const duration = (4 + Math.random() * 5).toFixed(1);
    const delay = (Math.random() * 8).toFixed(1);
    sparkle.style.setProperty('--dur', duration + 's');
    sparkle.style.setProperty('--delay', delay + 's');

    iridescentField.appendChild(sparkle);
  }
}

// ============================================================
// BRILLITOS — mini flashes de fondo
// ============================================================
const sparkleField = document.getElementById('sparkleField');
if (sparkleField) {
  const GLINT_COUNT = isMobile ? 18 : 40;
  const glintVariants = ['', 'glint--soft', 'glint--warm', 'glint--cool'];

  for (let i = 0; i < GLINT_COUNT; i++) {
    const glint = document.createElement('div');
    glint.classList.add('glint');

    const variant = glintVariants[Math.floor(Math.random() * glintVariants.length)];
    if (variant) glint.classList.add(variant);

    glint.style.left = (Math.random() * 100) + '%';
    glint.style.top = (Math.random() * 100) + '%';

    const size = (2 + Math.random() * 3).toFixed(1);
    glint.style.setProperty('--glint-sz', size + 'px');

    const duration = (2 + Math.random() * 3).toFixed(1);
    const delay = (Math.random() * 10).toFixed(1);
    glint.style.setProperty('--glint-dur', duration + 's');
    glint.style.setProperty('--glint-delay', delay + 's');

    sparkleField.appendChild(glint);
  }
}


(() => {
  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  let lang = params.get('lang') === 'en' ? 'en' : 'ar';
  const lab = document.querySelector('.decision-lab');
  const labButton = document.querySelector('.organize-button');
  const labLabel = labButton.querySelector('span');

  function updateDecisionButton() {
    const clear = lab.dataset.state === 'clear';
    labLabel.textContent = lang === 'ar'
      ? labLabel.dataset[clear ? 'clearAr' : 'chaosAr']
      : labLabel.dataset[clear ? 'clearEn' : 'chaosEn'];
  }

  function applyLanguage(next, updateUrl = false) {
    lang = next;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelector('.lang-button').textContent = lang === 'ar' ? 'EN' : 'عربي';
    document.title = lang === 'ar' ? 'خليل الصانع | قيادة التجزئة والأنظمة التشغيلية' : 'Khaleel Alsani | Retail Leadership & Operating Systems';
    document.querySelector('meta[name="description"]').content = lang === 'ar'
      ? 'خليل الصانع — قائد تجزئة متعدد الفروع يحول البيانات المتفرقة إلى قرارات وأنظمة تشغيل قابلة للتنفيذ.'
      : 'Khaleel Alsani — a multi-branch retail leader who turns fragmented data into decisions and scalable operating systems.';
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState({}, '', url);
    }
    updateDecisionButton();
  }

  document.querySelector('.lang-button').addEventListener('click', () => applyLanguage(lang === 'ar' ? 'en' : 'ar', true));
  labButton.addEventListener('click', () => {
    lab.dataset.state = lab.dataset.state === 'clear' ? 'chaos' : 'clear';
    updateDecisionButton();
  });

  const header = document.querySelector('.site-header');
  addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 12), { passive: true });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      reveal.unobserve(entry.target);
    }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => reduced ? el.classList.add('visible') : reveal.observe(el));

  const glow = document.querySelector('.cursor-glow');
  if (!reduced && matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', event => {
      glow.style.transform = `translate3d(${event.clientX - 180}px,${event.clientY - 180}px,0)`;
    }, { passive: true });
  }
  applyLanguage(lang);
})();

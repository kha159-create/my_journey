(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.lang-toggle');
  const label = document.querySelector('.lang-current');
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('lang');
  const initial = requested === 'en' || requested === 'ar' ? requested : 'ar';

  function applyLanguage(lang, updateUrl = false) {
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    label.textContent = lang === 'ar' ? 'EN' : 'ع';
    document.title = lang === 'ar' ? 'رحلتي | خليل الصانع' : 'My Journey | Khaleel Alsani';
    document.querySelector('meta[name="description"]').content = lang === 'ar'
      ? 'خليل الصانع — قائد تجزئة متعدد الفروع بخبرة 13+ سنة في الأداء التجاري، تطوير الفرق، التشغيل وتحليلات التجزئة.'
      : 'Khaleel Alsani — multi-branch retail leader with 13+ years across commercial performance, people development, operations and retail analytics.';
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      history.replaceState({}, '', url);
    }
  }

  applyLanguage(initial);
  toggle.addEventListener('click', () => applyLanguage(root.lang === 'ar' ? 'en' : 'ar', true));

  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 16);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
})();

(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.lang-toggle');
  const params = new URLSearchParams(location.search);
  let language = params.get('lang') === 'en' ? 'en' : 'ar';

  function setLanguage(lang, updateUrl = false) {
    language = lang;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    toggle.textContent = lang === 'ar' ? 'EN' : 'عربي';
    document.title = lang === 'ar' ? 'رحلتي | خليل الصانع' : 'My Journey | Khaleel Alsani';
    document.querySelector('meta[name="description"]').content = lang === 'ar'
      ? 'خليل الصانع — قائد تجزئة متعدد الفروع يجمع بين الأداء التجاري، تطوير الفرق، التشغيل وبناء أنظمة القرار.'
      : 'Khaleel Alsani — a multi-branch retail leader combining commercial performance, people development, operations and decision systems.';
    const action = document.querySelector('.organize-button span');
    const card = document.querySelector('.decision-card');
    action.textContent = card.dataset.state === 'clear'
      ? action.dataset[`clear${lang === 'ar' ? 'Ar' : 'En'}`]
      : action.dataset[`chaos${lang === 'ar' ? 'Ar' : 'En'}`];
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState({}, '', url);
    }
  }

  setLanguage(language);
  toggle.addEventListener('click', () => setLanguage(language === 'ar' ? 'en' : 'ar', true));

  const decisionCard = document.querySelector('.decision-card');
  const organize = document.querySelector('.organize-button');
  organize.addEventListener('click', () => {
    const next = decisionCard.dataset.state === 'clear' ? 'chaos' : 'clear';
    decisionCard.dataset.state = next;
    const label = organize.querySelector('span');
    const suffix = language === 'ar' ? 'Ar' : 'En';
    label.textContent = label.dataset[`${next === 'clear' ? 'clear' : 'chaos'}${suffix}`];
  });

  const header = document.querySelector('.site-header');
  const syncHeader = () => header.classList.toggle('scrolled', scrollY > 12);
  syncHeader();
  addEventListener('scroll', syncHeader, { passive: true });

  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .08, rootMargin: '0px 0px -35px' });
    reveal.forEach(node => observer.observe(node));
  } else {
    reveal.forEach(node => node.classList.add('visible'));
  }
})();

/**
 * KHALEEL ALSANI — LUXURY BLACK & GRAY OPERATIONAL DECISION MATRIX
 * Tailor-made Interactive Operational Data Network & Retail ERP Dashboard Simulator
 */

(() => {
  // ── Language & Localization Controller ──
  const root = document.documentElement;
  const langToggles = document.querySelectorAll('.lang-toggle');
  const params = new URLSearchParams(location.search);
  let currentLang = params.get('lang') || localStorage.getItem('lang') || 'ar';

  const strings = {
    ar: {
      title: 'خليل الصانع | قيادة تجزئة بعقلية تشغيلية ورقمية',
      desc: 'خليل الصانع — قائد تجزئة متعدد الفروع يجمع بين الأداء التجاري، تطوير الفرق، التشغيل وبناء أنظمة القرار.',
      toggleBtn: 'EN',
      cvText: 'السيرة الذاتية',
      stateScattered: 'إشارات مبعثرة',
      stateSync: 'منظومة قرار محكمة',
      triggerActionChaos: 'انقر لتفعيل نظام القرار وهندسة المزامنة',
      triggerActionSync: 'انقر لمشاهدة فوضى البيانات والتقارير المشتتة'
    },
    en: {
      title: 'Khaleel Alsani | Multi-Branch Retail Operations & Decision Systems',
      desc: 'Khaleel Alsani — A multi-branch retail leader combining commercial performance, people development, operations and decision systems.',
      toggleBtn: 'عربي',
      cvText: 'Download CV',
      stateScattered: 'Scattered Signals',
      stateSync: 'Unified Decision Matrix',
      triggerActionChaos: 'Click to activate decision synchronization',
      triggerActionSync: 'Click to view scattered operational noise'
    }
  };

  function updateLanguage(lang, updateUrl = false) {
    currentLang = lang;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', lang);

    langToggles.forEach(btn => {
      const textSpan = btn.querySelector('.lang-btn-text');
      if (textSpan) {
        textSpan.textContent = strings[lang].toggleBtn;
      } else {
        btn.textContent = strings[lang].toggleBtn;
      }
    });
    document.title = strings[lang].title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = strings[lang].desc;

    // Update trigger state button hint text
    const hintText = document.querySelector('.visual-hint-text');
    if (hintText) {
      hintText.textContent = isSynchronized ? strings[lang].triggerActionSync : strings[lang].triggerActionChaos;
    }

    // Dynamic language sync for Spotlight Panel
    if (activeSpotlightNodeId) {
      showSpotlight(activeSpotlightNodeId);
    }

    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState({}, '', url);
    }
  }

  langToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      updateLanguage(currentLang === 'ar' ? 'en' : 'ar', true);
    });
  });

  // ── Header Scroll State ──
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ── Scroll Reveal ──
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // ═══════════════════════════════════════════════════════════════════════
  // MONOCHROME OPERATIONAL DATA MATRIX (SCATTERED DATA -> DECISION LAYER)
  // ═══════════════════════════════════════════════════════════════════════
  const canvas = document.getElementById('commandMatrixCanvas');
  const btnImpactToggle = document.getElementById('btnImpactToggle');
  const hintText = document.querySelector('.visual-hint-text');

  // ── Multi-View Switcher Tab Management ──
  const radarTabs = document.querySelectorAll('.radar-view-tab');
  const radarPanes = document.querySelectorAll('.radar-view-pane');

  radarTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetView = tab.dataset.view;
      radarTabs.forEach(t => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      radarPanes.forEach(p => {
        const isActive = p.id === 'view' + targetView.charAt(0).toUpperCase() + targetView.slice(1);
        p.classList.toggle('active', isActive);
      });
      if (targetView === 'spider') {
        setTimeout(resize, 60);
      }
    });
  });

  // KPI Matrix Card Clicks trigger spotlight
  document.querySelectorAll('.radar-kpi-card').forEach(card => {
    card.addEventListener('click', () => {
      const nodeId = card.dataset.node;
      if (nodeId) showSpotlight(nodeId);
    });
  });

  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  let isSynchronized = true; // Default to aligned, pristine professional radar
  let morphProgress = 1.0;
  let targetMorph = 1.0;
  let activeSpotlightNodeId = null;

  // Expanding White Energy Pulse Wave
  let pulseWave = { active: false, radius: 0, maxRadius: 520, alpha: 0 };
  let mouse = { x: -1000, y: -1000, active: false };

  // Operational Retail Signals: 8 Pillars with Mastery Scores for Spider Chart
  const retailSignals = [
    { id: 'CORE', labelAr: 'خليل الصانع', labelEn: 'Khaleel Alsani', tag: 'القيادة والمنظومة', isCore: true, mastery: 1.0, color: '#0E7490', glow: 'rgba(14, 116, 144, 0.35)' },
    { id: 'S1', labelAr: 'حركة الزوار', labelEn: 'Footfall Traffic', tag: '625K+ زائر', mastery: 0.90, color: '#0D9488', glow: 'rgba(13, 148, 136, 0.22)' },
    { id: 'S2', labelAr: 'معدل التحويل', labelEn: 'Conversion Rate', tag: '18.7% Ratio', mastery: 0.94, color: '#0284C7', glow: 'rgba(2, 132, 199, 0.22)' },
    { id: 'S3', labelAr: 'متوسط السلة', labelEn: 'Average Basket', tag: '+18% ATV', mastery: 0.88, color: '#0891B2', glow: 'rgba(8, 145, 178, 0.22)' },
    { id: 'S4', labelAr: 'قطع لكل عميل', labelEn: 'Units Per Tx', tag: 'UPT 2 → 4', mastery: 0.95, color: '#0F766E', glow: 'rgba(15, 118, 110, 0.22)' },
    { id: 'S5', labelAr: 'حوكمة المخزون', labelEn: 'Stockout Slash', tag: '−40% نفاد', mastery: 0.95, color: '#059669', glow: 'rgba(5, 150, 105, 0.22)' },
    { id: 'S6', labelAr: 'استقرار الفرق', labelEn: 'Retention Rate', tag: '60% → 20%', mastery: 0.92, color: '#4F46E5', glow: 'rgba(79, 70, 229, 0.22)' },
    { id: 'S7', labelAr: 'المسؤولية والـ P&L', labelEn: 'P&L Scope', tag: 'SAR 61.9M', mastery: 0.95, color: '#D97706', glow: 'rgba(217, 119, 6, 0.22)' },
    { id: 'S8', labelAr: 'ذكاء الـ ERP', labelEn: 'ERP Operations', tag: '15-Min ORA', mastery: 0.98, color: '#0E7490', glow: 'rgba(14, 116, 144, 0.22)' }
  ];

  const nodes = [];
  const PARTICLES_COUNT = 45;
  const particles = [];
  const packets = [];

  function initNodes() {
    nodes.length = 0;

    // Hub 0 is the Central Decision Anchor
    nodes.push({
      ...retailSignals[0],
      x: 0, y: 0,
      chaosX: 0, chaosY: 0,
      syncX: 0, syncY: 0,
      chaosSpeed: 0.25,
      radius: 12
    });

    // 8 Peripheral Operational Data Points
    const outerCount = 8;
    for (let i = 1; i <= outerCount; i++) {
      const angle = ((i - 1) / outerCount) * Math.PI * 2 - Math.PI / 2;

      nodes.push({
        ...retailSignals[i],
        x: 0, y: 0,
        syncAngle: angle,
        syncDist: 140,
        syncX: 0, syncY: 0,
        chaosX: 0,
        chaosY: 0,
        badgeBox: { x: 0, y: 0, w: 90, h: 28 },
        chaosSpeed: 0.2 + Math.random() * 0.25,
        radius: 6.5
      });
    }

    // Gentle ambient dust particles
    particles.length = 0;
    for (let i = 0; i < PARTICLES_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 350,
        y: (Math.random() - 0.5) * 350,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 1,
        alpha: Math.random() * 0.35 + 0.1
      });
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (width === 0 || height === 0) {
      width = canvas.parentElement ? canvas.parentElement.clientWidth : 800;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : 520;
    }
    if (height < 320) height = 520;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const isMobile = width < 768;
    const cx = width / 2;
    const cy = height * (isMobile ? 0.46 : 0.47);

    // Guaranteed Bounded Distance so labels NEVER cross canvas or page boundaries
    const maxRadarRadius = Math.min(width * (isMobile ? 0.28 : 0.26), height * (isMobile ? 0.34 : 0.33), 150);
    const responsiveDist = Math.max(isMobile ? 88 : 110, maxRadarRadius);

    nodes.forEach((n, idx) => {
      if (n.isCore) {
        n.syncX = cx;
        n.syncY = cy;
        n.chaosX = cx;
        n.chaosY = cy;
      } else {
        // Position on polygon vertex according to mastery level
        const dist = responsiveDist * (0.82 + (n.mastery || 0.9) * 0.18);
        n.syncX = cx + Math.cos(n.syncAngle) * dist;
        n.syncY = cy + Math.sin(n.syncAngle) * dist;

        // Bounded gentle orbit for scatter mode to prevent collisions
        const scatterDist = responsiveDist * (0.6 + (idx % 3) * 0.25);
        const scatterAngle = n.syncAngle + 0.25 * (idx % 2 === 0 ? 1 : -1);
        n.chaosX = cx + Math.cos(scatterAngle) * scatterDist;
        n.chaosY = cy + Math.sin(scatterAngle) * scatterDist;
      }

      if (morphProgress >= 0.95) {
        n.x = n.syncX;
        n.y = n.syncY;
      }
    });
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('orientationchange', () => setTimeout(resize, 100));
  initNodes();
  resize();
  setTimeout(resize, 150);
  setTimeout(resize, 600);

  function spawnPacket() {
    if (packets.length > 8) return;
    const target = Math.floor(Math.random() * 8) + 1;
    packets.push({
      from: 0,
      to: target,
      progress: 0,
      speed: 0.018 + Math.random() * 0.02
    });
  }

  let time = 0;
  function render() {
    time += 0.016;

    // Smooth morph between Synchronized Radar and Scatter Mode
    if (Math.abs(morphProgress - targetMorph) > 0.001) {
      morphProgress += (targetMorph - morphProgress) * 0.08;
    } else {
      morphProgress = targetMorph;
    }

    const isMobile = width < 768;
    const cx = width / 2;
    const cy = height * (isMobile ? 0.46 : 0.47);

    ctx.clearRect(0, 0, width, height);

    // ── AUTHENTIC SPIDER RADAR LEVEL RINGS (25%, 50%, 75%, 100%) ──
    const maxR = Math.min(width * (isMobile ? 0.28 : 0.26), height * (isMobile ? 0.34 : 0.33), 150);
    const baseR = Math.max(isMobile ? 88 : 110, maxR);
    const levels = [0.25, 0.50, 0.75, 1.0];

    ctx.save();

    // Subtle background concentric octagons
    levels.forEach((lvl, lIdx) => {
      const ringR = baseR * lvl;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(ang) * ringR;
        const y = cy + Math.sin(ang) * ringR;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = lIdx === levels.length - 1 
        ? `rgba(14, 116, 144, ${0.28 * morphProgress})` 
        : `rgba(14, 116, 144, ${0.12 * morphProgress})`;
      ctx.lineWidth = lIdx === levels.length - 1 ? 1.2 : 0.75;
      if (lIdx % 2 === 0) ctx.setLineDash([3, 4]);
      else ctx.setLineDash([]);
      ctx.stroke();

      // Percentage marker along top axis
      if (morphProgress > 0.5) {
        ctx.font = '700 8.5px Space Grotesk, Manrope';
        ctx.fillStyle = 'rgba(14, 116, 144, 0.45)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`${Math.round(lvl * 100)}%`, cx, cy - ringR - 2);
      }
    });

    // Radial Spoke Lines radiating from Center to each vertex
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(ang) * baseR, cy + Math.sin(ang) * baseR);
      ctx.strokeStyle = `rgba(14, 116, 144, ${0.15 * morphProgress})`;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 3]);
      ctx.stroke();
    }
    ctx.restore();

    // ── EXPANDING ACTIVATION PULSE WAVE ──
    if (pulseWave.active) {
      pulseWave.radius += 8;
      pulseWave.alpha = Math.max(0, 1 - pulseWave.radius / pulseWave.maxRadius);

      ctx.save();
      ctx.strokeStyle = `rgba(14, 116, 144, ${pulseWave.alpha * 0.4})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseWave.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      if (pulseWave.radius >= pulseWave.maxRadius) {
        pulseWave.active = false;
      }
    }

    // ── UPDATE NODES POSITION ──
    nodes.forEach((n, idx) => {
      const spd = n.chaosSpeed || 0.3;
      if (morphProgress < 0.98) {
        n.chaosX += Math.sin(time * spd + idx) * 0.35;
        n.chaosY += Math.cos(time * spd * 0.8 + idx) * 0.35;
      }
      n.x = (1 - morphProgress) * n.chaosX + morphProgress * n.syncX;
      n.y = (1 - morphProgress) * n.chaosY + morphProgress * n.syncY;

      if (!Number.isFinite(n.x)) n.x = n.syncX || cx;
      if (!Number.isFinite(n.y)) n.y = n.syncY || cy;
    });

    // ── DRAW RADAR MASTERY POLYGON (SHADED AREA OF EXCELLENCE) ──
    if (morphProgress > 0.2) {
      ctx.save();
      ctx.beginPath();
      for (let i = 1; i <= 8; i++) {
        const n = nodes[i];
        if (i === 1) ctx.moveTo(n.x, n.y);
        else ctx.lineTo(n.x, n.y);
      }
      ctx.closePath();

      // Glowing Translucent Fill
      const polyGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, baseR);
      polyGrad.addColorStop(0, `rgba(14, 116, 144, ${0.25 * morphProgress})`);
      polyGrad.addColorStop(0.7, `rgba(6, 182, 212, ${0.15 * morphProgress})`);
      polyGrad.addColorStop(1, `rgba(14, 116, 144, ${0.06 * morphProgress})`);
      ctx.fillStyle = polyGrad;
      ctx.fill();

      // Crisp Perimeter Stroke
      ctx.strokeStyle = `rgba(14, 116, 144, ${0.85 * morphProgress})`;
      ctx.lineWidth = 1.8;
      ctx.setLineDash([]);
      ctx.stroke();
      ctx.restore();
    }

    // ── DATA PACKETS ALONG RADIAL SPOKES ──
    if (morphProgress > 0.7 && Math.random() < 0.08) {
      spawnPacket();
    }

    for (let i = packets.length - 1; i >= 0; i--) {
      const pkt = packets[i];
      pkt.progress += pkt.speed;

      const pFrom = nodes[pkt.from];
      const pTo = nodes[pkt.to];
      if (!pFrom || !pTo) {
        packets.splice(i, 1);
        continue;
      }
      const px = pFrom.x + (pTo.x - pFrom.x) * pkt.progress;
      const py = pFrom.y + (pTo.y - pFrom.y) * pkt.progress;

      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(14, 116, 144, 0.95)';
      ctx.shadowColor = 'rgba(14, 116, 144, 0.6)';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.restore();

      if (pkt.progress >= 1) packets.splice(i, 1);
    }

    // ── DRAW CENTRAL DECISION HUB (KHALEEL ALSANi) ──
    const core = nodes[0];
    if (core) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(core.x, core.y, 14, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(14, 116, 144, 0.18)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(core.x, core.y, 9, 0, Math.PI * 2);
      ctx.fillStyle = '#0E7490';
      ctx.shadowColor = 'rgba(14, 116, 144, 0.5)';
      ctx.shadowBlur = 10;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(core.x, core.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.restore();
    }

    // ── DRAW DIRECTION-AWARE NON-COLLIDING BADGES FOR ALL 8 NODES ──
    for (let i = 1; i <= 8; i++) {
      const n = nodes[i];
      if (!n) continue;

      const isHovered = mouse.active && Math.hypot(n.x - mouse.x, n.y - mouse.y) < 26;

      // Draw Vertex Dot
      ctx.save();
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius + (isHovered ? 3 : 0), 0, Math.PI * 2);
      ctx.fillStyle = n.glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.shadowColor = n.color;
      ctx.shadowBlur = isHovered ? 12 : 5;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.restore();

      // ── Direction-Aware Badge Dimensions & Positioning ──
      ctx.save();
      const labelText = currentLang === 'ar' ? n.labelAr : n.labelEn;
      ctx.font = '700 10.5px ' + (currentLang === 'ar' ? 'IBM Plex Sans Arabic' : 'Manrope');
      const textW1 = ctx.measureText(labelText).width;
      ctx.font = '800 8.5px Manrope, Space Grotesk';
      const textW2 = ctx.measureText(n.tag).width;

      const badgeW = Math.max(textW1, textW2) + 16;
      const badgeH = 28;

      // Smart direction offsets according to angle to eliminate collisions
      const cosA = Math.cos(n.syncAngle);
      const sinA = Math.sin(n.syncAngle);

      let bX = n.x;
      let bY = n.y;

      if (sinA < -0.75) {
        // Top node (S1) -> place directly above vertex
        bX = n.x;
        bY = n.y - badgeH / 2 - 12;
      } else if (sinA > 0.75) {
        // Bottom node (S5) -> place directly below vertex
        bX = n.x;
        bY = n.y + badgeH / 2 + 12;
      } else if (cosA > 0.35) {
        // Right side nodes (S2, S3, S4) -> offset outward to the right
        bX = n.x + badgeW / 2 + 10;
        bY = n.y + sinA * 8;
      } else if (cosA < -0.35) {
        // Left side nodes (S6, S7, S8) -> offset outward to the left
        bX = n.x - badgeW / 2 - 10;
        bY = n.y + sinA * 8;
      }

      // Strictly clamp badge within canvas to guarantee NO horizontal or vertical overflow
      bX = Math.max(badgeW / 2 + 8, Math.min(width - badgeW / 2 - 8, bX));
      bY = Math.max(badgeH / 2 + 8, Math.min(height - badgeH / 2 - 8, bY));

      n.badgeBox = { x: bX - badgeW / 2, y: bY - badgeH / 2, w: badgeW, h: badgeH };

      // Render Frosted Glass Pill Behind Text
      ctx.beginPath();
      const radius = 6;
      const rx = bX - badgeW / 2;
      const ry = bY - badgeH / 2;
      ctx.roundRect ? ctx.roundRect(rx, ry, badgeW, badgeH, radius) : ctx.rect(rx, ry, badgeW, badgeH);

      ctx.fillStyle = isHovered ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.88)';
      ctx.shadowColor = 'rgba(15, 23, 42, 0.08)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.fill();

      ctx.strokeStyle = isHovered ? n.color : 'rgba(14, 116, 144, 0.24)';
      ctx.lineWidth = isHovered ? 1.4 : 0.9;
      ctx.stroke();

      // Render Text Lines Inside Pill
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Title Line
      ctx.font = '700 9.5px ' + (currentLang === 'ar' ? 'IBM Plex Sans Arabic' : 'Manrope');
      ctx.fillStyle = '#0F172A';
      ctx.fillText(labelText, bX, bY - 5.5);

      // Value Tag Line
      ctx.font = '800 8.2px Manrope, Space Grotesk';
      ctx.fillStyle = n.color;
      ctx.fillText(n.tag, bX, bY + 6.5);

      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  // ── TOGGLE & TRIGGER HANDLERS ──
  const spotlightDetails = {
    'S1': {
      titleAr: 'حركة الزوار (Footfall Traffic — 625K+)',
      titleEn: 'Footfall Traffic (625K+ Visitors)',
      challengeAr: 'إهمال بيانات التدفق البشري المباشر وتوزيع القوى العاملة بشكل عشوائي، مما يترك فترات الذروة دون تغطية كافية وفترات الركود متكدسة بالموظفين.',
      challengeEn: 'Ignoring hourly traffic counts led to poor staff scheduling, leaving peak rushes critically under-staffed and dead hours over-staffed.',
      actionAr: 'تطبيق جدولة ذكية ومقننة تربط فترات ذروة الزوار المسجلة بساعات عمل الموظفين والفرق النشطة بالميدان (Smart Staff Rota Integration).',
      actionEn: 'Integrated footfall telemetry with dynamic floor coverage charts and real-time sales shift planning.',
      impactAr: 'تنظيم الحضور البشري الميداني، استغلال كامل الفرص البيعية، وتغطية 625K+ زائر عبر الفروع بكفاءة تشغيلية قصوى.',
      impactEn: 'Eliminated floor service gaps during premium hours, maximizing opportunity capture and floor productivity.'
    },
    'S2': {
      titleAr: 'معدل التحويل (Conversion Rate — 18.7%)',
      titleEn: 'Conversion Rate (18.7% Ratio)',
      challengeAr: 'انخفاض نسبة تحويل الزوار إلى مشترين نتيجة العشوائية في تخطيط الأقسام، وضعف حافز البيع، وغياب التوجيه اللحظي للمبيعات.',
      challengeEn: 'Low sales conversion caused by unorganized product zoning, unmotivated sales staff, and zero floor accountability.',
      actionAr: 'تطبيق نظام تتبع يومي وساعي مدعوم بـ "الكوتشينج السريع" للموظفين، وتحديد أهداف مبيعات واضحة ومقاسة لكل مستشار بالمناوبة.',
      actionEn: 'Initiated structured peer-to-peer coaching directly on the sales floor, breaking down store targets into manageable hourly goals.',
      impactAr: 'رفع دافعية الفريق، تحويل الزوار العابرين إلى عملاء دائمين، وتحقيق نسبة تحويل قياسية بلغت 18.7% (تفوق متوسط القطاع بـ 70%).',
      impactEn: 'Achieved an outstanding 18.7% conversion average (+70% higher than retail baseline) by building a highly engaged floor culture.'
    },
    'S3': {
      titleAr: 'متوسط قيمة السلة (Average Basket Value — +18% ATV)',
      titleEn: 'Average Basket Value (+18% ATV)',
      challengeAr: 'مبيعات أحادية ومحدودة تجعل متوسط قيمة السلة منخفضاً (ATV)، مع اقتصار العميل على شراء المنتج الأساسي دون مكملات.',
      challengeEn: 'Flat Average Transaction Value (ATV) due to passive order-taking with no dynamic cross-selling or upselling.',
      actionAr: 'تطبيق استراتيجية عرض المنتجات المترابطة وتدريب الفريق على أساليب البيع الإضافي (Cross-selling) والبيع المتقاطع.',
      actionEn: 'Trained team in on-floor styling, dynamic category pairings, and impulse-buy suggestions at the POS terminal.',
      impactAr: 'نمو حقيقي ومستدام في متوسط قيمة الفاتورة والسلة بمقدار +18% LFL مقارنة بالفترة السابقة عبر شبكات الفروع المدارة.',
      impactEn: 'Generated +18% growth in ATV and basket value, converting simple visits into high-ticket transactions.'
    },
    'S4': {
      titleAr: 'عدد القطع لكل عميل (Units Per Transaction — 2 → 4)',
      titleEn: 'Units Per Transaction (UPT 2 → 4)',
      challengeAr: 'شراء قطعة واحدة فقط لكل عملية بيعية كنمط سائد (متوسط UPT يتراوح بين 1.2 إلى 1.5)، مما يعطل حركة مخزون الإكسسوارات والمتممات.',
      challengeEn: 'Extremely low units per transaction (1.2 to 1.5 UPT), leaving high-margin accessories stagnating in storage.',
      actionAr: 'بناء روتين لربط المكملات وعقد ورش عمل ميدانية يومية سريعة لتعليم الموظفين كيفية اقتراح بدائل وخيارات ملائمة تزيد القطع المباعة.',
      actionEn: 'Enforced attachment-rate goals and trained staff in on-floor styling packages and visual combination routines.',
      impactAr: 'مضاعفة عدد القطع لكل عميل من قطعتين إلى 4 قطع بنسب نجاح استثنائية (UPT 2 → 4) مما سرع دوران الأصناف الثانوية عالية الهامش.',
      impactEn: 'Successfully doubled units-per-transaction from 2 to 4, accelerating high-margin secondary stock turnover.'
    },
    'S5': {
      titleAr: 'حوكمة المخزون ونفاد السلع (Inventory & Stockout Control — −40%)',
      titleEn: 'Inventory & Stockout Control (−40% Slash)',
      challengeAr: 'ارتفاع في نسب فاقد المخزون وعجز السلع الأكثر طلباً على الأرفف، مما تسبب في إهدار فرص مبيعات كبرى وارتفاع الفاقد والسرقات.',
      challengeEn: 'High shrinkage, chaotic stock counts, and critical stockouts on high-demand bestsellers causing massive revenue loss.',
      actionAr: 'فرض قواعد صارمة وجرد دوري مجدول، وتحليل Sell-Through وSell-Out، وتطبيق المناقلة الذكية بين الفروع خلال 24 ساعة.',
      actionEn: 'Established rigorous cycle counts, sell-through tracking loops, and implemented 24h inter-store stock rebalancing.',
      impactAr: 'تقليص نفاد السلع بنسبة 40%، وضمان توافر المنتجات الأعلى ربحية في متناول يد العميل بشكل دائم ومستمر.',
      impactEn: 'Slashed shrinkage and stockout rates by an outstanding 40%, securing perfect availability of high-margin items.'
    },
    'S6': {
      titleAr: 'دوران الموظفين واستقرار الكفاءات (Employee Retention — 60% → 20%)',
      titleEn: 'Employee Retention (60% → 20%)',
      challengeAr: 'معدل دوران وظيفي مرتفع للغاية يصل لـ 60%؛ يؤدي إلى تآكل المعرفة التشغيلية، وارتفاع كلفة التوظيف، وتدهور جودة الخدمة.',
      challengeEn: 'High employee turnover of 60% draining store performance, causing continuous recruitment costs and poor customer service.',
      actionAr: 'تطبيق نموذج منظم للدمج والتأهيل (Structured Onboarding)، والمتابعة الشخصية 1:1، وتأسيس مسار حافز واضح وتأهيل مدراء المتاجر.',
      actionEn: 'Structured standard onboarding, created personal progression paths, and established on-the-floor manager coaching.',
      impactAr: 'تقليص معدل دوران الموظفين بشكل قياسي من 60% إلى 20% بالرياض، وتثبيت صفر تسرب وظيفي في الجوف وعرعر، وبناء صف ثانٍ جاهز.',
      impactEn: 'Slashed staff turnover from 60% to 20% in Riyadh, 0% in Jouf/Arar, building a self-sustaining bench of future leaders.'
    },
    'S7': {
      titleAr: 'نطاق العمليات والـ P&L المباشر (Annual P&L Scope — SAR 61.9M)',
      titleEn: 'Annual P&L Scope (SAR 61.9M Total)',
      challengeAr: 'فروع إقليمية ومحافظ مبيعات كبرى تعاني من تذبذب الأرباح وعدم وضوح المسؤولية الماليّة والتشغيلية لدى الكوادر الميدانية.',
      challengeEn: 'Underperforming regional branch networks with bleeding operating profits and zero individual store P&L ownership.',
      actionAr: 'حوكمة الـ P&L لـ 11 فرعاً (SAR 33M الرياض + SAR 28.9M الشمال)، تفكيك الميزانيات بدقة وضبط المصاريف وهامش الربح الإجمالي Gross Margin.',
      actionEn: 'Enforced absolute store-level P&L accountability across 11 stores (33M Riyadh + 28.9M North), optimizing margins and cost structures.',
      impactAr: 'تحقيق نمو إيرادات Q1 بنسبة 22% مقارنة بالعام السابق، وإدارة محافظ سنوية تتجاوز SAR 61.9M بكفاءة مالية فائقة ومستدامة.',
      impactEn: 'Delivered 22% Q1 LFL revenue growth, steering annual retail portfolios exceeding SAR 61.9M with full commercial mastery.'
    },
    'S8': {
      titleAr: 'ذكاء الـ ERP والربط اللحظي (ORA Cockpit & D365 Sync)',
      titleEn: 'Live ERP Integration (ORA Cockpit & D365)',
      challengeAr: 'بيانات المبيعات والمؤشرات متباعدة ومحصورة في ملفات PDF وإكسل يدوية بطيئة لا تمنح المشرف الميداني رؤية فورية لاتخاذ القرار.',
      challengeEn: 'Dynamics 365 metrics buried in remote, desktop-bound office reports; frontline managers had zero access to live figures.',
      actionAr: 'بناء منصة ORA Cockpit لربط بيانات Dynamics 365 وSQL وReact/TypeScript لتحديث تقارير الفروع الستة تلقائياً كل 15 دقيقة.',
      actionEn: 'Built ORA Cockpit connecting Dynamics 365, SQL, React and Vercel to stream live 15-minute operational dashboards for 6 stores.',
      impactAr: 'تقليص التحليل اليدوي بنسبة 80%، وتمكين مدراء الفروع من رصد الفرص الضائعة وتصحيح الانحرافات التشغيلية فورياً.',
      impactEn: 'Slashed manual Excel reporting by 80%, empowering store managers to correct floor bottlenecks in real time.'
    }
  };

  // Helper to find peripheral node or its badge box under mouse cursor
  function findNodeAt(mx, my) {
    return nodes.find((n, idx) => {
      if (idx === 0) return false; // skip central core
      // Check node circle hit
      const dx = mx - n.x;
      const dy = my - n.y;
      if (Math.hypot(dx, dy) <= 22) return true;
      // Check badge box hit
      if (n.badgeBox) {
        const b = n.badgeBox;
        if (mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) return true;
      }
      return false;
    });
  }

  function showSpotlight(id) {
    const detail = spotlightDetails[id];
    if (!detail) return;

    activeSpotlightNodeId = id;

    const panel = document.getElementById('metricSpotlight');
    const titleEl = document.getElementById('spotlightTitle');
    const challengeEl = document.getElementById('spotlightChallenge');
    const actionEl = document.getElementById('spotlightAction');
    const impactEl = document.getElementById('spotlightImpact');
    const dotEl = document.getElementById('spotlightDot');

    if (!panel) return;

    const matchingNode = nodes.find(n => n.id === id);
    if (dotEl && matchingNode) {
      dotEl.style.background = matchingNode.color;
      dotEl.style.boxShadow = `0 0 10px ${matchingNode.color}`;
    }

    if (currentLang === 'ar') {
      titleEl.innerHTML = detail.titleAr;
      challengeEl.textContent = detail.challengeAr;
      actionEl.textContent = detail.actionAr;
      impactEl.textContent = detail.impactAr;
    } else {
      titleEl.innerHTML = detail.titleEn;
      challengeEl.textContent = detail.challengeEn;
      actionEl.textContent = detail.actionEn;
      impactEl.textContent = detail.impactEn;
    }

    panel.style.display = 'block';
    panel.classList.add('active');

    // Smooth scroll into view
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function triggerSynchronization(sync) {
    isSynchronized = sync;
    targetMorph = isSynchronized ? 1.0 : 0.0;

    if (isSynchronized) {
      pulseWave.active = true;
      pulseWave.radius = 8;
    }

    // Toggle button state text & styling
    if (btnImpactToggle) {
      const idleTexts = btnImpactToggle.querySelectorAll('.state-idle-text');
      const activeTexts = btnImpactToggle.querySelectorAll('.state-active-text');

      if (isSynchronized) {
        btnImpactToggle.classList.remove('active');
        idleTexts.forEach(el => el.style.display = 'inline');
        activeTexts.forEach(el => el.style.display = 'none');
      } else {
        btnImpactToggle.classList.add('active');
        idleTexts.forEach(el => el.style.display = 'none');
        activeTexts.forEach(el => el.style.display = 'inline');
      }
    }
  }

  if (btnImpactToggle) {
    btnImpactToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerSynchronization(!isSynchronized);
    });
  }

  // Handle spotlight panel close button
  const btnClose = document.getElementById('btnSpotlightClose');
  if (btnClose) {
    btnClose.addEventListener('click', () => {
      const panel = document.getElementById('metricSpotlight');
      if (panel) {
        panel.style.display = 'none';
        panel.classList.remove('active');
      }
      activeSpotlightNodeId = null;
    });
  }

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const clickedNode = findNodeAt(mx, my);
    if (clickedNode) {
      showSpotlight(clickedNode.id);
    } else {
      triggerSynchronization(!isSynchronized);
    }
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;

    // Check hover to change cursor
    const hoveredNode = findNodeAt(mouse.x, mouse.y);
    canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // ── MULTI-BRANCH GOVERNANCE MATRIX CADENCE TABS ──
  const govButtons = document.querySelectorAll('.gov-cadence-btn');
  const govPanes = document.querySelectorAll('.gov-pane');

  govButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCadence = btn.dataset.cadence;
      govButtons.forEach(b => b.classList.remove('active'));
      govPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(targetCadence);
      if (activePane) activePane.classList.add('active');
    });
  });

  // ── PWA SERVICE WORKER REGISTRATION ──
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(err => {
        console.warn('SW registration skipped:', err);
      });
    });
  }

  // ── MOBILE QUICK NAV ACTIVE HIGHLIGHT ON SCROLL ──
  const mobileNavLinks = document.querySelectorAll('.mobile-quick-nav a');
  if (mobileNavLinks.length > 0) {
    const sections = Array.from(mobileNavLinks).map(link => {
      const targetId = link.getAttribute('href').substring(1);
      return document.getElementById(targetId);
    }).filter(Boolean);

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 140;
      let currentSection = sections[0];
      for (let s of sections) {
        if (s.offsetTop <= scrollPos) {
          currentSection = s;
        }
      }
      if (currentSection) {
        mobileNavLinks.forEach(link => {
          const isCurrent = link.getAttribute('href') === '#' + currentSection.id;
          link.classList.toggle('active', isCurrent);
        });
      }
    }, { passive: true });
  }

  // ── QUICK COPY EXECUTIVE BIO HANDLER ──
  const btnCopyExec = document.querySelector('.btn-copy-exec');
  if (btnCopyExec) {
    btnCopyExec.addEventListener('click', () => {
      const bioText = currentLang === 'ar'
        ? "خليل الصانع — مدير عمليات ومبيعات إقليمي متعدد الفروع بخبرة تتجاوز 13 عاماً عبر السعودية والإمارات والأردن. قيادة محافظ مبيعات تتجاوز SAR 28.9M - 33M، خفض دوران الموظفين من 60% إلى 20%، وهندسة أنظمة ERP وقرار ميدانية تربط المؤشرات التشغيلية بالأرباح. تواصل: +966567028690 | kha.als@outlook.com"
        : "Khaleel Alsani — Regional / Area Sales & Operations Manager with 13+ years of experience across Saudi Arabia, the UAE, and Jordan. Overseeing SAR 28.9M - 33M multi-branch portfolios, reducing turnover from 60% to 20%, and developing frontline ERP decision systems. Contact: +966567028690 | kha.als@outlook.com";
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(bioText).then(() => {
          const originalHTML = btnCopyExec.innerHTML;
          btnCopyExec.innerHTML = `<span>✓</span> <span>${currentLang === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>`;
          setTimeout(() => {
            btnCopyExec.innerHTML = originalHTML;
          }, 2200);
        });
      }
    });
  }

  // ── SCROLL TO TOP EVENT HANDLER ──
  const scrollToTopBtn = document.getElementById('btnScrollToTop');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  updateLanguage(currentLang);
  triggerSynchronization(false);
  requestAnimationFrame(render);
})();

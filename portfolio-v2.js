/**
 * KHALEEL ALSANI — LUXURY BLACK & GRAY OPERATIONAL DECISION MATRIX
 * Tailor-made Interactive Operational Data Network & Retail ERP Dashboard Simulator
 */

(() => {
  // ── Language & Localization Controller ──
  const root = document.documentElement;
  const langToggle = document.querySelector('.lang-toggle');
  const params = new URLSearchParams(location.search);
  let currentLang = params.get('lang') === 'en' ? 'en' : 'ar';

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

    if (langToggle) {
      langToggle.textContent = strings[lang].toggleBtn;
    }
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

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      updateLanguage(currentLang === 'ar' ? 'en' : 'ar', true);
    });
  }

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

  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  let isSynchronized = false;
  let morphProgress = 0.0;
  let targetMorph = 0.0;
  let activeSpotlightNodeId = null;

  // Expanding White Energy Pulse Wave
  let pulseWave = { active: false, radius: 0, maxRadius: 520, alpha: 0 };
  let mouse = { x: -1000, y: -1000, active: false };

  // Operational Retail Signals with Subtle, Refined Executive Palette (Matching Reference Image 1)
  const retailSignals = [
    { id: 'CORE', labelAr: 'خليل الصانع — القيادة الميدانية', labelEn: 'Khaleel Alsani — Field Command', tag: 'OPERATIONAL INTEGRATOR', isCore: true, color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.35)' },
    { id: 'S1', labelAr: 'حركة الزوار', labelEn: 'Footfall Traffic', tag: '625K+ Visitors', color: '#CBD5E1', glow: 'rgba(203, 213, 225, 0.18)' },
    { id: 'S2', labelAr: 'معدل التحويل', labelEn: 'Conversion Rate', tag: '18.7% Ratio', color: '#94A3B8', glow: 'rgba(148, 163, 184, 0.18)' },
    { id: 'S3', labelAr: 'متوسط السلة', labelEn: 'Average Basket', tag: 'ATV +18%', color: '#93C5FD', glow: 'rgba(147, 197, 253, 0.18)' },
    { id: 'S4', labelAr: 'قطع لكل عميل', labelEn: 'Units Per Tx', tag: 'UPT 2 → 4', color: '#A5B4FC', glow: 'rgba(165, 180, 252, 0.18)' },
    { id: 'S5', labelAr: 'نفاد المخزون', labelEn: 'Stockout Incidents', tag: '−40% Slashed', color: '#6EE7B7', glow: 'rgba(110, 231, 183, 0.18)' },
    { id: 'S6', labelAr: 'دوران الموظفين', labelEn: 'Turnover Rate', tag: '60% → 20%', color: '#C4B5FD', glow: 'rgba(196, 181, 253, 0.18)' },
    { id: 'S7', labelAr: 'مبيعات العمليات', labelEn: 'Annual Revenue', tag: 'SAR 28.9M', color: '#FDE68A', glow: 'rgba(253, 230, 138, 0.18)' },
    { id: 'S8', labelAr: 'تزامن الـ ERP', labelEn: 'ERP Data Sync', tag: '15-Min Live', color: '#E2E8F0', glow: 'rgba(226, 232, 240, 0.18)' }
  ];

  const nodes = [];
  const PARTICLES_COUNT = 75;
  const particles = [];
  const packets = [];

  function initNodes() {
    nodes.length = 0;

    // Hub 0 is the Central Decision Anchor over Khaleel's portrait
    nodes.push({
      ...retailSignals[0],
      x: 0, y: 0,
      chaosX: 0, chaosY: 0,
      syncX: 0, syncY: 0,
      chaosSpeed: 0.35,
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
        syncDist: 145,
        syncX: 0, syncY: 0,
        chaosX: (Math.random() - 0.5) * 340,
        chaosY: (Math.random() - 0.5) * 340,
        chaosSpeed: 0.3 + Math.random() * 0.4,
        radius: 6
      });
    }

    // Wanderer noise particles
    particles.length = 0;
    for (let i = 0; i < PARTICLES_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 450,
        y: (Math.random() - 0.5) * 450,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.15
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
    if (height < 300) height = 520;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const cx = width / 2;
    const cy = height * (width < 768 ? 0.38 : 0.44);

    nodes.forEach((n, idx) => {
      if (n.isCore) {
        n.syncX = cx;
        n.syncY = cy;
        n.chaosX = cx + (Math.random() - 0.5) * 50;
        n.chaosY = cy + (Math.random() - 0.5) * 50;
      } else {
        const responsiveDist = Math.min(width * (width < 768 ? 0.31 : 0.36), 170);
        n.syncX = cx + Math.cos(n.syncAngle) * responsiveDist;
        n.syncY = cy + Math.sin(n.syncAngle) * responsiveDist;
        n.chaosX = cx + (Math.random() - 0.5) * width * 0.85;
        n.chaosY = cy + (Math.random() - 0.5) * height * 0.75;
      }
      n.x = n.syncX;
      n.y = n.syncY;
    });
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('orientationchange', () => setTimeout(resize, 100));
  initNodes();
  resize();
  setTimeout(resize, 150);
  setTimeout(resize, 600);

  function spawnPacket() {
    if (packets.length > 10) return;
    const target = Math.floor(Math.random() * 8) + 1;
    packets.push({
      from: 0,
      to: target,
      progress: 0,
      speed: 0.016 + Math.random() * 0.025
    });
  }

  let time = 0;
  function render() {
    time += 0.016;

    // Smooth morph
    if (Math.abs(morphProgress - targetMorph) > 0.001) {
      morphProgress += (targetMorph - morphProgress) * 0.08;
    } else {
      morphProgress = targetMorph;
    }

    const cx = width / 2;
    const cy = height * 0.44;

    ctx.clearRect(0, 0, width, height);

    // ── SUBTLE GEOMETRIC TELEMETRY GRID (MATCHING REFERENCE IMAGE 1) ──
    ctx.save();
    
    // Dot Matrix Accent Field (Matching Reference Image 1)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    const dotSpacing = 28;
    const gridCols = Math.ceil(width / dotSpacing);
    const gridRows = Math.ceil(height / dotSpacing);
    const offsetX = (width % dotSpacing) / 2;
    const offsetY = (height % dotSpacing) / 2;
    for (let c = 0; c <= gridCols; c++) {
      for (let r = 0; r <= gridRows; r++) {
        const dx = offsetX + c * dotSpacing;
        const dy = offsetY + r * dotSpacing;
        const dist = Math.hypot(dx - cx, dy - cy);
        if (dist > 50 && dist < 240) {
          ctx.fillRect(dx - 0.75, dy - 0.75, 1.5, 1.5);
        }
      }
    }

    // Precision Crosshair Axes (0° and 90°)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([2, 5]);
    ctx.beginPath();
    ctx.moveTo(cx - 230, cy);
    ctx.lineTo(cx + 230, cy);
    ctx.moveTo(cx, cy - 210);
    ctx.lineTo(cx, cy + 210);
    ctx.stroke();

    // Concentric Range Rings with Delicate Calibration
    const rings = [65, 120, 175, 225];
    rings.forEach((r, idx) => {
      const ringAlpha = (0.035 + idx * 0.015) * (0.5 + 0.5 * morphProgress);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = idx === rings.length - 1 ? 'rgba(212, 175, 55, 0.15)' : `rgba(255, 255, 255, ${ringAlpha})`;
      ctx.lineWidth = 0.8;
      ctx.setLineDash(idx % 2 === 0 ? [3, 5] : []);
      ctx.stroke();

      // Delicate calibration ticks on outer circle
      if (idx === rings.length - 1 && morphProgress > 0.4) {
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
          const isMajor = (a % (Math.PI / 4)) < 0.01;
          const len = isMajor ? 5 : 2.5;
          const tx1 = cx + Math.cos(a) * (r - len);
          const ty1 = cy + Math.sin(a) * (r - len);
          const tx2 = cx + Math.cos(a) * (r + len);
          const ty2 = cy + Math.sin(a) * (r + len);
          ctx.beginPath();
          ctx.moveTo(tx1, ty1);
          ctx.lineTo(tx2, ty2);
          ctx.strokeStyle = isMajor ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.1)';
          ctx.stroke();
        }
      }
    });

    // Precision Coordinate Indicators
    if (morphProgress > 0.4) {
      ctx.font = '600 8.5px Space Grotesk, Manrope';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('000°', cx, cy - 235);
      ctx.fillText('090°', cx + 235, cy);
      ctx.fillText('180°', cx, cy + 235);
      ctx.fillText('270°', cx - 235, cy);
    }

    // Faint Geometric Rotating Sweep Arc
    if (morphProgress > 0.1 && Number.isFinite(cx) && Number.isFinite(cy) && cx > 0 && cy > 0) {
      const beamAngle = time * 0.8;
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 225);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.5, `rgba(212, 175, 55, ${0.02 * morphProgress})`);
      grad.addColorStop(1, `rgba(203, 213, 225, ${0.05 * morphProgress})`);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, 225, beamAngle, beamAngle + 0.32);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Subtle sweep leading vector
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(beamAngle + 0.32) * 225, cy + Math.sin(beamAngle + 0.32) * 225);
      ctx.strokeStyle = `rgba(226, 232, 240, ${0.15 * morphProgress})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
    ctx.restore();

    // ── EXPANDING WHITE/GOLD ACTIVATION PULSE WAVE ──
    if (pulseWave.active) {
      pulseWave.radius += 9;
      pulseWave.alpha = Math.max(0, 1 - pulseWave.radius / pulseWave.maxRadius);

      ctx.save();
      ctx.strokeStyle = `rgba(212, 175, 55, ${pulseWave.alpha * 0.45})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseWave.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      if (pulseWave.radius >= pulseWave.maxRadius) {
        pulseWave.active = false;
      }
    }

    // ── UPDATE NODES ──
    nodes.forEach((n, idx) => {
      const spd = n.chaosSpeed || 0.4;
      if (morphProgress < 0.99) {
        n.chaosX += Math.sin(time * spd + idx) * 0.45;
        n.chaosY += Math.cos(time * spd * 0.8 + idx) * 0.45;
      }
      n.x = (1 - morphProgress) * n.chaosX + morphProgress * n.syncX;
      n.y = (1 - morphProgress) * n.chaosY + morphProgress * n.syncY;

      // Ensure finite values at all times
      if (!Number.isFinite(n.x)) n.x = n.syncX || cx;
      if (!Number.isFinite(n.y)) n.y = n.syncY || cy;
    });

    // ── DRAW REFINED CONNECTING GEOMETRIC LINES (TONED DOWN) ──
    const coreNode = nodes[0];
    if (coreNode && Number.isFinite(coreNode.x) && Number.isFinite(coreNode.y)) {
      for (let i = 1; i < nodes.length; i++) {
        const n = nodes[i];
        if (!n || !Number.isFinite(n.x) || !Number.isFinite(n.y)) continue;
        const nextN = nodes[(i % (nodes.length - 1)) + 1];

        // Line from Central Core to Peripheral Metric
        const lineAlpha = (0.12 + 0.22 * morphProgress);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(coreNode.x, coreNode.y);
        ctx.lineTo(n.x, n.y);
        const dist = Math.hypot(n.x - coreNode.x, n.y - coreNode.y);
        if (morphProgress > 0.4 && dist > 1) {
          const beamGrad = ctx.createLinearGradient(coreNode.x, coreNode.y, n.x, n.y);
          beamGrad.addColorStop(0, `rgba(212, 175, 55, ${lineAlpha})`);
          beamGrad.addColorStop(1, (n.glow || `rgba(203, 213, 225, ${lineAlpha})`));
          ctx.strokeStyle = beamGrad;
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - morphProgress)})`;
          if (morphProgress <= 0.4) ctx.setLineDash([2, 6]);
        }
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();

        // Outer Perimeter Octagon (when aligned)
        if (morphProgress > 0.3 && nextN && Number.isFinite(nextN.x) && Number.isFinite(nextN.y)) {
          const octDist = Math.hypot(nextN.x - n.x, nextN.y - n.y);
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(nextN.x, nextN.y);
          if (octDist > 1) {
            const octGrad = ctx.createLinearGradient(n.x, n.y, nextN.x, nextN.y);
            octGrad.addColorStop(0, 'rgba(203, 213, 225, 0.12)');
            octGrad.addColorStop(1, 'rgba(203, 213, 225, 0.12)');
            ctx.strokeStyle = octGrad;
          } else {
            ctx.strokeStyle = 'rgba(203, 213, 225, 0.12)';
          }
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // ── MONOCHROME DATA PACKETS ──
    if (morphProgress > 0.7 && Math.random() < 0.08) {
      spawnPacket();
    }

    for (let i = packets.length - 1; i >= 0; i--) {
      const pkt = packets[i];
      pkt.progress += pkt.speed;

      const pFrom = nodes[pkt.from];
      const pTo = nodes[pkt.to];
      if (!pFrom || !pTo || !Number.isFinite(pFrom.x) || !Number.isFinite(pTo.x)) {
        packets.splice(i, 1);
        continue;
      }
      const px = pFrom.x + (pTo.x - pFrom.x) * pkt.progress;
      const py = pFrom.y + (pTo.y - pFrom.y) * pkt.progress;
      if (!Number.isFinite(px) || !Number.isFinite(py)) {
        packets.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.restore();

      if (pkt.progress >= 1) {
        packets.splice(i, 1);
      }
    }

    // ── DRAW NODES & REAL OPERATIONAL SIGNALS (TONED DOWN) ──
    nodes.forEach((n, idx) => {
      const isHovered = mouse.active && Math.hypot(n.x - mouse.x, n.y - mouse.y) < 25;

      ctx.save();
      // Outer ambient glowing ring
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius + (isHovered ? 5 : 2), 0, Math.PI * 2);
      ctx.fillStyle = n.glow ? n.glow : (n.isCore ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.06)');
      ctx.fill();

      // Core Node Body
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = morphProgress > 0.4 ? (n.color || '#E2E8F0') : '#64748b';
      ctx.shadowColor = n.color || '#ffffff';
      ctx.shadowBlur = isHovered ? 10 : 4;
      ctx.fill();

      // Inner center dot
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = '#030509';
      ctx.fill();
      ctx.restore();

      // Signal Tag / Metric (Crisp typography)
      ctx.save();
      ctx.font = '600 10.5px ' + (currentLang === 'ar' ? 'IBM Plex Sans Arabic' : 'Manrope');
      ctx.fillStyle = '#E2E8F0';
      ctx.textAlign = 'center';

      const labelText = currentLang === 'ar' ? n.labelAr : n.labelEn;
      const labelY = n.y + (n.isCore ? 22 : 17);
      ctx.fillText(labelText, n.x, labelY);

      // Value badge tag
      if (morphProgress > 0.6) {
        ctx.font = '700 8.5px Manrope';
        ctx.fillStyle = 'rgba(148, 163, 184, 0.85)';
        ctx.fillText(n.tag, n.x, labelY + 11);
      }
      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  // ── TOGGLE & TRIGGER HANDLERS ──
  const spotlightDetails = {
    'S1': {
      titleAr: 'حركة الزوار (Footfall Traffic)',
      titleEn: 'Footfall Traffic (حركة الزوار)',
      challengeAr: 'إهمال بيانات التدفق البشري المباشر وتوزيع القوى العاملة بشكل عشوائي، مما يترك فترات الذروة دون تغطية كافية وفترات الركود متكدسة بالموظفين.',
      challengeEn: 'Ignoring hourly traffic counts led to poor staff scheduling, leaving peak rushes critically under-staffed and dead hours over-staffed.',
      actionAr: 'تطبيق جدولة ذكية ومقننة تربط فترات ذروة الزوار المسجلة بساعات عمل الموظفين والفرق النشطة بالميدان (Smart Staff Rota Integration).',
      actionEn: 'Integrated footfall telemetry with dynamic floor coverage charts and real-time sales shift planning.',
      impactAr: 'تنظيم الحضور البشري الميداني، استغلال كامل الفرص البيعية، وتحقيق أقصى كفاءة إنتاجية للموظفين بالمتر المربع.',
      impactEn: 'Eliminated floor service gaps during premium hours, maximizing opportunity capture and floor productivity.'
    },
    'S2': {
      titleAr: 'معدل التحويل (Conversion Rate)',
      titleEn: 'Conversion Rate (معدل التحويل)',
      challengeAr: 'انخفاض نسبة تحويل الزوار إلى مشترين نتيجة العشوائية في تخطيط الأقسام، وضعف حافز البيع، وغياب التوجيه اللحظي للمبيعات.',
      challengeEn: 'Low sales conversion caused by unorganized product zoning, unmotivated sales staff, and zero floor accountability.',
      actionAr: 'تطبيق نظام تتبع يومي وساعي مدعوم بـ "الكوتشينج السريع" للموظفين، وتحديد أهداف مبيعات واضحة لكل عضو في الفريق.',
      actionEn: 'Initiated structured peer-to-peer coaching directly on the sales floor, breaking down store targets into manageable hourly goals.',
      impactAr: 'رفع دافعية الفريق، تحويل الزوار العابرين إلى عملاء دائمين، وتحقيق نسبة تحويل قياسية بلغت 18.7%.',
      impactEn: 'Achieved an outstanding 18.7% conversion average by building a highly engaged, proactive sales floor culture.'
    },
    'S3': {
      titleAr: 'متوسط قيمة السلة (Average Basket Value)',
      titleEn: 'Average Basket Value (متوسط قيمة السلة)',
      challengeAr: 'مبيعات أحادية ومحدودة تجعل متوسط قيمة السلة منخفضاً (ATV)، مع اقتصار العميل على شراء المنتج الأساسي دون مكملات.',
      challengeEn: 'Flat Average Transaction Value (ATV) due to passive order-taking with no dynamic cross-selling or upselling.',
      actionAr: 'تطبيق استراتيجية عرض المنتجات المترابطة وتدريب الفريق على أساليب البيع الإضافي (Cross-selling) والبيع المتقاطع.',
      actionEn: 'Trained team in on-floor styling, dynamic category pairings, and impulse-buy suggestions at the POS terminal.',
      impactAr: 'نمو حقيقي ومسستدام في متوسط قيمة الفاتورة والسلة بمقدار +18% عبر شبكات الفروع المدارة.',
      impactEn: 'Generated +18% growth in ATV and basket value, converting simple visits into high-ticket transactions.'
    },
    'S4': {
      titleAr: 'عدد القطع لكل عميل (Units Per Transaction)',
      titleEn: 'Units Per Transaction (قطع لكل عميل)',
      challengeAr: 'شراء قطعة واحدة فقط لكل عملية بيعية كنمط سائد (متوسط UPT يتراوح بين 1.2 إلى 1.5)، مما يعطل حركة مخزون الإكسسوارات والمتممات.',
      challengeEn: 'Extremely low units per transaction (1.2 to 1.5 UPT), leaving high-margin accessories stagnating in storage.',
      actionAr: 'بناء روتين لربط المكملات وعقد ورش عمل ميدانية يومية سريعة لتعليم الموظفين كيفية اقتراح بدائل وخيارات ملائمة تزيد القطع المباعة.',
      actionEn: 'Enforced attachment-rate goals and trained staff in on-floor styling packages and visual combination routines.',
      impactAr: 'رفع وتضاعف عدد القطع لكل عميل من قطعتين إلى 4 قطع بنسب نجاح استثنائية (UPT 2 → 4).',
      impactEn: 'Successfully doubled units-per-transaction from 2 to 4, accelerating high-margin secondary stock turnover.'
    },
    'S5': {
      titleAr: 'حوكمة المخزون ونفاد السلع (Inventory & Stockout Control)',
      titleEn: 'Inventory & Stockout Control (حوكمة المخزون ونفاد السلع)',
      challengeAr: 'ارتفاع في نسب فاقد المخزون وعجز السلع الأكثر طلباً على الأرفف، مما تسبب في إهدار فرص مبيعات كبرى وارتفاع الفاقد والسرقات.',
      challengeEn: 'High shrinkage, chaotic stock counts, and critical stockouts on high-demand bestsellers causing massive revenue loss.',
      actionAr: 'فرض قواعد صارمة وجرد يومي مجدول، وتطبيق الحوكمة على حركة السلع، وتدريب الفرق على رصد ومطابقة المخزون دورياً.',
      actionEn: 'Established rigorous daily cycle counts, locked shrinkage tracking loops, and implemented visual stockout alerts.',
      impactAr: 'تقليص الفاقد وهدر السلع بنسبة 40%، وضمان توافر المنتجات الأعلى ربحية في متناول يد العميل بشكل دائم ومستمر.',
      impactEn: 'Slashed shrinkage and stockout rates by an outstanding 40%, securing perfect availability of high-margin items.'
    },
    'S6': {
      titleAr: 'دوران الموظفين واستقرار الكفاءات (Employee Retention)',
      titleEn: 'Employee Retention (دوران الموظفين)',
      challengeAr: 'معدل دوران وظيفي مرتفع للغاية يصل لـ 60%؛ يؤدي إلى تآكل المعرفة التشغيلية، وارتفاع كلفة التوظيف، وتدهور جودة الخدمة.',
      challengeEn: 'High employee turnover of 60% draining store performance, causing continuous recruitment costs and poor customer service.',
      actionAr: 'تطبيق نموذج منظم للدمج والتأهيل (Structured Onboarding)، والمتابعة الشخصية، والتمكين عبر التدريب، وتأسيس مسار حافز واضح للترقي.',
      actionEn: 'Structured standard onboarding, created personal progression paths, and established on-the-floor manager coaching.',
      impactAr: 'تقليص معدل دوران الموظفين بشكل قياسي من 60% إلى 20% فقط، مع بناء صف ثانٍ جاهز لقيادة الفروع بنسبة استدامة عالية.',
      impactEn: 'Slashed staff turnover from 60% to 20% and extended tenure, building a loyal, self-sustaining bench of future leaders.'
    },
    'S7': {
      titleAr: 'مبيعات العمليات والأرباح (Annual P&L Scope)',
      titleEn: 'Annual P&L Scope (مبيعات العمليات والأرباح)',
      challengeAr: 'فروع إقليمية ومحافظ مبيعات كبرى تعاني من تذبذب الأرباح وعدم وضوح المسؤولية الماليّة والتشغيلية لدى الكوادر الميدانية.',
      challengeEn: 'Underperforming regional branch networks with bleeding operating profits and zero individual store P&L ownership.',
      actionAr: 'توحيد قنوات التواصل المالي، تفكيك الميزانيات بدقة وتطوير أدوات الحوكمة التشغيلية وخفض المصاريف والهدر بمعدلات مدروسة.',
      actionEn: 'Enforced absolute store-level P&L accountability, optimized operating cost structures, and aligned stock rotation.',
      impactAr: 'إدارة وتوجيه محافظ مبيعات وأرباح بملايين الريالات (تصل إلى 33 مليون ريال سعودي) بكفاءة مالية فائقة ومستدامة.',
      impactEn: 'Successfully led and scaled complex store networks to cross over 33M SAR in profitable annual operating scope.'
    },
    'S8': {
      titleAr: 'تزامن مبيعات الـ ERP والـ POS (Live ERP Integration)',
      titleEn: 'Live ERP Integration (تزامن مبيعات الـ ERP)',
      challengeAr: 'بيانات المبيعات والمؤشرات متباعدة ومحصورة في تقارير ورقية مكتبية معقدة لا يستفيد منها الموظفون على الأرض لتصحيح الانحرافات والكساد.',
      challengeEn: 'Dynamics 365 metrics buried in remote, desktop-bound office reports; frontline managers had zero access to live figures.',
      actionAr: 'ابتكار وبناء لوحة تحكم رقمية ميدانية (مثل منصة ORA) تسحب البيانات اللحظية وتعيد تقديمها للفرق بشكل مؤشرات حية ومباشرة.',
      actionEn: 'Conceived and built live mobile telemetry views directly parsing D365 / POS data into visual, action-ready dashboards.',
      impactAr: 'تمكين مدراء الفروع من رصد انخفاض المبيعات والتدخل السريع لتلافي الفجوات خلال نوافذ زمنية لا تتعدى الـ 15 دقيقة.',
      impactEn: 'Empowered store managers to monitor performance gaps in real-time and execute floor corrections within 15-minute intervals.'
    }
  };

  // Helper to find peripheral node under mouse cursor
  function findNodeAt(mx, my) {
    return nodes.find((n, idx) => {
      if (idx === 0) return false; // skip central core
      const dx = mx - n.x;
      const dy = my - n.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return dist <= 24; // tactile hit target
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

    // Smooth scroll into view on mobile so the user sees it immediately
    if (window.innerWidth < 768) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
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
        btnImpactToggle.classList.add('active');
        idleTexts.forEach(el => el.style.display = 'none');
        activeTexts.forEach(el => el.style.display = 'inline');
      } else {
        btnImpactToggle.classList.remove('active');
        idleTexts.forEach(el => el.style.display = 'inline');
        activeTexts.forEach(el => el.style.display = 'none');

        // Close spotlight on dispersion
        const panel = document.getElementById('metricSpotlight');
        if (panel) {
          panel.style.display = 'none';
          panel.classList.remove('active');
        }
        activeSpotlightNodeId = null;
      }
    }

    if (hintText) {
      hintText.textContent = isSynchronized ? strings[currentLang].triggerActionSync : strings[currentLang].triggerActionChaos;
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
    if (hoveredNode) {
      canvas.style.cursor = 'pointer';
    } else {
      canvas.style.cursor = 'default';
    }
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

// ==============================
// CONFIG / STATE
// ==============================

const AppState = {
  currentLang: 'ru',
  lastScrollTop: 0,
  scrollTimer: null,
  isTicking: false
};

const SELECTORS = {
  section: '.section',
  icon: '.icon',
  lazyImage: 'img[data-src]',
  toggleBtn: '.toggle',
  langBtn: '.lang',
  cursor: '#cursor'
};

const STORAGE_KEYS = {
  lang: 'app_lang',
  theme: 'app_theme'
};


// ==============================
// I18N (Translations)
// ==============================

const translations = {
  ru: {
    name: 'Анастасия М',
    title: 'Создаю сайты и веб-приложения, которые приносят заявки',
    subtitle: 'На Tilda и с кастомной разработкой — без шаблонной скуки и с продуманной логикой',
    desc: 'Помогаю запустить сайт с нуля или довести до результата: быстрее, понятнее и без лишнего кода',
    write: 'Обсудить проект',
    services: 'Услуги',
    service_development_title: 'Доработка сайтов',
    service_development_desc: 'Исправлю баги, ускорю загрузку, добавлю новый функционал',
    service_full_site_title: 'Создание сайта под ключ',
    service_full_site_desc: 'От структуры до запуска — лендинг, многостраничник или интернет-витрина',
    service_support_title: 'Поддержка',
    service_support_desc: 'Обновления, правки, помощь после запуска — без игнора',
    service_layout_title: 'Верстка',
    service_layout_desc: 'Аккуратная адаптивная верстка, которая нормально работает, а не «почти»',
    service_tilda_title: 'Сайты на Tilda',
    service_tilda_desc: 'Собираю сайты на Tilda с нуля или дорабатываю существующие',
    portfolio: 'Портфолио',
    portfolio_project_title: 'Веб-приложение с кастомным UI',
    portfolio_desc: 'Реализован переключатель тем, адаптивный интерфейс и продуманная логика взаимодействия',
    portfolio_li_1: 'Адаптив под все устройства',
    portfolio_li_2: 'Оптимизация загрузки',
    portfolio_li_3: 'Чистый и понятный интерфейс',
    view_project: 'Смотреть проект',
    why: 'Почему я',
    why_fast_title: 'Быстрое выполнение',
    why_fast_desc: 'Не тяну сроки неделями — даю понятные дедлайны и соблюдаю их',
    why_simple_title: 'Без лишней сложности',
    why_simple_desc: 'Не нагружаю проект ненужными решениями — только то, что реально нужно',
    why_online_title: 'Всегда на связи',
    why_online_desc: 'Отвечаю без игнора, объясняю простым языком',
    why_myself_title: 'Делаю как для себя',
    why_myself_desc: 'Не «на отвали», а чтобы сайт реально работал и выглядел нормально',
    price: 'Стоимость',
    price_rework_title: 'Доработка',
    price_rework_value: 'от 1000 ₽',
    price_rework_desc: '(зависит от объема задач)',
    price_site_title: 'Создание сайта',
    price_site_value: 'от 5000 ₽',
    price_site_desc: '(структура, дизайн, адаптация)',
    price_support_title: 'Поддержка',
    price_support_value: 'по договорённости',
    price_support_desc: '(разовые задачи или абонентка)',
    price_note: 'Точную стоимость рассчитываю после обсуждения задачи',
    how_it_works: 'Как проходит работа',
    step_1_title: 'Обсуждаем задачу',
    step_1_desc: 'Уточняю цели, задачи и пожелания по проекту',
    step_2_title: 'Предлагаю решение и сроки',
    step_2_desc: 'Готовлю план работ, озвучиваю стоимость и дедлайны',
    step_3_title: 'Делаю и показываю результат',
    step_3_desc: 'Разрабатываю сайт, демонстрирую промежуточные этапы',
    step_4_title: 'Вносим правки и запускаем',
    step_4_desc: 'Корректируем детали и публикуем проект',
    contacts: 'Контакты',
    contacts_desc: 'Напишите мне в Telegram — отвечу, задам пару вопросов и скажу, как лучше реализовать ваш проект',
    contacts_footer: 'Работаю аккуратно, соблюдаю сроки и всегда довожу задачу до результата'
  },
  en: {
    name: 'Anastasia M',
    title: 'I create websites and web applications that generate leads',
    subtitle: 'On Tilda and with custom development — no template boredom, just thoughtful logic',
    desc: 'I help launch a website from scratch or bring it to results: faster, clearer, and without unnecessary code',
    write: 'Discuss the project',
    services: 'Services',
    service_development_title: 'Website refinement',
    service_development_desc: 'I fix bugs, speed up loading, add new functionality',
    service_full_site_title: 'Turnkey website creation',
    service_full_site_desc: 'From structure to launch — landing page, multi-page site, or online storefront',
    service_support_title: 'Support',
    service_support_desc: 'Updates, edits, post-launch help — no ignoring',
    service_layout_title: 'Layout',
    service_layout_desc: 'Clean responsive layout that just works, not "almost"',
    service_tilda_title: 'Tilda websites',
    service_tilda_desc: 'I build Tilda websites from scratch or improve existing ones',
    portfolio: 'Portfolio',
    portfolio_project_title: 'Web app with custom UI',
    portfolio_desc: 'Dark theme toggle, responsive interface, and thoughtful interaction logic implemented',
    portfolio_li_1: 'Responsive across all devices',
    portfolio_li_2: 'Load time optimization',
    portfolio_li_3: 'Clean and intuitive interface',
    view_project: 'View project',
    why: 'Why me',
    why_fast_title: 'Fast turnaround',
    why_fast_desc: 'I don\'t drag deadlines for weeks — I set clear timelines and stick to them',
    why_simple_title: 'No unnecessary complexity',
    why_simple_desc: 'I don\'t burden the project with needless solutions — only what you actually need',
    why_online_title: 'Always in touch',
    why_online_desc: 'I respond, no ignoring — and explain things in plain language',
    why_myself_title: 'I do it as if for myself',
    why_myself_desc: 'Not "just to get it done" — but so the site actually works and looks good',
    price: 'Pricing',
    price_rework_title: 'Refinement',
    price_rework_value: 'from 1000 ₽',
    price_rework_desc: '(depends on the scope of work)',
    price_site_title: 'Website creation',
    price_site_value: 'from 5000 ₽',
    price_site_desc: '(structure, design, responsive adaptation)',
    price_support_title: 'Support',
    price_support_value: 'by agreement',
    price_support_desc: '(one-off tasks or subscription)',
    price_note: 'I calculate the exact cost after discussing the project',
    how_it_works: 'How it works',
    step_1_title: 'Discuss the task',
    step_1_desc: 'I clarify goals, tasks, and project requirements',
    step_2_title: 'Propose a solution and timeline',
    step_2_desc: 'I prepare a work plan, provide cost estimate and deadlines',
    step_3_title: 'Build and present the result',
    step_3_desc: 'I develop the website and demonstrate intermediate progress',
    step_4_title: 'Make revisions and launch',
    step_4_desc: 'We adjust details and publish the project',
    contacts: 'Contacts',
    contacts_desc: 'Message me on Telegram — I\'ll reply, ask a few questions, and tell you the best way to implement your project',
    contacts_footer: 'I work carefully, meet deadlines, and always follow through to results'
  }
};


// ==============================
// GLOBAL FUNCTIONS (для onclick)
// ==============================

// Обновление иконки темы
function updateThemeIcon() {
  const themeIcon = document.getElementById('theme-icon');
  if (!themeIcon) return;
  
  const isLight = document.body.classList.contains('light');
  themeIcon.textContent = isLight ? 'light_mode' : 'dark_mode';
}

window.toggleTheme = function() {
  const isLight = document.body.classList.toggle('light');
  localStorage.setItem(STORAGE_KEYS.theme, isLight ? 'light' : 'dark');
  updateThemeIcon(); // ← добавить эту строку
};

// Обновление метки языка
function updateLangLabel() {
  const langLabel = document.getElementById('lang-label');
  if (!langLabel) return;
  
  langLabel.textContent = AppState.currentLang === 'ru' ? 'RU' : 'EN';
}

window.toggleLanguage = function() {
  AppState.currentLang = AppState.currentLang === 'ru' ? 'en' : 'ru';
  localStorage.setItem(STORAGE_KEYS.lang, AppState.currentLang);
  applyTranslations();
  updateLangLabel(); // ← добавить эту строку
};

window.scrollToTop = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.scrollToBottom = function () {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};


// ==============================
// HELPERS
// ==============================

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[AppState.currentLang]?.[key]) {
      el.textContent = translations[AppState.currentLang][key];
    }
  });
}

function detectBrowserLanguage() {
  const lang = navigator.language.slice(0, 2);
  return translations[lang] ? lang : 'ru';
}

function initLanguage() {
  const savedLang = localStorage.getItem(STORAGE_KEYS.lang);
  if (savedLang && translations[savedLang]) {
    AppState.currentLang = savedLang;
  } else {
    AppState.currentLang = detectBrowserLanguage();
  }
  applyTranslations();
  updateLangLabel();
}

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  if (savedTheme === 'light') {
    document.body.classList.add('light');
  } else {
    document.body.classList.remove('light');
  }
  updateThemeIcon();
}


// ==============================
// SCROLL UI (Buttons visibility)
// ==============================

function hideControls() {
  document.querySelector(SELECTORS.toggleBtn)?.classList.add('hide');
  document.querySelector(SELECTORS.langBtn)?.classList.add('hide');
}

function showControls() {
  document.querySelector(SELECTORS.toggleBtn)?.classList.remove('hide');
  document.querySelector(SELECTORS.langBtn)?.classList.remove('hide');
}

function handleScrollUI() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  clearTimeout(AppState.scrollTimer);

  if (scrollTop > AppState.lastScrollTop && scrollTop > 50) {
    AppState.scrollTimer = setTimeout(hideControls, 100);
  } else {
    showControls();
  }
  AppState.lastScrollTop = scrollTop;
}

function handleTopHover(e) {
  if (e.clientY < 50) showControls();
}


// ==============================
// PARALLAX
// ==============================

function updateParallax() {
  const scrolled = window.pageYOffset;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll ? scrolled / maxScroll : 0;
  const offset = -20 + (progress * 20);
  document.body.style.setProperty('--parallax-top', `${offset}%`);
}

function handleParallaxScroll() {
  if (!AppState.isTicking) {
    requestAnimationFrame(() => {
      updateParallax();
      AppState.isTicking = false;
    });
    AppState.isTicking = true;
  }
}


// ==============================
// CURSOR
// ==============================

function initCursor() {
  const cursor = document.querySelector(SELECTORS.cursor);
  if (!cursor) return;
  document.addEventListener('mousemove', e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
}


// ==============================
// LAZY IMAGES
// ==============================

function initLazyImages() {
  const images = document.querySelectorAll(SELECTORS.lazyImage);
  if (!images.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      const src = img.dataset.src;
      if (src) {
        img.src = src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
      }
      obs.unobserve(img);
    });
  }, {
    rootMargin: '100px',
    threshold: 0.01
  });

  images.forEach(img => observer.observe(img));
}


// ==============================
// LAZY ICONS
// ==============================

function initLazyIcons() {
  const icons = document.querySelectorAll(SELECTORS.icon);
  if (!icons.length) return;

  const showIcons = () => icons.forEach(icon => icon.classList.add('loaded'));

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => setTimeout(showIcons, 50));
  } else {
    setTimeout(showIcons, 200);
  }
}


// ==============================
// SECTION ANIMATIONS
// ==============================

function initSectionAnimations() {
  const sections = document.querySelectorAll(SELECTORS.section);
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px 50px'
  });

  sections.forEach(section => observer.observe(section));
}


// ==============================
// SCROLL BUTTONS VISIBILITY
// ==============================

function handleScrollButtons() {
  const topBtn = document.querySelector('.scroll-top');
  const bottomBtn = document.querySelector('.scroll-bottom');
  if (!topBtn || !bottomBtn) return;

  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  if (scrollTop > 300) {
    topBtn.classList.add('visible');
  } else {
    topBtn.classList.remove('visible');
  }

  if (maxScroll - scrollTop > 300) {
    bottomBtn.classList.add('visible');
  } else {
    bottomBtn.classList.remove('visible');
  }
}


// ==============================
// HORIZONTAL SCROLL (КАРУСЕЛЬ)
// ==============================

function initHorizontalScroll() {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  document.querySelectorAll('.grid').forEach(grid => {
    if (isTouch) {
      grid.style.overflowX = 'auto';
      grid.style.overflowY = 'hidden';
      grid.style.display = 'flex';
      grid.style.flexWrap = 'nowrap';
      grid.style.gap = '16px';
      grid.style.padding = '20px 16px';
      grid.style.margin = '0 -16px';
      grid.style.scrollSnapType = 'x mandatory';
      grid.style.webkitOverflowScrolling = 'touch';

      grid.querySelectorAll('.card').forEach(card => {
        card.style.flex = '0 0 280px';
        card.style.scrollSnapAlign = 'start';
      });
    } else {
      grid.style.overflowX = 'visible';
      grid.style.display = 'flex';
      grid.style.flexWrap = 'wrap';
      grid.style.scrollSnapType = 'none';
      grid.style.padding = '';
      grid.style.margin = '';

      grid.querySelectorAll('.card').forEach(card => {
        card.style.flex = '';
      });
    }
  });
}


// ==============================
// LOADER
// ==============================

function initLoader() {
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(() => loader.classList.add('hide'), 300);
    }
  });
}


// ==============================
// INIT (ENTRY POINT)
// ==============================

function initApp() {
  initTheme();
  initLanguage();
  initLoader();
  initCursor();
  initLazyImages();
  initLazyIcons();
  initSectionAnimations();
  initHorizontalScroll();
  updateParallax();
}

function bindEvents() {
  window.addEventListener('scroll', handleScrollUI);
  window.addEventListener('scroll', handleParallaxScroll);
  window.addEventListener('scroll', handleScrollButtons);
  document.addEventListener('mousemove', handleTopHover);
  window.addEventListener('resize', () => initHorizontalScroll());
}


// ==============================
// BOOTSTRAP
// ==============================

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  bindEvents();
});

window.addEventListener('load', () => {
  initLazyIcons(); // fallback
});
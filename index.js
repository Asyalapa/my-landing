function toggleTheme() { document.body.classList.toggle('light'); }

let currentLang = 'ru';
const t = {
  ru: {
    name: 'Анастасия М',
    title: 'Создаю сайты и веб- приложения, которые приносят заявки',
    subtitle: 'На Tilda и с кастомной разработкой — без шаблонной скуки и с продуманной логикой',
    desc: 'Помогаю запустить сайт с нуля или довести до результата: быстрее, понятнее и без лишнего кода',
    write: 'Обсудить проект',
    services: 'Услуги',
    service_development_title: 'Доработка сайтов',
    service_development_desc: 'Исправлю баги, ускорю загрузку, добавлю новый функционал',
    service_full_site_title: 'Создание сайта под ключ',
    service_full_site_desc: 'От структуры до запуска — лендинг, многостраничник или интернет- витрина',
    service_support_title: 'Поддержка',
    service_support_desc: 'Обновления, правки, помощь после запуска — без игнора',
    service_layout_title: 'Верстка',
    service_layout_desc: 'Аккуратная адаптивная верстка, которая нормально работает, а не «почти»',
    service_tilda_title: 'Сайты на Tilda',
    service_tilda_desc: 'Собираю сайты на Tilda с нуля или дорабатываю существующие',
    portfolio: 'Портфолио',
    portfolio_project_title: 'Веб - приложение с кастомным UI',
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

function toggleLang() {
  currentLang = currentLang === 'ru' ? 'en' : 'ru';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t[currentLang][el.dataset.i18n];
  });
}

// Анимация появления секций
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { 
    if (e.isIntersecting) e.target.classList.add('visible'); 
  });
});
document.querySelectorAll('.section').forEach(s => observer.observe(s));

// Курсор
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Скрытие кнопок темы и языка при скролле
let lastScrollTop = 0;
let scrollTimer;
const toggle = document.querySelector('.toggle');
const lang = document.querySelector('.lang');
const hideOffset = 50; // На сколько пикселей скролла скрывать кнопки

function hideButtons() {
  if (toggle && lang) {
    toggle.classList.add('hide');
    lang.classList.add('hide');
  }
}

function showButtons() {
  if (toggle && lang) {
    toggle.classList.remove('hide');
    lang.classList.remove('hide');
  }
}

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Очищаем предыдущий таймер
  clearTimeout(scrollTimer);
  
  if (scrollTop > lastScrollTop && scrollTop > hideOffset) {
    // Скроллим вниз - скрываем с небольшой задержкой
    scrollTimer = setTimeout(hideButtons, 100); // 100ms задержка перед скрытием
  } else if (scrollTop < lastScrollTop) {
    // Скроллим вверх - показываем сразу
    showButtons();
  } else if (scrollTop === 0) {
    // В самом верху - показываем
    showButtons();
  }
  
  lastScrollTop = scrollTop;
});

// Показываем кнопки при наведении мыши в верхнюю часть экрана (опционально)
document.addEventListener('mousemove', function(e) {
  if (e.clientY < 50) {
    showButtons();
  }
});
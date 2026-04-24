import express from 'express';
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем __dirname в ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Говорит Express: "ищи файлы в текущей папке"

// ========== НАСТРОЙКИ (ЗАМЕНИТЕ НА СВОИ) ==========
const BOT_TOKEN = process.env.BOT_TOKEN || 'ВАШ_ТОКЕН_ОТ_BOTFATHER';
const OWNER_CHAT_ID = process.env.OWNER_CHAT_ID || 123456789; // Ваш Telegram ID
// ==================================================

const bot = new Telegraf(BOT_TOKEN);

// Хранилище состояний диалога (в продакшене лучше использовать Redis)
const userStates = new Map();

// Кэширование статики (1 год для изображений, 1 день для CSS/JS)
app.use('/images', express.static(path.join(__dirname, 'images'), { maxAge: '365d' }));
app.use('/css', express.static(path.join(__dirname, 'css'), { maxAge: '1d' }));
app.use(express.static(__dirname, { maxAge: '1d' }));

// ------------------- КОМАНДЫ БОТА В TELEGRAM -------------------

// Команда /start
bot.command('start', (ctx) => {
  const chatId = ctx.chat.id;
  userStates.set(chatId, { step: null, data: {} });

  const keyboard = {
    reply_markup: {
      keyboard: [
        [{ text: '📝 Оставить заявку' }, { text: '❓ Задать вопрос' }]
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  };

  ctx.reply(
    '👋 Привет! Я бот-помощник.\n\n' +
    'Я могу:\n' +
    '• 📝 Принять заявку на разработку сайта\n' +
    '• ❓ Ответить на вопросы о услугах\n\n' +
    'Выберите действие 👇',
    keyboard
  );
});

// Обработка текстовых сообщений
bot.on('text', async (ctx) => {
  const chatId = ctx.chat.id;
  const text = ctx.message.text;
  const state = userStates.get(chatId) || { step: null, data: {} };

  // ===== ОТМЕНА =====
  if (text === '❌ Отменить') {
    userStates.set(chatId, { step: null, data: {} });
    return ctx.reply('✅ Действие отменено.', {
      reply_markup: {
        keyboard: [
          [{ text: '📝 Оставить заявку' }, { text: '❓ Задать вопрос' }]
        ],
        resize_keyboard: true
      }
    });
  }

  // Главное меню
  if (text === '📝 Оставить заявку') {
    state.step = 'waiting_name';
    userStates.set(chatId, state);
    return ctx.reply('📝 Давайте начнём!\n\nКак я могу к вам обращаться?', {
      reply_markup: {
        keyboard: [[{ text: '❌ Отменить' }]],
        resize_keyboard: true
      }
    });
  }

  if (text === '❓ Задать вопрос') {
    state.step = 'waiting_question';
    userStates.set(chatId, state);
    return ctx.reply('❓ Напишите ваш вопрос. Я передам его Анастасии.', {
      reply_markup: {
        keyboard: [[{ text: '❌ Отменить' }]],
        resize_keyboard: true
      }
    });
  }

  // Сбор информации по шагам
  if (state.step === 'waiting_name') {
    state.data.name = text;
    state.step = 'waiting_project_type';
    userStates.set(chatId, state);

    return ctx.reply('Какой тип проекта вас интересует?', {
      reply_markup: {
        keyboard: [
          [{ text: '🌐 Создание сайта с нуля' }, { text: '🔧 Доработка сайта' }],
          [{ text: '⚡ Поддержка сайта' }, { text: '🎨 Верстка макета' }],
          [{ text: '🟣 Сайт на Tilda' }, { text: '❌ Отменить' }]
        ],
        resize_keyboard: true
      }
    });
  }

  if (state.step === 'waiting_project_type') {
    if (!text.startsWith('❌')) {
      state.data.project_type = text;
    }
    state.step = 'waiting_description';
    userStates.set(chatId, state);
    return ctx.reply('Опишите коротко, что нужно сделать (бюджет, сроки, пожелания):', {
      reply_markup: {
        keyboard: [[{ text: '❌ Отменить' }]],
        resize_keyboard: true
      }
    });
  }

  if (state.step === 'waiting_description') {
    if (!text.startsWith('❌')) {
      state.data.description = text;
    }
    state.step = 'waiting_contact';
    userStates.set(chatId, state);
    return ctx.reply('📞 Как с вами удобно связаться?', {
      reply_markup: {
        keyboard: [
          [{ text: '📱 Отправить номер телефона', request_contact: true }, { text: '✏️ Написать вручную' }],
          [{ text: '❌ Отменить' }]
        ],
        resize_keyboard: true
      }
    });
  }

  if (state.step === 'waiting_contact') {
    if (text === '❌ Отменить') {
      userStates.set(chatId, { step: null, data: {} });
      return ctx.reply('✅ Действие отменено.', {
        reply_markup: {
          keyboard: [
            [{ text: '📝 Оставить заявку' }, { text: '❓ Задать вопрос' }]
          ],
          resize_keyboard: true
        }
      });
    }

    // Добавляем проверку: если пользователь отправил контакт
    if (ctx.message.contact) {
      // Контакт обрабатывается отдельным обработчиком
      return;
    }

    state.data.contact = text;

    // Формируем сообщение владельцу
    const data = state.data;
    const ownerMessage =
      `🆕 **НОВАЯ ЗАЯВКА С САЙТА!**\n\n` +
      `👤 **Имя:** ${data.name || '—'}\n` +
      `📋 **Тип проекта:** ${data.project_type || '—'}\n` +
      `📝 **Описание:**\n${data.description || '—'}\n\n` +
      `📞 **Контакты:** ${data.contact || '—'}\n` +
      `🆔 **Telegram ID:** \`${chatId}\``;

    // Отправляем владельцу
    await bot.telegram.sendMessage(OWNER_CHAT_ID, ownerMessage, { parse_mode: 'Markdown' });

    // Подтверждаем пользователю
    ctx.reply(
      '✅ **Спасибо!** Ваша заявка отправлена Анастасии.\n\n' +
      'Она свяжется с вами в ближайшее время.',
      {
        parse_mode: 'Markdown',
        reply_markup: {
          keyboard: [
            [{ text: '📝 Оставить заявку' }, { text: '❓ Задать вопрос' }]
          ],
          resize_keyboard: true
        }
      }
    );

    // Очищаем состояние
    userStates.delete(chatId);
  }

  if (state.step === 'waiting_question') {
    const userName = ctx.from.first_name;
    const questionMessage =
      `❓ **НОВЫЙ ВОПРОС!**\n\n` +
      `👤 **От:** ${userName} (@${ctx.from.username || '—'})\n` +
      `💬 **Вопрос:**\n${text}\n\n` +
      `🆔 **ID:** \`${chatId}\``;

    await bot.telegram.sendMessage(OWNER_CHAT_ID, questionMessage, { parse_mode: 'Markdown' });

    ctx.reply('✅ Ваш вопрос отправлен! Анастасия ответит вам в ближайшее время.', {
      reply_markup: {
        keyboard: [
          [{ text: '📝 Оставить заявку' }, { text: '❓ Задать вопрос' }]
        ],
        resize_keyboard: true
      }
    });

    userStates.delete(chatId);
  }
});

bot.on('contact', async (ctx) => {
  const chatId = ctx.chat.id;
  const contact = ctx.message.contact;
  const state = userStates.get(chatId);

  // Если пользователь в процессе заполнения заявки
  if (state && state.step === 'waiting_contact') {
    // Сохраняем номер телефона
    const phoneNumber = contact.phone_number;
    state.data.contact = phoneNumber;

    // Формируем сообщение владельцу
    const data = state.data;
    const ownerMessage =
      `🆕 **НОВАЯ ЗАЯВКА С САЙТА!**\n\n` +
      `👤 **Имя:** ${data.name || '—'}\n` +
      `📋 **Тип проекта:** ${data.project_type || '—'}\n` +
      `📝 **Описание:**\n${data.description || '—'}\n\n` +
      `📞 **Телефон:** \`${phoneNumber}\`\n` +
      `🆔 **Telegram ID:** \`${chatId}\``;

    // Отправляем владельцу
    await bot.telegram.sendMessage(OWNER_CHAT_ID, ownerMessage, { parse_mode: 'Markdown' });

    // Подтверждаем пользователю
    ctx.reply(
      '✅ **Спасибо!** Ваша заявка отправлена Анастасии.\n\n' +
      'Она свяжется с вами в ближайшее время.',
      {
        parse_mode: 'Markdown',
        reply_markup: {
          keyboard: [
            [{ text: '📝 Оставить заявку' }, { text: '❓ Задать вопрос' }]
          ],
          resize_keyboard: true
        }
      }
    );

    // Очищаем состояние
    userStates.delete(chatId);
  } else {
    ctx.reply('Спасибо за контакт! Напишите /start, чтобы оставить заявку.');
  }
});

// Установка webhook (для продакшена)
async function setWebhook() {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (webhookUrl) {
    await bot.telegram.setWebhook(`${webhookUrl}/webhook/${BOT_TOKEN}`);
    console.log(`✅ Webhook установлен: ${webhookUrl}/webhook/${BOT_TOKEN}`);
  }
}

// ------------------- API ДЛЯ ВАШЕГО САЙТА -------------------

// Эндпоинт для вебхуков Telegram
app.post(`/webhook/${BOT_TOKEN}`, (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});

// Эндпоинт для формы на сайте (если хотите отправлять данные через AJAX)
app.post('/api/telegram-message', async (req, res) => {
  const { name, contact, message, projectType } = req.body;

  if (!name || !contact) {
    return res.status(400).json({ error: 'Имя и контакты обязательны' });
  }

  let fullMessage = `🆕 **ЗАЯВКА С САЙТА (ФОРМА)**\n\n`;
  fullMessage += `👤 **Имя:** ${name}\n`;
  if (projectType) fullMessage += `📋 **Тип:** ${projectType}\n`;
  fullMessage += `📞 **Контакты:** ${contact}\n`;
  if (message) fullMessage += `💬 **Сообщение:**\n${message}`;

  try {
    await bot.telegram.sendMessage(OWNER_CHAT_ID, fullMessage, { parse_mode: 'Markdown' });
    res.json({ success: true, message: 'Сообщение отправлено!' });
  } catch (error) {
    console.error('Ошибка отправки:', error);
    res.status(500).json({ error: 'Ошибка при отправке' });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);

  // Для продакшена с webhook
  if (process.env.WEBHOOK_URL) {
    await setWebhook();
  }
  // Для разработки или если не указан WEBHOOK_URL — используем polling
  else {
    bot.launch();
    console.log('🤖 Бот запущен в режиме polling');
  }
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
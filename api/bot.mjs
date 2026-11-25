export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('Bot is running');
  }

  const token = process.env.BOT_TOKEN;
  const appUrl = 'https://vercel.app';
  const secretCommand = '/boss2026'; // Ваша секретная команда для админов

  const message = req.body?.message;
  if (!message || !message.text) {
    return res.status(200).end();
  }

  const chatId = message.chat.id;
  const text = message.text.trim();

  let replyText = '';
  let buttonText = '';
  let targetUrl = '';

  if (text === secretCommand) {
    replyText = '🔐 Доступ к панели управления разрешен. Нажмите кнопку ниже и введите логин/пароль:';
    buttonText = '⚙️ Открыть админ-панель';
    targetUrl = `${appUrl}/?admin=1`;
  } else {
    replyText = '✂️ Добро пожаловать в Northside Barbershop! Запишитесь на стрижку в пару кликов:';
    buttonText = '📅 Записаться онлайн';
    targetUrl = appUrl;
  }

  await fetch(`https://telegram.org${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: replyText,
      reply_markup: {
        inline_keyboard: [[{ text: buttonText, web_app: { url: targetUrl } }]],
      },
    }),
  });

  return res.status(200).end();
}

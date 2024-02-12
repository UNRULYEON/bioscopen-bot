import { bot } from './index';
import { cinamesGroupByCity } from '@/pathe/cinemas.ts';

const cinemasBot = () => {
  bot.onText(/\/cinemas/, (msg) => {
    const chatId = msg.chat.id;

    bot
      .sendMessage(chatId, `*🔔 Cinemas I can give you a heads-up for:*`, {
        parse_mode: 'Markdown',
      })
      .then(() => {
        bot
          .sendMessage(
            chatId,
            `*🐔 Pathé Cinemas*

${cinamesGroupByCity
  .sort((a, b) => a.city.localeCompare(b.city))
  .map((city) => {
    return `*${city.city}*
${city.cinemas.map((cinema) => `• ${cinema.fullName}`).join('\n')}`;
  })
  .join('\n\n')}`,
            { parse_mode: 'MarkdownV2' }
          )
          // Put next message in then to ensure order of messages send
          .then(() => {
            bot.sendMessage(
              chatId,
              `*🎨 Kino Cinemas*

_None yet_`,
              { parse_mode: 'MarkdownV2' }
            );
          });
      });
  });
};

export default cinemasBot;

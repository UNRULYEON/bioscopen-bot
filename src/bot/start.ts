import { bot } from './index';
import db from '@/db';

const startBot = () => {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    const subscriber = await db.subscriber.findUnique({
      where: {
        chatId,
      },
    });

    if (!subscriber) {
      await db.subscriber.create({
        data: {
          id: crypto.randomUUID(),
          chatId,
          wantsToBeNotified: true,
        },
      });
    }

    if (!subscriber) {
      bot.sendMessage(
        chatId,
        `*🤖 Get notified when movies are screening in cinemas*
        
Get started by using the \`/help\``,
        { parse_mode: 'Markdown' }
      );
    } else {
      bot.sendMessage(chatId, `🔔 You'll be notified of new screenings.`);
    }
  });
};

export default startBot;

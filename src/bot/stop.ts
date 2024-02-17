import { bot } from './index';
import db from '@/db';

const stopBot = () => {
  bot.onText(/\/stop/, async (msg) => {
    const chatId = msg.chat.id;

    await db.subscriber.upsert({
      where: {
        chatId,
      },
      update: {
        wantsToBeNotified: false,
      },
      create: {
        id: crypto.randomUUID(),
        chatId,
        wantsToBeNotified: false,
      },
    });

    bot.sendMessage(chatId, `🔕 You won't be notified of new screenings.`);
  });
};

export default stopBot;

import { bot } from './index';
import db from '@/db';

const helpBot = () => {
  bot.onText(/\/help/, async (msg) => {
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

    bot
      .sendMessage(
        chatId,
        `*🤖 Get notified when movies are screening in cinemas*

I'll keep track of movies you're interested in and let you know when they're screening in your preferred cinemas. I do this by scraping websites for you. Check out my code if you're interested: [bioscopen-bot](https://github.com/unrulyeon/bioscopen-bot).
`,
        {
          parse_mode: 'Markdown',
        }
      )
      .catch((error) => console.error(error));
  });
};

export default helpBot;

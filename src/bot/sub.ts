import { bot } from './index';
import db from '@/db';

const subscribedBot = () => {
  bot.onText(/\/sub/, async (msg) => {
    const chatId = msg.chat.id;

    let subscriber = await db.subscriber.findUnique({
      where: {
        chatId,
      },
    });

    if (!subscriber) {
      subscriber = await db.subscriber.create({
        data: {
          id: crypto.randomUUID(),
          chatId,
          wantsToBeNotified: true,
        },
      });
    }

    const subscriptions = await db.movieSubscriber.findMany({
      where: {
        subscriberId: subscriber.id,
      },
      select: {
        movie: {
          select: {
            name: true,
          },
        },
      },
    });

    bot.sendMessage(
      chatId,
      `👀 Here are you're subscriptions:
    
${
  subscriptions.length === 0
    ? `_None_

Use /search to see how you can subscribe to a movie.`
    : subscriptions
        .sort((a, b) => a.movie.name.localeCompare(b.movie.name))
        .map((sub) => `• ${sub.movie.name}`)
        .join('\n')
}`,
      {
        parse_mode: 'Markdown',
      }
    );
  });
};

export default subscribedBot;

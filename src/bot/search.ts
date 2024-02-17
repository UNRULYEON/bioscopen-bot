import { bot } from './index';
import type { InlineKeyboardButton } from 'node-telegram-bot-api';
import db from '@/db';
import api from '@/api';

const searchBot = () => {
  bot.onText(/\/search(.*)/, (msg, match) => {
    if (!match || match[1] !== '') return;

    const chatId = msg.chat.id;

    bot
      .sendMessage(
        chatId,
        `🔍 Search for a movie to subscribe to updates for:

• Search with a movie name:
  \`/search dune part two\`
  
• Get specific with a year:
  \`/search dune 1984\``,
        {
          parse_mode: 'MarkdownV2',
        }
      )
      .catch((error) => console.error(error));
  });

  bot.onText(/\/search (.+)/, async (msg, match) => {
    if (!match || match?.length === 1) return;

    const chatId = msg.chat.id;

    const query = match[1];

    const json = await api.letterboxd.search(query);

    if (!json) return bot.sendMessage(chatId, 'Failed to fetch movies');

    if (json.items.length === 0)
      return bot.sendMessage(chatId, 'No movies found :(');

    const movie = json.items[0].film;
    const message = `${movie.name} (${movie.releaseYear})`;
    const poster =
      movie.poster.sizes.length > 0
        ? movie.poster.sizes[movie.poster.sizes.length - 1].url
        : undefined;

    const alreadySubscribed = await db.movieSubscriber.findFirst({
      where: {
        subscriber: {
          chatId: chatId,
        },
        movie: {
          letterboxdId: movie.id,
        },
      },
    });

    const inlineKeyboard: InlineKeyboardButton[][] = [
      [
        alreadySubscribed
          ? {
              text: '🔕 Unsubscribe',
              callback_data: `search;unsubscribe;${movie.id}`,
            }
          : {
              text: '🔔 Subscribe',
              callback_data: `search;subscribe;${movie.id};${movie.name};${movie.releaseYear}`,
            },
      ],
    ];

    if (!poster) {
      bot.sendMessage(chatId, message, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: inlineKeyboard,
        },
      });
    } else {
      bot.sendPhoto(chatId, poster, {
        caption: message,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: inlineKeyboard,
        },
      });
    }
  });

  bot.on('callback_query', async (query) => {
    const data = query.data;

    if (!data) return;

    const [category, action, movieId, movieName, movieReleaseYear] =
      data?.split(';');

    if (category !== 'search' || !action || !movieId) return;

    const chatId = query.message?.chat.id;
    const messageId = query.message?.message_id;
    if (!chatId) throw new Error('No chatId found');
    if (!messageId) throw new Error('No messageId found');

    let subscriber = await db.subscriber.findUnique({
      where: {
        chatId: chatId,
      },
      select: {
        id: true,
        chatId: true,
        CinemaSubscriber: {
          select: {
            cinema: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!subscriber) {
      subscriber = await db.subscriber.create({
        data: {
          id: crypto.randomUUID(),
          chatId: chatId,
          wantsToBeNotified: true,
        },
        select: {
          id: true,
          chatId: true,
          CinemaSubscriber: {
            select: {
              cinema: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    }

    let movie = await db.movie.findUnique({
      where: {
        letterboxdId: movieId,
      },
    });

    if (action === 'subscribe') {
      if (!movie) {
        // TODO: Cache recent movie searches so we can omit the
        //       movie name and release year in the callback data
        movie = await db.movie.create({
          data: {
            id: crypto.randomUUID(),
            letterboxdId: movieId,
            name: movieName,
            releaseYear: Number(movieReleaseYear) ?? 0,
          },
        });
      }

      let movieSubscriber = await db.movieSubscriber.findUnique({
        where: {
          movieId_subscriberId: {
            movieId: movie.id,
            subscriberId: subscriber.id,
          },
        },
      });

      if (!movieSubscriber) {
        await db.movieSubscriber.create({
          data: {
            available: false,
            notified: false,
            subscriberId: subscriber.id,
            movieId: movie.id,
          },
        });
      }

      const inlineKeyboard: InlineKeyboardButton[][] = [
        [
          {
            text: '🔕 Unsubscribe',
            callback_data: `search;unsubscribe;${movie.letterboxdId}`,
          },
        ],
      ];
      const message = `${movie.name} (${movie.releaseYear})`;

      await bot.editMessageCaption(
        `${message}

🔔 We'll notify you when the movie is available!

${
  subscriber.CinemaSubscriber.length === 0
    ? `You're not subscribed to any cinemas yet. Use /cinemas to see how.`
    : ''
}

${
  subscriber.CinemaSubscriber.length > 0
    ? subscriber.CinemaSubscriber.map((c) => c.cinema.name).join('\n')
    : ''
}`,
        {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: {
            inline_keyboard: inlineKeyboard,
          },
        }
      );

      return;
    } else if (action === 'unsubscribe') {
      if (movie) {
        await db.movieSubscriber.delete({
          where: {
            movieId_subscriberId: {
              movieId: movie.id,
              subscriberId: subscriber.id,
            },
          },
        });

        const inlineKeyboard: InlineKeyboardButton[][] = [
          [
            {
              text: '🔔 Subscribe',
              callback_data: `search;subscribe;${movie.letterboxdId}`,
            },
          ],
        ];
        const message = `${movie.name} (${movie.releaseYear})

🔕 You've unsubscribed from this movie`;

        await bot
          .editMessageCaption(`${message}`, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: {
              inline_keyboard: inlineKeyboard,
            },
          })
          .catch((error) => console.error(error));
      } else {
        await bot
          .deleteMessage(chatId, messageId)
          .catch((error) => console.error(error));

        await bot.sendMessage(chatId, `🔕 You've unsubscribed from the movie`);
      }

      return;
    }
  });
};

export default searchBot;

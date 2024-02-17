import db from '@/db';
import { bot } from './index';

const cinemasBot = () => {
  bot.onText(/\/cinemas(.?)/, async (msg, match) => {
    if (match && match[1] !== '') return;

    const chatId = msg.chat.id;

    const companies = await db.company.findMany({
      select: {
        name: true,
        emoji: true,
        Cinema: {
          select: {
            name: true,
            city: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const cinemasGroupedByCity = companies.reduce<
      {
        name: string;
        emoji: string;
        cities: { name: string; cinemas: { name: string }[] }[];
      }[]
    >((acc, company) => {
      const newAcc = [...acc];

      if (!acc.some((c) => c.name === company.name))
        newAcc.push({ name: company.name, emoji: company.emoji, cities: [] });

      company.Cinema.forEach((cinema) => {
        const city = newAcc
          .find((c) => c.name === company.name)
          ?.cities.find((c) => c.name === cinema.city.name);

        if (city) {
          city.cinemas.push({ name: cinema.name });
        } else {
          newAcc
            .find((c) => c.name === company.name)
            ?.cities.push({
              name: cinema.city.name,
              cinemas: [{ name: cinema.name }],
            });
        }
      });

      return newAcc;
    }, []);

    await Promise.allSettled(
      cinemasGroupedByCity.map((company) => {
        return bot.sendMessage(
          chatId,
          `*${company.emoji} ${company.name}*

${company.cities
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((city) => {
    return `*${city.name}*
${city.cinemas.map((cinema) => `• ${cinema.name}`).join('\n')}`;
  })
  .join('\n\n')}`,
          {
            parse_mode: 'MarkdownV2',
          }
        );
      })
    ).then(() => {
      bot.sendMessage(
        chatId,
        `*⬆️ Cinemas I can give you a heads-up for*

To manage your preferences, use the following commands:
\`/cinemas list preferences\`
\`/cinemas add pathe schouwburgplein\`
\`/cinemas remove pathe de munt\`

Changing your preferences will affect current and new movies you'll subscribe to.`,
        {
          parse_mode: 'Markdown',
        }
      );
    });
  });

  bot.onText(/\/cinemas list preferences/, async (msg) => {
    const chatId = msg.chat.id;

    const subscriber = await db.subscriber.findFirst({
      where: {
        chatId: chatId,
      },
      include: {
        CinemaSubscriber: {
          include: {
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
      return bot.sendMessage(
        chatId,
        `You're not subscribed to any cinemas yet. Use /cinemas to see how.`
      );
    }

    bot.sendMessage(
      chatId,
      `*🎬 You're subscribed to the following cinemas:*

${
  subscriber.CinemaSubscriber.length === 0
    ? `_None_

Use /cinemas to see how you can manage your preferences.`
    : subscriber.CinemaSubscriber.sort((a, b) =>
        a.cinema.name.localeCompare(b.cinema.name)
      )
        .map((c) => `• ${c.cinema.name}`)
        .join('\n')
}`,
      {
        parse_mode: 'Markdown',
      }
    );
  });

  bot.onText(/\/cinemas add (.+)/, async (msg, match) => {
    if (!match) return;

    const chatId = msg.chat.id;
    const query = match[1];

    const [companyName, ...cinemaName] = query.split(' ');

    const subscriber = await db.subscriber.findFirst({
      where: {
        chatId: chatId,
      },
      select: {
        id: true,
      },
    });

    if (!subscriber) {
      return bot.sendMessage(
        chatId,
        `You're not subscribed to any cinemas yet. Use /cinemas to see how.`
      );
    }

    let company;

    if (companyName === 'pathe') {
      company = await db.company.findFirst({
        where: {
          name: {
            search: 'Pathé',
          },
        },
        select: {
          id: true,
        },
      });
    }

    if (!company) {
      return bot.sendMessage(
        chatId,
        `I couldn't find a cinema that belongs to "${companyName}"`
      );
    }

    const cinema = await db.cinema.findFirst({
      where: {
        name: {
          search: cinemaName.join('<->'),
        },
        companyId: company.id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!cinema) {
      return bot.sendMessage(
        chatId,
        `I couldn't find a cinema that belongs to "${companyName}"`
      );
    }

    const alreadyAddedToPreferences = await db.cinemaSubscriber.findFirst({
      where: {
        subscriberId: subscriber.id,
        cinemaId: cinema.id,
      },
    });

    if (!alreadyAddedToPreferences) {
      await db.cinemaSubscriber.create({
        data: {
          subscriberId: subscriber.id,
          cinemaId: cinema.id,
        },
      });
    }

    bot.sendMessage(
      chatId,
      `✅ *Added to your preferences*

You'll be notified when movies you've subscribed to are available in *${cinema.name}*.`,
      { parse_mode: 'Markdown' }
    );
  });

  bot.onText(/\/cinemas remove (.+)/, async (msg, match) => {
    if (!match) return;

    const chatId = msg.chat.id;
    const query = match[1];

    const [companyName, ...cinemaName] = query.split(' ');

    const subscriber = await db.subscriber.findFirst({
      where: {
        chatId: chatId,
      },
      select: {
        id: true,
      },
    });

    if (!subscriber) {
      return bot.sendMessage(
        chatId,
        `You're not subscribed to any cinemas yet. Use /cinemas to see how.`
      );
    }

    let company;

    if (companyName === 'pathe') {
      company = await db.company.findFirst({
        where: {
          name: {
            search: 'Pathé',
          },
        },
        select: {
          id: true,
        },
      });
    }

    if (!company) {
      return bot.sendMessage(
        chatId,
        `I couldn't find a cinema that belongs to "${companyName}"`
      );
    }

    const cinema = await db.cinema.findFirst({
      where: {
        name: {
          search: cinemaName.join('<->'),
        },
        companyId: company.id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!cinema) {
      return bot.sendMessage(
        chatId,
        `I couldn't find a cinema that belongs to "${companyName}"`
      );
    }

    await db.cinemaSubscriber.deleteMany({
      where: {
        subscriberId: subscriber.id,
        cinemaId: cinema.id,
      },
    });

    bot.sendMessage(
      chatId,
      `✅ *Removed from your preferences*

You'll no longer be notified when movies you've subscribed to are available in *${cinema.name}*.`,
      { parse_mode: 'Markdown' }
    );
  });
};

export default cinemasBot;

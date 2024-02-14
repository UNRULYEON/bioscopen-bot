import db from '@/db';
import { bot } from './index';

const cinemasBot = () => {
  bot.onText(/\/cinemas/, async (msg) => {
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

      if (!acc.some((c) => c.name !== company.name))
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

    bot
      .sendMessage(
        chatId,
        `${cinemasGroupedByCity
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((company) => {
            return `*${company.emoji} ${company.name}*

${company.cities
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((city) => {
    return `*${city.name}*
${city.cinemas.map((cinema) => `• ${cinema.name}`).join('\n')}`;
  })
  .join('\n\n')}
`;
          })}`,
        { parse_mode: 'MarkdownV2' }
      )
      .catch((error) => console.error('cinemasBot', error))
      // Put next message in .then() to ensure order of messages send
      .then(() => {
        bot.sendMessage(
          chatId,
          `*⬆️ Cinemas I can give you a heads-up for*

To manage your preferences, use the following commands:
\`/cinemas add schouwburgplein\`
\`/cinemas remove de munt\`

Changing your preferences will affect current and new movies you'll subscribe to.`,
          {
            parse_mode: 'Markdown',
          }
        );
      });
  });
};

export default cinemasBot;

import { bot } from './index';
import api from '@/api';

const searchBot = () => {
  bot.onText(/\/search (.+)/, (msg, match) => {
    const chatId = msg.chat.id;

    if (!match || !match[1]) {
      bot.sendMessage(chatId, 'Give me the movie name to look for 👀');
      return;
    }

    const query = match[1];

    console.log(query);

    bot.sendMessage(chatId, `Start!`);
  });
};

export default searchBot;

// import {
//   Composer,
//   InlineKeyboard,
// } from 'https://deno.land/x/grammy@v1.20.3/mod.ts';
// import api from '@/api/index.ts';
// import db from '@/db/index.ts';

// export const search = new Composer();

// search.command('search', async (ctx) => {
//   if (ctx.message?.text === '/search')
//     return ctx.reply('Give me the movie name to look for 👀');

//   const query = ctx.message?.text?.split(' ').slice(1).join(' ');

//   if (!query) return ctx.reply('Please provide a movie name');

//   const json = await api.letterboxd.search(query);

//   if (!json) return ctx.reply('Failed to fetch movies');

//   if (json.items.length === 0) return ctx.reply('No movies found :(');

//   const movie = json.items[0].film;
//   const title = `${movie.name} (${movie.releaseYear})`;
//   const poster =
//     movie.poster.sizes.length > 0
//       ? movie.poster.sizes[movie.poster.sizes.length - 1].url
//       : undefined;

//   // const encodedQuery = encodeURIComponent(query);

//   const inlineKeyboard = new InlineKeyboard().text(
//     'Subscribe 🔔',
//     `search:subscribe:${movie.id}:${movie.releaseYear}`
//   );

//   // const inlineKeyboard = new InlineKeyboard().text(
//   //   'This one!',
//   //   `search:select:${encodedQuery}:${movie.id}`
//   // );

//   // if (json.items.length > 1) {
//   //   inlineKeyboard.text(
//   //     '>',
//   //     `search:next:${encodedQuery}:${json.items[1].film.id}`
//   //   );
//   // }

//   if (!poster) {
//     ctx.reply(title, {
//       parse_mode: 'Markdown',
//       reply_markup: inlineKeyboard,
//     });
//   } else {
//     ctx.replyWithPhoto(poster, {
//       caption: title,
//       parse_mode: 'Markdown',
//       reply_markup: inlineKeyboard,
//     });
//   }
// });

// search.on('callback_query:data', async (ctx) => {
//   if (!ctx.chat?.id) return;

//   const data = ctx.callbackQuery.data.split(':');

//   if (data[0] !== 'search') return;

//   const [_, action, query, letterboxdId, releaseYear] = data;

//   console.log(action, query, letterboxdId);

//   if (action === 'subscribe') {
//     let subscriber = await db.subscriber.findFirst({
//       where: {
//         chatId: ctx.chat.id,
//       },
//     });

//     let movie = await db.movie.findFirst({
//       where: {
//         letterboxdId,
//       },
//     });

//     if (!movie) {
//       movie = await db.movie.create({
//         data: {
//           id: '',
//           letterboxdId,
//           name: query,
//           releaseYear: parseInt(releaseYear),
//         },
//       });
//     }

//     if (!subscriber) {
//       subscriber = await db.subscriber.create({
//         data: {
//           id: '',
//           chatId: ctx.chat.id,
//           MovieSubscriber: {
//             connect: {
//               id: movie.id,
//             },
//           },
//         },
//       });
//     }

//     ctx.editMessageCaption({
//       caption: `${ctx.msg?.caption}

// You'll be notified when this movie is available.`,
//       reply_markup: undefined,
//     });
//     await ctx.answerCallbackQuery();
//   }
// });

// // search.on('callback_query:data', async (ctx) => {
// //   const data = ctx.callbackQuery.data.split(':');

// //   if (data[0] !== 'search') return;

// //   const [_, action, query, id] = data;

// //   console.log(action, query, id);

// //   if (action === 'select') {
// //     ctx.editMessageCaption({
// //       caption: `${ctx.msg?.caption}

// // You selected ${query} with id ${id}!`,
// //       reply_markup: undefined,
// //     });
// //     await ctx.answerCallbackQuery();
// //   }

// //   if (action === 'next') {
// //     await ctx.answerCallbackQuery();
// //   }
// // });

import { bot } from './index';

const helpBot = () => {
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;

    bot
      .sendMessage(
        chatId,
        `*🤖 Get notified when movies are screening in cinemas*

I'll keep track of movies you're interested in and let you know when they're screening in your preferred cinemas. I do this by scraping websites for you. Check out my code if you're interested: [bioscopen-bot](https://github.com/unrulyeon/bioscopen-bot).
`,
        // Let me know you're preferred cinemas by using the /cinemas command.`,
        // ⬇️ Check out the *Commands menu* below to get started`,
        {
          parse_mode: 'Markdown',
        }
      )
      .catch((error) => console.error(error));
  });
};

export default helpBot;

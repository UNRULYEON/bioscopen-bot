import { bot } from './index';

const startBot = () => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `Start!`);
  });
};

export default startBot;

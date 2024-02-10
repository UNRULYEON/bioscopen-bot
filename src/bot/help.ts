import { bot } from './index';

const helpBot = () => {
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `Help!`);
  });
};

export default helpBot;

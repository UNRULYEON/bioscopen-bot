import Bot from 'node-telegram-bot-api';
import helpBot from './help';
import startBot from './start';
import searchBot from './search';
import cinemasBot from './cinemas';

export const bot = new Bot(Bun.env.TELEGRAM_API_TOKEN, { polling: true });

bot.setMyCommands([
  { command: 'help', description: `Show help message` },
  { command: 'start', description: `Subscribe to updates` },
  { command: 'stop', description: `Stop receiving updates` },
  {
    command: 'search',
    description: `Search for movies you'd like updates for`,
  },
  {
    command: 'subscribed',
    description: `See and manage for which films you'll get an notification for`,
  },
  {
    command: 'cinemas',
    description: `Show all cinames I can give you a heads-up for`,
  },
]);

export const initialiseBot = () => {
  helpBot();
  startBot();
  searchBot();
  cinemasBot();

  console.log('🤖 Bot initialised');
};

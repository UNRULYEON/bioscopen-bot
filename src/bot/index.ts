import Bot from 'node-telegram-bot-api';
import helpBot from './help';
import startBot from './start';
import stopBot from './stop';
import searchBot from './search';
import cinemasBot from './cinemas';
import subBot from './sub';

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
    command: 'cinemas',
    description: `See all cinemas I can give you a heads-up for and manage your preferences`,
  },
  {
    command: 'sub',
    description: `See and manage for which films you'll get an notification for`,
  },
]);

export const initialiseBot = () => {
  helpBot();
  startBot();
  stopBot();
  searchBot();
  cinemasBot();
  subBot();

  console.log('🤖 Bot initialised');
};

# bioscopen-bot

Telegram bot to get notified of movies that are screening in Dutch cinemas.

## 🤖 Using the bot

[Open in Telegram](https://t.me/BioscopenBot)

## 📦 Getting started

### Pre-requisites

- [Deno 1.38.2](https://deno.com/)
- Postgresql

### Local configuration

Copy `.env.example` and name it `.env`:

```bash
cp .env.example .env
```

The `.env` file contains placeholder values. Make sure to update them

## 🎓 Usage

### Run the project

First, generate database types with:

```bash
deno task db:migrate
```

Run the project locally with:

```bash
deno task dev
```

## ⌘ Commands

| Command                  | Description              |
| ------------------------ | ------------------------ |
| deno task dev | Runs the project in watch mode |
| deno task db:migrate | Creates a new migration |
| deno task db:generate | Generates client types |

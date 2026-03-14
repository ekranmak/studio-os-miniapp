# Telegram setup

## 1. Перевыпусти bot token

Так как токен уже был отправлен в чат, сначала перевыпусти его в BotFather:

1. Открой BotFather.
2. Выполни /revoke.
3. Выбери бота.
4. Получи новый token.

## 2. Локально сохрани token

Создай файл apps/api/.env на основе apps/api/.env.example и вставь новый token в TELEGRAM_BOT_TOKEN.

Создай файл apps/web/.env.local на основе apps/web/.env.example.

## 3. Настрой Mini App URL

В BotFather:

1. /mybots
2. Выбери бота.
3. Bot Settings
4. Menu Button
5. Укажи URL Mini App, например https://your-domain.com/dashboard

## 4. Что уже поддерживается в коде

- /start отправляет кнопку Open Mini App
- /dashboard, /crm, /projects, /documents, /ai зарегистрированы в Telegram service
- Backend читает TELEGRAM_BOT_TOKEN и TELEGRAM_WEBAPP_URL из env

## 5. Проверка

1. Запусти API.
2. Открой диалог с ботом.
3. Выполни /start.
4. Нажми Open Mini App.
5. Проверь открытие Mini App и наличие initData в Telegram WebApp.

## 6. Важное ограничение

Для production обязательно реализовать полноценную серверную проверку Telegram initData по HMAC и привязку пользователя к organization.

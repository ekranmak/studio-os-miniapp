Telegram bot service стартует автоматически при наличии TELEGRAM_BOT_TOKEN.

Команды:
- /start
- /dashboard
- /crm
- /projects
- /documents
- /ai

Для production нужно добавить graceful shutdown, webhook mode и серверную проверку Telegram initData.

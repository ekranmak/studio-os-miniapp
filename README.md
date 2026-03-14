# minipp

Монорепозиторий Telegram Mini App CRM для веб-студии.

## Состав

- apps/web — Next.js Mini App интерфейс
- apps/api — NestJS API, Prisma, Telegram bot, AI orchestration
- infra — Docker Compose и окружение

## Быстрый старт

1. Скопируйте .env.example в apps/api/.env и apps/web/.env.local.
2. Установите зависимости: npm install
3. Сгенерируйте Prisma client: npm run prisma:generate
4. Запустите web: npm run dev:web
5. Запустите api: npm run dev:api

## Что уже включено

- Multi-tenant модель для организаций, пользователей, лидов, клиентов, проектов, задач и документов
- Telegram Mini App bootstrap
- AI orchestrator с 5 агентами
- Базовая генерация контракта и ТЗ
- Docker Compose для PostgreSQL, MinIO и API/Web

## Что нужно настроить вручную

- Telegram Bot Token
- Telegram WebApp URL через @BotFather
- OpenRouter API key
- S3/MinIO ключи
- DATABASE_URL

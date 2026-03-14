import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Markup, Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly bot: Telegraf | null;
  private readonly webAppUrl: string;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.webAppUrl = this.configService.get<string>('TELEGRAM_WEBAPP_URL') ?? 'http://localhost:3000';

    if (!token) {
      this.bot = null;
      this.logger.warn('TELEGRAM_BOT_TOKEN not set');
      return;
    }

    this.bot = new Telegraf(token);
    const url = this.webAppUrl;

    const openBtn = Markup.inlineKeyboard([
      Markup.button.webApp('Открыть Studio OS CRM', url),
    ]);

    this.bot.start((ctx) =>
      ctx.reply(
        `Привет, ${ctx.from.first_name}! Studio OS CRM готов к работе.\n\nУправляй клиентами, проектами и документами прямо в Telegram.`,
        openBtn,
      ),
    );

    this.bot.command('app', (ctx) => ctx.reply('Studio OS CRM:', openBtn));
    this.bot.command('crm', (ctx) => ctx.reply('Studio OS CRM:', openBtn));
    this.bot.command('leads', (ctx) => ctx.reply('Заявки:', openBtn));
    this.bot.command('projects', (ctx) => ctx.reply('Проекты:', openBtn));
    this.bot.command('ai', (ctx) => ctx.reply('AI Ассистент:', openBtn));
    this.bot.command('documents', (ctx) => ctx.reply('Документы:', openBtn));

    void this.bot.launch();
    this.logger.log('Telegram bot launched. WebApp URL: ' + url);
  }

  async sendText(message: string) {
    this.logger.log('Notification: ' + message);
    return { delivered: Boolean(this.bot), preview: message };
  }
}

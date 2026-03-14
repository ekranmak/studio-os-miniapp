"use client";

import { useEffect, useState, type ReactNode } from 'react';
import { AppShell } from '@/components/app-shell';
import { Badge } from '@/components/ui/badge';
import { bootstrapTelegramWebApp, type TelegramUser } from '@/lib/telegram';

export default function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    setTelegramUser(bootstrapTelegramWebApp());
  }, []);

  return (
    <AppShell>
      <div className="mb-5 flex items-center justify-between gap-3 rounded-[24px] bg-white/70 px-4 py-3">
        <Badge className="bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]">Telegram Auth</Badge>
        <div className="text-sm text-[hsl(var(--muted))]">
          {telegramUser ? `${telegramUser.first_name}${telegramUser.last_name ? ` ${telegramUser.last_name}` : ''}` : 'Открыто вне Telegram, работает в preview режиме'}
        </div>
      </div>
      {children}
    </AppShell>
  );
}

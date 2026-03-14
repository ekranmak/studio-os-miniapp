"use client";

import Link from 'next/link';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';
import { Bot, BriefcaseBusiness, FileStack, LayoutDashboard, Settings, SquareKanban, Users } from 'lucide-react';
import React, { type PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

const navItems: { href: Route; label: string; icon: React.ElementType }[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leads', label: 'Leads', icon: Bot },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/projects', label: 'Projects', icon: BriefcaseBusiness },
  { href: '/tasks', label: 'Tasks', icon: SquareKanban },
  { href: '/documents', label: 'Documents', icon: FileStack },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="page-shell">
      <header className="surface mb-6 rounded-[32px] p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted))]">
              Studio OS Mini App
            </p>
            <h1 className="m-0 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">Telegram CRM для веб-студии</h1>
            <p className="mb-0 mt-3 max-w-2xl text-sm leading-6 text-[hsl(var(--muted))]">
              Продажи, проекты, документы и AI-оркестратор в одном Mini App с архитектурой под multi-tenant SaaS.
            </p>
          </div>
          <div className="rounded-[24px] bg-[hsl(var(--primary-soft))] px-4 py-3 text-right">
            <div className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted))]">Plan</div>
            <div className="mt-1 text-lg font-semibold text-[hsl(var(--primary))]">Agency Pro</div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <nav className="surface fixed bottom-4 left-1/2 z-20 flex w-[calc(100%-24px)] max-w-5xl -translate-x-1/2 items-center justify-between gap-1 rounded-[28px] px-2 py-2 md:px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[20px] px-2 py-2 text-[11px] font-medium transition',
                isActive
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'text-[hsl(var(--muted))] hover:bg-white/80 hover:text-[hsl(var(--foreground))]',
              )}
            >
              <Icon size={18} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

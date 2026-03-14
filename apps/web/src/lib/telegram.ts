export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        initData?: string;
        initDataUnsafe?: {
          user?: TelegramUser;
        };
      };
    };
  }
}

export function bootstrapTelegramWebApp(): TelegramUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const webApp = window.Telegram?.WebApp;
  if (!webApp) {
    return null;
  }

  webApp.ready();
  webApp.expand();
  return webApp.initDataUnsafe?.user ?? null;
}

import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/section-header';

const settingsGroups = [
  'Profile и роли команды',
  'Интеграции Telegram Bot / WebApp',
  'OpenRouter API keys',
  'S3 / MinIO storage',
  'Подписка и биллинг SaaS',
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Settings" description="Профиль, команда, интеграции, ключи API и tenant-настройки организации." />
      <Card>
        <div className="space-y-3">
          {settingsGroups.map((group) => (
            <div key={group} className="rounded-2xl bg-[hsl(var(--card-muted))] px-4 py-4 text-sm font-medium">
              {group}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

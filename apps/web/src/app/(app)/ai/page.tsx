import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/section-header';
import { aiAgents } from '@/lib/mock-data';

export default function AIPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="AI Assistant" description="Оркестратор AI-менеджера с автономными агентами для продаж, ТЗ, договоров, планирования и смет." />
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div className="space-y-4">
            <div className="rounded-[24px] bg-[hsl(var(--card-muted))] p-4">
              <div className="text-sm font-semibold">AI workflow</div>
              <p className="mb-0 mt-2 text-sm leading-6 text-[hsl(var(--muted))]">
                Lead intake → анализ проекта → генерация ТЗ → расчет сметы → договор → план задач → уведомление в Telegram.
              </p>
            </div>
            <div className="rounded-[24px] border border-dashed border-[hsl(var(--border))] p-4 text-sm text-[hsl(var(--muted))]">
              Чат-интерфейс подключается к /api/ai/* endpoint'ам и хранит ai_requests, ai_logs, ai_context внутри tenant scope.
            </div>
          </div>
        </Card>
        <Card>
          <div className="text-sm font-semibold">Active agents</div>
          <div className="mt-4 space-y-3">
            {aiAgents.map((agent) => (
              <div key={agent} className="rounded-2xl bg-[hsl(var(--primary-soft))] px-4 py-3 text-sm font-medium text-[hsl(var(--primary))]">
                {agent}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

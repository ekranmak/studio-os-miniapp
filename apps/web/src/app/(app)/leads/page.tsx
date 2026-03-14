import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/section-header';
import { leads } from '@/lib/mock-data';

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Leads" description="Заявки с сайта, рекламы и рефералов. Конвертация в клиента, запуск AI-анализа и генерация ТЗ." />
      <div className="space-y-4">
        {leads.map((lead) => (
          <Card key={lead.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted))]">{lead.id}</div>
                <div className="mt-2 text-xl font-semibold">{lead.name}</div>
                <div className="mt-1 text-sm text-[hsl(var(--muted))]">{lead.company} • {lead.channel}</div>
                <p className="mb-0 mt-3 max-w-2xl text-sm leading-6 text-[hsl(var(--muted))]">{lead.summary}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">{lead.budget}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted))]">{lead.status}</div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button>Convert to Client</Button>
              <Button variant="secondary">Generate TZ</Button>
              <Button variant="ghost">Reply</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

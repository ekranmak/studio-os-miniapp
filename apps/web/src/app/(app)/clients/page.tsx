import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/section-header';
import { leads, projects } from '@/lib/mock-data';

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Clients" description="Профили клиентов с проектами, документами и историей взаимодействия." />
      <div className="grid gap-4 lg:grid-cols-2">
        {leads.map((lead, index) => (
          <Card key={lead.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="m-0 text-xl font-semibold">{lead.company}</h3>
                <p className="mb-0 mt-2 text-sm text-[hsl(var(--muted))]">Контакт: {lead.name}</p>
                <p className="mb-0 mt-1 text-sm text-[hsl(var(--muted))]">Проект: {projects[index]?.name ?? 'Новый проект'}</p>
              </div>
              <div className="rounded-2xl bg-[hsl(var(--primary-soft))] px-3 py-2 text-sm font-semibold text-[hsl(var(--primary))]">
                Active
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-[hsl(var(--card-muted))] p-4 text-sm text-[hsl(var(--muted))]">
              Invoices, documents, messages и история договоров подключаются через API клиента и document center.
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

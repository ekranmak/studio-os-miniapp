import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/section-header';
import { documents } from '@/lib/mock-data';

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Documents" description="Договоры, акты, счета и технические задания. Генерация DOCX/PDF через backend document service." />
      <div className="space-y-4">
        {documents.map((document) => (
          <Card key={document.id}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted))]">{document.id} • {document.type}</div>
                <div className="mt-2 text-lg font-semibold">{document.name}</div>
                <div className="mt-1 text-sm text-[hsl(var(--muted))]">{document.format}</div>
              </div>
              <div className="rounded-2xl bg-[hsl(var(--primary-soft))] px-3 py-2 text-sm font-semibold text-[hsl(var(--primary))]">
                {document.status}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button>Generate Document</Button>
              <Button variant="secondary">Preview PDF</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

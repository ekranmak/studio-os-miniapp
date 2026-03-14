import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/section-header';
import { projects } from '@/lib/mock-data';

const columns = ['Lead', 'Negotiation', 'Contract', 'Development', 'Testing', 'Completed'];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Projects" description="Kanban-пайплайн от сделки до сдачи проекта. В карточках ключевые цифры и delivery статус." />
      <div className="grid gap-4 xl:grid-cols-6">
        {columns.map((column, index) => (
          <Card key={column} className="min-h-[240px]">
            <div className="text-sm font-semibold">{column}</div>
            <div className="mt-4 space-y-3">
              {projects
                .filter((_, projectIndex) => projectIndex === index % projects.length)
                .map((project) => (
                  <div key={project.id} className="rounded-2xl bg-[hsl(var(--card-muted))] p-4">
                    <div className="text-sm font-semibold">{project.name}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted))]">{project.client}</div>
                    <div className="mt-3 text-sm text-[hsl(var(--muted))]">{project.price}</div>
                  </div>
                ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

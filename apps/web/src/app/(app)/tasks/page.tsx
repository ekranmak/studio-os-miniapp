import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/section-header';
import { tasks } from '@/lib/mock-data';

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Tasks" description="Операционный контур задач: исполнитель, дедлайн, статус и связи с проектами и AI-планировщиком." />
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted))]">{task.id}</div>
              <div className="mt-2 text-lg font-semibold">{task.title}</div>
              <div className="mt-1 text-sm text-[hsl(var(--muted))]">{task.owner}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">{task.deadline}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted))]">{task.status}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { BriefcaseBusiness, CalendarCheck2, CircleDollarSign, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MetricCard } from '@/components/metric-card';
import { SectionHeader } from '@/components/section-header';
import { dashboardMetrics, projects, tasks } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section>
        <SectionHeader
          title="Control center"
          description="Ключевые показатели, быстрые действия и обзор delivery-контура для команды студии."
        />
        <div className="grid-cards">
          <MetricCard label={dashboardMetrics[0].label} value={dashboardMetrics[0].value} hint={dashboardMetrics[0].hint} icon={<BriefcaseBusiness size={22} />} />
          <MetricCard label={dashboardMetrics[1].label} value={dashboardMetrics[1].value} hint={dashboardMetrics[1].hint} icon={<CircleDollarSign size={22} />} />
          <MetricCard label={dashboardMetrics[2].label} value={dashboardMetrics[2].value} hint={dashboardMetrics[2].hint} icon={<Sparkles size={22} />} />
          <MetricCard label={dashboardMetrics[3].label} value={dashboardMetrics[3].value} hint={dashboardMetrics[3].hint} icon={<CalendarCheck2 size={22} />} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="m-0 text-xl font-semibold">Quick actions</h3>
              <p className="mb-0 mt-2 text-sm text-[hsl(var(--muted))]">Основные входы в ежедневный workflow.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Button>Создать проект</Button>
            <Button variant="secondary">Сгенерировать договор</Button>
            <Button variant="ghost">Спросить AI</Button>
            <Button variant="ghost">Создать счет</Button>
          </div>
        </Card>

        <Card>
          <h3 className="m-0 text-xl font-semibold">Today focus</h3>
          <div className="mt-4 space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-2xl bg-[hsl(var(--card-muted))] p-4">
                <div className="text-sm font-semibold">{task.title}</div>
                <div className="mt-1 text-sm text-[hsl(var(--muted))]">{task.owner}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted))]">{task.deadline}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <Card>
          <div className="flex items-center justify-between gap-3">
            <SectionHeader
              title="Pipeline overview"
              description="Проекты в работе с текущей стадией, ценой и прогрессом исполнения."
            />
          </div>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="rounded-[24px] border border-[hsl(var(--border))] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted))]">{project.id}</div>
                    <div className="mt-2 text-lg font-semibold">{project.name}</div>
                    <div className="mt-1 text-sm text-[hsl(var(--muted))]">{project.client}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{project.price}</div>
                    <div className="mt-1 text-sm text-[hsl(var(--muted))]">{project.stage}</div>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-[hsl(var(--card-muted))]">
                  <div className="h-2 rounded-full bg-[hsl(var(--primary))]" style={{ width: `${project.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

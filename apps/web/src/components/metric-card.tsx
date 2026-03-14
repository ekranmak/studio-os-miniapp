import { Card } from '@/components/ui/card';
import type { ReactNode } from 'react';

type MetricCardProps = {
  label: string;
  value: string;
  hint: string;
  icon: ReactNode;
};

export function MetricCard({ label, value, hint, icon }: MetricCardProps) {
  return (
    <Card className="flex items-start justify-between gap-4">
      <div>
        <div className="text-sm text-[hsl(var(--muted))]">{label}</div>
        <div className="mt-3 text-3xl font-semibold tracking-[-0.03em]">{value}</div>
        <div className="mt-2 text-sm text-[hsl(var(--muted))]">{hint}</div>
      </div>
      <div className="rounded-2xl bg-[hsl(var(--primary-soft))] p-3 text-[hsl(var(--primary))]">{icon}</div>
    </Card>
  );
}

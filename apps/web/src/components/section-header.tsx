type SectionHeaderProps = {
  title: string;
  description: string;
};

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-4">
      <h2 className="m-0 text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
      <p className="mb-0 mt-2 text-sm leading-6 text-[hsl(var(--muted))]">{description}</p>
    </div>
  );
}

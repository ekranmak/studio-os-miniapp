import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-[hsl(var(--primary))] text-white shadow-lg shadow-blue-200/60 hover:-translate-y-0.5',
  secondary: 'bg-[hsl(var(--primary-soft))] text-[hsl(var(--primary))] hover:bg-white',
  ghost: 'bg-white/60 text-[hsl(var(--foreground))] hover:bg-white',
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl border border-transparent px-4 py-2.5 text-sm font-semibold transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

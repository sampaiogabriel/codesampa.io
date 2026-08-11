import { cn } from '@/utils/functions/tw-merge';

interface StatusDotProps {
  className?: string;
  dotClassName?: string;
  pingClassName?: string;
  size?: 'sm' | 'md';
}

export function StatusDot({
  className,
  dotClassName = 'bg-primary',
  pingClassName,
  size = 'sm'
}: StatusDotProps) {
  const sizeClass = size === 'md' ? 'h-2.5 w-2.5' : 'h-2 w-2';

  return (
    <span className={cn('relative flex', sizeClass, className)}>
      <span
        className={cn(
          'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
          pingClassName ?? dotClassName
        )}
      />
      <span
        className={cn('relative inline-flex rounded-full', sizeClass, dotClassName)}
      />
    </span>
  );
}

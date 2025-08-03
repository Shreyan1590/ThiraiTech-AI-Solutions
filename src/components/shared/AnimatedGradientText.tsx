import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type AnimatedGradientTextProps = {
  children: ReactNode;
  className?: string;
};

export default function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <div
      className={cn(
        'animated-gradient-text',
        className
      )}
    >
      {children}
    </div>
  );
}

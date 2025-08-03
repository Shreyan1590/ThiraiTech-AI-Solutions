'use client';

import { motion, useInView } from 'framer-motion';
import { Children, useRef } from 'react';
import { cn } from '@/lib/utils';

type StaggeredFadeInProps = {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  childDelay?: number;
};

export default function StaggeredFadeIn({
  children,
  className,
  staggerDelay = 0.05,
  childDelay = 0.1,
}: StaggeredFadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        delay: childDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {Children.map(children, (child, i) => (
        <motion.div key={i} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

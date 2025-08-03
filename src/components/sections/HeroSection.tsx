'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit } from 'lucide-react';
import AnimatedGradientText from '../shared/AnimatedGradientText';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function HeroSection() {
  return (
    <section className="relative h-[calc(100dvh-4rem)] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background/50 dark:bg-background/70 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
      <div className="container mx-auto px-4 md:px-6 text-center z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div variants={fadeInUp}>
            <AnimatedGradientText className="mb-6 bg-gradient-to-r from-primary via-emerald-400 to-accent">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter font-headline">
                Intelligent Digital Solutions for Modern Businesses
              </h1>
            </AnimatedGradientText>
          </motion.div>
          <motion.p
            className="mt-4 text-md sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Thiraitech AI Solutions masterfully combines cutting-edge AI with
            bespoke web and mobile development to create extraordinary,
            high-performance applications.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
            variants={fadeInUp}
          >
            <Button asChild size="lg" className="text-md sm:text-lg px-8 py-6">
              <Link href="#contact">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-md sm:text-lg px-8 py-6"
            >
              <Link href="#services">
                <BrainCircuit className="mr-2 h-5 w-5" />
                Explore AI Services
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

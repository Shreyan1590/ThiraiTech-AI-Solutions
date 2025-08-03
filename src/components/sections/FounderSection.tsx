import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedGradientText from '../shared/AnimatedGradientText';
import { Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function FounderSection() {
  return (
    <section id="founder" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <AnimatedGradientText className="mb-4 bg-gradient-to-r from-primary to-accent">
                <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
                    Meet the Founder
                </h2>
            </AnimatedGradientText>
        </div>

        <div className="flex justify-center">
          <Card className="max-w-sm w-full glass-card shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <Image
                src="/images/founder-shreyan.png"
                alt="Shreyan S"
                width={160}
                height={160}
                className="rounded-full mx-auto mb-4 border-4 border-primary/50"
                data-ai-hint="male portrait"
              />
              <h3 className="text-2xl font-bold font-headline text-primary">Shreyan S</h3>
              <p className="text-md text-foreground/80 mb-4">Founder & CEO</p>
              <p className="text-foreground/90 mb-6">
                Leading ThiraiTech with a passion for innovation and a commitment to excellence, shaping the future of digital solutions.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
                </Link>
                <Link href="#" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

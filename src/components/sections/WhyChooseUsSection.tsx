import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, ShieldCheck, Gem, BarChart } from 'lucide-react';
import AnimatedGradientText from '../shared/AnimatedGradientText';
import StaggeredFadeIn from '../shared/StaggeredFadeIn';

const benefits = [
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: 'Rapid Development',
    description: 'We deliver high-quality products on time, without compromising on quality, getting your vision to market faster.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Robust & Secure',
    description: 'Our applications are built with security and reliability at their core, ensuring your data and users are always protected.',
  },
  {
    icon: <Gem className="h-10 w-10 text-primary" />,
    title: 'Pixel-Perfect Design',
    description: 'We craft beautiful, intuitive user interfaces that provide an exceptional user experience and reflect your brand identity.',
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: 'Scalable Architecture',
    description: 'We build solutions that grow with your business, using modern architecture that handles increasing demand with ease.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="why-us" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
            <AnimatedGradientText className="mb-4 bg-gradient-to-r from-primary to-accent">
                <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
                    The ThiraiTech Advantage
                </h2>
            </AnimatedGradientText>
            <p className="mt-2 text-lg text-foreground/80">
                Discover the key differentiators that make us the ideal partner for your next digital venture.
            </p>
        </div>

        <StaggeredFadeIn className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={benefit.title} className="h-full text-center glass-card hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 shadow-lg">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {benefit.icon}
                </div>
                <CardTitle className="font-headline text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </StaggeredFadeIn>
      </div>
    </section>
  );
}

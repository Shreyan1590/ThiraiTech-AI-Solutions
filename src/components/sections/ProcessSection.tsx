import { FileText, Lightbulb, Bot, Rocket } from 'lucide-react';
import AnimatedGradientText from '../shared/AnimatedGradientText';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import StaggeredFadeIn from '../shared/StaggeredFadeIn';

const processSteps = [
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: '1. Discovery & Strategy',
    description: 'We start by understanding your vision, goals, and challenges to define a comprehensive project roadmap and strategy.',
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: '2. Design & Prototyping',
    description: 'Our team creates intuitive UI/UX designs and interactive prototypes to visualize the end product and refine user flows.',
  },
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: '3. Agile Development & AI Integration',
    description: 'We build your application using agile methodologies, integrating powerful AI features for enhanced functionality and intelligence.',
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: '4. Deployment & Growth',
    description: 'After rigorous testing, we launch your application and provide ongoing support to ensure seamless performance and scalability.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
            <AnimatedGradientText className="mb-4 bg-gradient-to-r from-primary to-accent">
                <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
                    Our Proven Process
                </h2>
            </AnimatedGradientText>
            <p className="mt-2 text-lg text-foreground/80">
                From idea to launch, we follow a structured yet flexible process to ensure your project's success.
            </p>
        </div>

        <StaggeredFadeIn className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
              <Card key={step.title} className="h-full text-center bg-secondary/50 border-transparent hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 shadow-lg">
                <CardHeader className="items-center p-6">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {step.icon}
                  </div>
                  <CardTitle className="font-headline text-xl">{step.title}</CardTitle>
                   <CardDescription className="text-foreground/70 pt-2">
                    {step.description}
                  </CardDescription>
                </CardHeader>
              </Card>
          ))}
        </StaggeredFadeIn>
      </div>
    </section>
  );
}

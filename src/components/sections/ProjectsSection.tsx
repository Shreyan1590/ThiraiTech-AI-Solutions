import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimatedGradientText from '../shared/AnimatedGradientText';

const projects = [
  {
    title: 'QuizzyNet Pro',
    description: 'An interactive quiz platform for engaging learning experiences.',
    imageUrl: '/images/project-quizzy.png',
    projectUrl: 'https://quizzynet-pro.netlify.app/',
    aiHint: 'quiz application'
  },
  {
    title: 'TransitSimos',
    description: 'A simulation tool for urban transit and traffic management.',
    imageUrl: '/images/project-transit.png',
    projectUrl: 'https://transitsimos.netlify.app/',
    aiHint: 'transit map'
  },
  {
    title: 'NXT-Gen Computing',
    description: 'A showcase for next-generation computing solutions and research.',
    imageUrl: '/images/project-nxt-gen.png',
    projectUrl: 'https://nxt-gen-computing-simats.vercel.app/',
    aiHint: 'futuristic technology'
  },
  {
    title: 'Unlock-Tech',
    description: 'A platform for exploring and understanding emerging technologies.',
    imageUrl: '/images/project-unlock-tech.png',
    projectUrl: 'https://unlock-tech.vercel.app/',
    aiHint: 'tech abstract'
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <AnimatedGradientText className="mb-4 bg-gradient-to-r from-primary to-accent">
                <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
                    Our Work
                </h2>
            </AnimatedGradientText>
          <p className="mt-2 text-lg text-foreground/80">
            Check out some of our recent projects that showcase our expertise and commitment to quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index}>
              <Card className="h-full overflow-hidden glass-card shadow-lg hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-60 w-full overflow-hidden">
                    <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    data-ai-hint={project.aiHint}
                    />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold font-headline text-primary mb-2">{project.title}</h3>
                  <p className="text-foreground/80 mb-4 h-12">{project.description}</p>
                  <Button asChild variant="outline">
                    <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                      View Project <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

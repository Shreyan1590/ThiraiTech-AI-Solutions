import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import TestimonialOptimizer from '../TestimonialOptimizer';
import AnimatedGradientText from '../shared/AnimatedGradientText';

const testimonials = [
  {
    name: 'Sarah L.',
    company: 'CEO of Innovate Inc.',
    quote: "Thiraitech AI Solutions transformed our online presence. Their team is professional, creative, and delivered a product that exceeded our expectations. Our user engagement has skyrocketed!",
    rating: 5,
  },
  {
    name: 'Michael B.',
    company: 'Founder of TechSavvy',
    quote: "Working with ThiraiTech was a breeze. They understood our complex requirements for a new dashboard and delivered a solution that is both powerful and user-friendly. Highly recommended!",
    rating: 5,
  },
  {
    name: 'Jessica P.',
    company: 'Marketing Director, StyleHub',
    quote: "The e-commerce platform ThiraiTech built for us is a game-changer. It's fast, secure, and our sales have increased by 40% since launch. Their attention to detail is impeccable.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <AnimatedGradientText className="mb-4 bg-gradient-to-r from-primary to-accent">
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
              Trusted by Innovators
            </h2>
          </AnimatedGradientText>
          <p className="mt-2 text-lg text-foreground/80">
            See what our clients are saying about their experience working with Thiraitech AI Solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <Card className="h-full flex flex-col justify-between glass-card shadow-lg hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-foreground/90 italic">"{testimonial.quote}"</blockquote>
                </CardContent>
                <div className="p-6 pt-0">
                  <p className="font-bold font-headline text-primary">{testimonial.name}</p>
                  <p className="text-sm text-foreground/70">{testimonial.company}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-16 md:mt-24">
            <TestimonialOptimizer />
        </div>

      </div>
    </section>
  );
}

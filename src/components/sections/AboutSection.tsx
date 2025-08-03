import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Card className="overflow-hidden shadow-lg rounded-xl">
                <Image
                  src="/images/team-collaboration.png"
                  alt="ThiraiTech Team Collaboration"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                  data-ai-hint="team collaboration"
                />
            </Card>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-primary">
              Our Mission: Your Digital Evolution
            </h2>
            <p className="text-lg text-foreground/80 mb-6">
              At Thiraitech AI Solutions, our mission is to empower businesses with transformative digital solutions. We are dedicated to crafting custom applications and websites that are not only visually stunning but also robust, scalable, and meticulously tailored to meet the unique challenges of our clients.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <p className="text-foreground/90"><strong className="font-semibold">Client-Centric Approach:</strong> We thrive on partnership and collaboration, ensuring your vision is the blueprint for our development process.</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <p className="text-foreground/90"><strong className="font-semibold">Innovation and Quality:</strong> We harness the latest technologies to deliver high-quality, future-proof solutions that catalyze growth and efficiency.</p>
              </li>
               <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <p className="text-foreground/90"><strong className="font-semibold">End-to-End Expertise:</strong> From ideation and design to deployment and ongoing support, we provide comprehensive services to bring your project to fruition.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

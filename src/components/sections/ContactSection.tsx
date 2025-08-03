'use client';
import { Mail, Phone, MapPin, LogIn } from 'lucide-react';
import AnimatedGradientText from '../shared/AnimatedGradientText';
import ContactForm from '../ContactForm';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const contactDetails = [
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    label: 'Email Us',
    value: 'thiraitechaisolutions@gmail.com',
    href: 'mailto:devnestaitechnologies@gmail.com'
  },
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    label: 'Call Us',
    value: '+91 98948 37250',
    href: 'tel:+919894837250'
  },
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    label: 'Our Location',
    value: 'SIMATS Engineering, Saveetha Nagar, Thandalam, Chennai, Tamilnadu, India.',
  },
];

export default function ContactSection() {
    const { user, loading } = useAuth();
  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <AnimatedGradientText className="mb-4 bg-gradient-to-r from-primary to-accent">
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
              Let's Build Together
            </h2>
          </AnimatedGradientText>
          <p className="mt-2 text-lg text-foreground/80">
            Have a project in mind or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 md:space-y-8">
            {contactDetails.map((detail, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-background/50 transition-colors">
                    <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                        {detail.icon}
                    </div>
                    <div>
                        <h3 className="font-headline text-lg text-primary">{detail.label}</h3>
                        {detail.href ? (
                            <a href={detail.href} className="text-foreground/80 hover:underline break-all">{detail.value}</a>
                        ) : (
                            <p className="text-foreground/80">{detail.value}</p>
                        )}
                    </div>
                </div>
            ))}
          </div>

            <div className="w-full">
                {loading ? (
                     <Card className="glass-card shadow-xl border-primary/20 h-[480px] animate-pulse" />
                ) : user ? (
                    <ContactForm user={user} />
                ) : (
                    <Card className="glass-card shadow-xl border-primary/20 text-center flex flex-col items-center justify-center p-8 h-[480px]">
                        <CardContent className="flex flex-col items-center justify-center">
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <LogIn className="h-10 w-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold font-headline mb-2">Join the Conversation</h3>
                            <p className="text-muted-foreground mb-6">Please log in or create an account to send a message.</p>
                            <Link href="/login">
                                <Button size="lg">Login / Sign Up</Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
          </div>
        </div>
      </div>
    </section>
  );
}

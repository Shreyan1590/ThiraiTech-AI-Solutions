'use client';

import { useForm, ValidationError } from '@formspree/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { User } from 'firebase/auth';

function SubmitButton({ pending }: { pending: boolean }) {
    return (
        <Button type="submit" className="w-full text-md py-5" disabled={pending}>
            {pending ? 'Sending...' : 'Send Message'}
            {!pending && <ArrowRight className="ml-2 h-5 w-5" />}
        </Button>
    );
}

export default function ContactForm({ user }: { user: User | null }) {
  const [state, handleSubmit] = useForm("xkgzvjev");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.succeeded) {
      formRef.current?.reset();
    }
  }, [state.succeeded]);

  if (state.succeeded) {
      return (
        <Card className="glass-card shadow-xl border-primary/20 text-center p-8 h-[480px] flex flex-col justify-center">
            <CardHeader>
                <CardTitle className="font-headline text-xl md:text-2xl">Thank you!</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Your message has been sent successfully. We'll get back to you soon.</p>
            </CardContent>
        </Card>
      )
  }

  return (
    <Card className="glass-card shadow-xl border-primary/20 h-[480px]">
      <CardHeader>
        <CardTitle className="font-headline text-xl md:text-2xl">Send us a Message</CardTitle>
        <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" value={user?.displayName || ''} readOnly className="mt-1 bg-muted/50" />
             <ValidationError 
                prefix="Name" 
                field="name"
                errors={state.errors}
                className="text-sm text-destructive mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={user?.email || ''} readOnly className="mt-1 bg-muted/50" />
            <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
                className="text-sm text-destructive mt-1"
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="Your message..." className="mt-1 min-h-[120px]" required />
            <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
                className="text-sm text-destructive mt-1"
            />
          </div>
          <SubmitButton pending={state.submitting} />
        </form>
      </CardContent>
    </Card>
  );
}

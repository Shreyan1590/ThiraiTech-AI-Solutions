'use client';

import { useState, useTransition, useActionState } from 'react';
import { Sparkles, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { optimizeTestimonialAction } from '@/app/actions';
import { Skeleton } from './ui/skeleton';

const initialState = {
  data: '',
  error: '',
};

export default function TestimonialOptimizer() {
  const [testimonial, setTestimonial] = useState('');
  const [formState, formAction, isPending] = useActionState(optimizeTestimonialAction, initialState);

  const handleSubmit = () => {
    formAction(testimonial);
  };

  return (
    <Card className="max-w-3xl mx-auto glass-card shadow-xl border-primary/20">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
            <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-primary" />
        </div>
        <CardTitle className="font-headline text-xl md:text-2xl">AI Testimonial Optimizer</CardTitle>
        <CardDescription>
          Have a testimonial? Paste it below and let our AI craft the most effective version for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter a customer testimonial here..."
            className="min-h-[120px] text-sm"
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
            disabled={isPending}
          />
          <Button onClick={handleSubmit} disabled={isPending || !testimonial} className="w-full text-md py-5">
            {isPending ? 'Optimizing...' : 'Optimize Now'}
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
          {formState.error && (
            <p className="text-sm text-destructive text-center">{formState.error}</p>
          )}
        </div>

        {(isPending || formState.data) && (
            <div className="mt-8 pt-6 border-t">
                <h4 className="font-headline text-md md:text-lg text-center mb-4 flex items-center justify-center gap-2"><ThumbsUp className="h-5 w-5 text-emerald-500" /> Optimized Result</h4>
                <div className="p-4 rounded-md bg-background/50 border min-h-[100px]">
                    {isPending ? (
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>
                    ) : (
                        <p className="italic text-foreground/90">{formState.data}</p>
                    )}
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}

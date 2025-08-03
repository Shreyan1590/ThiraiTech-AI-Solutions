'use server';

import { optimizeTestimonialFlow } from '@/ai/flows/testimonialOptimizer';

export async function optimizeTestimonialAction(
  currentState: { data?: string; error?: string },
  testimonial: string
) {
  if (!testimonial || testimonial.trim().length < 20) {
    return { error: 'Testimonial must be at least 20 characters long.' };
  }

  try {
    const optimized = await optimizeTestimonialFlow(testimonial);
    return { data: optimized };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

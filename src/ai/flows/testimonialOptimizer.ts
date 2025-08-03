'use server';
/**
 * @fileOverview A testimonial optimization AI agent.
 *
 * - optimizeTestimonial - A function that handles the testimonial optimization process.
 * - OptimizeTestimonialInput - The input type for the optimizeTestimonial function.
 * - OptimizeTestimonialOutput - The return type for the optimizeTestimonial function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const OptimizeTestimonialInputSchema = z.string();
export type OptimizeTestimonialInput = z.infer<
  typeof OptimizeTestimonialInputSchema
>;

const OptimizeTestimonialOutputSchema = z.string();
export type OptimizeTestimonialOutput = z.infer<
  typeof OptimizeTestimonialOutputSchema
>;

export async function optimizeTestimonial(
  input: OptimizeTestimonialInput
): Promise<OptimizeTestimonialOutput> {
  return optimizeTestimonialFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeTestimonialPrompt',
  input: { schema: OptimizeTestimonialInputSchema },
  output: { schema: OptimizeTestimonialOutputSchema },
  prompt: `You are a marketing expert. Review the following customer testimonial and rewrite it to be more impactful and concise for a company website. Focus on highlighting the key benefits and positive outcomes. Keep the tone authentic and trustworthy. Return only the optimized testimonial text. Here is the testimonial: "{{prompt}}"`,
  config: {
    temperature: 0.5,
  },
});

export const optimizeTestimonialFlow = ai.defineFlow(
  {
    name: 'optimizeTestimonialFlow',
    inputSchema: OptimizeTestimonialInputSchema,
    outputSchema: OptimizeTestimonialOutputSchema,
    description:
      'Takes a customer testimonial and rewrites it to be more impactful and concise for a company website.',
  },
  async (prompt) => {
    if (!prompt) {
      return 'Please provide a testimonial.';
    }

    const { output } = await prompt(prompt);
    return output!;
  }
);

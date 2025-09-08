'use server';

/**
 * @fileOverview A content generation AI agent.
 *
 * - generateNewContent - A function that handles the content generation process.
 * - GenerateNewContentInput - The input type for the generateNewContent function.
 * - GenerateNewContentOutput - The return type for the generateNewContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNewContentInputSchema = z.object({
  courseMaterial: z
    .string()
    .describe('The course material to generate new content from.'),
  contentType: z
    .string()
    .describe(
      'The type of content to generate (e.g., summary, quiz questions, examples)'
    ),
});
export type GenerateNewContentInput = z.infer<
  typeof GenerateNewContentInputSchema
>;

const GenerateNewContentOutputSchema = z.object({
  newContent: z.string().describe('The newly generated content.'),
});
export type GenerateNewContentOutput = z.infer<
  typeof GenerateNewContentOutputSchema
>;

export async function generateNewContent(
  input: GenerateNewContentInput
): Promise<GenerateNewContentOutput> {
  return generateNewContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNewContentPrompt',
  input: {schema: GenerateNewContentInputSchema},
  output: {schema: GenerateNewContentOutputSchema},
  prompt: `You are an AI assistant helping students generate new content based on course material.

  Generate the following type of content: {{{contentType}}}
  Based on the following course material:
  {{{courseMaterial}}}
  `,
});

const generateNewContentFlow = ai.defineFlow(
  {
    name: 'generateNewContentFlow',
    inputSchema: GenerateNewContentInputSchema,
    outputSchema: GenerateNewContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

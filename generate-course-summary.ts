'use server';

/**
 * @fileOverview A course material summarization AI agent.
 *
 * - generateCourseSummary - A function that handles the summarization process.
 * - GenerateCourseSummaryInput - The input type for the generateCourseSummary function.
 * - GenerateCourseSummaryOutput - The return type for the generateCourseSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseSummaryInputSchema = z.object({
  courseMaterial: z
    .string()
    .describe('The course material to be summarized.'),
});
export type GenerateCourseSummaryInput = z.infer<typeof GenerateCourseSummaryInputSchema>;

const GenerateCourseSummaryOutputSchema = z.object({
  summary: z.string().describe('The summary of the course material.'),
});
export type GenerateCourseSummaryOutput = z.infer<typeof GenerateCourseSummaryOutputSchema>;

export async function generateCourseSummary(input: GenerateCourseSummaryInput): Promise<GenerateCourseSummaryOutput> {
  return generateCourseSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCourseSummaryPrompt',
  input: {schema: GenerateCourseSummaryInputSchema},
  output: {schema: GenerateCourseSummaryOutputSchema},
  prompt: `You are an expert educator specializing in summarizing course materials for students. Your goal is to provide concise and efficient summaries that help students quickly understand key concepts.

  Summarize the following course material:

  {{{courseMaterial}}}`,
});

const generateCourseSummaryFlow = ai.defineFlow(
  {
    name: 'generateCourseSummaryFlow',
    inputSchema: GenerateCourseSummaryInputSchema,
    outputSchema: GenerateCourseSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

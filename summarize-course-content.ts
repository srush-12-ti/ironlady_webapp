'use server';

/**
 * @fileOverview AI-powered summarization of course content.
 *
 * - summarizeCourseContent - A function that summarizes course content.
 * - SummarizeCourseContentInput - The input type for the summarizeCourseContent function.
 * - SummarizeCourseContentOutput - The return type for the summarizeCourseContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCourseContentInputSchema = z.object({
  content: z
    .string()
    .describe(
      'The course content to summarize. Ensure it includes sufficient context for accurate summarization.'
    ),
});
export type SummarizeCourseContentInput = z.infer<
  typeof SummarizeCourseContentInputSchema
>;

const SummarizeCourseContentOutputSchema = z.object({
  summary: z.string().describe('The summarized course content.'),
  hasContext: z
    .boolean()
    .describe(
      'Indicates whether the provided content had sufficient context for accurate summarization.'
    ),
});
export type SummarizeCourseContentOutput = z.infer<
  typeof SummarizeCourseContentOutputSchema
>;

export async function summarizeCourseContent(
  input: SummarizeCourseContentInput
): Promise<SummarizeCourseContentOutput> {
  return summarizeCourseContentFlow(input);
}

const summarizeCourseContentPrompt = ai.definePrompt({
  name: 'summarizeCourseContentPrompt',
  input: {schema: SummarizeCourseContentInputSchema},
  output: {schema: SummarizeCourseContentOutputSchema},
  prompt: `You are an AI assistant designed to summarize course content for students.

  First, determine if the provided content has enough context to create a meaningful summary.
  - If it does, set hasContext to true and provide a concise summary that captures the key points.
  - If it does not, set hasContext to false and for the summary, explain that the content lacks sufficient context.

  Content: {{{content}}}
  `,
});

const summarizeCourseContentFlow = ai.defineFlow(
  {
    name: 'summarizeCourseContentFlow',
    inputSchema: SummarizeCourseContentInputSchema,
    outputSchema: SummarizeCourseContentOutputSchema,
  },
  async input => {
    const {output} = await summarizeCourseContentPrompt(input);

    return {
      summary: output?.summary || 'No summary available.',
      hasContext: output?.hasContext ?? false,
    };
  }
);

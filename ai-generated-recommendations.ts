// A flow for generating recommendations based on student feedback.

'use server';

/**
 * @fileOverview Generates course improvement recommendations based on student feedback.
 *
 * - generateCourseRecommendations - A function that generates recommendations for course improvement based on student feedback.
 * - GenerateCourseRecommendationsInput - The input type for the generateCourseRecommendations function.
 * - GenerateCourseRecommendationsOutput - The return type for the generateCourseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseRecommendationsInputSchema = z.object({
  feedbackSubmissions: z.string().describe('The student feedback submissions.'),
});
export type GenerateCourseRecommendationsInput = z.infer<typeof GenerateCourseRecommendationsInputSchema>;

const GenerateCourseRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('The recommendations for areas of the course in need of improvement.'),
});
export type GenerateCourseRecommendationsOutput = z.infer<typeof GenerateCourseRecommendationsOutputSchema>;

export async function generateCourseRecommendations(
  input: GenerateCourseRecommendationsInput
): Promise<GenerateCourseRecommendationsOutput> {
  return generateCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCourseRecommendationsPrompt',
  input: {schema: GenerateCourseRecommendationsInputSchema},
  output: {schema: GenerateCourseRecommendationsOutputSchema},
  prompt: `You are an AI assistant helping teachers improve their courses based on student feedback.

  Analyze the following student feedback submissions and generate a list of clear, actionable recommendations for the teacher to improve the course. Focus on identifying recurring themes and specific areas where students are struggling or expressing dissatisfaction.

  Feedback Submissions: {{{feedbackSubmissions}}}

  Recommendations:`,
});

const generateCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateCourseRecommendationsFlow',
    inputSchema: GenerateCourseRecommendationsInputSchema,
    outputSchema: GenerateCourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

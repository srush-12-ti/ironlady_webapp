'use server';

/**
 * @fileOverview Provides AI-driven content recommendations relevant to a student's learning path.
 *
 * - getPersonalizedRecommendations - A function that returns personalized content recommendations.
 * - GetPersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - GetPersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetPersonalizedRecommendationsInputSchema = z.object({
  learningPath: z
    .string()
    .describe('The student\'s current learning path or course.'),
  interests: z
    .string()
    .describe('The student\'s interests related to the course.'),
  contentFormat: z
    .string()
    .optional()
    .describe('Preferred content format (e.g., video, article, tutorial).'),
});
export type GetPersonalizedRecommendationsInput = z.infer<
  typeof GetPersonalizedRecommendationsInputSchema
>;

const GetPersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of content recommendations.'),
});
export type GetPersonalizedRecommendationsOutput = z.infer<
  typeof GetPersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: GetPersonalizedRecommendationsInput
): Promise<GetPersonalizedRecommendationsOutput> {
  return getPersonalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: GetPersonalizedRecommendationsInputSchema},
  output: {schema: GetPersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI assistant providing personalized content recommendations for students.

  Based on the student's learning path: {{{learningPath}}},
  interests: {{{interests}}},
  and preferred content format (if provided): {{{contentFormat}}},
  recommend a list of resources (articles, videos, tutorials, etc.) that can help them improve their understanding.
  Return the recommendations as a list of strings.
  Each string should be a resource or content recommendation.
  `,
});

const getPersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'getPersonalizedRecommendationsFlow',
    inputSchema: GetPersonalizedRecommendationsInputSchema,
    outputSchema: GetPersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

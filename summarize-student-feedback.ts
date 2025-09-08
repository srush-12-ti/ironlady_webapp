// Summarize Student Feedback
'use server';
/**
 * @fileOverview Summarizes student feedback for a given course.
 *
 * - summarizeStudentFeedback - A function that summarizes student feedback for a given course.
 * - SummarizeStudentFeedbackInput - The input type for the summarizeStudentFeedback function.
 * - SummarizeStudentFeedbackOutput - The return type for the summarizeStudentFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeStudentFeedbackInputSchema = z.object({
  courseId: z.string().describe('The ID of the course to summarize feedback for.'),
  feedbackSubmissions: z.array(z.string()).describe('An array of student feedback submissions as strings.'),
});
export type SummarizeStudentFeedbackInput = z.infer<typeof SummarizeStudentFeedbackInputSchema>;

const SummarizeStudentFeedbackOutputSchema = z.object({
  summary: z.string().describe('A summary of the student feedback for the course.'),
  recommendations: z.string().describe('Recommendations for improving the course based on the feedback.'),
});
export type SummarizeStudentFeedbackOutput = z.infer<typeof SummarizeStudentFeedbackOutputSchema>;

export async function summarizeStudentFeedback(input: SummarizeStudentFeedbackInput): Promise<SummarizeStudentFeedbackOutput> {
  return summarizeStudentFeedbackFlow(input);
}

const summarizeStudentFeedbackPrompt = ai.definePrompt({
  name: 'summarizeStudentFeedbackPrompt',
  input: {
    schema: SummarizeStudentFeedbackInputSchema,
  },
  output: {
    schema: SummarizeStudentFeedbackOutputSchema,
  },
  prompt: `You are an AI assistant helping an education center summarize student feedback for courses.

  Summarize the following feedback submissions for course ID {{{courseId}}}. Identify common issues and areas for improvement. Provide specific recommendations based on the feedback.

  Feedback Submissions:
  {{#each feedbackSubmissions}}- {{{this}}}\n{{/each}}`,
});

const summarizeStudentFeedbackFlow = ai.defineFlow(
  {
    name: 'summarizeStudentFeedbackFlow',
    inputSchema: SummarizeStudentFeedbackInputSchema,
    outputSchema: SummarizeStudentFeedbackOutputSchema,
  },
  async input => {
    const {output} = await summarizeStudentFeedbackPrompt(input);
    return output!;
  }
);

'use server';

import { summarizeStudentFeedback } from '@/ai/flows/summarize-student-feedback';
import { generateCourseSummary } from '@/ai/flows/generate-course-summary';

export async function analyzeFeedbackAction(feedbackSubmissions: string[]) {
  try {
    const result = await summarizeStudentFeedback({
      courseId: 'all-courses', // Aggregating for all courses
      feedbackSubmissions,
    });
    return { summary: result.summary, recommendations: result.recommendations };
  } catch (error) {
    console.error('Error analyzing feedback:', error);
    return { error: 'Failed to analyze feedback. Please try again.' };
  }
}

export async function summarizeMaterialAction(courseMaterial: string) {
  try {
    const result = await generateCourseSummary({ courseMaterial });
    return { summary: result.summary };
  } catch (error) {
    console.error('Error summarizing material:', error);
    return { error: 'Failed to generate summary. Please try again.' };
  }
}

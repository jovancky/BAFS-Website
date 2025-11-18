'use server';

/**
 * @fileOverview Generates a personalized learning path for double-entry accounting based on user performance.
 *
 * - generatePersonalizedLearningPath - A function that generates a personalized learning path.
 * - PersonalizedLearningPathInput - The input type for the generatePersonalizedLearningPath function.
 * - PersonalizedLearningPathOutput - The return type for the generatePersonalizedLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLearningPathInputSchema = z.object({
  performanceData: z
    .string()
    .describe(
      'A string containing data representing the user performance and comprehension levels for double-entry accounting topics.'
    ),
});
export type PersonalizedLearningPathInput = z.infer<typeof PersonalizedLearningPathInputSchema>;

const PersonalizedLearningPathOutputSchema = z.object({
  learningPath: z
    .string()
    .describe(
      'A personalized learning path tailored to the user needs, including specific topics, exercises, and quizzes.'
    ),
});
export type PersonalizedLearningPathOutput = z.infer<typeof PersonalizedLearningPathOutputSchema>;

export async function generatePersonalizedLearningPath(
  input: PersonalizedLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return personalizedLearningPathFlow(input);
}

const personalizedLearningPathPrompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are an AI tutor specializing in double-entry accounting. Based on the user's performance data, create a personalized learning path that addresses their weaknesses and reinforces their strengths.

Performance Data: {{{performanceData}}}

Consider the following topics:
- Basic Accounting Equation (Assets = Liabilities + Equity)
- Debits and Credits
- Journal Entries
- Ledger Accounts
- Trial Balance
- Financial Statements (Income Statement, Balance Sheet, Cash Flow Statement)

The learning path should include specific topics to study, exercises to complete, and quizzes to test their knowledge. Explain each topic and indicate what the user needs to learn. Return the result in a string.`,
});

const personalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await personalizedLearningPathPrompt(input);
    return output!;
  }
);

'use server';
/**
 * @fileOverview Generates a personalized learning roadmap based on skill gaps and learning style.
 *
 * - getLearningRecommendations - A function that handles the recommendation generation process.
 * - GetLearningRecommendationsInput - The input type for the getLearningRecommendations function.
 * - GetLearningRecommendationsOutput - The return type for the getLearningRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GetLearningRecommendationsInputSchema = z.object({
  gaps: z.array(z.string()).describe('A list of skill gaps to address.'),
  style: z
    .string()
    .describe(
      "The user's preferred learning style (e.g., 'visual', 'textual', 'kinesthetic')."
    ),
});
export type GetLearningRecommendationsInput = z.infer<
  typeof GetLearningRecommendationsInputSchema
>;

const LearningResourceSchema = z.object({
  type: z
    .enum(['Course', 'Project', 'Article', 'Video', 'Book'])
    .describe('The type of the learning resource.'),
  title: z.string().describe('The title of the resource.'),
  description: z.string().describe('A brief description of the resource.'),
  url: z.string().url().describe('A URL to access the resource.'),
});

const LearningPhaseSchema = z.object({
  phase: z.number().describe('The phase number (e.g., 1, 2, 3).'),
  title: z.string().describe('The title of the learning phase.'),
  description: z
    .string()
    .describe('A brief description of what this phase covers.'),
  milestone: z
    .string()
    .describe('The milestone achieved after completing this phase.'),
  resources: z
    .array(LearningResourceSchema)
    .describe('A list of recommended resources for this phase.'),
});

export const GetLearningRecommendationsOutputSchema = z.object({
  intro: z
    .string()
    .describe(
      'A brief, encouraging introductory paragraph for the learning path.'
    ),
  phases: z
    .array(LearningPhaseSchema)
    .describe('A list of structured learning phases.'),
});
export type GetLearningRecommendationsOutput = z.infer<
  typeof GetLearningRecommendationsOutputSchema
>;

const getLearningRecommendationsPrompt = ai.definePrompt({
  name: 'getLearningRecommendationsPrompt',
  input: { schema: GetLearningRecommendationsInputSchema },
  output: { schema: GetLearningRecommendationsOutputSchema },
  prompt: `You are an expert career coach and learning strategist called SkillSprout Pro. Your task is to generate a personalized, multi-phase learning roadmap for a user based on their identified skill gaps and preferred learning style.

The user has the following skill gaps:
{{#each gaps}}
- {{{this}}}
{{/each}}

Their preferred learning style is: {{{style}}}.

Create a comprehensive 3-phase learning plan. Each phase should build upon the last, starting with foundational knowledge and progressing to advanced application.

For each phase, provide:
1.  A clear title and a brief description.
2.  A list of 2-3 specific, actionable learning resources (e.g., courses, hands-on projects, key articles, videos). For each resource, specify its type, a title, a short description, and a placeholder URL (e.g., "https://example.com/resource").
3.  A motivational milestone that the user unlocks upon completion (e.g., "Foundation Badge Unlocked").

Finally, write a brief, encouraging introductory paragraph for the entire learning path. The tone should be inspiring and professional.
`,
});

const getLearningRecommendationsFlow = ai.defineFlow(
  {
    name: 'getLearningRecommendationsFlow',
    inputSchema: GetLearningRecommendationsInputSchema,
    outputSchema: GetLearningRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await getLearningRecommendationsPrompt(input);
    return output!;
  }
);

export async function getLearningRecommendations(
  input: GetLearningRecommendationsInput
): Promise<GetLearningRecommendationsOutput> {
  return getLearningRecommendationsFlow(input);
}

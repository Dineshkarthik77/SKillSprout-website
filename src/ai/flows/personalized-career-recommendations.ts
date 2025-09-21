'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized career recommendations based on user skills and interests.
 *
 * - getPersonalizedCareerRecommendations - A function that takes user skills and interests as input and returns personalized career recommendations.
 * - PersonalizedCareerRecommendationsInput - The input type for the getPersonalizedCareerRecommendations function.
 * - PersonalizedCareerRecommendationsOutput - The return type for the getPersonalizedCareerRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCareerRecommendationsInputSchema = z.object({
  skills: z
    .string()
    .describe('A comma-separated list of the user\'s skills.'),
  interests: z
    .string()
    .describe('A comma-separated list of the user\'s interests.'),
});
export type PersonalizedCareerRecommendationsInput = z.infer<
  typeof PersonalizedCareerRecommendationsInputSchema
>;

const PersonalizedCareerRecommendationsOutputSchema = z.object({
  careerRecommendations: z
    .string()
    .describe(
      'A list of personalized career recommendations based on the user\'s skills and interests.'
    ),
});
export type PersonalizedCareerRecommendationsOutput = z.infer<
  typeof PersonalizedCareerRecommendationsOutputSchema
>;

export async function getPersonalizedCareerRecommendations(
  input: PersonalizedCareerRecommendationsInput
): Promise<PersonalizedCareerRecommendationsOutput> {
  return personalizedCareerRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCareerRecommendationsPrompt',
  input: {schema: PersonalizedCareerRecommendationsInputSchema},
  output: {schema: PersonalizedCareerRecommendationsOutputSchema},
  prompt: `You are an AI career counselor. Based on the user's skills and interests, provide a list of personalized career recommendations.

Skills: {{{skills}}}
Interests: {{{interests}}}

Career Recommendations:`,
});

const personalizedCareerRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCareerRecommendationsFlow',
    inputSchema: PersonalizedCareerRecommendationsInputSchema,
    outputSchema: PersonalizedCareerRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

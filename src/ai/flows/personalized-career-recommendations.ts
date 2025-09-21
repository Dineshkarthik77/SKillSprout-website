'use server';
/**
 * @fileOverview Generates a personalized learning roadmap based on skill gaps and learning style.
 *
 * - getLearningRecommendations - A function that handles the recommendation generation process.
 * - GetLearningRecommendationsInput - The input type for the getLearningRecommendations function.
 * - GetLearningRecommendationsOutput - The return type for the getLearningRecommendations function.
 */

import {
  getLearningRecommendationsFlow,
  type GetLearningRecommendationsInput,
  type GetLearningRecommendationsOutput,
} from '.';

export type { GetLearningRecommendationsInput, GetLearningRecommendationsOutput };

export async function getLearningRecommendations(
  input: GetLearningRecommendationsInput
): Promise<GetLearningRecommendationsOutput> {
  return getLearningRecommendationsFlow(input);
}

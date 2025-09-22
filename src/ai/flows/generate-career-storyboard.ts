'use server';
/**
 * @fileOverview Generates an interactive career storyboard with three job recommendations.
 *
 * - generateCareerStoryboard - A function that handles the storyboard generation process.
 * - GenerateCareerStoryboardInput - The input type for the generateCareerStoryboard function.
 * - GenerateCareerStoryboardOutput - The return type for the generateCareerStoryboard function.
 */

import {
  generateCareerStoryboardFlow,
  type GenerateCareerStoryboardInput,
  type GenerateCareerStoryboardOutput,
} from '.';

export type { GenerateCareerStoryboardInput, GenerateCareerStoryboardOutput };

export async function generateCareerStoryboard(
  input: GenerateCareerStoryboardInput
): Promise<GenerateCareerStoryboardOutput> {
  return generateCareerStoryboardFlow(input);
}

'use server';
/**
 * @fileOverview Generates a quiz for a given career domain and difficulty level.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {
  generateQuizFlow,
  type GenerateQuizInput,
  type GenerateQuizOutput,
} from '.';

export type { GenerateQuizInput, GenerateQuizOutput };

export async function generateQuiz(
  input: GenerateQuizInput
): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

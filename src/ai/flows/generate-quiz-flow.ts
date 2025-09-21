'use server';
/**
 * @fileOverview Generates a quiz for a given career domain and difficulty level.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GenerateQuizInputSchema = z.object({
  domain: z.string().describe('The career domain for the quiz (e.g., "Healthcare").'),
  level: z.number().min(1).max(3).describe('The difficulty level of the quiz (1-3).'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const QuizQuestionSchema = z.object({
  question: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).describe('A list of possible answers.'),
  answer: z.string().describe('The correct answer from the options list.'),
  explanation: z.string().describe('A brief explanation of why the answer is correct.'),
});

export const GenerateQuizOutputSchema = z.object({
  title: z.string().describe('The title of the quiz for the given level.'),
  questions: z.array(QuizQuestionSchema).describe('A list of 5 quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: { schema: GenerateQuizInputSchema },
  output: { schema: GenerateQuizOutputSchema },
  prompt: `You are an expert curriculum developer for professional assessments. Your task is to generate a set of 5 multiple-choice quiz questions for a specific career domain and difficulty level.

Domain: {{{domain}}}
Level: {{{level}}}

Instructions:
- The questions should be relevant to the specified domain.
- The difficulty should correspond to the level:
  - Level 1: Foundational knowledge, basic terminology, and core concepts.
  - Level 2: Application of knowledge, scenario-based questions, and intermediate concepts.
  - Level 3: Advanced topics, critical thinking, and complex problem-solving.
- Each question must have exactly 4 options.
- One option must be clearly the correct answer.
- Provide a brief, clear explanation for why the correct answer is correct.
- Generate a creative and engaging title for the quiz based on the level.
`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async (input) => {
    const { output } = await generateQuizPrompt(input);
    return output!;
  }
);

export async function generateQuiz(
  input: GenerateQuizInput
): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

'use server';
/**
 * @fileOverview A career guidance AI agent that chats with users to determine their ideal career domain.
 *
 * - chatWithCareerGuide - A function that handles the career guidance chat process.
 * - ChatWithCareerGuideHistory - The history type for the chatWithCareerGuide function.
 * - ChatWithCareerGuideOutput - The return type for the chatWithCareerGuide function.
 */

import { z } from 'genkit';
import { chatWithCareerGuideFlow } from '.';

const CareerDomainSchema = z.enum([
  'Technology',
  'Creative Arts',
  'Healthcare',
  'Business',
  'undetermined',
]);

export const ChatWithCareerGuideHistorySchema = z.array(
  z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })
);
export type ChatWithCareerGuideHistory = z.infer<
  typeof ChatWithCareerGuideHistorySchema
>;

export const ChatWithCareerGuideOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user."),
  recommendedDomain: CareerDomainSchema.describe(
    "The career domain recommended for the user. Set to 'undetermined' if the conversation is not yet conclusive."
  ),
});
export type ChatWithCareerGuideOutput = z.infer<
  typeof ChatWithCareerGuideOutputSchema
>;

export async function chatWithCareerGuide(
  history: ChatWithCareerGuideHistory
): Promise<ChatWithCareerGuideOutput> {
  return chatWithCareerGuideFlow(history);
}

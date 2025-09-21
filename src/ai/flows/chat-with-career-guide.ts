'use server';
/**
 * @fileOverview A career guidance AI agent that chats with users to determine their ideal career domain.
 *
 * - chatWithCareerGuide - A function that handles the career guidance chat process.
 * - ChatWithCareerGuideHistory - The history type for the chatWithCareerGuide function.
 * - ChatWithCareerGuideOutput - The return type for the chatWithCareerGuide function.
 */

import {
  chatWithCareerGuideFlow,
  type ChatWithCareerGuideHistory,
  type ChatWithCareerGuideOutput,
} from '.';

export type { ChatWithCareerGuideHistory, ChatWithCareerGuideOutput };

export async function chatWithCareerGuide(
  history: ChatWithCareerGuideHistory
): Promise<ChatWithCareerGuideOutput> {
  return chatWithCareerGuideFlow(history);
}

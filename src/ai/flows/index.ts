import { ai } from '@/ai/genkit';
import {
  ChatWithCareerGuideHistorySchema,
  ChatWithCareerGuideOutputSchema,
} from './chat-with-career-guide';

const prompt = ai.definePrompt({
  name: 'chatWithCareerGuidePrompt',
  input: { schema: ChatWithCareerGuideHistorySchema },
  output: { schema: ChatWithCareerGuideOutputSchema },
  prompt: `You are an expert AI career guide. Your goal is to have a short, friendly conversation with the user to understand their skills, interests, and personality. Based on this, you will recommend one of the following career domains: Technology, Creative Arts, Healthcare, or Business.

- Start the conversation by introducing yourself and asking the user about their interests.
- Ask clarifying questions to get a better understanding.
- Keep your responses concise and engaging.
- When you have enough information to make a recommendation, provide it and set the 'recommendedDomain' field.
- If you cannot determine a domain after a few interactions, keep asking questions and set 'recommendedDomain' to 'undetermined'.

Conversation History:
{{#each .}}
{{role}}: {{{content}}}
{{/each}}
`,
});

export const chatWithCareerGuideFlow = ai.defineFlow(
  {
    name: 'chatWithCareerGuideFlow',
    inputSchema: ChatWithCareerGuideHistorySchema,
    outputSchema: ChatWithCareerGuideOutputSchema,
  },
  async (history) => {
    const { output } = await prompt(history);
    return output!;
  }
);

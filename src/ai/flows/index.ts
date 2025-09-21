import { ai } from '@/ai/genkit';
import { z } from 'genkit';

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

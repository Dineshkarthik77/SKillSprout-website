import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Schemas and flows for chatWithCareerGuide
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

const chatWithCareerGuidePrompt = ai.definePrompt({
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
    const { output } = await chatWithCareerGuidePrompt(history);
    return output!;
  }
);


// Schemas and flows for generateQuiz
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
  input: { schema: z.object({
    domain: z.string(),
    level: z.number(),
    isUniversal: z.boolean(),
  }) },
  output: { schema: GenerateQuizOutputSchema },
  prompt: `You are an expert curriculum developer. Your task is to generate a set of 5 multiple-choice quiz questions.

{{#if isUniversal}}
You are creating a Universal Aptitude test. The questions should be domain-agnostic and focus on logic, creativity, and problem-solving.

Level: {{{level}}}

Instructions for Universal Aptitude Quiz:
- Generate 5 questions based on the specified level's theme.
- Level 1 Theme: Foundational Logic. Mix questions covering Pattern Recognition (sequences), Deductive Reasoning (logical conclusions), and Abstract Thinking (conceptual problems).
- Level 2 Theme: Creative Problem-Solving. Mix questions covering Creative Ideation (new ideas), Resourceful Solutions (working with constraints), and Innovative Thinking (novel uses for objects).
- Level 3 Theme: Advanced Universal Aptitude. Mix questions covering Strategic Planning (project plans), Adaptability (responding to change), and Ethical Analysis (solving dilemmas).
- Generate a creative and engaging title for the quiz based on the level's theme.

{{else}}
You are creating a quiz for a specific career domain.

Domain: {{{domain}}}
Level: {{{level}}}

Instructions for Domain-Specific Quiz:
- The questions should be relevant to the specified domain.
- The difficulty should correspond to the level:
  - Level 1: Foundational knowledge, basic terminology, and core concepts. For the 'Technology' domain specifically, make the questions simple, interesting, and short (around 2 lines) to be encouraging for beginners.
  - Level 2: Application of knowledge, scenario-based questions, and intermediate concepts.
  - Level 3: Advanced topics, critical thinking, and complex problem-solving.
- Generate a creative and engaging title for the quiz based on the level.
{{/if}}

General Instructions for All Quizzes:
- Each question must have exactly 4 options.
- One option must be clearly the correct answer.
- Provide a brief, clear explanation for why the correct answer is correct.
`,
});

export const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async (input) => {
    const { output } = await generateQuizPrompt({
      ...input,
      isUniversal: input.domain === 'Universal Aptitude',
    });
    return output!;
  }
);

// Schemas and flows for getLearningRecommendations
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

export const getLearningRecommendationsFlow = ai.defineFlow(
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

// Schemas and flows for generateCareerStoryboard
export const GenerateCareerStoryboardInputSchema = z.object({
  domain: z.string().describe('The career domain the user was assessed on (e.g., "Technology").')
});
export type GenerateCareerStoryboardInput = z.infer<typeof GenerateCareerStoryboardInputSchema>;

const StoryboardCardSchema = z.object({
  jobTitle: z.string().describe('The title of the recommended job (e.g., "AI & Machine Learning Engineer").'),
  description: z.string().describe('A brief, one-sentence description of the role.'),
  demand: z.enum(['High Demand', 'Growing Market', 'Stable']).describe('The current market demand for this role.'),
  requiredSkills: z.array(z.string()).describe('A list of 3-5 key skills required for the job.'),
  salaryRange: z.string().describe('The potential salary range for this role (e.g., "$120,000 - $180,000").'),
  dayInTheLife: z.string().describe('A brief, engaging "day in the life" scenario for someone in this role.'),
});

export const GenerateCareerStoryboardOutputSchema = z.array(StoryboardCardSchema).length(3).describe('A list of exactly three job recommendations.');
export type GenerateCareerStoryboardOutput = z.infer<typeof GenerateCareerStoryboardOutputSchema>;

const generateCareerStoryboardPrompt = ai.definePrompt({
  name: 'generateCareerStoryboardPrompt',
  input: { schema: GenerateCareerStoryboardInputSchema },
  output: { schema: GenerateCareerStoryboardOutputSchema },
  prompt: `You are an expert AI career counselor. Your task is to generate three distinct, actionable, and inspiring job recommendations for a user based on their performance in a specific career domain assessment.

Domain of Assessment: {{{domain}}}

For this domain, create three unique job profiles. For each job profile, provide the following details:
1.  **Job Title**: A clear and common job title.
2.  **Description**: A compelling, one-sentence summary of the role.
3.  **Demand**: The current market demand for the role. Choose from 'High Demand', 'Growing Market', or 'Stable'.
4.  **Required Skills**: A list of 3-5 essential skills for this job. These will be used to generate a learning path.
5.  **Salary Range**: A realistic salary range for this position in a major tech market.
6.  **Day in the Life**: A short, narrative paragraph describing a typical day in this role.

Ensure the recommendations are diverse but still highly relevant to the user's assessed domain.
`,
});

export const generateCareerStoryboardFlow = ai.defineFlow({
  name: 'generateCareerStoryboardFlow',
  inputSchema: GenerateCareerStoryboardInputSchema,
  outputSchema: GenerateCareerStoryboardOutputSchema,
}, async (input) => {
  const { output } = await generateCareerStoryboardPrompt(input);
  return output!;
});


'use server';
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

Your task is to act as a career guide and respond to the user's input. Ask questions to learn more about them.

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
  - Level 1: Foundational knowledge, basic terminology, and core concepts. 
    - For the 'Technology' domain specifically, ask simple and interesting questions (around 2 lines) about exciting topics like basic AI, VR, game development, robotics, 3D design, Digital Content Creation, Web Development, Internet of Things (IoT), Cybersecurity, Biotechnology, Drone Technology, Blockchain, Extended Reality (XR), Digital Marketing, and Autonomous Systems to be encouraging for beginners.
    - For the 'Skilled Trades & Artisanship' domain specifically, create interesting questions that are not too complex or simple. The questions should cover a mix of topics from the following categories:
      - Construction and Building Trades (e.g., Carpentry, Electrical, Plumbing, Masonry, HVAC)
      - Mechanical and Industrial Trades (e.g., Automotive Technology, Welding, Machinists, Industrial Maintenance)
      - Personal and Service Trades (e.g., Cosmetology, Culinary Arts, Barbering)
      - Artisanship and Craftsmanship (e.g., Woodworking, Jewelry Making, Glassblowing, Pottery, Textile Arts)
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
  inputSchema: GenerateCareerStoryboardInputSchema }, async (input) => {
  const { output } = await generateCareerStoryboardPrompt(input);
  return output!;
});

// Schemas and flows for generateRepairScenario
const ToolSchema = z.object({
  id: z.string().describe('A unique ID for the tool, e.g., "wrench"'),
  name: z.string().describe('The name of the tool, e.g., "Pipe Wrench"'),
});

export const GenerateRepairScenarioOutputSchema = z.object({
  title: z.string().describe('A creative title for the scenario, e.g., "The Case of the Leaky Pipe".'),
  description: z.string().describe('A brief description of the problem to be solved.'),
  imageUrl: z.string().url().describe('A URL for an image representing the broken item.'),
  imageHint: z.string().describe('A one or two-word hint for the image.'),
  availableTools: z.array(ToolSchema).describe('A list of 7-8 available tools, including both necessary and incorrect ones.'),
  correctSteps: z.array(z.string()).describe('A list of the correct tool IDs in the proper order to solve the problem.'),
});
export type GenerateRepairScenarioOutput = z.infer<typeof GenerateRepairScenarioOutputSchema>;

const generateRepairScenarioPrompt = ai.definePrompt({
  name: 'generateRepairScenarioPrompt',
  output: { schema: GenerateRepairScenarioOutputSchema },
  prompt: `You are a master technician and puzzle designer. Your task is to create a simple, logical repair scenario for a user to solve. The scenario should be solvable in 3-4 steps.

Generate a scenario from one of the following domains: Plumbing, Automotive, or basic Electronics.

For the scenario, provide the following:
1.  **Title**: A creative title for the puzzle.
2.  **Description**: A clear, concise description of the problem.
3.  **Image**: A placeholder image URL from picsum.photos (e.g., "https://picsum.photos/seed/pipe-leak/600/400") and a 1-2 word hint for the image.
4.  **Available Tools**: A list of 7-8 tools. This list must include the tools needed for the correct steps, plus several distractor tools. Each tool needs a unique ID (lowercase, no spaces) and a display name.
5.  **Correct Steps**: A list of the correct tool IDs, in the exact order they should be used to complete the repair. The list should have 3-4 steps.

Example Scenario:
- **Title**: "The Silent Engine"
- **Description**: "A small lawnmower engine won't start. It was working yesterday, but now it only makes a clicking sound. The fuel tank is full."
- **Image URL**: "https://picsum.photos/seed/engine/600/400", Hint: "lawnmower engine"
- **Available Tools**: [{id: "screwdriver", name: "Screwdriver"}, {id: "spark_plug_wrench", name: "Spark Plug Wrench"}, {id: "rag", name: "Clean Rag"}, {id: "oil_can", name: "Oil Can"}, {id: "hammer", name: "Hammer"}, {id: "duct_tape", name: "Duct Tape"}, {id: "new_spark_plug", name: "New Spark Plug"}]
- **Correct Steps**: ["screwdriver", "spark_plug_wrench", "new_spark_plug", "spark_plug_wrench"]
`,
});

export const generateRepairScenarioFlow = ai.defineFlow(
  {
    name: 'generateRepairScenarioFlow',
    outputSchema: GenerateRepairScenarioOutputSchema,
  },
  async () => {
    const { output } = await generateRepairScenarioPrompt();
    return output!;
  }
);


// Schemas and flows for Education Assessment (Level 2)
export const GenerateLessonPlanScenarioOutputSchema = z.object({
  subject: z.string().describe("The subject of the lesson (e.g., 'Mathematics', 'History')."),
  gradeLevel: z.string().describe("The grade level for the class (e.g., '5th Grade', 'High School')."),
  studentNeed: z.string().describe("A specific challenge or need in the classroom to address (e.g., 'A student who is visually impaired', 'A highly gifted student who gets bored easily')."),
  options: z.object({
    learningObjectives: z.array(z.string()).length(3).describe("Three distinct options for a learning objective."),
    activities: z.array(z.string()).length(3).describe("Three distinct options for an engaging activity."),
    assessments: z.array(z.string()).length(3).describe("Three distinct options for an assessment method."),
  }),
});
export type GenerateLessonPlanScenarioOutput = z.infer<typeof GenerateLessonPlanScenarioOutputSchema>;

const generateLessonPlanScenarioPrompt = ai.definePrompt({
  name: 'generateLessonPlanScenarioPrompt',
  output: { schema: GenerateLessonPlanScenarioOutputSchema },
  prompt: `You are an expert instructional designer. Your task is to create a dynamic scenario for a Level 2 Education assessment where a user must build a lesson plan.

Generate a scenario with the following components:
1.  **Subject**: Pick a common school subject.
2.  **Grade Level**: Choose an appropriate grade level for the subject.
3.  **Student Need**: Create a specific, realistic challenge or student need that the lesson plan must address. This is the core of the puzzle.
4.  **Options**: For each of the following categories, provide three distinct and plausible options. One option should be clearly superior for addressing the 'Student Need', while the others are less effective but still reasonable.
    -   Learning Objectives
    -   Engaging Activities
    -   Assessment Methods

Ensure the options are not obviously right or wrong, but require some thought about the specific 'Student Need'.
`,
});

export const generateLessonPlanScenarioFlow = ai.defineFlow(
  {
    name: 'generateLessonPlanScenarioFlow',
    outputSchema: GenerateLessonPlanScenarioOutputSchema,
  },
  async () => {
    const { output } = await generateLessonPlanScenarioPrompt();
    return output!;
  }
);

export const EvaluateLessonPlanInputSchema = z.object({
  scenario: GenerateLessonPlanScenarioOutputSchema.describe("The original scenario presented to the user."),
  learningObjective: z.string().describe("The learning objective chosen by the user."),
  activity: z.string().describe("The activity chosen by the user."),
  assessment: z.string().describe("The assessment method chosen by the user."),
});
export type EvaluateLessonPlanInput = z.infer<typeof EvaluateLessonPlanInputSchema>;

export const EvaluateLessonPlanOutputSchema = z.object({
  feedback: z.string().describe("Constructive feedback on the user's lesson plan choices, explaining why they are effective or how they could be improved in relation to the specific student need."),
});
export type EvaluateLessonPlanOutput = z.infer<typeof EvaluateLessonPlanOutputSchema>;

const evaluateLessonPlanPrompt = ai.definePrompt({
  name: 'evaluateLessonPlanPrompt',
  input: { schema: EvaluateLessonPlanInputSchema },
  output: { schema: EvaluateLessonPlanOutputSchema },
  prompt: `You are an expert teaching coach. A user has created a lesson plan based on a scenario you provided. Your task is to provide constructive feedback on their choices.

**The Scenario:**
-   **Subject**: {{{scenario.subject}}}
-   **Grade Level**: {{{scenario.gradeLevel}}}
-   **Key Challenge**: {{{scenario.studentNeed}}}

**The User's Lesson Plan:**
-   **Learning Objective**: {{{learningObjective}}}
-   **Activity**: {{{activity}}}
-   **Assessment**: {{{assessment}}}

**Your Task:**
Write a brief, encouraging paragraph of feedback (2-4 sentences). Analyze how well the user's choices work together to address the specific 'Key Challenge'. Explain the strengths of their plan and, if applicable, suggest one area for improvement.
`,
});

export const evaluateLessonPlanFlow = ai.defineFlow(
  {
    name: 'evaluateLessonPlanFlow',
    inputSchema: EvaluateLessonPlanInputSchema,
    outputSchema: EvaluateLessonPlanOutputSchema,
  },
  async (input) => {
    const { output } = await evaluateLessonPlanPrompt(input);
    return output!;
  }
);

    

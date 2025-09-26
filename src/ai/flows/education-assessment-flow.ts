
'use server';
/**
 * @fileOverview AI flows for the interactive Level 2 Education Assessment.
 *
 * - generateLessonPlanScenario - Creates a dynamic teaching scenario.
 * - evaluateLessonPlan - Provides feedback on a user's submitted lesson plan.
 */

import {
  generateLessonPlanScenarioFlow,
  type GenerateLessonPlanScenarioOutput,
  evaluateLessonPlanFlow,
  type EvaluateLessonPlanInput,
  type EvaluateLessonPlanOutput,
} from '.';

export type { GenerateLessonPlanScenarioOutput, EvaluateLessonPlanInput };

export async function generateLessonPlanScenario(): Promise<GenerateLessonPlanScenarioOutput> {
  return generateLessonPlanScenarioFlow();
}

export async function evaluateLessonPlan(input: EvaluateLessonPlanInput): Promise<EvaluateLessonPlanOutput> {
  return evaluateLessonPlanFlow(input);
}

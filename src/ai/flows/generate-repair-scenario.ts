'use server';
/**
 * @fileOverview Generates a dynamic repair scenario for the skilled trades assessment.
 *
 * - generateRepairScenario - A function that handles the scenario generation process.
 * - GenerateRepairScenarioOutput - The return type for the generateRepairScenario function.
 */

import {
  generateRepairScenarioFlow,
  type GenerateRepairScenarioOutput,
} from '.';

export type { GenerateRepairScenarioOutput };

export async function generateRepairScenario(): Promise<GenerateRepairScenarioOutput> {
  return generateRepairScenarioFlow();
}

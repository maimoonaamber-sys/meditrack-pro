
'use server';
/**
 * @fileoverview A flow for analyzing a list of medications for interactions, side effects, and food restrictions.
 *
 * - analyzeMedications - A function that takes a list of medication names and returns an analysis.
 * - MedicationAnalysis - The return type for the analyzeMedications function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const MedicationAnalysisSchema = z.object({
  medications: z.array(z.object({
    name: z.string().describe('The name of the medication.'),
    sideEffects: z.string().describe('A brief summary of the most common side effects.'),
    foodRestrictions: z.string().describe('A brief summary of any food or drink to avoid with this medication.'),
  })),
  interactionWarning: z.string().optional().describe('A warning message if there are potential interactions between the listed medications. If none, this should be omitted.'),
});
export type MedicationAnalysis = z.infer<typeof MedicationAnalysisSchema>;

export async function analyzeMedications(meds: string[]): Promise<MedicationAnalysis> {
  return medicationAnalysisFlow(meds);
}

const prompt = ai.definePrompt({
  name: 'medicationAnalysisPrompt',
  input: { schema: z.array(z.string()) },
  output: { schema: MedicationAnalysisSchema },
  model: "googleai/gemini-1.5-flash",
  prompt: `You are an AI medical information assistant.
You are NOT a doctor and should not provide medical advice.
Your role is to analyze a list of medications and provide factual information based on publicly available data.

Analyze the following list of medications:
{{#each input}}
- {{{this}}}
{{/each}}

For each medication, provide:
1.  A brief summary of its most common side effects.
2.  A brief summary of any food or drink restrictions.

IMPORTANT: After analyzing each medication individually, check for potential drug-drug interactions between ALL medications in the list.
If you find any significant potential interactions, provide a single, clear warning in the 'interactionWarning' field.
If there are no significant interactions, DO NOT include the 'interactionWarning' field in your response.

Your response must be in the specified JSON format.
`,
});

const medicationAnalysisFlow = ai.defineFlow(
  {
    name: 'medicationAnalysisFlow',
    inputSchema: z.array(z.string()),
    outputSchema: MedicationAnalysisSchema,
  },
  async (meds) => {
    if (meds.length === 0) {
      return { medications: [] };
    }
    const { output } = await prompt(meds);
    return output!;
  }
);


'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

/**
 * @fileOverview An AI assistant for medical information.
 *
 * - askMedipop - A function that provides information about symptoms or medications.
 * - MedipopInput - The input type for the askMedipop function.
 * - MedipopOutput - The return type for the askMedipop function.
 */

const MedipopInputSchema = z.object({
  query: z.string().describe('The user\'s question about symptoms or a medication.'),
});
export type MedipopInput = z.infer<typeof MedipopInputSchema>;


const MedipopOutputSchema = z.object({
    analysis: z.string().describe("A detailed and conversational analysis of the user's query. Provide potential causes for symptoms or detailed information about a medication (uses, side effects, dosage)."),
    disclaimer: z.string().describe("A standard medical disclaimer stating that this is not a substitute for professional medical advice and to consult a doctor."),
});
export type MedipopOutput = z.infer<typeof MedipopOutputSchema>;


export async function askMedipop(input: MedipopInput): Promise<MedipopOutput> {
  return medipopFlow(input);
}


const medipopPrompt = ai.definePrompt({
    name: 'medipopPrompt',
    input: { schema: MedipopInputSchema },
    output: { schema: MedipopOutputSchema },
    prompt: `You are Medipop, a helpful and conversational AI assistant. Your goal is to provide clear and useful information about health-related queries.

Analyze the user's query: {{{query}}}

Follow these rules:
1.  **If the query is about medical symptoms**:
    - Provide a conversational and detailed analysis of possible causes.
    - Start with common and less severe possibilities.
    - Explicitly state that you cannot provide a diagnosis and that this is for informational purposes only. Use phrases like "Some possible reasons for this could be..." or "It's often related to...".
2.  **If the query is about a medication**:
    - Provide detailed information, including its common uses, typical dosage information, and known side effects.
    - Be conversational and easy to understand.
    - Do not give prescriptive advice (e.g., "You should take...").
3.  **Always Generate a Disclaimer**: For every response, you MUST generate a clear disclaimer. It should state that you are an AI, the information provided is not a substitute for professional medical advice, and the user must consult a qualified healthcare provider for any health concerns.
`
});


const medipopFlow = ai.defineFlow(
  {
    name: 'medipopFlow',
    inputSchema: MedipopInputSchema,
    outputSchema: MedipopOutputSchema,
  },
  async (input) => {
    const { output } = await medipopPrompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI model.');
    }
    return output;
  }
);

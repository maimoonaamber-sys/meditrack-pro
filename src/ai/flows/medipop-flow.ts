
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
    analysis: z.string().describe("A detailed analysis of the user's query. Provide potential causes for symptoms or detailed information about a medication (uses, chemical formula, side effects, dosage)."),
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
    prompt: `You are Medipop, an AI medical assistant. Your role is to provide helpful information, but you must always prioritize user safety and clarify that you are not a real doctor.

Analyze the user's query: {{{query}}}

Follow these rules:
1.  **If the query seems to be about symptoms**:
    - Provide a general analysis of the possible causes for the described symptoms.
    - Mention common, non-threatening possibilities first.
    - Do NOT provide a definitive diagnosis. Use phrases like "Possible causes could include..." or "This might be related to...".
    - Suggest consulting a healthcare professional for an accurate diagnosis.

2.  **If the query seems to be about a medicine**:
    - Provide information about the medicine's common uses, typical dosage guidelines, potential side effects, and its chemical formula if available.
    - Do not give prescriptive advice.

3.  **Generate a Disclaimer**: For every response, you MUST generate a clear and prominent disclaimer. It should state that you are an AI, the information is not a substitute for professional medical advice, and the user should always consult a qualified healthcare provider for any health concerns or before starting or stopping any medication.
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

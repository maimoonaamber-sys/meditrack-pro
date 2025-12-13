
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

/**
 * @fileOverview An AI assistant for medical information.
 *
 * - askMedico - A function that provides information about symptoms or medications.
 * - MedicoInput - The input type for the askMedico function.
 * - MedicoOutput - The return type for the askMedico function.
 */

const MedicoInputSchema = z.object({
  query: z.string().describe('The user\'s question about symptoms or a medication.'),
  type: z.enum(['symptom', 'medicine']).describe('The type of query.'),
});
export type MedicoInput = z.infer<typeof MedicoInputSchema>;


const MedicoOutputSchema = z.object({
    analysis: z.string().describe("A detailed analysis of the user's query. Provide potential causes for symptoms or detailed information about a medication (uses, side effects, dosage)."),
    disclaimer: z.string().describe("A standard medical disclaimer stating that this is not a substitute for professional medical advice and to consult a doctor."),
});
export type MedicoOutput = z.infer<typeof MedicoOutputSchema>;


export async function askMedico(input: MedicoInput): Promise<MedicoOutput> {
  return medicoFlow(input);
}


const medicoPrompt = ai.definePrompt({
    name: 'medicoPrompt',
    input: { schema: MedicoInputSchema },
    output: { schema: MedicoOutputSchema },
    prompt: `You are Medico, an AI medical assistant. Your role is to provide helpful information, but you must always prioritize user safety and clarify that you are not a real doctor.

Analyze the user's query: {{{query}}}

The query is about: {{{type}}}

Follow these rules:
1.  **If the type is 'symptom'**:
    - Provide a general analysis of the possible causes for the described symptoms.
    - Mention common, non-threatening possibilities first.
    - Do NOT provide a definitive diagnosis. Use phrases like "Possible causes could include..." or "This might be related to...".
    - Suggest consulting a healthcare professional for an accurate diagnosis.

2.  **If the type is 'medicine'**:
    - Provide information about the medicine's common uses, typical dosage guidelines, and potential side effects.
    - Do not give prescriptive advice.

3.  **Generate a Disclaimer**: For every response, you MUST generate a clear and prominent disclaimer. It should state that you are an AI, the information is not a substitute for professional medical advice, and the user should always consult a qualified healthcare provider for any health concerns or before taking any medication.
`
});


const medicoFlow = ai.defineFlow(
  {
    name: 'medicoFlow',
    inputSchema: MedicoInputSchema,
    outputSchema: MedicoOutputSchema,
  },
  async (input) => {
    const { output } = await medicoPrompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI model.');
    }
    return output;
  }
);

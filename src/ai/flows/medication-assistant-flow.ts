
'use server';
/**
 * @fileOverview A medication assistant AI flow.
 *
 * - askQuestion - A function that handles questions about medications.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const MedicationQuestionInputSchema = z.string();

const MedicationQuestionOutputSchema = z.string();

export async function askQuestion(
  question: z.infer<typeof MedicationQuestionInputSchema>
): Promise<z.infer<typeof MedicationQuestionOutputSchema>> {
  return medicationAssistantFlow(question);
}

const medicationAssistantFlow = ai.defineFlow(
  {
    name: 'medicationAssistantFlow',
    inputSchema: MedicationQuestionInputSchema,
    outputSchema: MedicationQuestionOutputSchema,
  },
  async (prompt) => {
    const llmResponse = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      prompt: `You are a friendly and helpful AI medical assistant. 
               Your goal is to provide clear and concise information about medications.
               Always start by greeting the user if it's the start of the conversation.
               Here is the user's question: ${prompt}`,
      config: {
        temperature: 0.5,
      },
    });

    return llmResponse.text;
  }
);

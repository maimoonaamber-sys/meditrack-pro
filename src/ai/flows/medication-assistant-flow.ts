
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
      prompt: `You are a helpful AI assistant. Your user has a question about medications. Provide a comprehensive and accurate answer.
               
               Here is the user's question: ${prompt}`,
      config: {
        temperature: 0.7,
      },
    });

    return llmResponse.text;
  }
);

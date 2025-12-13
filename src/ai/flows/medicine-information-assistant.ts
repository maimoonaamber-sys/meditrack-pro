'use server';

/**
 * @fileOverview A medicine information retrieval AI agent.
 *
 * - getMedicineInfo - A function that retrieves information about a medicine.
 * - MedicineInfoInput - The input type for the getMedicineInfo function.
 * - MedicineInfoOutput - The return type for the getMedicineInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicineInfoInputSchema = z.object({
  medicineName: z.string().describe('The name of the medicine to retrieve information about.'),
});
export type MedicineInfoInput = z.infer<typeof MedicineInfoInputSchema>;

const MedicineInfoOutputSchema = z.object({
  summary: z.string().describe('A summary of the medicine, including its uses, benefits, side effects, and dosage information.'),
});
export type MedicineInfoOutput = z.infer<typeof MedicineInfoOutputSchema>;

export async function getMedicineInfo(input: MedicineInfoInput): Promise<MedicineInfoOutput> {
  return medicineInfoFlow(input);
}

const medicineInfoPrompt = ai.definePrompt({
  name: 'medicineInfoPrompt',
  input: {schema: MedicineInfoInputSchema},
  output: {schema: MedicineInfoOutputSchema},
  prompt: `You are a helpful AI assistant that provides information about medicines.

  Provide a summary of the uses, benefits, potential side effects, and dosage information for the medicine named: {{{medicineName}}}.
  Use reliable sources such as medical articles and drug databases to gather information.
`,
});

const medicineInfoFlow = ai.defineFlow(
  {
    name: 'medicineInfoFlow',
    inputSchema: MedicineInfoInputSchema,
    outputSchema: MedicineInfoOutputSchema,
  },
  async input => {
    const {output} = await medicineInfoPrompt(input);
    return output!;
  }
);

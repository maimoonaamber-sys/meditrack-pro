
'use server';
/**
 * @fileOverview An AI agent for diagnosing skin conditions from an image.
 *
 * - diagnoseSkin - A function that handles the skin diagnosis process.
 * - SkinDiagnosisInput - The input type for the diagnoseSkin function.
 * - SkinDiagnosisOutput - The return type for the diagnoseSkin function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SkinDiagnosisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a skin condition, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SkinDiagnosisInput = z.infer<typeof SkinDiagnosisInputSchema>;

const SkinDiagnosisOutputSchema = z.object({
  conditionName: z.string().describe('The common name of the identified skin condition. If not identifiable, return "Unknown".'),
  isAllergy: z.boolean().describe('Whether the condition is likely an allergic reaction.'),
  isBurn: z.boolean().describe('Whether the condition is likely a burn.'),
  description: z.string().describe('A brief description of the identified condition, its common causes, and typical symptoms.'),
  recommendation: z.string().describe('General recommendations for managing the condition. IMPORTANT: This should not be medical advice. Strongly recommend consulting a doctor.'),
});
export type SkinDiagnosisOutput = z.infer<typeof SkinDiagnosisOutputSchema>;

export async function diagnoseSkin(input: SkinDiagnosisInput): Promise<SkinDiagnosisOutput> {
  return diagnoseSkinFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnoseSkinPrompt',
  input: { schema: SkinDiagnosisInputSchema },
  output: { schema: SkinDiagnosisOutputSchema },
  prompt: `You are a helpful dermatology assistant AI. Your role is to analyze an image of a skin condition and provide a preliminary analysis. You are not a medical professional, and your advice should reflect that.

Analyze the provided image of a skin condition. Based on the visual information, identify the most likely condition.

- Determine the common name of the condition.
- Classify if it appears to be an allergic reaction or a type of burn.
- Provide a concise description of the condition.
- Offer general, non-prescriptive recommendations, and ALWAYS strongly advise the user to consult a qualified healthcare professional for an accurate diagnosis and treatment plan.

If you cannot identify a specific condition with reasonable confidence, set the conditionName to "Unknown" and explain that the image is not clear enough for analysis.

Photo of the skin condition: {{media url=photoDataUri}}`,
});

const diagnoseSkinFlow = ai.defineFlow(
  {
    name: 'diagnoseSkinFlow',
    inputSchema: SkinDiagnosisInputSchema,
    outputSchema: SkinDiagnosisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        throw new Error("The model did not return a valid output.");
    }
    return output;
  }
);

    
'use server';

import { getMedicineInfo, type MedicineInfoOutput } from '@/ai/flows/medicine-information-assistant';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';

const schema = z.object({
  medicineName: z.string({
    required_error: "Medicine name is required."
  }).min(2, 'Medicine name must be at least 2 characters.'),
});

export interface ActionState {
  message?: string | null;
  data?: MedicineInfoOutput | null;
  fields?: Record<string, string>;
  issues?: string[];
}


export async function fetchMedicineInfo(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const validatedFields = schema.safeParse({
    medicineName: formData.get('medicineName'),
  });

  if (!validatedFields.success) {
    const errorData = validatedFields.error.flatten()
    return {
      message: 'Invalid input.',
      fields: {
        medicineName: formData.get('medicineName')?.toString() ?? ''
      },
      issues: errorData.fieldErrors.medicineName,
    };
  }

  try {
    const result = await getMedicineInfo({ medicineName: validatedFields.data.medicineName });
    return { message: 'Success', data: result };
  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred. Please try again.' };
  }
}


'use server';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

if (!process.env.GEMINI_API_KEY) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  } else {
    console.warn(
      'GEMINI_API_KEY environment variable is not set. Using a placeholder key for development.'
    );
  }
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY || 'development-placeholder',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

    
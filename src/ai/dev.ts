import { config } from 'dotenv';
config();

console.log("Gemini Key Exists:", !!process.env.GEMINI_API_KEY);

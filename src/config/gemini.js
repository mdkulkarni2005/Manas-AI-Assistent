import { GoogleGenerativeAI } from "@google/generative-ai";

export const initializeGeminiAI = (apiKey) => {
  return new GoogleGenerativeAI(apiKey);
};
'use server';

/**
 * @fileOverview A flow that generates a comprehensive report from multiple documents.
 *
 * - generateReport - A function that takes the content of multiple documents and returns a summary.
 * - GenerateReportInput - The input type for the generateReport function.
 * - GenerateReportOutput - The return type for the generateReport function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateReportInputSchema = z.object({
  documentContents: z
    .array(z.string())
    .describe('An array of strings, where each string is the content of a document.'),
});
export type GenerateReportInput = z.infer<typeof GenerateReportInputSchema>;

const GenerateReportOutputSchema = z.object({
  report: z.string().describe('The comprehensive summary report.'),
});
export type GenerateReportOutput = z.infer<typeof GenerateReportOutputSchema>;

export async function generateReport(
  input: GenerateReportInput
): Promise<GenerateReportOutput> {
  return generateReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportPrompt',
  input: { schema: GenerateReportInputSchema },
  output: { schema: GenerateReportOutputSchema },
  prompt: `You are an AI assistant that creates comprehensive summary reports from multiple legal and financial documents.

You will be given an array of document contents. Your task is to analyze all documents and produce a single, well-structured report that summarizes the key information, financial liabilities, important dates, and potential risks found across all documents.

The report should be easy to read and understand for a non-expert. Use headings and bullet points to structure the information.

Combine the information from all documents into a single cohesive report.

Documents:
{{#each documentContents}}
--- Document ---
{{{this}}}
--- End Document ---
{{/each}}
`,
});

const generateReportFlow = ai.defineFlow(
  {
    name: 'generateReportFlow',
    inputSchema: GenerateReportInputSchema,
    outputSchema: GenerateReportOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

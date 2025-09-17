'use server';

/**
 * @fileOverview Extracts financial liabilities, purchase dates, EMI schedules, and warranty expirations from documents.
 *
 * - extractFinancialLiabilities - A function that initiates the financial data extraction process.
 * - ExtractFinancialLiabilitiesInput - The input type for the extractFinancialLiabilities function.
 * - ExtractFinancialLiabilitiesOutput - The return type for the extractFinancialLiabilities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractFinancialLiabilitiesInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the document to extract financial liabilities from.'),
});

export type ExtractFinancialLiabilitiesInput = z.infer<
  typeof ExtractFinancialLiabilitiesInputSchema
>;

const ExtractFinancialLiabilitiesOutputSchema = z.object({
  financialLiabilities: z
    .array(z.string())
    .describe('A list of financial liabilities extracted from the document.'),
  purchaseDates: z
    .array(z.string())
    .describe('A list of purchase dates extracted from the document.'),
  emiSchedules: z
    .array(z.string())
    .describe('A list of EMI schedules extracted from the document.'),
  warrantyExpirations: z
    .array(z.string())
    .describe('A list of warranty expirations extracted from the document.'),
});

export type ExtractFinancialLiabilitiesOutput = z.infer<
  typeof ExtractFinancialLiabilitiesOutputSchema
>;

export async function extractFinancialLiabilities(
  input: ExtractFinancialLiabilitiesInput
): Promise<ExtractFinancialLiabilitiesOutput> {
  return extractFinancialLiabilitiesFlow(input);
}

const extractFinancialLiabilitiesPrompt = ai.definePrompt({
  name: 'extractFinancialLiabilitiesPrompt',
  input: {schema: ExtractFinancialLiabilitiesInputSchema},
  output: {schema: ExtractFinancialLiabilitiesOutputSchema},
  prompt: `You are an AI assistant that extracts financial liabilities, purchase dates, EMI schedules, and warranty expirations from a given document.

  Document Text: {{{documentText}}}

  Please extract the relevant information and return it in the specified JSON format.
  `,
});

const extractFinancialLiabilitiesFlow = ai.defineFlow(
  {
    name: 'extractFinancialLiabilitiesFlow',
    inputSchema: ExtractFinancialLiabilitiesInputSchema,
    outputSchema: ExtractFinancialLiabilitiesOutputSchema,
  },
  async input => {
    const {output} = await extractFinancialLiabilitiesPrompt(input);
    return output!;
  }
);

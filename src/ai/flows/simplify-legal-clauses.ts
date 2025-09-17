'use server';

/**
 * @fileOverview A flow that simplifies legal clauses into plain language.
 *
 * - simplifyLegalClause - A function that takes a legal clause and returns a simplified explanation.
 * - SimplifyLegalClauseInput - The input type for the simplifyLegalClause function.
 * - SimplifyLegalClauseOutput - The return type for the simplifyLegalClause function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimplifyLegalClauseInputSchema = z.object({
  legalClause: z.string().describe('The legal clause to simplify.'),
});
export type SimplifyLegalClauseInput = z.infer<
  typeof SimplifyLegalClauseInputSchema
>;

const SimplifyLegalClauseOutputSchema = z.object({
  simplifiedExplanation: z
    .string()
    .describe('A simplified, plain-language explanation of the legal clause.'),
});
export type SimplifyLegalClauseOutput = z.infer<
  typeof SimplifyLegalClauseOutputSchema
>;

export async function simplifyLegalClause(
  input: SimplifyLegalClauseInput
): Promise<SimplifyLegalClauseOutput> {
  return simplifyLegalClauseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simplifyLegalClausePrompt',
  input: {schema: SimplifyLegalClauseInputSchema},
  output: {schema: SimplifyLegalClauseOutputSchema},
  prompt: `You are an expert legal simplifier. You will receive a legal clause and your job is to provide a simplified, plain-language explanation of the clause so that anyone can easily understand it.

Legal Clause: {{{legalClause}}}`,
});

const simplifyLegalClauseFlow = ai.defineFlow(
  {
    name: 'simplifyLegalClauseFlow',
    inputSchema: SimplifyLegalClauseInputSchema,
    outputSchema: SimplifyLegalClauseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

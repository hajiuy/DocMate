'use server';

/**
 * @fileOverview A flow that compares two documents and provides a summary of which is better and their clauses.
 *
 * - compareDocuments - A function that initiates the document comparison process.
 * - CompareDocumentsInput - The input type for the compareDocuments function.
 * - CompareDocumentsOutput - The return type for the compareDocuments function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CompareDocumentsInputSchema = z.object({
  doc1Content: z.string().describe('The content of the first document.'),
  doc2Content: z.string().describe('The content of the second document.'),
});

export type CompareDocumentsInput = z.infer<typeof CompareDocumentsInputSchema>;

const CompareDocumentsOutputSchema = z.object({
  comparisonReport: z
    .string()
    .describe(
      'A detailed comparison report highlighting which document is better and why, along with their respective clauses.'
    ),
});

export type CompareDocumentsOutput = z.infer<
  typeof CompareDocumentsOutputSchema
>;

export async function compareDocuments(
  input: CompareDocumentsInput
): Promise<CompareDocumentsOutput> {
  return compareDocumentsFlow(input);
}

const compareDocumentsPrompt = ai.definePrompt({
  name: 'compareDocumentsPrompt',
  input: { schema: CompareDocumentsInputSchema },
  output: { schema: CompareDocumentsOutputSchema },
  prompt: `You are an expert AI assistant specializing in legal and financial document analysis. You will be given two documents to compare.

Your task is to:
1.  Analyze both documents and identify their key terms, conditions, and clauses.
2.  Determine which document is "better" or more favorable, and provide a clear, reasoned explanation for your conclusion. Consider aspects like cost, liabilities, benefits, and risks.
3.  Provide a summary of the clauses for each document.
4.  Structure your response in a clear, easy-to-read format. Use headings and bullet points.

This is not legal advice. Start your response with a disclaimer stating that.

Document 1:
{{{doc1Content}}}

---

Document 2:
{{{doc2Content}}}
`,
});

const compareDocumentsFlow = ai.defineFlow(
  {
    name: 'compareDocumentsFlow',
    inputSchema: CompareDocumentsInputSchema,
    outputSchema: CompareDocumentsOutputSchema,
  },
  async (input) => {
    const { output } = await compareDocumentsPrompt(input);
    return output!;
  }
);

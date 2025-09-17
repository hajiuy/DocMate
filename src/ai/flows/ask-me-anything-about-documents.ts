'use server';
/**
 * @fileOverview A flow that allows users to ask questions about their uploaded documents.
 *
 * - askMeAnythingAboutDocuments - A function that handles the question answering process.
 * - AskMeAnythingAboutDocumentsInput - The input type for the askMeAnythingAboutDocuments function.
 * - AskMeAnythingAboutDocumentsOutput - The return type for the askMeAnythingAboutDocuments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskMeAnythingAboutDocumentsInputSchema = z.object({
  question: z.string().describe('The question to ask about the documents.'),
  documentContent: z.string().describe('The content of the documents to ask about.'),
});
export type AskMeAnythingAboutDocumentsInput = z.infer<typeof AskMeAnythingAboutDocumentsInputSchema>;

const AskMeAnythingAboutDocumentsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question based on the document content.'),
});
export type AskMeAnythingAboutDocumentsOutput = z.infer<typeof AskMeAnythingAboutDocumentsOutputSchema>;

export async function askMeAnythingAboutDocuments(
  input: AskMeAnythingAboutDocumentsInput
): Promise<AskMeAnythingAboutDocumentsOutput> {
  return askMeAnythingAboutDocumentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askMeAnythingAboutDocumentsPrompt',
  input: {schema: AskMeAnythingAboutDocumentsInputSchema},
  output: {schema: AskMeAnythingAboutDocumentsOutputSchema},
  prompt: `You are a helpful AI assistant that answers questions about documents.

  You will be given the content of a document and a question.
  Your goal is to answer the question based on the information in the document.
  If the answer is not in the document, say that you cannot answer the question.

  Document Content: {{{documentContent}}}

  Question: {{{question}}}

  Answer: `,
});

const askMeAnythingAboutDocumentsFlow = ai.defineFlow(
  {
    name: 'askMeAnythingAboutDocumentsFlow',
    inputSchema: AskMeAnythingAboutDocumentsInputSchema,
    outputSchema: AskMeAnythingAboutDocumentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

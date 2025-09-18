'use client';

import { useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';

import { compareDocuments } from '@/ai/flows/compare-documents';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { mockDocuments } from '@/lib/mock-data';

export default function ComparePage() {
  const [doc1Id, setDoc1Id] = useState<string | undefined>(undefined);
  const [doc2Id, setDoc2Id] = useState<string | undefined>(undefined);
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  const [isComparing, startComparison] = useTransition();

  const doc1 = mockDocuments.find((d) => d.id === doc1Id);
  const doc2 = mockDocuments.find((d) => d.id === doc2Id);

  const handleCompare = () => {
    if (!doc1 || !doc2) return;
    setComparisonResult(null);
    startComparison(async () => {
      try {
        const result = await compareDocuments({
          doc1Content: doc1.content,
          doc2Content: doc2.content,
        });
        setComparisonResult(result.comparisonReport);
      } catch (error) {
        setComparisonResult('Failed to generate comparison. Please try again.');
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Compare Documents</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Documents</CardTitle>
          <CardDescription>
            Choose two documents to generate an AI-powered comparison.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Select onValueChange={setDoc1Id}>
            <SelectTrigger>
              <SelectValue placeholder="Select Document 1" />
            </SelectTrigger>
            <SelectContent>
              {mockDocuments.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  {doc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setDoc2Id}>
            <SelectTrigger>
              <SelectValue placeholder="Select Document 2" />
            </SelectTrigger>
            <SelectContent>
              {mockDocuments.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  {doc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCompare} disabled={!doc1 || !doc2 || isComparing}>
            {isComparing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Compare Documents
          </Button>
        </CardFooter>
      </Card>

      {isComparing && (
        <Card>
          <CardHeader>
            <CardTitle>Generating Comparison...</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </CardContent>
        </Card>
      )}

      {comparisonResult && (
        <Card>
          <CardHeader>
            <CardTitle>Comparison Report</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 pr-4">
                <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                    {comparisonResult}
                </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {(doc1 || doc2) && !comparisonResult && !isComparing && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{doc1?.name || 'Document 1'}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                value={
                  doc1?.content || 'Select a document to view its content.'
                }
                className="h-96 resize-none"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{doc2?.name || 'Document 2'}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                value={
                  doc2?.content || 'Select a document to view its content.'
                }
                className="h-96 resize-none"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

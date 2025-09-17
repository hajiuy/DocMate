'use client';

import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
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
import { Textarea } from '@/components/ui/textarea';
import { mockDocuments } from '@/lib/mock-data';

export default function ComparePage() {
  const [doc1Id, setDoc1Id] = useState<string | undefined>(undefined);
  const [doc2Id, setDoc2Id] = useState<string | undefined>(undefined);

  const doc1 = mockDocuments.find((d) => d.id === doc1Id);
  const doc2 = mockDocuments.find((d) => d.id === doc2Id);

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Compare Documents</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Documents</CardTitle>
          <CardDescription>
            Choose two documents to compare side-by-side.
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
      </Card>

      {(doc1 || doc2) && (
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

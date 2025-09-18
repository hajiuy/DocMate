import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ClauseSimplifier } from '@/components/documents/clause-simplifier';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockDocuments } from '@/lib/mock-data';

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the document from your state management or API
  // For now, we find it in the mock data. A newly uploaded doc won't be found here yet.
  const doc = mockDocuments.find((d) => d.id === params.id);

  if (!doc) {
    // This is a temporary state until we fully manage documents on the client
    return (
        <div className="flex flex-col gap-4 md:gap-8">
             <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/documents">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Link>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Document not found
                </h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Document Not Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This document may have been recently uploaded. Please go back to the documents list. Full client-side routing is under development.</p>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/documents">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {doc.name}
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Clause Breakdown</CardTitle>
          <CardDescription>
            Click on a clause to view a simplified, AI-powered explanation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {doc.clauses.map((clause) => (
              <ClauseSimplifier key={clause.id} clause={clause} />
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

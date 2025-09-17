'use client';

import { useState, useTransition } from 'react';
import { Sparkles } from 'lucide-react';

import { simplifyLegalClause } from '@/ai/flows/simplify-legal-clauses';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Clause } from '@/lib/definitions';

export function ClauseSimplifier({ clause }: { clause: Clause }) {
  const [simplifiedText, setSimplifiedText] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSimplify = () => {
    startTransition(async () => {
      const result = await simplifyLegalClause({ legalClause: clause.text });
      setSimplifiedText(result.simplifiedExplanation);
    });
  };

  return (
    <AccordionItem value={clause.id}>
      <AccordionTrigger>{clause.text}</AccordionTrigger>
      <AccordionContent className="space-y-4">
        {!simplifiedText && !isPending && (
          <div className="flex flex-col items-start gap-4 rounded-lg border p-4 text-sm">
            <p>This is an AI explanation, not legal advice.</p>
            <Button onClick={handleSimplify} disabled={isPending}>
              <Sparkles className="mr-2 h-4 w-4" />
              Simplify this clause
            </Button>
          </div>
        )}
        {isPending && <Skeleton className="h-24 w-full" />}
        {simplifiedText && (
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <p className="mb-2 text-sm text-muted-foreground">
                This is an AI explanation, not legal advice.
              </p>
              <p>{simplifiedText}</p>
            </CardContent>
          </Card>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

'use client';

import { useState, useRef, useTransition } from 'react';
import { PlusCircle, Upload, FileText, FileAudio, File as FileIcon, X, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockDocuments } from '@/lib/mock-data';
import { generateReport } from '@/ai/flows/generate-report';
import { generateAudioReport } from '@/ai/flows/generate-audio-report';
import type { Document } from '@/lib/definitions';

export default function DocumentsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [report, setReport] = useState<string | null>(null);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<Document[]>(mockDocuments);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }

  const handleProcessDocument = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target?.result as string;
        const newDocument: Document = {
            id: `doc-${Date.now()}`,
            name: selectedFile.name,
            uploadDate: new Date().toLocaleDateString(),
            content: content,
            clauses: content.split('\n').filter(line => line.trim().startsWith('Clause')).map((line, index) => ({
                id: `c-${Date.now()}-${index}`,
                text: line.trim()
            })),
        };
        setUploadedDocuments(prev => [newDocument, ...prev]);
        handleRemoveFile();
    };
    reader.readAsText(selectedFile);
  }

  const handleGenerateReport = () => {
    startTransition(async () => {
      setReport(null);
      setAudioDataUri(null);
      setIsReportDialogOpen(true);

      const documentContents = uploadedDocuments.map((doc) => doc.content);
      try {
        const result = await generateReport({ documentContents });
        setReport(result.report);
      } catch (e) {
        setReport('Failed to generate report.');
      }
    });
  }

  const handleGenerateAudioReport = () => {
    startTransition(async () => {
      setReport(null);
      setAudioDataUri(null);
      setIsReportDialogOpen(true);
      
      const documentContents = uploadedDocuments.map((doc) => doc.content);
      try {
        const reportResult = await generateReport({ documentContents });
        setReport(reportResult.report);

        const audioResult = await generateAudioReport({ reportText: reportResult.report });
        setAudioDataUri(audioResult.audioDataUri);
      } catch (e) {
        setReport('Failed to generate audio report.');
      }
    });
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Documents</h1>
          <Button className="ml-auto gap-1" onClick={handleFileSelect}>
            <PlusCircle className="h-4 w-4" />
            Upload Document
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,text/plain"
          />
        </div>

        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          {selectedFile ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <FileIcon className="h-10 w-10 text-muted-foreground" />
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                ({(selectedFile.size / 1024).toFixed(2)} KB)
              </p>
              <div className="mt-4 flex gap-2">
                <Button onClick={handleProcessDocument}>Process Document</Button>
                <Button variant="ghost" onClick={handleRemoveFile}>
                  <X className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col items-center gap-1 py-12 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  setSelectedFile(e.dataTransfer.files[0]);
                }
              }}
            >
              <Upload className="h-10 w-10 text-muted-foreground" />
              <h3 className="text-2xl font-bold tracking-tight">
                You have no new documents
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start processing documents by dragging and dropping them
                here.
              </p>
              <Button className="mt-4" onClick={handleFileSelect}>
                Upload Document
              </Button>
            </div>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Get Report</CardTitle>
            <CardDescription>
              Generate a comprehensive report summarizing all your documents.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:flex-row">
            <Button onClick={handleGenerateReport} disabled={isPending || uploadedDocuments.length === 0}>
              {isPending && !audioDataUri ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
              Generate Report
            </Button>
            <Button onClick={handleGenerateAudioReport} disabled={isPending || uploadedDocuments.length === 0}>
              {isPending && audioDataUri === null ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileAudio className="mr-2 h-4 w-4" />}
              Generate Audio Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
            <CardDescription>
              Manage your legal and financial documents.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {uploadedDocuments.map((doc) => (
              <Card key={doc.id}>
                <CardHeader>
                  <CardTitle className="truncate text-base">{doc.name}</CardTitle>
                  <CardDescription>Uploaded: {doc.uploadDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">TEXT</Badge>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href={`/documents/${doc.id}`}>View Document</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Document Summary Report</DialogTitle>
            <DialogDescription>
              This is an AI-generated summary of your documents. It is not legal advice.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="prose prose-sm max-w-none whitespace-pre-wrap">
              {isPending && !report ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
              ) : (
                report
              )}
            </div>
          </ScrollArea>
          {audioDataUri && (
            <div className="mt-4">
              <audio controls src={audioDataUri} className="w-full">
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

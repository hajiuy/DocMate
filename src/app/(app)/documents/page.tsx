'use client';

import { useState, useRef } from 'react';
import { PlusCircle, Upload, FileText, FileAudio, File as FileIcon, X } from 'lucide-react';
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
import { mockDocuments } from '@/lib/mock-data';

export default function DocumentsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
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
              <Button>Process Document</Button>
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
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button>
            <FileAudio className="mr-2 h-4 w-4" />
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
          {mockDocuments.map((doc) => (
            <Card key={doc.id}>
              <CardHeader>
                <CardTitle className="truncate text-base">{doc.name}</CardTitle>
                <CardDescription>Uploaded: {doc.uploadDate}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">PDF</Badge>
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
  );
}
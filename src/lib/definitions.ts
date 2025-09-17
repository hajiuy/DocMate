export type Document = {
  id: string;
  name: string;
  uploadDate: string;
  content: string;
  clauses: Clause[];
};

export type Clause = {
  id: string;
  text: string;
  simplifiedText?: string;
  risk?: 'low' | 'medium' | 'high';
};

export type Liability = {
  id: string;
  name: string;
  type: 'EMI' | 'Warranty' | 'Purchase';
  amount?: number;
  dueDate?: string;
  expiryDate?: string;
};

export type Reminder = {
  id: string;
  text: string;
  dueDate: string;
  type: 'EMI' | 'Warranty' | 'Lease';
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

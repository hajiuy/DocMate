import type { Document, Liability, Reminder } from './definitions';

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'Home Loan Agreement.pdf',
    uploadDate: '2023-10-15',
    content: `
      This Home Loan Agreement is made on 1st January 2023.
      Clause 1: The borrower agrees to pay an EMI of $1,200 per month for 240 months.
      Clause 2: A penalty of 2% will be charged on late payments.
      Clause 3: The interest rate is fixed at 5% per annum.
      Clause 4: The property is located at 123 Main St, Anytown.
    `,
    clauses: [
      { id: 'c1-1', text: 'The borrower agrees to pay an EMI of $1,200 per month for 240 months.' },
      { id: 'c1-2', text: 'A penalty of 2% will be charged on late payments.' },
      { id: 'c1-3', text: 'The interest rate is fixed at 5% per annum.' },
      { id: 'c1-4', text: 'The property is located at 123 Main St, Anytown.' },
    ],
  },
  {
    id: 'doc-2',
    name: 'Car_Warranty.pdf',
    uploadDate: '2023-11-01',
    content: `
      Warranty document for Honda Civic, purchased on 15th October 2023.
      Clause 1: The warranty for the engine is valid for 5 years or 100,000 miles, whichever comes first.
      Clause 2: The warranty expires on 14th October 2028.
      Clause 3: Regular service from an authorized dealer is required to maintain warranty.
    `,
    clauses: [
      { id: 'c2-1', text: 'The warranty for the engine is valid for 5 years or 100,000 miles, whichever comes first.' },
      { id: 'c2-2', text: 'The warranty expires on 14th October 2028.' },
      { id: 'c2-3', text: 'Regular service from an authorized dealer is required to maintain warranty.' },
    ],
  },
  {
    id: 'doc-3',
    name: 'Rental_Agreement_Apt_5B.pdf',
    uploadDate: '2024-01-20',
    content: `
      This rental agreement is for Apartment 5B, for a period of 12 months starting February 1st, 2024.
      Clause 1: Monthly rent is $2,500, due on the 1st of each month.
      Clause 2: The lease renewal must be negotiated 60 days prior to expiry. Lease expires January 31st, 2025.
      Clause 3: The security deposit is $2,500.
    `,
    clauses: [
        { id: 'c3-1', text: 'Monthly rent is $2,500, due on the 1st of each month.' },
        { id: 'c3-2', text: 'The lease renewal must be negotiated 60 days prior to expiry. Lease expires January 31st, 2025.' },
        { id: 'c3-3', text: 'The security deposit is $2,500.' },
    ],
  },
];

export const mockLiabilities: Liability[] = [
  { id: 'l1', name: 'Home Loan EMI', type: 'EMI', amount: 1200, dueDate: '1st of every month' },
  { id: 'l2', name: 'Car Loan EMI', type: 'EMI', amount: 450, dueDate: '15th of every month' },
  { id: 'l3', name: 'Honda Civic Warranty', type: 'Warranty', expiryDate: '2028-10-14' },
  { id: 'l4', name: 'iPhone 15 Pro', type: 'Purchase', expiryDate: '2025-09-22' },
  { id: 'l5', name: 'MacBook Pro Warranty', type: 'Warranty', expiryDate: '2026-03-10' },
];

export const mockReminders: Reminder[] = [
  { id: 'r1', text: 'Home Loan EMI is due', dueDate: '2024-08-01', type: 'EMI' },
  { id: 'r2', text: 'Car Loan EMI is due', dueDate: '2024-08-15', type: 'EMI' },
  { id: 'r3', text: 'iPhone 15 Pro warranty expires in 1 month', dueDate: '2025-09-22', type: 'Warranty' },
  { id: 'r4', text: 'Negotiate lease renewal for Apt 5B', dueDate: '2024-12-01', type: 'Lease' },
];

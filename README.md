DocMate AI Companion

Your Personal Legal + Financial Companion
Simplifies complex legal documents, tracks EMIs & warranties, compares contracts, and answers your questions in plain language, powered by Google Cloud’s AI stack.

🚀 Features
	•	Ask Me Anything (Chatbot) — Clause-aware chatbot answers queries like “How many EMIs are due next month?”     using RAG + Vertex AI.
	•	ClauseBook (Notebook) — Smart notebook that organizes clauses, EMIs, and warranties in one place.
	•	DueBook (Calendar) — Reminder system that ensures you never miss a payment, warranty, or renewal.
	•	Risk & Obligation Alerts — AI flags hidden charges, penalties, and obligations with red/yellow/green tags.
	•	Document Comparison — Compare two agreements side-by-side with plain-language pros/cons.
	•	Multilingual Explanations — Explains legal jargon in local languages with simple story-style examples.
	•	Secure Vault — Encrypted storage with IAM + KMS for sensitive documents.
	•	Financial Insights — Analyzes EMIs vs income, predicts expenses, and suggests savings strategies.



🛠 Tech Stack
Frontend:
	•	React + Tailwind (Firebase Hosting)

Backend:
	•	Firebase Functions (Node.js + Express APIs)
	•	Firestore (structured data: Notebook, Reminders, Reports)
	•	Firebase Authentication (secure user login)

AI + Processing (Google Cloud):
	•	Document AI (DocAI) → clause & EMI extraction
	•	Vertex AI (Gemini + Embeddings) → summaries, Q&A, semantic search
	•	Vertex AI Translation → multilingual explanations
	•	Cloud DLP → PII redaction before AI processing

Storage & Scheduling:
	•	Cloud Storage (GCS) → secure vault for uploaded documents
	•	Cloud Scheduler + Pub/Sub → reminders & calendar alerts

Security & Secrets:
	•	Secret Manager → API keys, service accounts
	•	Cloud IAM + KMS → access control & encryption


✅ Usage Flow
	1.	Upload a document → DocAI extracts clauses, EMIs, warranties.
	2.	View ClauseBook for structured notebook entries.
	3.	DueBook sends reminders before EMIs/warranties expire.
	4.	Use Ask Me Anything chatbot for queries.
	5.	Compare two documents → side-by-side summary.
	6.	Get multilingual explanations and story-style guidance.

import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FinancialChart } from '@/components/dashboard/financial-chart';
import { SummaryCard } from '@/components/dashboard/summary-card';
import { mockDocuments } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <h1 className="font-semibold text-2xl md:text-3xl">DocMate</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <SummaryCard
          title="Total Liabilities"
          value="$45,231.89"
          description="+20.1% from last month"
          icon={DollarSign}
        />
        <SummaryCard
          title="Upcoming EMIs (Next 30d)"
          value="3"
          description="Totaling $1,650.00"
          icon={CreditCard}
        />
        <SummaryCard
          title="Warranties Expiring Soon"
          value="2"
          description="Within the next 6 months"
          icon={ShieldAlert}
        />
        <SummaryCard
          title="Recent Activity"
          value="+5"
          description="New documents & reminders"
          icon={Activity}
        />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>
              A summary of your key financial metrics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FinancialChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>
                Your most recently uploaded documents.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/documents">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-8">
            {mockDocuments.slice(0, 4).map((doc) => (
              <div key={doc.id} className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Uploaded on {doc.uploadDate}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge variant="outline">PDF</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

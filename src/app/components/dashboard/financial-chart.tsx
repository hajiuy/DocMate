'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', emi: 1860 },
  { month: 'February', emi: 1650 },
  { month: 'March', emi: 1650 },
  { month: 'April', emi: 1200 },
  { month: 'May', emi: 1650 },
  { month: 'June', emi: 1200 },
];

const chartConfig = {
  emi: {
    label: 'EMI',
    color: 'hsl(var(--primary))',
  },
};

export function FinancialChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(value) =>
                `$${value.toLocaleString()}`
              }
            />
          }
        />
        <Bar dataKey="emi" fill="var(--color-emi)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}

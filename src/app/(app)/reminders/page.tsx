import { AlarmClockOff, Check } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockReminders } from '@/lib/mock-data';

export default function RemindersPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">DueBook</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
          <CardDescription>Stay on top of your important dates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockReminders.map((reminder) => (
            <Card key={reminder.id} className="flex flex-wrap items-center p-4">
              <div className="flex-1">
                <p className="font-medium">{reminder.text}</p>
                <p className="text-sm text-muted-foreground">
                  Due: {reminder.dueDate}
                </p>
              </div>
              <Badge
                variant={
                  reminder.type === 'EMI'
                    ? 'default'
                    : reminder.type === 'Warranty'
                    ? 'secondary'
                    : 'outline'
                }
                className="mr-4 mt-2 sm:mt-0"
              >
                {reminder.type}
              </Badge>
              <div className="mt-2 flex w-full gap-2 sm:mt-0 sm:w-auto">
                <Button variant="outline" size="icon" className="flex-1 sm:flex-none">
                  <AlarmClockOff className="h-4 w-4" />
                  <span className="sr-only">Snooze</span>
                </Button>
                <Button variant="outline" size="icon" className="flex-1 sm:flex-none">
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Mark as done</span>
                </Button>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

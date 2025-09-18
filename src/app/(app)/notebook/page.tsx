import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockLiabilities } from '@/lib/mock-data';

export default function NotebookPage() {
  const emis = mockLiabilities.filter((l) => l.type === 'EMI');
  const warranties = mockLiabilities.filter((l) => l.type === 'Warranty');
  const purchases = mockLiabilities.filter((l) => l.type === 'Purchase');

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">ClauseBook</h1>
        <Button className="ml-auto gap-1">
          <PlusCircle className="h-4 w-4" />
          Add Entry
        </Button>
      </div>

      <p className="text-muted-foreground">
        Your smart notebook that keeps every clause, EMI, and warranty in one
        place.
      </p>

      <Tabs defaultValue="emis" className="grid gap-4">
        <TabsList>
          <TabsTrigger value="emis">EMIs</TabsTrigger>
          <TabsTrigger value="warranties">Warranties</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
        </TabsList>
        <TabsContent value="emis">
          <Card>
            <CardHeader>
              <CardTitle>EMI Schedules</CardTitle>
              <CardDescription>
                All your recurring Equated Monthly Installments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emis.map((emi) => (
                    <TableRow key={emi.id}>
                      <TableCell className="font-medium">{emi.name}</TableCell>
                      <TableCell>${emi.amount?.toFixed(2)}</TableCell>
                      <TableCell>{emi.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="warranties">
          <Card>
            <CardHeader>
              <CardTitle>Warranties</CardTitle>
              <CardDescription>
                All your product warranties and their expiration dates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Expiry Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {warranties.map((warranty) => (
                    <TableRow key={warranty.id}>
                      <TableCell className="font-medium">
                        {warranty.name}
                      </TableCell>
                      <TableCell>{warranty.expiryDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>Purchases</CardTitle>
              <CardDescription>
                Key purchases and their warranty expirations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Warranty Expiry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell className="font-medium">
                        {purchase.name}
                      </TableCell>
                      <TableCell>{purchase.expiryDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

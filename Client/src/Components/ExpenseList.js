import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

export function ExpenseList() {
  const { data: expenses, isLoading } = useQuery({ 
    queryKey: ["/api/expenses"]
  });

  const exportToPDF = () => {
    if (!expenses) return;

    const doc = new jsPDF();
    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const monthlyBudget = expenses[0]?.monthlyBudget || 0;
    const savings = monthlyBudget - totalAmount;

    doc.setFontSize(16);
    doc.text("Expense Report", 14, 15);

    doc.setFontSize(12);
    doc.text(`Total Expenses: $${totalAmount}`, 14, 25);
    doc.text(`Monthly Budget: $${monthlyBudget}`, 14, 32);
    doc.text(`Savings: $${savings}`, 14, 39);

    autoTable(doc, {
      startY: 45,
      head: [["Date", "Category", "Description", "Amount"]],
      body: expenses.map(expense => [
        new Date(expense.date).toLocaleDateString(),
        expense.category,
        expense.description,
        `$${expense.amount}`
      ]),
    });

    doc.save("expense-report.pdf");
  };

  if (isLoading) {
    return <div>Loading expenses...</div>;
  }

  const totalAmount = expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0;
  const monthlyBudget = expenses?.[0]?.monthlyBudget || 0;
  const savings = monthlyBudget - totalAmount;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold">Expenses Overview</h3>
          <div className="text-sm text-muted-foreground">
            Monthly Budget: ${monthlyBudget} | Total Spent: ${totalAmount} | 
            Savings: <span className={savings >= 0 ? "text-green-600" : "text-red-600"}>${savings}</span>
          </div>
        </div>
        <Button onClick={exportToPDF} className="flex items-center gap-2">
          <FileDown className="h-4 w-4" />
          Export PDF
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses?.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell className="text-right">${expense.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

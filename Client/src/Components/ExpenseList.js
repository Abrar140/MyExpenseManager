import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig"; // Ensure Firebase is configured
import RNHTMLtoPDF from "react-native-html-to-pdf"; // Library for PDF generation

export function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "expenses"));
        const expenseList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExpenses(expenseList);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const generatePDF = async () => {
    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const monthlyBudget = expenses[0]?.monthlyBudget || 0;
    const savings = monthlyBudget - totalAmount;

    let htmlContent = `
      <h1>Expense Report</h1>
      <p><strong>Total Expenses:</strong> $${totalAmount}</p>
      <p><strong>Monthly Budget:</strong> $${monthlyBudget}</p>
      <p><strong>Savings:</strong> <span style="color:${
        savings >= 0 ? "green" : "red"
      };">$${savings}</span></p>
      <table border="1">
        <tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th></tr>
        ${expenses
          .map(
            (expense) =>
              `<tr>
                <td>${new Date(expense.date).toLocaleDateString()}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>$${expense.amount}</td>
              </tr>`
          )
          .join("")}
      </table>
    `;

    const options = {
      html: htmlContent,
      fileName: "Expense_Report",
      directory: "Documents",
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      alert(`PDF saved to: ${file.filePath}`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (loading) {
    return <Text style={styles.loadingText}>Loading expenses...</Text>;
  }

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const monthlyBudget = expenses[0]?.monthlyBudget || 0;
  const savings = monthlyBudget - totalAmount;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expenses Overview</Text>
        <Text style={styles.stats}>
          Monthly Budget: ${monthlyBudget} | Total Spent: ${totalAmount} |
          Savings:{" "}
          <Text style={{ color: savings >= 0 ? "green" : "red" }}>
            ${savings}
          </Text>
        </Text>
        <TouchableOpacity style={styles.button} onPress={generatePDF}>
          <Text style={styles.buttonText}>Export PDF</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseDate}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text style={styles.expenseCategory}>{item.category}</Text>
            <Text style={styles.expenseDescription}>{item.description}</Text>
            <Text style={styles.expenseAmount}>${item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  stats: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  expenseDate: {
    fontWeight: "bold",
    width: "20%",
  },
  expenseCategory: {
    width: "25%",
  },
  expenseDescription: {
    width: "35%",
  },
  expenseAmount: {
    width: "20%",
    textAlign: "right",
    fontWeight: "bold",
  },
});

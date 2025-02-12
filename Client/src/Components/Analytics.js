// import { useQuery } from "@tanstack/react-query";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// export function Analytics() {
//   const { data: expenses } = useQuery({ 
//     queryKey: ["/api/expenses"]
//   });

//   if (!expenses) return null;

//   const categoryTotals = expenses.reduce((acc, expense) => {
//     acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
//     return acc;
//   }, {});

//   const chartData = Object.entries(categoryTotals).map(([category, total]) => ({
//     category,
//     total
//   }));

//   const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
//   const monthlyBudget = expenses[0]?.monthlyBudget || 0;

//   return (
//     <div className="space-y-4">
//       <div className="grid gap-4 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Total Spent</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">${totalSpent}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Monthly Budget</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">${monthlyBudget}</div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Expenses by Category</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="category" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="total" fill="var(--primary)" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }








import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure Firebase is configured
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { Card } from "react-native-paper";

export function Analytics() {
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

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  }

  if (expenses.length === 0) {
    return <Text style={styles.noDataText}>No expense data available.</Text>;
  }

  // Calculate total spent and category totals
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyBudget = expenses[0]?.monthlyBudget || 0;

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const chartData = Object.entries(categoryTotals).map(([category, total]) => ({
    category,
    value: total,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Total Spent</Text>
            <Text style={styles.cardValue}>${totalSpent}</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Monthly Budget</Text>
            <Text style={styles.cardValue}>${monthlyBudget}</Text>
          </Card.Content>
        </Card>
      </View>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Text style={styles.chartTitle}>Expenses by Category</Text>
          <View style={{ flexDirection: "row", height: 250, padding: 10 }}>
            <YAxis
              data={chartData.map((item) => item.value)}
              style={{ marginBottom: 30 }}
              contentInset={{ top: 10, bottom: 10 }}
              svg={{ fontSize: 12, fill: "grey" }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <BarChart
                style={{ flex: 1 }}
                data={chartData.map((item) => item.value)}
                svg={{ fill: "#007bff" }}
                contentInset={{ top: 10, bottom: 10 }}
              >
                <Grid />
              </BarChart>
              <XAxis
                style={{ marginTop: 10 }}
                data={chartData}
                formatLabel={(value, index) => chartData[index].category}
                contentInset={{ left: 10, right: 10 }}
                svg={{ fontSize: 12, fill: "grey" }}
              />
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    color: "#888",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
  },
  chartCard: {
    padding: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});


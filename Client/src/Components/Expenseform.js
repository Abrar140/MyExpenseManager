// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { insertExpenseSchema, categories } from "@shared/schema";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useToast } from "@/hooks/use-toast";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { apiRequest } from "@/lib/queryClient";

// export function ExpenseForm() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   const form = useForm({
//     resolver: zodResolver(insertExpenseSchema),
//     defaultValues: {
//       amount: 0,
//       category: "Food",
//       description: "",
//       date: new Date().toISOString().split("T")[0],
//       monthlyBudget: 0,
//     },
//   });

//   const mutation = useMutation({
//     mutationFn: async (values) => {
//       await apiRequest("POST", "/api/expenses", values);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["/api/expenses"] });
//       toast({
//         title: "Expense added successfully",
//       });
//       form.reset();
//     },
//   });

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="amount"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Amount</FormLabel>
//               <FormControl>
//                 <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="category"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Category</FormLabel>
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {categories.map((category) => (
//                     <SelectItem key={category} value={category}>
//                       {category}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="date"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Date</FormLabel>
//               <FormControl>
//                 <Input type="date" {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <Button type="submit" disabled={mutation.isPending}>Add Expense</Button>
//       </form>
//     </Form>
//   );
// }

// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { insertExpenseSchema, categories } from "@shared/schema";
// import { View, Text, TextInput, Button, Picker, StyleSheet } from "react-native";
// import { useToast } from "@/hooks/use-toast";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { apiRequest } from "@/lib/queryClient";

// export function ExpenseForm() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   const { control, handleSubmit, reset } = useForm({
//     resolver: zodResolver(insertExpenseSchema),
//     defaultValues: {
//       amount: 0,
//       category: "Food",
//       description: "",
//       date: new Date().toISOString().split("T")[0],
//       monthlyBudget: 0,
//     },
//   });

//   const mutation = useMutation({
//     mutationFn: async (values) => {
//       await apiRequest("POST", "/api/expenses", values);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["/api/expenses"] });
//       toast({
//         title: "Expense added successfully",
//       });
//       reset();
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <Text>Amount</Text>
//       <TextInput style={styles.input} keyboardType="numeric" onChangeText={(text) => control.setValue("amount", parseInt(text))} />

//       <Text>Category</Text>
//       <Picker
//         selectedValue={control.getValues("category")}
//         onValueChange={(itemValue) => control.setValue("category", itemValue)}
//         style={styles.input}
//       >
//         {categories.map((category) => (
//           <Picker.Item key={category} label={category} value={category} />
//         ))}
//       </Picker>

//       <Text>Description</Text>
//       <TextInput style={styles.input} onChangeText={(text) => control.setValue("description", text)} />

//       <Text>Date</Text>
//       <TextInput style={styles.input} keyboardType="default" onChangeText={(text) => control.setValue("date", text)} />

//       <Button title="Add Expense" onPress={handleSubmit((values) => mutation.mutate(values))} disabled={mutation.isPending} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginVertical: 8,
//   },
// });

import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Picker,
  StyleSheet,
} from "react-native";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore"; // Firestore functions
import { db } from "../../../firebaseConfig"; // Your Firebase config
import { categories, expensesCollection } from "../../../Shared/shared";

export function ExpenseForm() {
  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      amount: 0,
      category: "Food",
      description: "",
      date: new Date().toISOString().split("T")[0],
      monthlyBudget: 0,
    },
  });

  // Function to save to Firestore
  const onSubmit = async (values) => {
    try {
      await addDoc(collection(db, expensesCollection), values); // Add to Firestore
      alert("Expense added successfully!");
      reset(); // Reset form after submission
    } catch (error) {
      console.error("Error adding expense: ", error);
      alert("Failed to add expense.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setValue("amount", parseInt(text) || 0)}
      />

      <Text>Category</Text>
      <Picker
        selectedValue={watch("category")} // ✅ FIXED
        onValueChange={(itemValue) => setValue("category", itemValue)}
        style={styles.input}
      >
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>

      <Text>Description</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue("description", text)}
      />

      <Text>Date</Text>
      <TextInput
        style={styles.input}
        keyboardType="default"
        onChangeText={(text) => setValue("date", text)}
      />

      <Button title="Add Expense" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
  },
});

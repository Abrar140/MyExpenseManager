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

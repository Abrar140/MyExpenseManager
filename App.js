import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ExpenseList } from "./Client/src/Components/ExpenseList";
import { Analytics } from "./Client/src/Components/Analytics";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Analytics/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { useColorScheme } from "react-native";
import { Pressable } from "react-native";
import { Moon, Sun } from "lucide-react-native";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const colorScheme = useColorScheme(); // Get system theme
  const [theme, setTheme] = useState(colorScheme || "light");

  useEffect(() => {
    // Apply theme change logic (if using a theme context or async storage)
  }, [theme]);

  return (
    <Pressable
      onPress={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{
        padding: 10,
        borderRadius: 50,
        backgroundColor: theme === "light" ? "#ddd" : "#333",
      }}
    >
      {theme === "light" ? (
        <Sun size={24} color="black" />
      ) : (
        <Moon size={24} color="white" />
      )}
    </Pressable>
  );
}

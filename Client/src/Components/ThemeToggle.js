// import { Moon, Sun } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";

// export function ThemeToggle() {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     const root = window.document.documentElement;
//     root.classList.remove("light", "dark");
//     root.classList.add(theme);
//   }, [theme]);

//   return (
//     <Button
//       variant="outline"
//       size="icon"
//       onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//     >
//       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//       <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//     </Button>
//   );
// }



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

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-9 w-9 rounded-full opacity-70" aria-label="Toggle theme">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 rounded-full transition-all duration-300 hover:scale-105 border-border/80 shadow-xs"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Moon className="h-4 w-4 text-indigo-400 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      ) : (
        <Sun className="h-4 w-4 text-amber-500 transition-transform duration-300 rotate-0 hover:rotate-45" />
      )}
    </Button>
  );
}

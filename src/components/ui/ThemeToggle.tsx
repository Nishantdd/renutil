import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') setTheme('system');
    if (theme === 'system') setTheme('dark');
    if (theme === 'dark') setTheme('light');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="border-l"
      aria-label="Toggle theme"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
      />

      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
      />

      <Monitor
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === "system" ? "rotate-0 scale-100" : "scale-0"}`}
      />
    </Button>
  );
}
